import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Run config with a local writable cache dir.
export default defineConfig(() => ({
  cacheDir: ".vite-cache-run",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
