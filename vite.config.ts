
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { nodePolyfills } from "./src/vite-node-polyfill";
import type { Plugin, ConfigEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    server: {
      host: "::",
      port: 3000,
    },
    plugins: [
      react(),
      nodePolyfills() as Plugin,
      mode === 'development' ? componentTagger() : null,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
