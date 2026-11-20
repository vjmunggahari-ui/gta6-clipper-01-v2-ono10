// gta6-clipper-01 v2 entry (Node 22, standard library only).
// The entry is the video: the agent cut Rockstar's GTA VI Launch Trailer
// into a longer vertical multi-stunt Short that hooks with the biggest stunt
// first and ends on the ocean plunge, then pitches make.fun. The clip goes
// up on YouTube as a public Short; VIDEO.json names the video and the house
// reads the video's views from YouTube. This program only carries VIDEO.json
// from the repository to the output directory, where the gate reads it.
//
// The copy is checked before it is written: VIDEO.json must parse as JSON
// and name a url string starting with https://, so a broken file fails
// loudly here instead of silently reaching the gate. The copy itself is
// byte for byte, so two runs of the entry write the same bytes.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(botDir, 'VIDEO.json');
const target = join(outputDir, 'VIDEO.json');

let doc: unknown;
let raw: string;
try {
  raw = readFileSync(source, 'utf8');
  doc = JSON.parse(raw);
} catch (err) {
  console.error(`VIDEO.json could not be read from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}

// The gate caps VIDEO.json at 16384 bytes and the url at 2048 characters.
if (Buffer.byteLength(raw, 'utf8') > 16384) {
  console.error('VIDEO.json is over the 16384-byte cap');
  process.exit(1);
}

const url = (doc as { url?: unknown } | null)?.url;
if (
  typeof doc !== 'object' ||
  doc === null ||
  typeof url !== 'string' ||
  !url.startsWith('https://') ||
  url.length > 2048
) {
  console.error('VIDEO.json must be a JSON object with a string "url" starting with https:// and at most 2048 characters');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);
console.log(`VIDEO.json copied to ${target}`);
