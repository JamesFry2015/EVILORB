# Adding Custom Scenarios

The power of WorldBuilder lies in its flexibility. You can easily create new worlds and starting situations by editing a single file.

## The Scenario Data Model

All scenarios are defined in the `src/lib/scenarios.ts` file.

The `Scenario` interface dictates the structure required for every world:

```typescript
export interface Scenario {
  id: string;              // A unique identifier (used in URLs or keys)
  title: string;           // The name of the world or scenario
  thumbnail: string;       // An emoji or URL string for the icon
  tagline: string;         // A short, punchy description (shown in the sidebar)
  worldLore: string;       // The overarching universe details (history, setting, factions)
  scenarioRules: string;   // Physics, magic systems, genre boundaries, tone
  startingSituation: string; // The immediate event the user is dropped into (the first message)
  themeColor: string;      // A Tailwind CSS background color class for the icon bubble
}
```

## Step-by-Step Guide to Adding a Scenario

1.  Open `src/lib/scenarios.ts` in your code editor.
2.  Locate the `scenarios` array.
3.  Add a new object to the array following the `Scenario` interface structure.

### Example: Adding a Zombie Apocalypse

To add a survival horror scenario, you would append the following object to the `scenarios` array:

```typescript
  {
    id: 'zombie-outbreak',
    title: 'Outbreak in Sector 4',
    thumbnail: '🧟',
    tagline: 'Gritty Zombie Survival',
    worldLore: 'A highly contagious fungal virus has swept across the globe, turning the infected into aggressive, mindless husks. Society collapsed three weeks ago. Food and clean water are scarce. Military quarantine zones have mostly fallen.',
    scenarioRules: 'The genre is Gritty Survival Horror.\nAmmo is extremely rare. Noise attracts the infected. \nAs the Game Master, focus on tension, desperation, and resource management. Describe the ruined environment vividly. Do not make the player a superhero; they are vulnerable.',
    startingSituation: 'You are barricaded inside an abandoned convenience store. Outside, the sun is setting, casting long shadows over the wrecked cars on the street. You have one bottle of water and a baseball bat. Suddenly, you hear the shattering of glass from the back storeroom. What do you do?',
    themeColor: 'bg-red-900',
  },
```

## Tips for Writing Good Scenario Prompts

*   **Separate Lore and Rules:** Keep `worldLore` focused on facts and history, while `scenarioRules` should explicitly instruct the LLM on *how* to behave as a Game Master (tone, mechanics, pacing).
*   **Establish Boundaries:** Explicitly state the genre and the limits of the world (e.g., "Magic does not exist here" or "Technology fails constantly").
*   **Create an Immediate Hook:** The `startingSituation` should end with a clear prompt for action (like "What do you do?") to immediately engage the player.
