import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // Externalize peer deps — they must come from the consumer's project
  external: ["react", "react-dom", "lucide-react"],
  // Ensure JSX is handled correctly
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
