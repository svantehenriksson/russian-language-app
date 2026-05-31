import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storyPath = path.join(__dirname, "../src/story/chapter19/story_text.js");
let t = fs.readFileSync(storyPath, "utf8");
const needle = "const storyFinnish = `";
const start = t.indexOf(needle) + needle.length;
const end = t.indexOf("`;", start);
let body = t.slice(start, end);
body = body.replace(/\r\n/g, "\n");
const lines = body.split("\n");
const content = lines.slice(2, -1); // drop leading empties? 
// body is \n\n + lines + maybe trailing; split \n gives ['', '', 'Sunnuntai...', ..., last]
console.log("total split lines", lines.length);
for (let i = 0; i < lines.length; i++) {
  const n = lines[i].split(" ").length;
  if (lines[i] === "" && i < 4) console.log(i, "empty", n);
  if (i >= 2 && i < 8) console.log(i, n, lines[i].slice(0, 70));
}
const toks = body.split(" ");
console.log("global tokens", toks.length);
console.log("first token", JSON.stringify(toks[0]));
console.log("token 9", JSON.stringify(toks[9]));
