import React, { useState, KeyboardEvent } from 'react';
import type { Command } from '../types/game';

interface CommandInputProps {
  onCommand: (command: Command) => void;
}

export function CommandInput({ onCommand }: CommandInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parts = input.trim().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    onCommand({ command, args });
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-gray-800 text-green-400 font-mono p-2 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
        placeholder="Enter command..."
        spellCheck={false}
        autoComplete="off"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
        Press Enter to submit
      </div>
    </form>
  );
}