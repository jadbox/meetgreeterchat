import React from "react";
import { Terminal } from "./Terminal";
import { CommandInput } from "./CommandInput";
import { StatusPanel } from "./StatusPanel";
import { CommandButtons } from "./CommandButtons";
import { useGameState } from "../hooks/useGameState";

export function App() {
  const { gameState, messages, processCommand } = useGameState();

  return (
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
  );
}