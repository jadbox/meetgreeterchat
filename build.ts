// Build client bundle
await Bun.build({
  entrypoints: ["./src/main.tsx"],
  outdir: "./public",
  minify: true,
  splitting: false,
  target: "browser"
});

// Copy CSS
Bun.write("public/styles.css", Bun.file("src/index.css"));
