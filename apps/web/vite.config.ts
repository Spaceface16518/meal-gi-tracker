import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("/firebase/") || id.includes("@firebase")) {
            return "firebase";
          }

          if (id.includes("/solid-js/") || id.includes("/vite-plugin-solid/")) {
            return "solid";
          }

          if (id.includes("/lucide-solid/")) {
            return "icons";
          }

          return "vendor";
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
