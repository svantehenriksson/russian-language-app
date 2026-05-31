const storyFinnish = `
Posle rabot -y Luca odin doma. 
Luca na kukhn -e. 
Luca smotr -it v shkaf. 
V shkaf -u est chay i kofe. 
V shkaf -u est tozhe khrust -khleb. 
Luca smotr -it v kholod -ilnik. 
V kholod -ilnik -e est molok -o i masl -o. 
Molok -o star -oe. 
K schastyu est sukh -oe molok -o. 
Luca zavariva -et chashk -u chay -a. 
Luca klad -yot masl -o na khrust -khleb. 
Khrust -khleb kazh -etsya nemnog -o strann -ym. 
Tyoplyy chay kazh -etsya khorosh -im. 
Luca lista -et sotsialn -ye medi -a. 
Posle chay -a Luca smotr -it film. 
Posle film -a Luca id -yot spat. 
`; 
 
 
const storyFakeEnglish = `
After work -of Luca alone at_home. 
Luca in kitch -en. 
Luca look -s into cupboard. 
In cupboard -in is tea and coffee. 
In cupboard -in is also crisp -bread. 
Luca look -s into cold -cupboard. 
In cold -cupboard -in is milk -o and butter -o. 
Milk -o old -is. 
To luck is dry -ish milk -o. 
Luca brew -s cup -obj tea -of. 
Luca put -s butter -o on crisp -bread. 
Crisp -bread seem -s_self a_little -o strange -as. 
Warm tea seem -s_self good -as. 
Luca scroll -s social -plural media -plural. 
After tea -of Luca watch -s movie. 
After movie -of Luca go -es sleep. 
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
После работ -ы Лука один дома. 
Лука на кухн -е. 
Лука смотр -ит в шкаф. 
В шкаф -у есть чай и кофе. 
В шкаф -у есть тоже хруст -хлеб. 
Лука смотр -ит в холод -ильник. 
В холод -ильник -е есть молок -о и масл -о. 
Молок -о стар -ое. 
К счастью есть сух -ое молок -о. 
Лука заварива -ет чашк -у чай -а. 
Лука клад -ёт масл -о на хруст -хлеб. 
Хруст -хлеб каж -ется немног -о странн -ым. 
Тёплый чай каж -ется хорош -им. 
Лука листа -ет социальн -ые меди -а. 
После чай -а Лука смотр -ит фильм. 
После фильм -а Лука ид -ёт спать. 
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
