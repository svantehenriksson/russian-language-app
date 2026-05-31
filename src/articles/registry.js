import article1 from "./content/article1";
import article2 from "./content/article2";
import article3 from "./content/article3";
import article4 from "./content/article4";

export const articleRegistry = [
  {
    id: "article1",
    title: "Endings 1 – on, in, from etc",
    body: article1,
  },
  {
    id: "article2",
    title: "Similarities between Finnish and English",
    body: article2,
  },
  {
    id: "article3",
    title: "Olla - to be or to have - the most common word in Finnish",
    body: article3,
  },
  {
    id: "article4",
    title: "The 20 most common words in Finnish",
    body: article4,
  },
];

export const getArticleById = (id) => articleRegistry.find((entry) => entry.id === id) ?? null;
