# Morpheme Splitting Spec (Pre-Translation)

This step is done **before** any translation work.

Use it when preparing `storyFinnish` text in chapter files (for example `src/story/chapter*/story_text.js`).

## Purpose

Split Finnish words into rough stem + ending chunks so later translation/parsing steps can read the endings reliably. Note that stem doesn't mean that you should convert the stem to basic form.

## Required Formatting Rules

1. Put a space before every split marker `-` when it introduces an ending.
2. If a word has two endings/parts, mark the second split with `=` instead of another `-`.
3. Use `=` splitting only in:
   - `storyFinnish` arrays
   - `storySpokenFinnish` arrays in translations
4. `storyFakeEnglish` uses only `-` splits (no `=`).
5. Keep consistent spacing around split markers, following existing chapter style.
6. Add one trailing space at the end of every non-empty story line.
7. Do not add translations in this step.

## Secondary Split Rule (`=`)

- First split in a word: `-`
- Second split in the same word: `=`

Examples:

- `kuohukermaa` -> `kuohu -kerma =a`
- `leivontahyllyllä` -> `leivonta -hylly =llä`

## Over-Splitting Guardrails

Do not split too eagerly. Prefer readable, useful splits over theoretical ones.

- Keep words intact when splitting is not clearly helpful.
- Example: `paljon` should stay `paljon` (not `paljo -n`).
- If a word is in basic form, do not force unnecessary splits.
- Example: do not automatically change `ottaa` to `otta -a` unless there is a clear reason in context. `Hän otta -a` should be split, because it's part of `Minä ota -n`, `Sinä ota -t` and `otta -a` is just coincidentally the same basic form again. But if you have `voi -n ottaa`, `on hyvä ottaa` etc, the word `ottaa` is and should be in basic form.

## Core Pattern

- Correct: `Seuraava -na päivä -nä Luca on taas toimisto -lla. `
- Wrong: `Seuraava-na päivä-nä Luca on taas toimisto-lla.`

so mind the gap.

- Correct: `Pankissa on ihmisiä` -> `Panki -ssa on ihmi -siä.`
- Wrong: `Pankissa on ihmisiä` `Pankki -ssa on ihminen -siä.`

so don't change the words back to basic form, or morph them in any other way. Only split according to morphemes.

I mean it, do NOT change the stem back to basic form, only split:

- Correct: `Kaduilla on loskaa` ->  `Kadu -i =lla on loska -a`
- Wrong: `Kaduilla on loskaa` ->  `Katu -i =lla on loska -a`

so do not change kadu-... back to katu-... if the word is conjugated.

- Correct: `vaatteille` -> `vaatte -i =lle.`
- Wrong: `vaatteille` -> `vaate -i =lle.`

so don't change vaatte-... back to vaate... if the word is conjugated. Only split.

## Example Lines

Use this style:

`Seuraava -na päivä -nä Luca on taas toimisto -lla. `

`On perjantai. `

`Luca mietti -i, mitä tek -isi viikon -loppu =na. `

`Hän saa viesti -n. `

## Scope Notes

- This is a first-pass morphological split, not a strict linguistic analysis.
- Accuracy can be refined later, but spacing rules must be consistent now because downstream processing depends on them.
