import React from "react";
import { Terminal } from "./components/Terminal";
import { CommandInput } from "./components/CommandInput";
import { StatusPanel } from "./components/StatusPanel";
import { CommandButtons } from "./components/CommandButtons";
import { useGameState } from "./hooks/useGameState";

export function App() {
  const { gameState, messages, processCommand } = useGameState();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-[1fr,320px] lg:gap-4 lg:h-screen lg:p-4">
        <div className="flex flex-col gap-4 p-4 lg:p-0 mb-8">
          <Terminal messages={messages} />
          <div className="space-y-4">
            <CommandButtons onCommand={processCommand} gameState={gameState} />
            <CommandInput onCommand={processCommand} />
          </div>
        </div>
        <div className="p-4 lg:p-0">
          <StatusPanel gameState={gameState} />
        </div>
      </div>
    </div>
  );
}

//max-h-[1000px]
