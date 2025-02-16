import { renderToReadableStream } from "react-dom/server";
import { App } from "./src/App";
import { GameStateProvider } from "./src/hooks/useGameState";

const server = Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(req) {
    const url = new URL(req.url);
    
    // Serve built assets
    if (url.pathname.startsWith("/public/")) {
      return new Response(Bun.file(`./public${url.pathname}`));
    }

    // Server render the app
    const stream = await renderToReadableStream(
      <html>
        <head>
          <meta charset="UTF-8" />
          <link rel="stylesheet" href="/public/styles.css" />
        </head>
        <body>
          <div id="root">
            <GameStateProvider>
              <App />
            </GameStateProvider>
          </div>
          <script src="/public/main.js" async defer></script>
        </body>
      </html>
    );

    return new Response(stream, {
      headers: { "Content-Type": "text/html" }
    });
  }
});
