import { defineConfig } from "vite";
export default defineConfig({
  esbuild: { jsx: "automatic" },
  build: { outDir: "dist" },
  server: { host: "0.0.0.0", allowedHosts: ["terminal.local"] },
});
