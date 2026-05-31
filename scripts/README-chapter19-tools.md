# Chapter 19 / story alignment utilities

These scripts help verify and rebuild `story_text.js` when `storyFinnish`, `storyFakeEnglish`, and `storySpokenFinnish` must share the **same number of space-separated tokens** (see `createWordArrays` in `story_text.js`).

| Script | Purpose |
|--------|---------|
| `chapter19-extract-tokens.mjs` | Print total space-token count and sample tokens from `storyFinnish`. |
| `chapter19-line-token-lengths.mjs` | Per-line `split(" ").length` (debug line breaks). |
| `chapter19-fingerprint-lines.mjs` | LF-normalized line/token fingerprint. |
| `chapter19-align-translations.mjs` | **Validates** that FI / fake-EN / spoken-Finnish bodies match token counts; run after edits. |
| `emit-chapter19-story.mjs` | **Builds** `story_text.js`: keeps `storyFinnish`, generates `storyFakeEnglish` + `storySpokenFinnish` via token maps, injects natural `storyEnglish` lines. |
| `chapter19-emit-companion.mjs` | Writes `grammar.js`, `quiz_questions.js`, `words_and_start_times.js` for chapter 19. |
| `chapter19-fe-stub.mjs` | Auto-generated map keys (from `chapter19-dump-map-keys.mjs`) — useful when extending token coverage. |

**Workflow:** Tune `LEX` / `SUF` / `EQ` / `EN_LINES` in `emit-chapter19-story.mjs` → `node scripts/chapter19-emit-story.mjs` → `node scripts/chapter19-align-translations.mjs`. Adjust companion data in `chapter19-emit-companion.mjs` → `node scripts/chapter19-emit-companion.mjs`.

**Root `tmp-*.mjs` files:** Quick checks (sentence count, token count, line splits). Keep them if you like the one-off checks, or fold anything useful into this `scripts/` folder later—we did **not** delete them.
