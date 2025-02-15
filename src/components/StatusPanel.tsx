import React from 'react';
import { Syringe, Clipboard, Clock, Heart } from 'lucide-react';
import type { GameState } from '../types/game';

interface StatusPanelProps {
  gameState: GameState;
}

export function StatusPanel({ gameState }: StatusPanelProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-4">
      <div className="space-y-2">
        <h2 className="text-green-400 font-mono text-sm">MASH 4077 Status</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-700 p-2 rounded">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs">Shift Time</span>
            </div>
            <span className="text-lg font-bold">{formatTime(gameState.shiftTime)}</span>
          </div>
          <div className="bg-gray-700 p-2 rounded">
            <div className="flex items-center gap-2 text-red-400 mb-1">
              <Heart className="w-4 h-4" />
              <span className="text-xs">Lives Saved</span>
            </div>
            <span className="text-lg font-bold">{gameState.savedLives}</span>
          </div>
        </div>
      </div>

      {gameState.currentCase && (
        <div>
          <h2 className="text-green-400 font-mono text-sm mb-2">Current Case</h2>
          <div className="bg-gray-700 p-2 rounded">
            <div className="text-sm font-semibold text-yellow-400">{gameState.currentCase.title}</div>
            <div className="text-xs text-gray-300 mt-1">Choose your treatment option carefully!</div>
            <img 
              src="https://m.media-amazon.com/images/M/MV5BODhmMmFkNjQtNDBhOS00ZjZiLWI0Y2ItZjE5YmNmNDRjZjU5XkEyXkFqcGc@._V1_.jpg"
              alt="Patient"
              className="w-full h-auto mt-2 rounded"
              style={{ maxWidth: '320px' }}
            />
          </div>
        </div>
      )}

      <div>
        <h2 className="text-green-400 font-mono text-sm mb-2">Medical Supplies</h2>
        <div className="space-y-1">
          {gameState.supplies.map(supply => (
            <div
              key={supply.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <Syringe className="w-4 h-4 text-blue-400" />
                <span>{supply.name}</span>
              </div>
              <span className="text-gray-400">{supply.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      {gameState.tipRequested && gameState.tipTimer && (
        <div className="bg-gray-700 p-2 rounded">
          <div className="text-yellow-400 text-sm">Consulting Colonel Potter...</div>
          <div className="text-xs text-gray-400">Time remaining: {gameState.tipTimer}s</div>
        </div>
      )}

      {gameState.processingOption && (
        <div className="bg-gray-700 p-2 rounded">
          <div className="text-yellow-400 text-sm">Attempting treatment...</div>
          <div className="text-xs text-gray-400">Time remaining: {gameState.optionTimer}s</div>
        </div>
      )}
    </div>
  );
}