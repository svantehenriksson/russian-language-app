/**
 * Utility: extract storyFinnish body and report space-token count.
 * Run: node scripts/chapter19-extract-tokens.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storyPath = path.join(__dirname, "../src/story/chapter19/story_text.js");
const t = fs.readFileSync(storyPath, "utf8");
const needle = "const storyFinnish = `";
const start = t.indexOf(needle) + needle.length;
const end = t.indexOf("`;", start);
const body = t.slice(start, end);
const tokens = body.split(" ");
console.log("Space tokens:", tokens.length);
console.log("First 12:", tokens.slice(0, 12));
console.log("Sample newline token:", tokens.find((x) => x.includes("\n")));
