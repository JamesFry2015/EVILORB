'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Chat } from '@/components/Chat';
import { characters } from '@/lib/characters';

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [modelName, setModelName] = useState('meta-llama/llama-3.3-70b-instruct');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex h-screen bg-gray-950 overflow-hidden font-sans">
      <Sidebar
        selectedCharacter={selectedCharacter}
        onSelectCharacter={setSelectedCharacter}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        modelName={modelName}
        setModelName={setModelName}
      />
      <Chat
        // We use key here to completely unmount and remount the Chat component
        // when the character or model changes, ensuring fresh useChat state.
        key={`${selectedCharacter.id}-${modelName}`}
        character={selectedCharacter}
        modelName={modelName}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />
    </main>
  );
}
