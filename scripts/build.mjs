import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distPath = path.join(root, "dist");

const EXCLUDE_DIRS = new Set([
  "node_modules",
  "dist",
  ".git",
  ".cursor",
]);

const EXCLUDE_FILES = new Set([
  ".DS_Store",
  "Thumbs.db",
]);

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      await copyDir(srcPath, destPath);
      continue;
    }

    if (entry.isFile()) {
      if (EXCLUDE_FILES.has(entry.name)) continue;
      await fs.copyFile(srcPath, destPath);
      continue;
    }
  }
}

await fs.rm(distPath, { recursive: true, force: true });
await copyDir(root, distPath);

console.log("Build complete → dist/");

