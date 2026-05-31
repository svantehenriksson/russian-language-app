const storyFinnish = `
Luca tule -e koti -in. 
Luca laitta -a ostok -set pöydä -lle. 
Hän huoma -a, että maito on laktoosi -ton. 

Luca mietti -i. 
On -ko laktoosi -ton maito hyvä pannacotta -an. 
Luca kysy -y teko -äly =ltä. 
Teko -äly vasta -a: Kyllä, laktoosi -ton maito sopi -i erinomaise -sti pannacotta =an. 
Luca on helpottu -nut. 

Luca pese -e käde -t. 
Luca ottaa kulho -n. 
Hän kaata -a maito -a kulho -on. 
Hän laitta -a liivate -lehde =t maito -on. 

Luca ottaa kattila -n kaapi -sta. 
Luca kaata -a kerma -a kattila -an. 
Hän kuumenta -a kerma -a. 
Kerma ei saa kiehu -a. 
Luca lisä -ä muu -t ainekse -t. 
Hän sekoitta -a. 
Hän ottaa nopea -sti kattila -n pois levy -ltä. 

Luca ottaa lase -ja kaapi -sta. 
Hän kaata -a pannacotta -a lasei -hin. 
Yksi lasi tule -e liian täytee -n. 
Luca maista -a sii -tä lusika -lla. 
Ei ehkä yhtä hyvä -ä kuin Italia -ssa. 
Mutta melkein. 
`;

const storyFakeEnglish = `
Luca come -s home -to. 
Luca put -s purchase -s table -onto. 
He notice -s, that milk is lactose -free. 

Luca think -s. 
Is -? lactose -free milk good panna_cotta -for. 
Luca ask -s artificial -intelligence =from. 
Artificial -intelligence answer -s: Yes, lactose -free milk fit -s excellent -ly panna_cotta -for. 
Luca is relieve -d. 

Luca wash -es hand -s. 
Luca takes bowl -a. 
He pour -s milk -some bowl -into. 
He put -s gelatin -leaf =s milk -into. 

Luca takes pot -the cupboard -from. 
Luca pour -s cream -some pot -into. 
He heat -s cream -some. 
Cream not may boil -to. 
Luca add -s other -s ingredient -s. 
He mix -es. 
He takes quick -ly pot -the away stove -from. 

Luca takes glass -es cupboard -from. 
He pour -s panna_cotta -some glasses -into. 
One glass come -s too full -into. 
Luca taste -s it -from spoon -with. 
Not maybe equally good -some than Italy -in. 
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
Luca tule -e koti -in. 
Luca laitta -a ostok -set pöydä -lle. 
Se huoma -a, et maito on laktoosi -ton. 

Luca mietti -i. 
On -ks laktoosi -ton maito hyvä pannacotta -an. 
Luca kysy -y teko -äly =lt. 
Teko -äly vasta -a: Joo, laktoosi -ton maito sopi -i erinomas -esti pannacotta =an. 
Luca on helpottu -nu. 

Luca pese -e käde -t. 
Luca ottaa kulho -n. 
Se kaata -a maito -o kulho -on. 
Se laitta -a liivate -lehde =t maito -on. 

Luca ottaa kattila -n kaapi -st. 
Luca kaata -a kerma -a kattila -an. 
Se kuumenta -a kerma -a. 
Kerma ei saa kiehu -u. 
Luca lisä -ä muu -t ainekse -t. 
Se sekotta -a. 
Se ottaa nopee -sti kattila -n pois levy -lt. 

Luca ottaa lase -i kaapi -st. 
Se kaata -a pannacotta -a lasei -hin. 
Yks lasi tule -e liian täytee -n. 
Luca maista -a sii -t lusika -l. 
Ei ehkä yht hyvä -ä ku Italia -s. 
Mut melkein. 
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

