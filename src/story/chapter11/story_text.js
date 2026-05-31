const storyFinnish = `
Luca prikhod -it domoy. 
Luca kladyot pokupk -i na stol. 
On zamecha -et, chto molok -o bezlaktozn -oe. 

Luca duma -et. 
Podkhod -it =li bezlaktozn -oe molok -o dlya panna-kott -y? 
Luca sprashiva -et u II. 
II otvecha -et: Da, bezlaktozn -oe molok -o otlichn -o podkhod -it dlya panna-kott -y. 
Luca oblegchyonn -yy. 

Luca moy -et ruk -i. 
Luca beryot misk -u. 
On naliva -et molok -o v misk -u. 
On kladyot list -y zhelatin -a v molok -o. 

Luca beryot kastryuly -u iz shkaf -a. 
Luca naliva -et slivk -i v kastryuly -u. 
On nagreva -et slivk -i. 
Slivk -i ne dolzhn -y kipet. 
Luca dobavlya -et ostaln -ye ingredient -y. 
On peremeshiva -et. 
On bystr -o ubira -et kastryuly -u s plit -y. 

Luca beryot stakan -y iz shkaf -a. 
On naliva -et panna-kott -u v stakan -y. 
Odin stakan stanov -itsya slishkom poln -ym. 
Luca probu -et iz ne -go lozhk -oy. 
Mozhet byt, ne stol khorosh -o, kak v Itali -i. 
No pochti. 
`;

const storyFakeEnglish = `
Luca come -s home. 
Luca put -s purchase -s table. 
He notice -s, that milk -o lactosefree -is. 

Luca think -s. 
Fit -s =Q lactosefree -oe milk -o for panna-cotta -GEN? 
Luca ask -s from AI. 
AI answer -s: Yes, lactosefree -oe milk -o excellent -ly fit -s for panna-cotta -GEN. 
Luca relieve -d. 

Luca wash -es hand -s. 
Luca take -s bowl. 
He pour -s milk -o into bowl -OBJ. 
He put -s sheet -s gelatin -GEN milk -o. 

Luca take -s pot -OBJ cupboard -GEN. 
Luca pour -s cream -PL into pot -OBJ. 
He heat -s cream -PL. 
Cream -PL not must -PL boil. 
Luca add -s remain -ing ingredient -s. 
He mix -es. 
He quick -ly remove -s pot -OBJ from stove -GEN. 

Luca take -s glass -PL cupboard -GEN. 
He pour -s panna-cotta -OBJ into glass -PL. 
One glass become -s too full -INS. 
Luca tast -es from it -GEN spoon -INS. 
Maybe be, not so good -ly, as in Italy -LOC. 
But almost. 
`;

const storyEnglish = `
Luca comes home. 
Luca puts the groceries on the table. 
He notices that the milk is lactose-free. 

Luca thinks. 
Is lactose-free milk good for panna cotta? 
Luca asks an AI. 
The AI answers: Yes, lactose-free milk works excellently for panna cotta. 
Luca is relieved. 

Luca washes his hands. 
Luca takes a bowl. 
He pours milk into the bowl. 
He puts the gelatin sheets into the milk. 

Luca takes a pot from the cupboard. 
Luca pours cream into the pot. 
He heats the cream. 
The cream must not boil. 
Luca adds the other ingredients. 
He stirs. 
He quickly takes the pot off the stove. 

Luca takes glasses from the cupboard. 
He pours panna cotta into the glasses. 
One glass gets too full. 
Luca tastes from it with a spoon. 
Maybe not quite as good as in Italy. 
But almost. 
`;

const storySpokenFinnish = `
Лука приход -ит домой. 
Лука кладёт покупк -и на стол. 
Он замеча -ет, что молок -о безлактозн -ое. 

Лука дума -ет. 
Подход -ит =ли безлактозн -ое молок -о для панна-котт -ы? 
Лука спрашива -ет у ИИ. 
ИИ отвеча -ет: Да, безлактозн -ое молок -о отличн -о подход -ит для панна-котт -ы. 
Лука облегчённ -ый. 

Лука мо -ет рук -и. 
Лука берёт миск -у. 
Он налива -ет молок -о в миск -у. 
Он кладёт лист -ы желатин -а в молок -о. 

Лука берёт кастрюл -ю из шкаф -а. 
Лука налива -ет сливк -и в кастрюл -ю. 
Он нагрева -ет сливк -и. 
Сливк -и не должн -ы кипеть. 
Лука добавля -ет остальн -ые ингредиент -ы. 
Он перемешива -ет. 
Он быстр -о убира -ет кастрюл -ю с плит -ы. 

Лука берёт стакан -ы из шкаф -а. 
Он налива -ет панна-котт -у в стакан -ы. 
Один стакан станов -ится слишком полн -ым. 
Лука пробу -ет из не -го ложк -ой. 
Может быть, не столь хорош -о, как в Итали -и. 
Но почти. 
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
