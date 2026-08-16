import { useState } from 'react';
import { Scenario } from '@/lib/scenarios';
import { Plus } from 'lucide-react';

interface CreateScenarioFormProps {
  onSave: (scenario: Scenario) => void;
  onCancel: () => void;
}

export function CreateScenarioForm({ onSave, onCancel }: CreateScenarioFormProps) {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('🌍');
  const [tagline, setTagline] = useState('');
  const [worldLore, setWorldLore] = useState('');
  const [scenarioRules, setScenarioRules] = useState('');
  const [startingSituation, setStartingSituation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !worldLore || !scenarioRules || !startingSituation) return;

    const newScenario: Scenario = {
      id: `custom-${Date.now()}`,
      title,
      thumbnail,
      tagline,
      worldLore,
      scenarioRules,
      startingSituation,
      themeColor: 'bg-gray-700', // Default color for custom
    };
    onSave(newScenario);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Plus className="w-6 h-6 text-blue-500" />
          Create Custom Scenario
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-2">
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Thumbnail
              </label>
              <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Emoji"
                maxLength={2}
                required
              />
            </div>
            <div className="sm:col-span-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., The Lost City"
                required
              />
            </div>
             <div className="sm:col-span-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Jungle exploration"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              World Lore (The overarching universe details)
            </label>
            <textarea
              value={worldLore}
              onChange={(e) => setWorldLore(e.target.value)}
              rows={4}
              className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
              placeholder="Describe the setting, history, factions, and general state of the world..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Scenario Rules (Physics, magic systems, genre boundaries)
            </label>
            <textarea
              value={scenarioRules}
              onChange={(e) => setScenarioRules(e.target.value)}
              rows={4}
              className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
              placeholder="Instruct the Game Master on the tone, consequences, and mechanics of this world..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Starting Situation (The immediate event)
            </label>
            <textarea
              value={startingSituation}
              onChange={(e) => setStartingSituation(e.target.value)}
              rows={3}
              className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
              placeholder="You wake up in a dark room... What do you do?"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
            >
              Create & Start
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
