# Russian Story Translation Notes (Agent Guide)

## Scope
Use these notes when translating chapter content in `src/story/chapter*/`, especially:
- `story_text.js`
- `grammar.js`
- `quiz_questions.js`
- `words_and_start_times.js`

The source baseline is:
- ready Finnish sentence lines
- ready natural English lines

The target for Russian chapters is:
- `storyFinnish` -> Russian in Latin transliteration
- `storySpokenFinnish` -> Russian in Cyrillic
- `storyFakeEnglish` -> over-literal morpheme mapping from `storyFinnish`
- `storyEnglish` -> natural English (keep meaning aligned)

## Core Goal
Keep strict one-to-one alignment between:
- `storyFinnish` (Latin Russian)
- `storyFakeEnglish`
- `storySpokenFinnish` (Cyrillic Russian)

Alignment must hold per line and per token/morpheme segment.

## Required `story_text.js` Arrays
- `storyFinnish`
- `storyFakeEnglish`
- `storyEnglish`
- `storySpokenFinnish`

## Translation Workflow
1. Start from existing Finnish + English source lines.
2. Write `storyFinnish` as Russian transliteration (Latin).
3. Add morpheme splits in `storyFinnish` where pedagogically useful.
4. Build `storySpokenFinnish` as exact Cyrillic mirror of `storyFinnish`.
5. Build `storyFakeEnglish` as explicit morpheme-level gloss of `storyFinnish`.
6. Keep `storyEnglish` natural and line-faithful.
7. Validate line/token alignment with helper script.

## `quiz_questions.js` Rule (Russian `fi` Field)
For `src/story/chapter*/quiz_questions.js`:
- Translate each `fi` value from Finnish to Russian.
- Store Russian in **Latin first, Cyrillic second**, using this exact format:
  - `latin - кириллица`
  - example: `dvernoy zvonok - дверной звонок`
- A simple direct translation is enough for now.
- Keep existing `answer` and `options` as they are unless explicitly requested otherwise.
- No consistency/alignment checks are required for quiz entries at this stage.

## Grammar Notes Rule (Lean)
- Keep grammar notes very short.
- For any split/conjugated form in a sentence (for example `aeroport -e`, `ustal -yy`, `govor -it`), include the base dictionary form in the corresponding grammar note.
- Prefer minimal dictionary-style mapping:
  - `govorit = to speak`
  - `govor-it = speaks`
- Add extra grammar insight only sparingly and only when clearly useful.
- Do not add long paradigm dumps unless explicitly requested.

## Morpheme Split Policy (Russian)
Split only where it helps learning and can be mirrored consistently:
- adjective endings: `krasiv -yy`
- noun case endings: `sneg -a`
- verb endings: `govor -it`, `ulyba -etsya`
- adverb/adjective endings where useful: `kholodn -o`

Do not over-split roots/prefixes unless needed.
Do not split in one array and leave unsplit in matching arrays.

## Mirror Rule for Cyrillic
`storySpokenFinnish` must preserve the same token boundaries as `storyFinnish`.

Example:
- Latin: `Luca gov or -it` (bad if inconsistent)
- Cyrillic must match exactly token-for-token.

Good pattern:
- `Luca govor -it ...`
- `Лука говор -ит ...`

## `storyFakeEnglish` Rule
Use over-literal grammatical mapping that mirrors token boundaries.

Examples:
- `krasiv -yy` -> `beautiful -is`
- `govor -it` -> `speak -s`
- `sneg -a` -> `snow -of`

Prefer consistency over perfect idiomatic English in this array.

## Spacing and Punctuation
- Keep one source sentence per line in all four arrays.
- Preserve line order across arrays.
- End each line with punctuation plus one trailing space.

## Validation
Use:
- `npm run validate:story-lines -- chapterN`

This checks line-by-line token count equality across:
- `storyFinnish`
- `storyFakeEnglish`
- `storySpokenFinnish`

Fix mismatches immediately before further chapter edits.

## Quality Checklist
- Same number of non-empty lines across arrays.
- Same token count per corresponding line (for aligned arrays).
- Cyrillic transliteration mapping is faithful to Latin line.
- Natural English line meaning still matches.
- Names/entities are consistent in the chapter.
