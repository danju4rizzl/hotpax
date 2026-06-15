import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point "hotpax" to the parent package's dist output
      hotpax: resolve(__dirname, "../dist/index.mjs"),
      // Force peer dependencies to resolve to the preview project's node_modules
      // to prevent resolution failures in environments without root node_modules
      "lucide-react": resolve(__dirname, "./node_modules/lucide-react"),
      "react": resolve(__dirname, "./node_modules/react"),
      "react-dom": resolve(__dirname, "./node_modules/react-dom"),
    },
  },
  server: {
    port: 4000,
    open: true,
  },
});
