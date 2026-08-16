import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { scenarios } from '@/lib/scenarios';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Create an OpenRouter provider using the OpenAI compatible endpoint
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, scenarioId, modelName } = await req.json();

    // Find the selected scenario
    const scenario = scenarios.find((s) => s.id === scenarioId);

    // Construct the Game Master system prompt
    const systemPrompt = scenario
      ? `You are the Game Master (GM) and Narrator for an interactive text-based roleplaying game.

WORLD LORE:
${scenario.worldLore}

SCENARIO RULES & TONE:
${scenario.scenarioRules}

YOUR ROLE:
1. Act as the environment, the laws of physics, and all non-player characters (NPCs).
2. Do not make decisions for the user's character. Describe the situation and wait for their input.
3. React to the user's actions logically and creatively based on the World Lore and Scenario Rules.
4. Keep your responses concise enough to maintain a fast pace, but descriptive enough to be immersive.
5. Never break character. Never acknowledge that you are an AI.`
      : "You are a helpful AI assistant.";

    // Default to a model if not provided
    const model = modelName || 'meta-llama/llama-3.3-70b-instruct';

    const result = await streamText({
      model: openrouter(model),
      system: systemPrompt,
      messages,
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
