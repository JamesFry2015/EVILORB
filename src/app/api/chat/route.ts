import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { characters } from '@/lib/characters';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, characterId } = await req.json();

    // Find the selected character
    const character = characters.find((c) => c.id === characterId);

    // If no character found, fallback to a generic assistant (shouldn't happen in normal flow)
    const systemPrompt = character
      ? character.systemPrompt
      : "You are a helpful AI assistant.";

    const result = await streamText({
      model: openai('gpt-4o'),
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
