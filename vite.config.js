import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { loadEnv } from "vite";
import { generateChemistryReply } from "./api/chemistryChatCore.js";

const readJsonBody = (request) =>
  new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      {
        name: "local-chemistry-chat-api",
        configureServer(server) {
          server.middlewares.use("/api/chemistry-chat", async (request, response) => {
            if (request.method !== "POST") {
              response.statusCode = 405;
              response.setHeader("Content-Type", "application/json");
              response.end(JSON.stringify({ error: "Method not allowed" }));
              return;
            }

            try {
              const body = await readJsonBody(request);
              const reply = await generateChemistryReply(body, env);
              response.statusCode = 200;
              response.setHeader("Content-Type", "application/json");
              response.end(JSON.stringify({ reply }));
            } catch (error) {
              response.statusCode = error.status || 500;
              response.setHeader("Content-Type", "application/json");
              response.end(JSON.stringify({ error: error.message || "Chemistry chat failed" }));
            }
          });
        }
      },
      react(),
      tailwindcss()
    ],
    resolve: {
      dedupe: ["react", "react-dom", "react-router-dom", "framer-motion", "three", "@react-three/fiber", "@react-three/drei"],
      alias: {
        react: fileURLToPath(new URL("./node_modules/react", import.meta.url)),
        "react-dom": fileURLToPath(new URL("./node_modules/react-dom", import.meta.url)),
        "react-router-dom": fileURLToPath(new URL("./node_modules/react-router-dom", import.meta.url)),
        "framer-motion": fileURLToPath(new URL("./node_modules/framer-motion", import.meta.url)),
        three: fileURLToPath(new URL("./node_modules/three", import.meta.url)),
        "@react-three/fiber": fileURLToPath(new URL("./node_modules/@react-three/fiber", import.meta.url)),
        "@react-three/drei": fileURLToPath(new URL("./node_modules/@react-three/drei", import.meta.url)),
        "lucide-react": fileURLToPath(new URL("./node_modules/lucide-react", import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ["3dmol"],
    },
    server: {
      fs: {
        allow: [".."],
      },
    },
    build: {
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/three") || id.includes("@react-three")) return "vendor-3d";
            if (id.includes("node_modules/react") || id.includes("react-router-dom")) return "vendor-react";
            if (id.includes("node_modules/framer-motion") || id.includes("lucide-react")) return "vendor-ui";
          },
        },
      },
    },
  };
});
