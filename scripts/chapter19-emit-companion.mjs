/**
 * Emit grammar.js, quiz_questions.js, words_and_start_times.js for chapter 19.
 * Run: node scripts/chapter19-emit-companion.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const storyPath = path.join(root, "src/story/chapter19/story_text.js");
const t = fs.readFileSync(storyPath, "utf8");

function extract(name) {
  const needle = `const ${name} = \``;
  const start = t.indexOf(needle) + needle.length;
  const end = t.indexOf("`;", start);
  return t.slice(start, end).replace(/\r\n/g, "\n");
}

const enBody = extract("storyEnglish");
const enLines = enBody.split("\n").slice(2, 112);

if (enLines.length !== 110) {
  console.error("Expected 110 English lines, got", enLines.length);
  process.exit(1);
}

/** Indices align with enLines (same order as storyFinnish content lines). */
const extraNotes = {
  0: `Sunday -na is the essive of "Sunday": "on Sunday."`,
  8: `Kadu -i =lla: plural adessive, "on the streets."`,
  14: `Pesu -tuva =n: genitive of pesutupa (laundry room).`,
  25: `Siivous -tarvikke =ita: partitive plural, cleaning supplies.`,
  27: `Vaatte -i =lle: plural allative, "for clothes."`,
  48: `Naapuri: leads direct speech (neighbor's line).`,
  62: `Sängy -n alta: "from under the bed" (elative of "under").`,
  73: `Astio -i =ta: partitive plural of astia (dishes).`,
  86: `Mikä ohjelma? — which (washing) program?`,
  94: `Vaate -t ovat märk -iä: plural predicative with ovat.`,
};

