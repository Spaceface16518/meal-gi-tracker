import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const source = join(root, "public/brand/meal-signal-logo.png");

if (!existsSync(source)) {
  throw new Error(`Missing source logo: ${source}`);
}

const targets = [
  ["src/app/icon.png", 64, "png"],
  ["src/app/apple-icon.png", 180, "png"],
  ["public/apple-touch-icon.png", 180, "png"],
  ["public/icon-192.png", 192, "png"],
  ["public/icon-512.png", 512, "png"],
  ["public/icon-maskable-512.png", 512, "png"],
  ["src/app/favicon.ico", 32, "ico"],
];

for (const [relativePath, size, format] of targets) {
  const output = join(root, relativePath);
  mkdirSync(dirname(output), { recursive: true });
  copyFileSync(source, output);
  execFileSync("sips", [
    "--resampleHeightWidth",
    String(size),
    String(size),
    "--setProperty",
    "format",
    format,
    output,
  ], { stdio: "ignore" });
}
