import fs from "fs";
const t = fs.readFileSync("src/story/chapter18/story_text.js", "utf8");
for (const name of ["storyFinnish"]) {
  const needle = `const ${name} = \``;
  const start = t.indexOf(needle);
  const from = start + needle.length;
  const end = t.indexOf("`;", from);
  const body = t.slice(from, end);
  const lines = body.split("\n");
  console.log(name, "lines", lines.length, "nonempty", lines.filter((l) => l.trim()).length);
}