const grammarNotes = enLines.map((line, i) => {
  const text = extraNotes[i] ?? "No grammar notes for this line yet.";
  const safe = text.replace(/`/g, "'");
  const comment = line.trimEnd().replace(/\s+/g, " ");
  return `  \`${safe}\`, // ${comment}`;
});

fs.writeFileSync(
  path.join(root, "src/story/chapter19/grammar.js"),
  `export const grammarNotes = [\n${grammarNotes.join("\n")}\n];\n`,
  "utf8",
);

const quizQuestions = [
  { fi: "Siivota", answer: "To clean", options: ["To clean", "To cook", "To sleep"] },
  { fi: "Imuri", answer: "Vacuum cleaner", options: ["Vacuum cleaner", "Mop", "Bucket"] },
  { fi: "Loska", answer: "Slush", options: ["Slush", "Ice", "Fog"] },
  { fi: "Pesutupa", answer: "Laundry room", options: ["Laundry room", "Bathroom", "Garage"] },
  { fi: "Komero", answer: "Cupboard / closet", options: ["Cupboard / closet", "Window", "Radiator"] },
  { fi: "Matto", answer: "Rug / mat", options: ["Rug / mat", "Curtain", "Lamp"] },
  { fi: "Mattopiiska", answer: "Rug beater", options: ["Rug beater", "Broom", "Dustpan"] },
  { fi: "Pöly", answer: "Dust", options: ["Dust", "Soap", "Paint"] },
  { fi: "Tiskikone", answer: "Dishwasher", options: ["Dishwasher", "Microwave", "Fridge"] },
  { fi: "Pesukone", answer: "Washing machine", options: ["Washing machine", "Dryer only", "Oven"] },
  { fi: "Kuivausrumpu", answer: "Dryer (tumble dryer)", options: ["Dryer (tumble dryer)", "Fan", "Heater"] },
  { fi: "Astiat", answer: "Dishes", options: ["Dishes", "Groceries", "Towels"] },
  { fi: "Haarukka", answer: "Fork", options: ["Fork", "Spoon", "Plate"] },
  { fi: "Lusikka", answer: "Spoon", options: ["Spoon", "Knife", "Glass"] },
  { fi: "Veitsi", answer: "Knife", options: ["Knife", "Fork", "Pot"] },
  { fi: "Tiskiaine", answer: "Dish detergent", options: ["Dish detergent", "Shampoo", "Toothpaste"] },
  { fi: "Pesujauhe", answer: "Laundry powder / detergent", options: ["Laundry powder / detergent", "Salt", "Sugar"] },
  { fi: "Riepu", answer: "Rag / cloth", options: ["Rag / cloth", "Shoe", "Hat"] },
  { fi: "Sieni", answer: "Sponge", options: ["Sponge", "Brush", "Bucket"] },
  { fi: "Hylly", answer: "Shelf", options: ["Shelf", "Door", "Floor"] },
  { fi: "Parveke", answer: "Balcony", options: ["Balcony", "Basement", "Attic"] },
  { fi: "Naapuri", answer: "Neighbor", options: ["Neighbor", "Landlord", "Courier"] },
  { fi: "Susikoira", answer: "Husky / wolf-dog", options: ["Husky / wolf-dog", "Cat", "Rabbit"] },
  { fi: "Tuulettaa", answer: "To air out / ventilate", options: ["To air out / ventilate", "To seal", "To wallpaper"] },
  { fi: "Sammuttaa", answer: "To turn off / switch off", options: ["To turn off / switch off", "To break", "To buy"] },
  { fi: "Ohjelma", answer: "Program (wash cycle)", options: ["Program (wash cycle)", "Remote", "Channel"] },
  { fi: "Rumpu", answer: "Drum (of a machine)", options: ["Drum (of a machine)", "Wheel", "Bell"] },
  { fi: "Allas", answer: "Sink / basin", options: ["Sink / basin", "Stove", "Oven"] },
  { fi: "Tyytyväinen", answer: "Satisfied / content", options: ["Satisfied / content", "Angry", "Confused"] },
  { fi: "Siisti", answer: "Tidy / neat", options: ["Tidy / neat", "Broken", "Empty"] },
  { fi: "Likainen", answer: "Dirty", options: ["Dirty", "Expensive", "Heavy"] },
  { fi: "Kellari", answer: "Cellar / basement", options: ["Cellar / basement", "Roof", "Attic"] },
  { fi: "Ostoslista", answer: "Shopping list", options: ["Shopping list", "Recipe", "Invoice"] },
  { fi: "Ravistaa", answer: "To shake", options: ["To shake", "To fold", "To iron"] },
  { fi: "Aivastaa", answer: "To sneeze", options: ["To sneeze", "To cough", "To yawn"] },
  { fi: "Kuume", answer: "Fever / temperature", options: ["Fever / temperature", "Cough", "Rash"] },
  { fi: "Räntä", answer: "Sleet", options: ["Sleet", "Hail", "Thunder"] },
  { fi: "Värillinen", answer: "Colored", options: ["Colored", "Invisible", "Wooden"] },
  { fi: "Märkä", answer: "Wet", options: ["Wet", "Dry", "Hot"] },
  { fi: "Raskas", answer: "Heavy", options: ["Heavy", "Light", "Soft"] },
  { fi: "Melkein", answer: "Almost", options: ["Almost", "Never", "Always"] },
  { fi: "Sattumalta", answer: "By chance / at random", options: ["By chance / at random", "On purpose", "Tomorrow"] },
  { fi: "Edelleen", answer: "Still", options: ["Still", "Already", "Never"] },
  { fi: "Käsin", answer: "By hand", options: ["By hand", "By machine", "By mail"] },
  { fi: "Ärsyttävä", answer: "Annoying", options: ["Annoying", "Pleasant", "Silent"] },
  { fi: "Rauhoittava", answer: "Calming / soothing", options: ["Calming / soothing", "Loud", "Dangerous"] },
  { fi: "Äänekäs", answer: "Noisy / loud", options: ["Noisy / loud", "Quiet", "Dark"] },
  { fi: "Hätä", answer: "Emergency / worry (ei hätää = no worries)", options: ["Emergency / worry (ei hätää = no worries)", "Party", "Gift"] },
  { fi: "Kiltti", answer: "Kind / gentle", options: ["Kind / gentle", "Mean", "Shy"] },
  { fi: "Vakavasti", answer: "Seriously", options: ["Seriously", "Quickly", "Quietly"] },
  { fi: "Piiskata", answer: "To beat (a rug)", options: ["To beat (a rug)", "To bake", "To call"] },
  { fi: "Imuroida", answer: "To vacuum", options: ["To vacuum", "To mop", "To paint"] },
  { fi: "Siivoustarvike", answer: "Cleaning supply", options: ["Cleaning supply", "Food item", "Tool"] },
  { fi: "Pölypussi", answer: "Dust bag (for vacuum)", options: ["Dust bag (for vacuum)", "Trash bag", "Wallet"] },
  { fi: "Täynnä", answer: "Full", options: ["Full", "Empty", "Open"] },
  { fi: "Ulos", answer: "Out / outside", options: ["Out / outside", "Upstairs", "Inside"] },
  { fi: "Sisään", answer: "Inside / in", options: ["Inside / in", "Outside", "Under"] },
  { fi: "Valmis", answer: "Ready / finished", options: ["Ready / finished", "Broken", "Lost"] },
  { fi: "Väsynyt", answer: "Tired", options: ["Tired", "Hungry", "Angry"] },
  { fi: "Puhdas", answer: "Clean", options: ["Clean", "Dirty", "Old"] },
  { fi: "Raikas", answer: "Fresh", options: ["Fresh", "Stale", "Sour"] },
  { fi: "Televisio", answer: "Television / TV", options: ["Television / TV", "Radio", "Phone"] },
  { fi: "Lattia", answer: "Floor", options: ["Floor", "Ceiling", "Wall"] },
  { fi: "Sohva", answer: "Sofa / couch", options: ["Sofa / couch", "Table", "Chair"] },
  { fi: "Ikkuna", answer: "Window", options: ["Window", "Door", "Wall"] },
  { fi: "Keittiö", answer: "Kitchen", options: ["Kitchen", "Bedroom", "Hallway"] },
  { fi: "Asunto", answer: "Apartment / flat", options: ["Apartment / flat", "Office", "Shop"] },
  { fi: "Hissi", answer: "Elevator / lift", options: ["Elevator / lift", "Stairs", "Escalator"] },
  { fi: "Varata", answer: "To reserve / book", options: ["To reserve / book", "To cancel", "To forget"] },
  { fi: "Palata", answer: "To return / go back", options: ["To return / go back", "To leave", "To hide"] },
  { fi: "Maksaa", answer: "To pay", options: ["To pay", "To steal", "To borrow"] },
  { fi: "Ostaa", answer: "To buy", options: ["To buy", "To sell", "To rent"] },
  { fi: "Siirtää", answer: "To move / transfer", options: ["To move / transfer", "To break", "To hide"] },
  { fi: "Laittaa", answer: "To put / place", options: ["To put / place", "To throw away", "To break"] },
  { fi: "Lisätä", answer: "To add", options: ["To add", "To remove", "To break"] },
  { fi: "Tarvita", answer: "To need", options: ["To need", "To refuse", "To forget"] },
  { fi: "Lähteä", answer: "To leave / go (from)", options: ["To leave / go (from)", "To arrive", "To stay"] },
  { fi: "Mahduta", answer: "To fit", options: ["To fit", "To break", "To melt"] },
  { fi: "Pyyhkiä", answer: "To wipe", options: ["To wipe", "To polish metal only", "To sew"] },
  { fi: "Miettiä", answer: "To think / wonder", options: ["To think / wonder", "To shout", "To dig"] },
  { fi: "Muistaa", answer: "To remember", options: ["To remember", "To forget", "To guess"] },
  { fi: "Huokaa", answer: "To sigh", options: ["To sigh", "To sing", "To swim"] },
  { fi: "Törmätä", answer: "To bump / collide", options: ["To bump / collide", "To agree", "To float"] },
  { fi: "Ylettää", answer: "To reach (far enough)", options: ["To reach (far enough)", "To drop", "To sell"] },
  { fi: "Kulua", answer: "To pass (time)", options: ["To pass (time)", "To break", "To boil"] },
  { fi: "Näyttää", answer: "To look / seem", options: ["To look / seem", "To hear", "To smell"] },
  { fi: "Muki", answer: "Mug", options: ["Mug", "Bucket", "Pan"] },
  { fi: "Penkki", answer: "Bench", options: ["Bench", "Carpet", "Lamp"] },
  { fi: "Lasi", answer: "Glass (drinkware)", options: ["Glass (drinkware)", "Window only", "Mirror"] },
  { fi: "Kuppi", answer: "Cup", options: ["Cup", "Bowl", "Tray"] },
  { fi: "Kattila", answer: "Pot", options: ["Pot", "Pan lid", "Tray"] },
  { fi: "Paistinpannu", answer: "Frying pan", options: ["Frying pan", "Cutting board", "Kettle"] },
];

const quizOut = quizQuestions.slice(0, 73);
const qq = `export const quizQuestions = [\n${quizOut.map((q) => `  { fi: ${JSON.stringify(q.fi)}, answer: ${JSON.stringify(q.answer)}, options: ${JSON.stringify(q.options)} }`).join(",\n")}\n];\n`;
fs.writeFileSync(path.join(root, "src/story/chapter19/quiz_questions.js"), qq, "utf8");

const enFlat = enLines.join("").replace(/\s+/g, " ").trim();
const words = enFlat.split(" ").map((w) => ` ${w}`);
const step = 0.42;
const startTimes = words.map((_, i) => Math.round((i * step + Number.EPSILON) * 100) / 100);
const wjs = `export const words = [\n${words.map((w) => JSON.stringify(w)).join(",\n")}\n];\n\nexport const startTimes = [\n${startTimes.map((x) => `  ${x}`).join(",\n")}\n];\n`;
fs.writeFileSync(path.join(root, "src/story/chapter19/words_and_start_times.js"), wjs, "utf8");

console.log("grammar lines", grammarNotes.length, "quiz", quizOut.length, "words", words.length);
