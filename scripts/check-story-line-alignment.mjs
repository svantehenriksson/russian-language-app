import fs from "fs/promises";
import path from "path";

const rootDir = path.resolve(process.cwd());
const storyRoot = path.join(rootDir, "src", "story");

const targetChapters = process.argv.slice(2);

const templateNames = ["storyFinnish", "storyFakeEnglish", "storySpokenFinnish"];

const extractTemplate = (source, name) => {
  const pattern = new RegExp(`const\\s+${name}\\s*=\\s*\`([\\s\\S]*?)\`;`);
  const match = source.match(pattern);
  if (!match) {
    return null;
  }
  return match[1];
};

const toLines = (templateContent) =>
  templateContent
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().length > 0);

const tokenCount = (line) => line.trim().split(/\s+/).length;

const chapterSort = (a, b) => a.localeCompare(b, undefined, { numeric: true });

const getChapterDirs = async () => {
  const entries = await fs.readdir(storyRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("chapter"))
    .map((entry) => entry.name)
    .sort(chapterSort);
};

const runForChapter = async (chapterName) => {
  const storyTextPath = path.join(storyRoot, chapterName, "story_text.js");
  const source = await fs.readFile(storyTextPath, "utf8");

  const extracted = {};
  for (const name of templateNames) {
    const content = extractTemplate(source, name);
    if (content === null) {
      return {
        chapterName,
        errors: [`Missing template string: ${name}`],
      };
    }
    extracted[name] = toLines(content);
  }

  const errors = [];
  const [fiLines, fakeLines, spokenLines] = [
    extracted.storyFinnish,
    extracted.storyFakeEnglish,
    extracted.storySpokenFinnish,
  ];

  if (!(fiLines.length === fakeLines.length && fiLines.length === spokenLines.length)) {
    errors.push(
      `Line count mismatch: storyFinnish=${fiLines.length}, storyFakeEnglish=${fakeLines.length}, storySpokenFinnish=${spokenLines.length}`,
    );
  }

  const minLen = Math.min(fiLines.length, fakeLines.length, spokenLines.length);
  for (let i = 0; i < minLen; i += 1) {
    const fiCount = tokenCount(fiLines[i]);
    const fakeCount = tokenCount(fakeLines[i]);
    const spokenCount = tokenCount(spokenLines[i]);

    if (!(fiCount === fakeCount && fiCount === spokenCount)) {
      errors.push(
        `Line ${i + 1} token mismatch: storyFinnish=${fiCount}, storyFakeEnglish=${fakeCount}, storySpokenFinnish=${spokenCount}`,
      );
    }
  }

  return { chapterName, errors };
};

const run = async () => {
  const allChapters = await getChapterDirs();
  const chapters =
    targetChapters.length > 0 ? allChapters.filter((name) => targetChapters.includes(name)) : allChapters;

  if (chapters.length === 0) {
    console.error("No matching chapters found.");
    process.exitCode = 1;
    return;
  }

  const results = await Promise.all(chapters.map(runForChapter));
  const failed = results.filter((result) => result.errors.length > 0);

  if (failed.length === 0) {
    console.log(`Line alignment check passed for ${chapters.length} chapter(s).`);
    return;
  }

  console.error("Line alignment mismatches found:");
  for (const result of failed) {
    console.error(`\n${result.chapterName}`);
    for (const err of result.errors) {
      console.error(`  - ${err}`);
    }
  }
  process.exitCode = 1;
};

run().catch((error) => {
  console.error("Line alignment script failed:", error);
  process.exitCode = 1;
});
