import { defineConfig } from "vite";
import type { Plugin } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import { execFileSync } from "node:child_process";
import path from "path";

function gitValue(args: string[]) {
  try {
    return execFileSync("git", args, { cwd: __dirname, encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function githubTreeUrl(remoteUrl: string, commitHash: string) {
  const match = remoteUrl.match(/github\.com[:/](.+?)(?:\.git)?$/);
  return match ? `https://github.com/${match[1]}/tree/${commitHash}` : "";
}

function commitInfoPlugin(): Plugin {
  const commitHash = gitValue(["rev-parse", "HEAD"]);
  const shortCommitHash = gitValue(["rev-parse", "--short", "HEAD"]);
  const remoteUrl = gitValue(["remote", "get-url", "origin"]);
  const commitUrl = commitHash ? githubTreeUrl(remoteUrl, commitHash) : "";

  return {
    name: "meal-signal-commit-info",
    config() {
      return {
        define: {
          __APP_COMMIT_HASH__: JSON.stringify(shortCommitHash),
          __APP_COMMIT_URL__: JSON.stringify(commitUrl),
        },
      };
    },
  };
}

export default defineConfig({
  plugins: [commitInfoPlugin(), solidPlugin(), tailwindcss()],
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
