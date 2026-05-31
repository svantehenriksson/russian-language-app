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
const lines = body.split(/\r?\n/);
console.log("lines", lines.length);
lines.forEach((line, i) => {
  const parts = line.split(" ");
  if (line.length === 0 && i < 3) console.log(i, "EMPTY", "parts", parts.length);
  if (i >= 2 && i <= 5) console.log(i, "parts", parts.length, JSON.stringify(line.slice(0, 60)));
});
