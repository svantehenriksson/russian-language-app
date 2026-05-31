# Story Text Translation Specification

## Purpose
Define exact structure and translation behavior for chapter story files.

## File Scope
Applies only to chapter content files under: `src/story/chapter*/`

## Required Chapter Files
When `storyFinnish` appears, the chapter must include:
- `story_text.js`
- `grammar.js`
- `quiz_questions.js`
- `words_and_start_times.js`

## `story_text.js` Requirements

### Required Arrays
- `storyFinnish`
- `storyFakeEnglish`
- `storyEnglish`
- `storySpokenFinnish`

### Line Alignment
- All arrays must have the same number of lines.
- Line `N` in every array must correspond to the same content unit.
- Preserve original line order from `storyFinnish`.

### Translation Rules

#### `storyFakeEnglish` (over-literal)
- Translate line by line from `storyFinnish`.
- Preserve Finnish word-part structure as literally as possible.
- Represent suffixes/parts in English with explicit part mapping style.
- Use hyphen and apostrophe conventions shown in existing chapters.
- Examples of style:
  - `talo -ssa` -> `house -in`
  - `jää -kieko =n` -> `ice -hockey -'s`

Translate meaning, don't "explain" unless necessary

Examples:

- `Kari -n auto` -> `Kari -'s car` (NOT `Kari - GEN car`)
- `Kolme auto -a` -> `Three car -s` (NOT `Three car -PL`)

Even for partitive and accusative forms, we have following types of translations options.

Examples:

- `Luca juo kahvi -a` -> `Luca drinks coffee -some`
- `Kissa katso -o koira -a` -> `Cat look -s dog -some`
- `Koira söi keksi -n` -> `Dog ate biscuit -one`

#### `storyEnglish` (natural)
- Translate each line into natural, idiomatic English.
- Keep meaning faithful to the source line while sounding normal.
- Maintain strict line-by-line correspondence with `storyFinnish`.

#### `storySpokenFinnish` (part-exact spoken mapping)
- Convert `storyFinnish` into spoken Finnish line by line.
- Central rule: each word or word-part in `storyFinnish` must have an exact corresponding spoken form unit.
- If a source word is split into multiple parts, preserve equivalent part segmentation in spoken output.
- Do not collapse multiple source parts into one spoken part if it breaks one-to-one correspondence.

### Punctuation and Spacing (Strict)
- Every string line in all story arrays must end with exactly one trailing space.
- The trailing space comes after final punctuation (for example `.`, `?`, `!`, `?!`).

## `grammar.js` Requirements
- Export `grammarNotes` array.
- Count grammar notes by rendered sentence, not by raw line.
- Sentence splitting follows punctuation (`.`, `?`, `!`), so one note per sentence.
- Default placeholder note text:
  - `No grammar notes for this line yet.`
- You can add actual grammar notes to some of the lines if you want, but add only stuff like:
  - for a verb that's not completely common, like for example juosta add juosta = to run \n Minä juoksen = I run \n Sinä juokset = You run \n Hän juoksee = He/she runs .., or for a noun like koira you can add koira = dog \n kaksi koiraa = two dogs. koiria = dogs (indefinite plural). Just very basic dictionary-like notes, no deep insight.
- Add a comment after each note with the corresponding storyFinnish source sentence.

## `quiz_questions.js` Requirements
- Export `quizQuestions` array.
- Provide questions for all words that appear to be new.
- Prioritize the most difficult/advanced words in the chapter (best-guess selection is acceptable).
- There should be roughly 2 words per 3 lines as a main rule. So a 30-line story gets 20 items in quiz.
- Each item must include:
  - `fi`
  - `answer`
  - `options` (3 options total, includes the answer)

## `words_and_start_times.js` Requirements
- Export `words` array and `startTimes` array.
- `words` should be a good-best-guess narration token list for the chapter.
- `startTimes` should be a good-best-guess ascending timeline aligned to `words`.

## Consistency
- Keep capitalization, names, and entities consistent across arrays/files.
- Keep terminology choices consistent within a chapter.

## Canonical Examples
Use earlier chapters as style references for:
- over-literal morphology mapping in `storyFakeEnglish`
- natural phrasing in `storyEnglish`
- part-exact mapping style in `storySpokenFinnish`
- grammar note formatting with sentence comments
- quiz item structure and option style
- words + start-time export format

## Quick Manual Checklist (before marking chapter done)
- `story_text.js`, `grammar.js`, `quiz_questions.js`, `words_and_start_times.js` all exist.
- In `story_text.js`, line mapping is 1:1 across all four arrays.
- `storyFakeEnglish` is explicitly over-literal and part-preserving.
- `storyEnglish` is natural and idiomatic.
- `storySpokenFinnish` preserves exact word/part correspondence.
- Every line in story arrays ends with exactly one trailing space after final punctuation.
- `grammarNotes` count matches rendered sentence count.
- `quizQuestions` contains a number of items about 2/3 of the amount of sentence lines in storyFinnish.
- `startTimes` is ascending and plausibly aligned to `words`.
