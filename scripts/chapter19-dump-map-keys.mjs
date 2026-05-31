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
const tokens = [...new Set(body.split(" "))].sort();
let s = "export const FE = {\n";
for (const tok of tokens) {
  const k = JSON.stringify(tok);
  s += `  ${k}: ${k},\n`;
}
s += "};\n";
fs.writeFileSync(path.join(__dirname, "chapter19-fe-stub.mjs"), s, "utf8");
console.log("Wrote chapter19-fe-stub.mjs keys", tokens.length);
