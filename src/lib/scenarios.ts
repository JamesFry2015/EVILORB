export interface LoreEntry {
  id: string;
  title: string;
  content: string;
}

export interface Scenario {
  id: string;
  title: string;
  thumbnail: string; // Emoji or URL
  tagline: string;
  genreTags: string[];

  // World Lore & Environment
  generalSetting: string;
  loreEntries: LoreEntry[];

  // Scenario Rules & Constraints
  behavioralGuidelines: string;
  worldBoundaries: string;

  // Initial State
  startingSituation: string;

  themeColor: string;

  // Model Overrides
  modelId?: string;
  temperature?: number;
  maxTokens?: number;
}

export const scenarios: Scenario[] = [
  {
    id: 'neon-veridia',
    title: 'Neon Veridia',
    thumbnail: '🌆',
    tagline: 'Cyberpunk Corporate Espionage',
    genreTags: ['Cyberpunk', 'Sci-Fi', 'Gritty'],
    generalSetting: `Neon Veridia is a sprawling, rain-slicked metropolis dominated by mega-corporations. The divide between the ultra-rich floating in the orbital rings and the poor scraping by in the lower sectors is vast.`,
    loreEntries: [
      { id: 'lore-1', title: 'Chrome', content: 'Cybernetic enhancements are commonplace, ranging from simple neural jacks to full-body combat chassis.' },
      { id: 'lore-2', title: 'Data Brokers', content: 'Data is the most valuable currency. Fixers and brokers control the flow of information.' }
    ],
    behavioralGuidelines: `As the Game Master, keep the tone cynical, fast-paced, and dangerous. Actions should have realistic and often brutal consequences. Control the environment, the weather, the security systems, and all NPCs the player encounters (e.g., street thugs, corporate fixers, rogue AIs).`,
    worldBoundaries: `Physics act normally, but technology is highly advanced (flying cars, neural jacks, holographic interfaces). Magic does not exist.`,
    startingSituation: `The rain drums heavily against the cracked neon sign of the noodle bar you're hiding in. You clutch a stolen datadrive in your pocket, its casing still warm. Sirens wail in the distance, growing louder. A synthetic voice over the city PA system announces a lockdown in Sector 4—your sector. What do you do?`,
    themeColor: 'bg-purple-600',
  },
  {
    id: 'sun-spire',
    title: 'The Sun Spire',
    thumbnail: '🏰',
    tagline: 'High Fantasy Magic Academy',
    genreTags: ['High Fantasy', 'Magic', 'Adventure'],
    generalSetting: `The Sun Spire is the premier academy for arcane arts, built atop a nexus of ley lines. It's a place of wondrous discoveries and terrible magical accidents.`,
    loreEntries: [
      { id: 'lore-3', title: 'Aethelgard', content: 'The continent surrounding the Spire, filled with mythical creatures, ancient ruins, and rival magical factions.' },
      { id: 'lore-4', title: 'Spellcasting', content: 'Magic requires precise incantations and gestures. Failure can result in wild magic surges.' }
    ],
    behavioralGuidelines: `Keep the tone wondrous, slightly eccentric, and adventurous. Describe magical effects vividly. Narrate the magical phenomena, describe the bizarre architecture of the Spire, and control the NPCs (professors, rival students, summoned elementals).`,
    worldBoundaries: `Magic is real, systemic, and follows rules of elemental and arcane manipulation. There are clear costs to casting spells (exhaustion, material components). Technology is medieval.`,
    startingSituation: `You stand in the Grand Atrium of the Sun Spire on your first day. Floating candles illuminate the vaulted ceilings, and staircases shift and realign before your eyes. Suddenly, a panicked student runs past you holding a jar that is violently shaking and glowing a dangerous shade of arcane purple. It slips from their hands and shatters on the marble floor. What do you do?`,
    themeColor: 'bg-orange-500',
  },
  {
    id: 'derelict-station',
    title: 'Station 7G',
    thumbnail: '🚀',
    tagline: 'Sci-Fi Survival Horror',
    genreTags: ['Sci-Fi', 'Horror', 'Survival'],
    generalSetting: `Station 7G is an isolated mining outpost on the edge of the known galaxy. Communications with the core worlds went silent three weeks ago. The station is vast, industrial, and falling apart.`,
    loreEntries: [
      { id: 'lore-5', title: 'The Breach', content: 'Something has breached the lower decks. The automated defense systems are offline or malfunctioning.' }
    ],
    behavioralGuidelines: `Focus on building tension, describing the claustrophobic environments, the failing systems, and the unsettling noises. You control the horrors lurking in the dark, the automated security systems, and any surviving crew members. Describe things in a gritty, terrifying manner.`,
    worldBoundaries: `Resources (oxygen, ammo, power) are extremely limited. Technology is utilitarian and prone to breaking. Combat should be deadly and best avoided.`,
    startingSituation: `You awaken in a cryo-pod that is flashing a red "EMERGENCY THAW" warning. The main lights are off, replaced by spinning amber hazard strobes. The air is cold and smells of ozone and copper. From the ventilation shaft above you, you hear a rhythmic, wet scraping sound moving closer. What do you do?`,
    themeColor: 'bg-blue-900',
  },
  {
    id: 'victorian-london',
    title: 'Gaslight London',
    thumbnail: '🎩',
    tagline: 'Supernatural Victorian Mystery',
    genreTags: ['Victorian', 'Supernatural', 'Mystery'],
    generalSetting: `It is 1888 in London, but the shadows hold more than just cutpurses. The fog is thick, the gaslamps are dim, and the police are completely outmatched.`,
    loreEntries: [
      { id: 'lore-6', title: 'The Supernatural', content: 'Vampires, werewolves, and practitioners of dark arts hide among the high society and the slum-dwellers.' }
    ],
    behavioralGuidelines: `Emphasize the mood: fog, cobblestones, high society manners masking dark secrets. You control the NPCs (inspectors, occultists, monsters, aristocrats). Investigations, dialogue, and uncovering secrets are the primary focus.`,
    worldBoundaries: `The setting is historically grounded in the 19th century, but supernatural elements exist secretly.`,
    startingSituation: `You are standing in the muddy alleyway of Whitechapel. At your feet lies a body, but the wounds are not from a blade—they appear to be massive claw marks. Inspector Lestrade is eyeing you suspiciously from the end of the alley, while a well-dressed gentleman with unnaturally pale skin watches from a nearby carriage. What do you do?`,
    themeColor: 'bg-green-800',
  },
];
