import { useState, useEffect, useRef } from 'react';
import { cn } from './Sidebar';

interface OpenRouterModel {
  id: string;
  name: string;
  pricing: {
    prompt: string;
    completion: string;
  };
  context_length: number;
}

interface ModelAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function ModelAutocomplete({ value, onChange, placeholder = "Search for a model...", className }: ModelAutocompleteProps) {
  const [models, setModels] = useState<OpenRouterModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchModels = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://openrouter.ai/api/v1/models');
        if (response.ok) {
          const data = await response.json();
          setModels(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch models:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModels();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filteredModels = models.filter((model) =>
    model.id.toLowerCase().includes(value.toLowerCase()) ||
    model.name.toLowerCase().includes(value.toLowerCase())
  ).slice(0, 50); // Limit to 50 for performance

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={isLoading ? "Loading models..." : placeholder}
        className={cn("w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500", className)}
      />

      {isOpen && filteredModels.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredModels.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => {
                onChange(model.id);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 outline-none transition-colors border-b border-gray-100 dark:border-gray-800/50 last:border-0"
            >
              <div className="font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-1">{model.id}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1 flex gap-2">
                <span>{model.name}</span>
                <span className="text-gray-400 dark:text-gray-600 border-l border-gray-300 dark:border-gray-700 pl-2">{(model.context_length / 1000).toFixed(0)}k context</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
