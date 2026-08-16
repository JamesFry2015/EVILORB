import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { characters } from '@/lib/characters';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Create an OpenRouter provider using the OpenAI compatible endpoint
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, characterId, modelName } = await req.json();

    // Find the selected character
    const character = characters.find((c) => c.id === characterId);

    // If no character found, fallback to a generic assistant (shouldn't happen in normal flow)
    const systemPrompt = character
      ? character.systemPrompt
      : "You are a helpful AI assistant.";

    // Default to a model if not provided
    const model = modelName || 'meta-llama/llama-3.3-70b-instruct';

    const result = await streamText({
      model: openrouter(model),
      system: systemPrompt,
      messages,
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
