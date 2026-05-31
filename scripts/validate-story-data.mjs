import fs from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

const rootDir = path.resolve(process.cwd());
const storyDir = path.join(rootDir, "src", "story");

const isChapterDir = (name) => name.startsWith("chapter");

const formatList = (items) => items.map((item) => `  - ${item}`).join("\n");

const loadModule = async (filePath) => {
  const fileUrl = pathToFileURL(filePath).href;
  return import(fileUrl);
};

const validateChapter = async (chapterName) => {
  const chapterDir = path.join(storyDir, chapterName);
  const storyPath = path.join(chapterDir, "story_text.js");
  const timesPath = path.join(chapterDir, "words_and_start_times.js");
  const errors = [];
  const warnings = [];

  try {
    await fs.access(storyPath);
  } catch {
    errors.push(`Missing story_text.js in ${chapterName}`);
  }

  try {
    await fs.access(timesPath);
  } catch {
    errors.push(`Missing words_and_start_times.js in ${chapterName}`);
  }

  if (errors.length) {
    return { chapterName, errors, warnings };
  }

  const storyModule = await loadModule(storyPath);
  const timesModule = await loadModule(timesPath);

  const highlightWords = storyModule.highlightWords;
  const highlightWords2 = storyModule.highlightWords2;
  const highlightWords4 = storyModule.highlightWords4;

  const words = timesModule.words;
  const startTimes = timesModule.startTimes;

  if (!Array.isArray(highlightWords)) {
    errors.push("highlightWords is missing or not an array");
  }
  if (!Array.isArray(highlightWords2)) {
    errors.push("highlightWords2 is missing or not an array");
  }
  if (!Array.isArray(highlightWords4)) {
    errors.push("highlightWords4 is missing or not an array");
  }
  if (!Array.isArray(words)) {
    errors.push("words is missing or not an array");
  }
  if (!Array.isArray(startTimes)) {
    errors.push("startTimes is missing or not an array");
  }

  if (errors.length) {
    return { chapterName, errors, warnings };
  }

  const counts = {
    highlightWords: highlightWords.length,
    highlightWords2: highlightWords2.length,
    highlightWords4: highlightWords4.length,
    words: words.length,
    startTimes: startTimes.length,
  };

  if (
    counts.highlightWords !== counts.highlightWords2 ||
    counts.highlightWords !== counts.highlightWords4
  ) {
    errors.push(
      `Story word count mismatch: highlightWords=${counts.highlightWords}, ` +
        `highlightWords2=${counts.highlightWords2}, highlightWords4=${counts.highlightWords4}`,
    );
  }

  if (counts.words !== counts.startTimes) {
    errors.push(
      `Audio word count mismatch: words=${counts.words}, startTimes=${counts.startTimes}`,
    );
  }

  if (
    counts.words !== counts.highlightWords ||
    counts.startTimes !== counts.highlightWords
  ) {
    errors.push(
      `Story vs audio mismatch: highlightWords=${counts.highlightWords}, ` +
        `words=${counts.words}, startTimes=${counts.startTimes}`,
    );
  }

  const badWords = words.filter((w) => String(w).trim() === "");
  if (badWords.length > 0) {
    warnings.push(`Audio words contain ${badWords.length} empty tokens.`);
  }

  const nonNumberTimes = startTimes.filter(
    (t) => typeof t !== "number" || Number.isNaN(t),
  );
  if (nonNumberTimes.length > 0) {
    errors.push(`startTimes contains ${nonNumberTimes.length} invalid entries.`);
  }

  for (let i = 1; i < startTimes.length; i += 1) {
    if (typeof startTimes[i] !== "number" || typeof startTimes[i - 1] !== "number") {
      continue;
    }
    if (startTimes[i] < startTimes[i - 1]) {
      errors.push(`startTimes is not monotonically increasing at index ${i}.`);
      break;
    }
  }

  return { chapterName, errors, warnings };
};

const run = async () => {
  const entries = await fs.readdir(storyDir, { withFileTypes: true });
  const chapters = entries
    .filter((entry) => entry.isDirectory() && isChapterDir(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (chapters.length === 0) {
    console.error("No chapter directories found in src/story.");
    process.exitCode = 1;
    return;
  }

  const results = await Promise.all(chapters.map(validateChapter));
  const failures = results.filter((result) => result.errors.length > 0);
  const warnings = results.filter((result) => result.warnings.length > 0);

  if (failures.length > 0) {
    console.error("Story data validation failed:");
    failures.forEach((result) => {
      console.error(`\n${result.chapterName}`);
      console.error(formatList(result.errors));
    });
  } else {
    console.log("Story data validation passed.");
  }

  if (warnings.length > 0) {
    console.warn("\nWarnings:");
    warnings.forEach((result) => {
      console.warn(`\n${result.chapterName}`);
      console.warn(formatList(result.warnings));
    });
  }

  if (failures.length > 0) {
    process.exitCode = 1;
  }
};

run().catch((error) => {
  console.error("Validation script failed:", error);
  process.exitCode = 1;
});
