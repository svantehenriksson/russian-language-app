import fs from "fs";
const t = fs.readFileSync("src/story/chapter19/story_text.js", "utf8");
const m = t.match(/const storyFinnish = `([\s\S]*?)`;/);
const s = m[1];
const endsSentence = (token) => /[.!?]["”']?$/.test(token);
const words = s.split(/\s+/).filter(Boolean);
let c = 0;
for (const w of words) if (endsSentence(w)) c += 1;
console.log("tokens", words.length, "sentences", c);
