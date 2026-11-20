// main.ts — validate VIDEO.json and copy it to the output directory.
// Node stdlib only. Run: node main.ts
// Output dir: $MAKEFUN_OUTPUT_DIR, or <repo>/output by default.
import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_VIDEO_JSON_BYTES = 16384;
const MAX_URL_CHARS = 2048;

const root = dirname(fileURLToPath(import.meta.url));
const videoPath = join(root, "VIDEO.json");

const stat = statSync(videoPath);
if (stat.size > MAX_VIDEO_JSON_BYTES) {
  throw new Error(
    `VIDEO.json is ${stat.size} bytes, over the ${MAX_VIDEO_JSON_BYTES} byte cap`,
  );
}

const raw = readFileSync(videoPath, "utf8");
let data;
try {
  data = JSON.parse(raw);
} catch {
  throw new Error("VIDEO.json is not valid JSON");
}
if (typeof data !== "object" || data === null || Array.isArray(data)) {
  throw new Error("VIDEO.json must be a JSON object");
}
const url = data.url;
if (typeof url !== "string" || !url.startsWith("https://")) {
  throw new Error("VIDEO.json url must be a string starting with https://");
}
if (url.length > MAX_URL_CHARS) {
  throw new Error(`VIDEO.json url is ${url.length} chars, over the ${MAX_URL_CHARS} char cap`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(root, "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "VIDEO.json"), raw);
console.log(`VIDEO.json OK (${stat.size} bytes) -> ${join(outDir, "VIDEO.json")}`);
if (url === "https://www.youtube.com/shorts/TO_BE_UPLOADED") {
  console.log("NOTE: url is still the placeholder — replace it with the real Short URL after upload.");
}
