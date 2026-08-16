'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Chat } from '@/components/Chat';
import { ScenarioEditor } from '@/components/ScenarioEditor';
import { scenarios as defaultScenarios, Scenario } from '@/lib/scenarios';

export default function Home() {
  const [allScenarios, setAllScenarios] = useState<Scenario[]>(defaultScenarios);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(defaultScenarios[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [modelName, setModelName] = useState('meta-llama/llama-3.3-70b-instruct');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      />

      {isEditing ? (
        <ScenarioEditor
          initialScenario={selectedScenario || undefined}
          onSave={handleSaveScenario}
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
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onEditScenario={() => setIsEditing(true)}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a scenario to begin or create a new one.
        </div>
      )}
    </main>
  );
}
