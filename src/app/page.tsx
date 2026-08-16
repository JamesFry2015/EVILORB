'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Chat } from '@/components/Chat';
import { CreateScenarioForm } from '@/components/CreateScenarioForm';
import { scenarios as defaultScenarios, Scenario } from '@/lib/scenarios';

export default function Home() {
  const [allScenarios, setAllScenarios] = useState<Scenario[]>(defaultScenarios);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(defaultScenarios[0]);
  const [isCreating, setIsCreating] = useState(false);
  const [modelName, setModelName] = useState('meta-llama/llama-3.3-70b-instruct');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCreateScenario = (newScenario: Scenario) => {
    setAllScenarios([...allScenarios, newScenario]);
    setSelectedScenario(newScenario);
    setIsCreating(false);
    setIsSidebarOpen(false);
  };

  return (
    <main className="flex h-screen bg-gray-950 overflow-hidden font-sans">
      <Sidebar
        scenarios={allScenarios}
        selectedScenario={selectedScenario}
        onSelectScenario={(scenario) => {
          setSelectedScenario(scenario);
          setIsCreating(false);
        }}
        onCreateNew={() => {
          setIsCreating(true);
          setSelectedScenario(null);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        modelName={modelName}
        setModelName={setModelName}
      />

      {isCreating ? (
        <CreateScenarioForm
          onSave={handleCreateScenario}
          onCancel={() => {
            setIsCreating(false);
            if (allScenarios.length > 0) setSelectedScenario(allScenarios[0]);
          }}
        />
      ) : selectedScenario ? (
        <Chat
          // We use key here to completely unmount and remount the Chat component
          // when the scenario or model changes, ensuring fresh useChat state.
          key={`${selectedScenario.id}-${modelName}`}
          scenario={selectedScenario}
          modelName={modelName}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a scenario to begin or create a new one.
        </div>
      )}
    </main>
  );
}
