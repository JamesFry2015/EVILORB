import { Scenario } from '@/lib/scenarios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Plus, Settings } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  scenarios: Scenario[];
  selectedScenario: Scenario | null;
  onSelectScenario: (scenario: Scenario) => void;
  onCreateNew: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  modelName: string;
  setModelName: (modelName: string) => void;
  onOpenSettings: () => void;
}

export function Sidebar({ scenarios, selectedScenario, onSelectScenario, onCreateNew, isOpen, setIsOpen, modelName, setModelName, onOpenSettings }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-30 w-72 bg-gray-900 border-r border-gray-800 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              🌍 WorldBuilder
            </h2>
            <p className="text-sm text-gray-400 mt-1">Choose your scenario</p>
          </div>
          <button
            onClick={onOpenSettings}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
            title="Global Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-800">
          <label htmlFor="model-input" className="block text-xs font-medium text-gray-400 mb-1">
            OpenRouter Model
          </label>
          <input
            id="model-input"
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            placeholder="meta-llama/llama-3.3-70b-instruct"
            className="w-full bg-gray-950 border border-gray-800 text-sm text-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <button
            onClick={onCreateNew}
            className="w-full text-left p-3 rounded-lg transition-all duration-200 border border-dashed border-gray-700 bg-gray-900/50 hover:bg-gray-800/80 hover:border-gray-600 flex items-center justify-center gap-2 text-gray-400 hover:text-gray-200 mb-4"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create Custom Scenario</span>
          </button>

          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
            Available Scenarios
          </div>

          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => {
                onSelectScenario(scenario);
                // On mobile, close sidebar after selection
                if (window.innerWidth < 768) {
                  setIsOpen(false);
                }
              }}
              className={cn(
                "w-full text-left p-3 rounded-lg transition-all duration-200 border flex flex-col gap-2",
                selectedScenario?.id === scenario.id
                  ? "bg-gray-800 border-blue-500/50 shadow-md shadow-blue-900/20"
                  : "bg-gray-900 border-transparent hover:bg-gray-800/80 hover:border-gray-700"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 shadow-inner", scenario.themeColor)}>
                  {scenario.thumbnail}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100 line-clamp-1">{scenario.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1">{scenario.tagline}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
          Powered by Vercel AI SDK
        </div>
      </div>
    </>
  );
}
