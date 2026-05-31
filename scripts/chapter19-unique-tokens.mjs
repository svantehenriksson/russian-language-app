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
const tokens = body.split(" ");
const u = [...new Set(tokens)].sort();
const out = path.join(__dirname, "chapter19-unique-tokens.txt");
fs.writeFileSync(out, u.join("\n"), "utf8");
console.log("Wrote", u.length, "tokens to", out);
