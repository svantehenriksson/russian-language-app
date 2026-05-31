/**
 * Validate space-token parity for chapter 19 story arrays.
 * Run: node scripts/chapter19-align-translations.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storyPath = path.join(__dirname, "../src/story/chapter19/story_text.js");

function extract(name, src) {
  const needle = `const ${name} = \``;
  const start = src.indexOf(needle);
  if (start === -1) return null;
  const from = start + needle.length;
  const end = src.indexOf("`;", from);
  return src.slice(from, end).replace(/\r\n/g, "\n");
}

const src = fs.readFileSync(storyPath, "utf8");
const fi = extract("storyFinnish", src);
const fe = extract("storyFakeEnglish", src);
const sf = extract("storySpokenFinnish", src);
const en = extract("storyEnglish", src);

if (!fi || !fe || !sf || !en) {
  console.error("Missing one or more story blocks in story_text.js");
  process.exit(1);
}

const a = fi.split(" ").length;
const b = fe.split(" ").length;
const c = sf.split(" ").length;
const d = en.split(" ").length;

console.log("Token counts (split on space):");
console.log("  storyFinnish:", a);
console.log("  storyFakeEnglish:", b, b === a ? "OK" : "MISMATCH");
console.log("  storySpokenFinnish:", c, c === a ? "OK" : "MISMATCH");
console.log("  storyEnglish:", d, "(may differ)");

const li = fi.split("\n").length;
const le = en.split("\n").length;
console.log("Newline line counts:", li, le, li === le ? "OK" : "MISMATCH");

if (a !== b || a !== c || li !== le) process.exit(1);
