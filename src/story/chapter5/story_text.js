const storyFinnish = `
Töi -den jälkeen Luca on yksin kotona. 
Luca on keittiö -ssä. 
Luca katso -o kaappi -in. 
Kaapi -ssa on tee -tä ja kahvi -a. 
Kaapi -ssa on myös näkki -leipä =ä. 
Luca katso -o jää -kaappi =in. 
Jääkaapi -ssa on maito -a ja voi -ta. 
Maito on vanha -a. 
Onneksi on maito -jauhet =ta. 
Luca keittää kupi -n tee -tä. 
Luca laittaa voi -ta näkki -leiväl =le. 
Näkki -leipä maistu -u vähän oudo -lta. 
Lämmin tee maistu -u hyvä -ltä. 
Luca selaa sosiaalis -ta media -a. 
Tee -n jälkeen Luca katso -o elokuva -a. 
Elokuva -n jälkeen Luca men -ee nukku -maan. 
`; 
 
 
const storyFakeEnglish = `
Work 's after Luca is alone home. 
Luca is kitchen -in. 
Luca look -s cupboard -into. 
Cupboard -in has tea -some and coffee -some. 
Cupboard -in has also crisp bread -some. 
Luca look -s ice -cupboard -into. 
Fridge -in has milk -some and butter -some. 
Milk is old -some. 
Luckily is milk powder -some. 
Luca boils cup -a tea -of. 
Luca puts butter -some crisp bread -onto. 
Crisp bread taste -s little strange -of. 
Warm tea taste -s good -of. 
Luca browses social -some media -some. 
Tea 's after Luca watche -s movie -a. 
Movie 's after Luca goe -s sleep -into. 
`; 
 
const storyEnglish = `
After work, Luca is home alone. 
Luca is in the kitchen. 
Luca looks in the cupboard. 
There is tea and coffee in the cupboard. 
There is also crispbread in the cupboard. 
Luca looks in the fridge. 
There is milk and butter in the fridge. 
The milk is old. 
Luckily there is milk powder. 
Luca makes a cup of tea. 
Luca puts butter on the crispbread. 
The crispbread tastes a bit strange. 
The warm tea tastes good. 
Luca scrolls through social media. 
After the tea, Luca watches a movie. 
After the movie, Luca goes to sleep. 
`; 
 
const storySpokenFinnish = `
Töi -den jälkeen Luca on yksin kotona. 
Luca on keittiö -s. 
Luca katto -o kaappi -in. 
Kaapi -s on tee -tä ja kahvi -i. 
Kaapi -s on kans näkki -leipä =ä. 
Luca katto -o jää -kaappi =in. 
Jääkaapi -s on maito -o ja voi -ta. 
Maito on vanha -a. 
Onneks on maito -jauhet =ta. 
Luca keittää kupi -n tee -tä. 
Luca laittaa voi -ta näkki -leivä =l. 
Näkki -leipä maistu -u vähä oudo -lt. 
Lämmin tee maistu -u hyvä -lt. 
Luca selaa so - me -e. 
Tee -n jälkeen Luca katt -oo leffa -a. 
Leffa -n jälkeen Luca mene -e nukku -u. 
`;

const createWordArrays = () => {
  const highlightWords = storyFinnish.split(" ");
  const highlightWords2 = storyFakeEnglish.split(" ");
  const highlightWords3 = storyEnglish.split(" ");
  const highlightWords4 = storySpokenFinnish.split(" ");

  return {
    highlightWords,
    highlightWords2,
    highlightWords3,
    highlightWords4,
  };
};

export const { highlightWords, highlightWords2, highlightWords3, highlightWords4 } = createWordArrays();
