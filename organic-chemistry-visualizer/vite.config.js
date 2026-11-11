import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["3dmol"],
  },
  build: {
    rollupOptions: {
      external: ["3dmol"],
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/3dmol")) {
            return "vendor-3dmol";
          }
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/react-router-dom")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/lucide-react")) {
            return "vendor-ui";
          }
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
});
