/**
 * From current storyFinnish, emit pipe rows (one row per content line) for manual glossing.
 * Run: node scripts/chapter19-generate-identity-pipes.mjs > scripts/chapter19-fi-pipes-identity.txt
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
const body = t.slice(start, end).replace(/\r\n/g, "\n");
const lines = body.split("\n").slice(2, 112);
const out = [];
for (const line of lines) {
  const parts = line.split(" ");
  const words = parts.slice(0, -1);
  out.push(words.join("|"));
}
const dest = path.join(__dirname, "chapter19-fi-pipes-identity.txt");
fs.writeFileSync(dest, `${out.join("\n")}\n`, "utf8");
console.log("Wrote", dest, "lines", out.length);
