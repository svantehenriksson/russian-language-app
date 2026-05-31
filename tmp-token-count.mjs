import fs from "fs";
const t = fs.readFileSync("src/story/chapter19/story_text.js", "utf8");
const needle = `const storyFinnish = \``;
const start = t.indexOf(needle) + needle.length;
const end = t.indexOf("`;", start);
const fi = t.slice(start, end);
const tokens = fi.split(" ");
console.log("space split length", tokens.length);
console.log("nonempty tokens", tokens.filter(Boolean).length);
