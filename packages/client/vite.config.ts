import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ports } from "constant";

/**
 * Vite config.
 */
export default defineConfig(() => ({
  build: {
    outDir: "./dist",
  },
  plugins: [react()],
  server: {
    port: ports.dev.client,
  },
}));
