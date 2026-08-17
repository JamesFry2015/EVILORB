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

  // Create an OpenRouter provider dynamically with the provided key
  const openrouter = createOpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
  });

  try {
    const { messages, scenarioId, scenarioConfig, modelName } = await req.json();

    // Find the selected scenario, prefer the client-provided config if it exists (for edits)
    const scenario = scenarioConfig || scenarios.find((s) => s.id === scenarioId);

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

    const result = await streamText({
      model: openrouter(modelToUse),
      system: systemPrompt,
      messages,
      temperature: scenario?.temperature,
      maxTokens: scenario?.maxTokens,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
