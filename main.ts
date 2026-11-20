#!/usr/bin/env node
// gta6-clipper-01 v2 — validate VIDEO.json and copy it to the output dir.
// Node 22, stdlib only. No network, no model calls.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_VIDEO_JSON_BYTES = 16384;
const MAX_URL_CHARS = 2048;

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, "VIDEO.json");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(root, "output");

const raw = readFileSync(src);
if (raw.length > MAX_VIDEO_JSON_BYTES) {
  throw new Error(
    `VIDEO.json is ${raw.length} bytes, over the ${MAX_VIDEO_JSON_BYTES}-byte cap`,
  );
}

const data = JSON.parse(raw.toString("utf8"));
if (typeof data.url !== "string" || !data.url.startsWith("https://")) {
  throw new Error("VIDEO.json must contain a url starting with https://");
}
let parsed;
try {
  parsed = new URL(data.url);
} catch {
  throw new Error(`VIDEO.json url is not a valid URL: ${data.url}`);
}
if (!parsed.hostname.endsWith("youtube.com") && parsed.hostname !== "youtu.be") {
  throw new Error(
    `VIDEO.json url must point at YouTube, got host ${parsed.hostname}`,
  );
}
if (data.url.length > MAX_URL_CHARS) {
  throw new Error(
    `VIDEO.json url is ${data.url.length} chars, over the ${MAX_URL_CHARS}-char cap`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "VIDEO.json"), JSON.stringify(data, null, 2) + "\n");
console.log(`OK: VIDEO.json -> ${join(outDir, "VIDEO.json")}`);
