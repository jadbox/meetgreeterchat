import React from 'react';
import type { Command, GameState } from '../types/game';

interface CommandButtonsProps {
  onCommand: (command: Command) => void;
  gameState: GameState;
}

export function CommandButtons({ onCommand, gameState }: CommandButtonsProps) {
  const handleClick = (command: string) => {
    onCommand({ command, args: [] });
  };

  const handleOption = (option: string) => {
    onCommand({ command: 'option', args: [option] });
  };

  return (
    <div className="space-y-2">
      {gameState.isShiftActive && gameState.currentCase && (
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleOption('a')}
            className="bg-gray-800 hover:bg-gray-700 text-yellow-400 font-mono text-sm p-2 rounded-lg border border-gray-700 transition-colors duration-200"
            disabled={gameState.processingOption}
          >
            Option A
          </button>
          <button
            onClick={() => handleOption('b')}
            className="bg-gray-800 hover:bg-gray-700 text-yellow-400 font-mono text-sm p-2 rounded-lg border border-gray-700 transition-colors duration-200"
            disabled={gameState.processingOption}
          >
            Option B
          </button>
          <button
            onClick={() => handleOption('c')}
            className="bg-gray-800 hover:bg-gray-700 text-yellow-400 font-mono text-sm p-2 rounded-lg border border-gray-700 transition-colors duration-200"
            disabled={gameState.processingOption}
          >
            Option C
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <button
          onClick={() => handleClick('start-shift')}
          className="bg-gray-800 hover:bg-gray-700 text-green-400 font-mono text-sm p-2 rounded-lg border border-gray-700 transition-colors duration-200 flex flex-col items-center gap-1"
          disabled={gameState.isShiftActive}
        >
          <span className="font-bold">start-shift</span>
          <span className="text-xs text-gray-400">Begin shift</span>
        </button>
        <button
          onClick={() => handleClick('manual')}
          className="bg-gray-800 hover:bg-gray-700 text-green-400 font-mono text-sm p-2 rounded-lg border border-gray-700 transition-colors duration-200 flex flex-col items-center gap-1"
        >
          <span className="font-bold">manual</span>
          <span className="text-xs text-gray-400">Field manual</span>
        </button>
        <button
          onClick={() => handleClick('tip')}
          className="bg-gray-800 hover:bg-gray-700 text-green-400 font-mono text-sm p-2 rounded-lg border border-gray-700 transition-colors duration-200 flex flex-col items-center gap-1 cursor-help"
          disabled={!gameState.isShiftActive || gameState.tipRequested}
        >
          <span className="font-bold">tip</span>
          <span className="text-xs text-gray-400">Get help</span>
        </button>
        <button
          onClick={() => handleClick('status')}
          className="bg-gray-800 hover:bg-gray-700 text-green-400 font-mono text-sm p-2 rounded-lg border border-gray-700 transition-colors duration-200 flex flex-col items-center gap-1"
        >
          <span className="font-bold">status</span>
          <span className="text-xs text-gray-400">View status</span>
        </button>
      </div>
    </div>
  );
}