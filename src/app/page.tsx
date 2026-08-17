'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Chat } from '@/components/Chat';
import { ScenarioEditor } from '@/components/ScenarioEditor';
import { SettingsModal } from '@/components/SettingsModal';
import { scenarios as defaultScenarios, Scenario } from '@/lib/scenarios';

export default function Home() {
  const [allScenarios, setAllScenarios] = useState<Scenario[]>(defaultScenarios);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(defaultScenarios[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [modelName, setModelName] = useState('meta-llama/llama-3.3-70b-instruct');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // Load API key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('openrouter_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSaveScenario = (savedScenario: Scenario) => {
    setAllScenarios(prev => {
      const existingIndex = prev.findIndex(s => s.id === savedScenario.id);
      if (existingIndex >= 0) {
        // Update existing
        const newArr = [...prev];
        newArr[existingIndex] = savedScenario;
        return newArr;
      }
      // Add new
      return [...prev, savedScenario];
    });
    setSelectedScenario(savedScenario);
    setIsEditing(false);
    setIsSidebarOpen(false);
  };

  const handleDeleteScenario = (id: string) => {
    setAllScenarios(prev => {
      const newArr = prev.filter(s => s.id !== id);
      // If we deleted the active scenario, select another one or null
      if (selectedScenario?.id === id) {
        setSelectedScenario(newArr.length > 0 ? newArr[0] : null);
      }
      return newArr;
    });
    setIsEditing(false);
  };

  return (
    <main className="flex h-screen bg-gray-950 overflow-hidden font-sans">
      <Sidebar
        scenarios={allScenarios}
        selectedScenario={selectedScenario}
        onSelectScenario={(scenario) => {
          setSelectedScenario(scenario);
          setIsEditing(false);
        }}
        onCreateNew={() => {
          setIsEditing(true);
          setSelectedScenario(null);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        modelName={modelName}
        setModelName={setModelName}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      {isEditing ? (
        <ScenarioEditor
          initialScenario={selectedScenario || undefined}
          onSave={handleSaveScenario}
          onDelete={handleDeleteScenario}
          onCancel={() => {
            setIsEditing(false);
            if (!selectedScenario && allScenarios.length > 0) {
              setSelectedScenario(allScenarios[0]);
            }
          }}
        />
      ) : selectedScenario ? (
        <Chat
          // We use key here to completely unmount and remount the Chat component
          // when the scenario, scenario content, or model changes, ensuring fresh useChat state.
          key={`${selectedScenario.id}-${selectedScenario.title}-${modelName}`}
          scenario={selectedScenario}
          modelName={modelName}
          apiKey={apiKey}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onEditScenario={() => setIsEditing(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a scenario to begin or create a new one.
        </div>
      )}
    </main>
  );
}
