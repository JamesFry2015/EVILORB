import { characters, Character } from '@/lib/characters';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  selectedCharacter: Character | null;
  onSelectCharacter: (character: Character) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ selectedCharacter, onSelectCharacter, isOpen, setIsOpen }: SidebarProps) {
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
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            🎭 PersonaAI
          </h2>
          <p className="text-sm text-gray-400 mt-1">Choose your companion</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {characters.map((char) => (
            <button
              key={char.id}
              onClick={() => {
                onSelectCharacter(char);
                // On mobile, close sidebar after selection
                if (window.innerWidth < 768) {
                  setIsOpen(false);
                }
              }}
              className={cn(
                "w-full text-left p-3 rounded-lg transition-all duration-200 border flex flex-col gap-2",
                selectedCharacter?.id === char.id
                  ? "bg-gray-800 border-blue-500/50 shadow-md shadow-blue-900/20"
                  : "bg-gray-900 border-transparent hover:bg-gray-800/80 hover:border-gray-700"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 shadow-inner", char.themeColor)}>
                  {char.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100 line-clamp-1">{char.name}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1">{char.tagline}</p>
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
