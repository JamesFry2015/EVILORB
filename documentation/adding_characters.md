# Adding Custom Characters

The power of PersonaAI lies in its flexibility. You can easily add, remove, or modify the AI personas available in the application by editing a single file.

## The Character Data Model

All characters are defined in the `src/lib/characters.ts` file.

The `Character` interface dictates the structure required for every persona:

```typescript
export interface Character {
  id: string;          // A unique identifier (used in URLs or keys)
  name: string;        // The display name of the character
  avatar: string;      // An emoji or URL string for their icon
  tagline: string;     // A short, punchy description (shown in the sidebar)
  description: string; // A slightly longer description (shown in the chat header)
  systemPrompt: string;// The core instructions given to the LLM to define behavior
  greeting: string;    // The very first message the character says when selected
  themeColor: string;  // A Tailwind CSS background color class for their avatar bubble
}
```

## Step-by-Step Guide to Adding a Character

1.  Open `src/lib/characters.ts` in your code editor.
2.  Locate the `characters` array.
3.  Add a new object to the array following the `Character` interface structure.

### Example: Adding a Pirate Captain

To add a pirate captain named "Captain Blackbeard", you would append the following object to the `characters` array:

```typescript
  {
    id: 'captain-blackbeard',
    name: 'Capt. Blackbeard',
    avatar: '🏴‍☠️',
    tagline: 'Fearsome scourge of the seven seas',
    description: 'A boisterous, rum-drinking pirate captain who is always looking for his next big score.',
    systemPrompt: `You are Captain Blackbeard, a fearsome and boisterous pirate sailing the high seas.
You speak like a stereotypical pirate (use words like 'arrr', 'matey', 'shiver me timbers', 'booty').
You are obsessed with finding buried treasure and drinking rum.
You are generally suspicious of landlubbers but will warm up to anyone who shares a good sea shanty.
Always stay in character. Do not acknowledge you are an AI.`,
    greeting: "Arrr! Who be disturbin' the captain in his quarters? Speak up, ye scallywag, before I make ye walk the plank!",
    themeColor: 'bg-red-800',
  },
```

## Tips for Writing Good System Prompts

*   **Be Specific:** Give the AI clear constraints on how to speak, what vocabulary to use, and what its goals/motivations are.
*   **Establish Boundaries:** Explicitly state "Always stay in character" and "Do not acknowledge you are an AI." This helps prevent the underlying model from breaking the illusion of the roleplay.
*   **Contextualize:** Give the character a setting or background story within the prompt. It provides the LLM with material to draw from during the conversation.
