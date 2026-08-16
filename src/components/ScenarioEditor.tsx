import { useState } from 'react';
import { Scenario, LoreEntry } from '@/lib/scenarios';
import { Save, Copy, X, Plus, Trash2 } from 'lucide-react';
import { cn } from './Sidebar';

interface ScenarioEditorProps {
  initialScenario?: Scenario;
  onSave: (scenario: Scenario) => void;
  onCancel: () => void;
}

export function ScenarioEditor({ initialScenario, onSave, onCancel }: ScenarioEditorProps) {
  const isEditing = !!initialScenario;
  const [activeTab, setActiveTab] = useState<'metadata' | 'lore' | 'rules' | 'start' | 'model'>('metadata');

  // Form State
  const [title, setTitle] = useState(initialScenario?.title || '');
  const [thumbnail, setThumbnail] = useState(initialScenario?.thumbnail || '🌍');
  const [tagline, setTagline] = useState(initialScenario?.tagline || '');
  const [genreTagsStr, setGenreTagsStr] = useState(initialScenario?.genreTags.join(', ') || '');

  const [generalSetting, setGeneralSetting] = useState(initialScenario?.generalSetting || '');
  const [loreEntries, setLoreEntries] = useState<LoreEntry[]>(initialScenario?.loreEntries || []);

  const [behavioralGuidelines, setBehavioralGuidelines] = useState(initialScenario?.behavioralGuidelines || '');
  const [worldBoundaries, setWorldBoundaries] = useState(initialScenario?.worldBoundaries || '');

  const [startingSituation, setStartingSituation] = useState(initialScenario?.startingSituation || '');

  const [modelId, setModelId] = useState(initialScenario?.modelId || '');
  const [temperature, setTemperature] = useState<number | ''>(initialScenario?.temperature ?? '');
  const [maxTokens, setMaxTokens] = useState<number | ''>(initialScenario?.maxTokens ?? '');

  const handleAddLore = () => {
    setLoreEntries([...loreEntries, { id: `lore-${Date.now()}`, title: '', content: '' }]);
  };

  const handleUpdateLore = (id: string, field: 'title' | 'content', value: string) => {
    setLoreEntries(loreEntries.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const handleRemoveLore = (id: string) => {
    setLoreEntries(loreEntries.filter(l => l.id !== id));
  };

  const constructScenario = (): Scenario => {
    return {
      id: initialScenario ? initialScenario.id : `scenario-${Date.now()}`,
      title,
      thumbnail,
      tagline,
      genreTags: genreTagsStr.split(',').map(s => s.trim()).filter(Boolean),
      generalSetting,
      loreEntries: loreEntries.filter(l => l.title.trim() && l.content.trim()),
      behavioralGuidelines,
      worldBoundaries,
      startingSituation,
      themeColor: initialScenario?.themeColor || 'bg-gray-700',
      modelId: modelId || undefined,
      temperature: temperature === '' ? undefined : temperature,
      maxTokens: maxTokens === '' ? undefined : maxTokens,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startingSituation) {
      alert("Title and Starting Situation are required.");
      return;
    }
    onSave(constructScenario());
  };

  const handleClone = () => {
    if (!title || !startingSituation) return;
    const cloned = constructScenario();
    cloned.id = `scenario-${Date.now()}`;
    cloned.title = `${cloned.title} (Copy)`;
    onSave(cloned);
  };

  const tabs = [
    { id: 'metadata', label: 'Metadata' },
    { id: 'lore', label: 'World Lore' },
    { id: 'rules', label: 'Rules & Guidelines' },
    { id: 'start', label: 'Starting Hook' },
    { id: 'model', label: 'Model Overrides' },
  ] as const;

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">

      {/* Header */}
      <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6 shrink-0">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          {isEditing ? <Save className="w-5 h-5 text-blue-500" /> : <Plus className="w-5 h-5 text-green-500" />}
          {isEditing ? `Editing: ${initialScenario?.title}` : 'Create New Scenario'}
        </h2>
        <div className="flex items-center gap-2">
           {isEditing && (
             <button
              type="button"
              onClick={handleClone}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
              title="Clone Scenario"
            >
              <Copy className="w-5 h-5" />
            </button>
           )}
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">

        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto shrink-0 p-2 md:p-4 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/80"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editor Form */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <form id="scenario-form" onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 pb-20">

            {/* Metadata Tab */}
            <div className={cn("space-y-6", activeTab !== 'metadata' && 'hidden')}>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thumbnail</label>
                  <input
                    type="text"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Emoji"
                    maxLength={2}
                    required
                  />
                </div>
                <div className="sm:col-span-5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="sm:col-span-5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Genre Tags (comma separated)</label>
                <input
                  type="text"
                  value={genreTagsStr}
                  onChange={(e) => setGenreTagsStr(e.target.value)}
                  placeholder="Fantasy, Sci-Fi, Mystery"
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Lore Tab */}
            <div className={cn("space-y-8", activeTab !== 'lore' && 'hidden')}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">General Setting</label>
                <textarea
                  value={generalSetting}
                  onChange={(e) => setGeneralSetting(e.target.value)}
                  rows={4}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                  placeholder="The overarching universe details, history, and active environment..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Modular Lore Entries</label>
                  <button type="button" onClick={handleAddLore} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700">
                    <Plus className="w-4 h-4" /> Add Entry
                  </button>
                </div>

                <div className="space-y-4">
                  {loreEntries.map((lore, index) => (
                    <div key={lore.id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 relative group">
                      <button
                        type="button"
                        onClick={() => handleRemoveLore(lore.id)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <input
                        type="text"
                        value={lore.title}
                        onChange={(e) => handleUpdateLore(lore.id, 'title', e.target.value)}
                        placeholder="Lore Title (e.g., Faction: The Syndicate)"
                        className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 mb-2 px-1 py-1 focus:outline-none focus:border-blue-500 font-medium"
                      />
                      <textarea
                        value={lore.content}
                        onChange={(e) => handleUpdateLore(lore.id, 'content', e.target.value)}
                        placeholder="Lore details..."
                        rows={2}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 resize-y"
                      />
                    </div>
                  ))}
                  {loreEntries.length === 0 && (
                    <div className="text-center p-6 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg text-gray-500 text-sm">
                      No specific lore entries. Add factions, locations, or concepts.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rules Tab */}
            <div className={cn("space-y-6", activeTab !== 'rules' && 'hidden')}>
               <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Behavioral Guidelines (AI Narrator)</label>
                <textarea
                  value={behavioralGuidelines}
                  onChange={(e) => setBehavioralGuidelines(e.target.value)}
                  rows={4}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                  placeholder="Pacing, tone, strict environmental adherence. e.g., 'Keep responses short and gritty.'"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">World Boundaries & Interaction Rules</label>
                <textarea
                  value={worldBoundaries}
                  onChange={(e) => setWorldBoundaries(e.target.value)}
                  rows={4}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                  placeholder="What is possible vs. impossible. e.g., 'Magic does not exist. Weapons are lethal.'"
                />
              </div>
            </div>

            {/* Start Tab */}
            <div className={cn("space-y-6", activeTab !== 'start' && 'hidden')}>
               <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Starting Situation *</label>
                <p className="text-xs text-gray-500 mb-2">The opening narrative hook and the user's initial state upon entering the scenario.</p>
                <textarea
                  value={startingSituation}
                  onChange={(e) => setStartingSituation(e.target.value)}
                  rows={6}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                  placeholder="You wake up in a dark room. The air is cold. What do you do?"
                  required
                />
              </div>
            </div>

            {/* Model Overrides Tab */}
            <div className={cn("space-y-6", activeTab !== 'model' && 'hidden')}>
               <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specific Model ID (Optional)</label>
                <p className="text-xs text-gray-500 mb-2">Overrides the user's selected model for this specific scenario.</p>
                <input
                  type="text"
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., anthropic/claude-3-opus"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Temperature</label>
                   <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 0.7"
                  />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Tokens</label>
                   <input
                    type="number"
                    step="100"
                    min="100"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 500"
                  />
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-end shrink-0">
        <button
          form="scenario-form"
          type="submit"
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Scenario
        </button>
      </div>

    </div>
  );
}
