export interface Scenario {
  id: string;
  title: string;
  thumbnail: string; // Emoji or URL
  tagline: string;
  worldLore: string;
  scenarioRules: string;
  startingSituation: string;
  themeColor: string;
}

export const scenarios: Scenario[] = [
  {
    id: 'neon-veridia',
    title: 'Neon Veridia',
    thumbnail: '🌆',
    tagline: 'Cyberpunk Corporate Espionage',
    worldLore: `Neon Veridia is a sprawling, rain-slicked metropolis dominated by mega-corporations. The divide between the ultra-rich floating in the orbital rings and the poor scraping by in the lower sectors is vast. Cybernetic enhancements (chrome) are commonplace, and data is the most valuable currency.`,
    scenarioRules: `The genre is gritty Cyberpunk.
Physics act normally, but technology is highly advanced (flying cars, neural jacks, holographic interfaces).
As the Game Master, you control the environment, the weather, the security systems, and all NPCs the player encounters (e.g., street thugs, corporate fixers, rogue AIs).
Keep the tone cynical, fast-paced, and dangerous. Actions should have realistic and often brutal consequences.`,
    startingSituation: `The rain drums heavily against the cracked neon sign of the noodle bar you're hiding in. You clutch a stolen datadrive in your pocket, its casing still warm. Sirens wail in the distance, growing louder. A synthetic voice over the city PA system announces a lockdown in Sector 4—your sector. What do you do?`,
    themeColor: 'bg-purple-600',
  },
  {
    id: 'sun-spire',
    title: 'The Sun Spire',
    thumbnail: '🏰',
    tagline: 'High Fantasy Magic Academy',
    worldLore: `The Sun Spire is the premier academy for arcane arts, built atop a nexus of ley lines. It's a place of wondrous discoveries and terrible magical accidents. The continent of Aethelgard surrounds it, a land filled with mythical creatures, ancient ruins, and rival magical factions.`,
    scenarioRules: `The genre is High Fantasy.
Magic is real, systemic, and follows rules of elemental and arcane manipulation. There are clear costs to casting spells (exhaustion, material components).
As the Game Master, you narrate the magical phenomena, describe the bizarre architecture of the Spire, and control the NPCs (professors, rival students, summoned elementals).
Keep the tone wondrous, slightly eccentric, and adventurous. Describe magical effects vividly.`,
    startingSituation: `You stand in the Grand Atrium of the Sun Spire on your first day. Floating candles illuminate the vaulted ceilings, and staircases shift and realign before your eyes. Suddenly, a panicked student runs past you holding a jar that is violently shaking and glowing a dangerous shade of arcane purple. It slips from their hands and shatters on the marble floor. What do you do?`,
    themeColor: 'bg-orange-500',
  },
  {
    id: 'derelict-station',
    title: 'Station 7G',
    thumbnail: '🚀',
    tagline: 'Sci-Fi Survival Horror',
    worldLore: `Station 7G is an isolated mining outpost on the edge of the known galaxy. Communications with the core worlds went silent three weeks ago. The station is vast, industrial, and falling apart. Something has breached the lower decks.`,
    scenarioRules: `The genre is Sci-Fi Survival Horror.
Resources (oxygen, ammo, power) are extremely limited. Technology is utilitarian and prone to breaking.
As the Game Master, focus on building tension, describing the claustrophobic environments, the failing systems, and the unsettling noises. You control the horrors lurking in the dark, the automated security systems, and any surviving crew members.
Combat should be deadly and best avoided. Describe things in a gritty, terrifying manner.`,
    startingSituation: `You awaken in a cryo-pod that is flashing a red "EMERGENCY THAW" warning. The main lights are off, replaced by spinning amber hazard strobes. The air is cold and smells of ozone and copper. From the ventilation shaft above you, you hear a rhythmic, wet scraping sound moving closer. What do you do?`,
    themeColor: 'bg-blue-900',
  },
  {
    id: 'victorian-london',
    title: 'Gaslight London',
    thumbnail: '🎩',
    tagline: 'Supernatural Victorian Mystery',
    worldLore: `It is 1888 in London, but the shadows hold more than just cutpurses. Vampires, werewolves, and practitioners of dark arts hide among the high society and the slum-dwellers. The fog is thick, the gaslamps are dim, and the police are completely outmatched by the supernatural forces at play.`,
    scenarioRules: `The genre is Victorian Supernatural Mystery (Gaslamp Fantasy).
The setting is historically grounded in the 19th century, but supernatural elements exist secretly.
As the Game Master, emphasize the mood: fog, cobblestones, high society manners masking dark secrets. You control the NPCs (inspectors, occultists, monsters, aristocrats).
Investigations, dialogue, and uncovering secrets are the primary focus.`,
    startingSituation: `You are standing in the muddy alleyway of Whitechapel. At your feet lies a body, but the wounds are not from a blade—they appear to be massive claw marks. Inspector Lestrade is eyeing you suspiciously from the end of the alley, while a well-dressed gentleman with unnaturally pale skin watches from a nearby carriage. What do you do?`,
    themeColor: 'bg-green-800',
  },
];
