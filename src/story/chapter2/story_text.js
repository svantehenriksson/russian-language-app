
const storyFinnish = `
Luca id -yot v lift. 
V lift -e zhenshchina. 
Zhenshchina stoy -it tikh -o. 
Luca stoy -it tozhe tikh -o. 
Luca smotr -it na zhenshchin -u. 
Zhenshchina smotr -it na Luca -u. 
Luca govor -it: "Privet." 
Zhenshchina govor -it: "Privet." 
Zhenshchina ulyba -etsya. 
Luca ulyba -etsya tozhe. 
Luca sprashiva -et: "Kak teb -ya zov -ut?" 
Zhenshchina govor -it: "Aino." 
Luca: "Men -ya zov -ut Luca." 
Luca: "Ya zhiv -u na vtor -om etazh -e." 
Aino: "Ya zhiv -u etazh -om vysh -e teb -ya." 
Lift ostanavliva -etsya. 
Ding! 
Luca vykhod -it naruzhu.`;


const storyFakeEnglish = `
Luca go -es in elevator. 
In elevator -in woman. 
Woman stand -s quiet -ly. 
Luca stand -s also quiet -ly. 
Luca look -s at woman -obj. 
Woman look -s at Luca -obj. 
Luca say -s: "Hi." 
Woman say -s: "Hi." 
Woman smile -s_self. 
Luca smile -s_self also. 
Luca ask -s: "How you -obj call -they?" 
Woman say -s: "Aino." 
Luca: "Me -obj call -they Luca." 
Luca: "I live -1sg on second -in floor -in." 
Aino: "I live -1sg floor -ins higher -comp you -obj." 
Elevator stop -s_self. 
Ding! 
Luca step -s out. 
`;


const storyEnglish = `
Luca goes into the elevator.    
There is a woman in the elevator.    
The woman stands silently.    
Luca also stands silently.    
Luca looks at the woman.    
The woman looks at Luca.    
Luca says: "Hello."    
The woman says: "Hi."    
The woman smiles.    
Luca smiles as well.    
Luca asks: "What is your name?"    
The woman says: "Aino."    
Luca: "My name is Luca."    
Luca: "I live on the second floor."    
Aino: "I live upstairs from you."    
The elevator stops.    
Ding!    
Luca steps out.`;

const storySpokenFinnish = `
Лука ид -ёт в лифт. 
В лифт -е женщина. 
Женщина сто -ит тих -о. 
Лука сто -ит тоже тих -о. 
Лука смотр -ит на женщин -у. 
Женщина смотр -ит на Лука -у. 
Лука говор -ит: "Привет." 
Женщина говор -ит: "Привет." 
Женщина улыба -ется. 
Лука улыба -ется тоже. 
Лука спрашива -ет: "Как теб -я зов -ут?" 
Женщина говор -ит: "Аино." 
Лука: "Мен -я зов -ут Лука." 
Лука: "Я жив -у на втор -ом этаж -е." 
Аино: "Я жив -у этаж -ом выш -е теб -я." 
Лифт останавлива -ется. 
Ding! 
Лука выход -ит наружу.`;


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
