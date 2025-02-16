import { hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { GameStateProvider } from "./hooks/useGameState";

hydrateRoot(
  document.getElementById("root")!,
  <GameStateProvider>
    <App />
  </GameStateProvider>
);
