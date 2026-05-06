import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distPath = path.join(root, "dist");

await fs.rm(distPath, { recursive: true, force: true });
console.log("Cleaned dist/");

