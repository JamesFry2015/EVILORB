import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { scenarios } from '@/lib/scenarios';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Extract API key from Authorization header
  const authHeader = req.headers.get('Authorization');
  const apiKey = authHeader ? authHeader.replace('Bearer ', '') : process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing OpenRouter API Key. Please configure it in settings.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages, scenarioId, scenarioConfig, modelName } = await req.json();

    // Find the selected scenario, prefer the client-provided config if it exists (for edits)
    const scenario = scenarioConfig || scenarios.find((s) => s.id === scenarioId);

    // Workaround: We are forced to use `@ai-sdk/openai@0.0.72` to preserve compatibility with `ai/react` UI types.
    // This older version doesn't support providerOptions natively for reasoning effort.
    // However, OpenRouter accepts the `reasoning_effort` parameter as a top-level field in the standard
    // OpenAI completions request body. Since `@ai-sdk/openai` allows passing additional parameters
    // through its provider configuration or via monkey-patching, we will pass it using `fetch` override.

    const fetchWithReasoning = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      if (init?.body && scenario?.reasoningEffort && scenario.reasoningEffort !== 'none') {
        try {
          const body = JSON.parse(init.body as string);
          body.reasoning_effort = scenario.reasoningEffort;
          init.body = JSON.stringify(body);
        } catch (e) {
          console.error("Failed to parse body to inject reasoning effort", e);
        }
      }
      return fetch(input, init);
    };

    const openrouter = createOpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
      fetch: fetchWithReasoning as any, // Type override to satisfy `@ai-sdk/openai` fetch requirements
    });

    let systemPrompt = "You are a helpful AI assistant.";

    if (scenario) {
      // Build Modular Lore Block
      let loreBlock = scenario.generalSetting ? `${scenario.generalSetting}\n\n` : '';
      if (scenario.loreEntries && scenario.loreEntries.length > 0) {
        loreBlock += scenario.loreEntries
          .map((entry: any) => `* ${entry.title}: ${entry.content}`)
          .join('\n');
      }

      // Construct the Game Master system prompt dynamically
      systemPrompt = `You are the Game Master (GM) and Narrator for an interactive text-based roleplaying game.

WORLD LORE & ENVIRONMENT:
${loreBlock}

BEHAVIORAL GUIDELINES & TONE:
${scenario.behavioralGuidelines || 'Act as a fair and descriptive game master.'}

WORLD BOUNDARIES & INTERACTION RULES:
${scenario.worldBoundaries || 'Physics act normally.'}

YOUR ROLE:
1. Act as the environment, the laws of physics, and all non-player characters (NPCs).
2. Do not make decisions for the user's character. Describe the situation and wait for their input.
3. React to the user's actions logically and creatively based on the World Lore and Scenario Rules.
4. Keep your responses concise enough to maintain a fast pace, but descriptive enough to be immersive.
5. Never break character. Never acknowledge that you are an AI.`;
    }

    // Default to a model if not provided, allowing scenario to override client selection
    const modelToUse = scenario?.modelId || modelName || 'meta-llama/llama-3.3-70b-instruct';

    // Workaround for older SDK: We can't cleanly pass reasoning_effort in providerOptions
    // to OpenRouter via the OpenAI compatible provider in this ai@3.4 version easily.
    // However, OpenRouter allows passing extra params via headers or custom fetch if needed,
    // but without native support in this specific older provider version, we can't type check it.
    // Instead we will ignore the reasoningEffort parameter from the AI route payload
    // and rely on the model defaulting, since we had to downgrade the SDK version to fix Chat types.

    const result = await streamText({
      model: openrouter(modelToUse),
      system: systemPrompt,
      messages,
      temperature: scenario?.temperature,
      maxTokens: scenario?.maxTokens,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
