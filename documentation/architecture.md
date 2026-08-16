# Architecture Overview

WorldBuilder is a modern web application built using the Next.js App Router. It leverages the Vercel AI SDK to seamlessly handle interactions with large language models acting as Game Masters for custom RPG scenarios.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/docs) (`ai`, `@ai-sdk/openai`)
*   **Icons:** [Lucide React](https://lucide.dev/)

## High-Level Data Flow

1.  **User Input:** The user types a message in the `Chat` UI component and submits the form.
2.  **Client-Side Hook:** The `useChat` hook from the Vercel AI SDK captures the input, updates the local message state (optimistic UI update), and sends a POST request to the backend API route.
    *   *Note:* The application passes the active `scenarioId` and `modelName` within the request body.
3.  **Backend API Route (`/api/chat/route.ts`):**
    *   Receives the conversation history (`messages`), `scenarioId`, and `modelName`.
    *   Looks up the corresponding scenario in the `scenarios.ts` definition file.
    *   Constructs a dynamic "Game Master" system prompt using the scenario's `worldLore` and `scenarioRules`.
    *   Calls the OpenRouter API (via an OpenAI compatible client configured in `@ai-sdk/openai`) using `streamText`, injecting the dynamic system prompt, and routing to the requested model.
4.  **Streaming Response:** The AI's response is streamed back to the client chunk by chunk using `toAIStreamResponse()`.
5.  **UI Update:** The `useChat` hook receives the stream, continuously updates the UI, and creates the typing effect for the message bubble.

## Project Structure

*   **`src/app/page.tsx`:** The root page component. It acts as the container, holding the layout state (e.g., whether the mobile sidebar is open) and rendering both the `Sidebar` and `Chat` components.
*   **`src/app/api/chat/route.ts`:** The backend endpoint responsible for securely communicating with the OpenRouter API and generating GM prompts.
*   **`src/components/Sidebar.tsx`:** The navigation component that lists available scenarios and allows the user to switch worlds or models.
*   **`src/components/Chat.tsx`:** The main interactive game window. It manages the input field, the action history display, and auto-scrolling. It completely remounts (using React `key`) when a new scenario or model is selected to ensure a fresh session.
*   **`src/lib/scenarios.ts`:** The central data store defining all available worlds, their rules, lore, and starting situations.
