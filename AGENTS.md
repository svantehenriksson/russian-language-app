# Agent Instructions

## Scope
These instructions apply to the whole repository.

## Russian fork

In this version, we're learning Russian. Therefore the main part of the development involves simply translating formerly Finnish words and sentences to Russian ones.

We'll replace spoken Finnish with Cyrillic Russian.

## Story Chapter Translation Rules
For chapter story files under `src/story/chapter*/story_text.js`, follow the dedicated specification in `STORY_TEXT_TRANSLATION_SPEC.md`.

When a chapter includes `storyFinnish`, create and maintain all required story arrays and companion chapter files exactly as defined in the spec:
- `story_text.js`
- `grammar.js`
- `quiz_questions.js`
- `words_and_start_times.js`
