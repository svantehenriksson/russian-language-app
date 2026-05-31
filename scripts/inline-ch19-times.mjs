import fs from "fs";

const src = "src/story/chapter19/words_and_start_times (5).json";
const dst = "src/story/chapter19/words_and_start_times.js";

const data = JSON.parse(fs.readFileSync(src, "utf8"));
const words = (data.words ?? []).map((w) => `  ${JSON.stringify(w)}`).join(",\n");
const startTimes = (data.startTimes ?? []).map((n) => `  ${n}`).join(",\n");

const out = `export const words = [
${words}
];

export const startTimes = [
${startTimes}
];
`;

fs.writeFileSync(dst, out, "utf8");
console.log(`Wrote ${dst} with ${data.words.length} words and ${data.startTimes.length} startTimes.`);
