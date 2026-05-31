import fs from "fs";
import path from "path";

const root = "c:/Users/Svante/Hacking/navigation-test-stylish";
const tmpPath = path.join(root, "tmp.txt");

function extractStoryFinnish(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const needle = "const storyFinnish = `";
  const start = text.indexOf(needle);
  if (start === -1) return "";
  const from = start + needle.length;
  const end = text.indexOf("`;", from);
  if (end === -1) return "";
  return text.slice(from, end);
}

function normalizeFinnish(text) {
  let out = text.replace(/\r\n/g, "\n");
  out = out.replace(/^\s*\d+\|\s*/gm, "");
  out = out.replace(/\s+([-=])([^\s]+)/g, "$2");
  out = out.replace(/[ \t]+\n/g, "\n");
  out = out.replace(/\n{3,}/g, "\n\n");
  return out.trim();
}

const blocks = [];
for (let chapter = 11; chapter <= 19; chapter += 1) {
  const chapterPath = path.join(root, "src", "story", `chapter${chapter}`, "story_text.js");
  if (!fs.existsSync(chapterPath)) continue;
  const raw = extractStoryFinnish(chapterPath);
  if (!raw) continue;
  blocks.push(normalizeFinnish(raw));
}

if (blocks.length === 0) {
  throw new Error("No chapter blocks extracted.");
}

const appendBlock = `\n\n${blocks.join("\n\n")}\n`;
fs.appendFileSync(tmpPath, appendBlock, "utf8");
console.log(`Appended ${blocks.length} chapters to tmp.txt`);
