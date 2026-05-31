const storyFinnish = `
Boss: Dobro pozhalovat! 
Luca: Spasib -o. 
Boss i Luca pozhima -yut ruk -i. 
Boss: Men -ya zov -ut Jarkko. 
Luca: Men -ya zov -ut Luca. 
Jarkko: Khoch -esh =li kofe? 
Luca: Da, spasib -o. 
Jarkko: Ya -tozhe ber -u kofe. Ponedelnik -utro. 
Muzhchin -y ber -ut kofe iz avtomat -a. 
Iz avtomat -a id -yot gromk -iy zvuk: surrrr. 
Luca: Zdes ochen malo lyud -ey. 
Jarkko: Gibrid -rabota. 
Luca: Aha. 
Jarkko: U men -ya est perv -aya zadach -a dlya teb -ya. 
Luca: Kak -aya zadach -a? 
Jarkko: Iskusstvenn -yy intellekt =proekt. Dlya klient -a v Ruoholakht -i. 
Luca: Kak dobrat -sya do Ruoholakht -i? 
Jarkko: Vozmi tramvay. Ili kompani -i elektr -velosiped. Na nyom zimn -ie shin =y. 
`;

const storyFakeEnglish = `
Boss: Welcome -imp! 
Luca: Thank -you. 
Boss and Luca shake -they hand -s. 
Boss: Me -obj call -they Jarkko. 
Luca: Me -obj call -they Luca. 
Jarkko: Want -you =Q coffee? 
Luca: Yes, thank -you. 
Jarkko: I -too take -I coffee. Monday -morning. 
Men -s take -they coffee from machine -of. 
From machine -of go -es loud -ish sound: surrrr. 
Luca: Here very few people -of. 
Jarkko: Hybrid -work. 
Luca: Aha. 
Jarkko: At me -obj is first -ish task -a for you -obj. 
Luca: What -ish task -a? 
Jarkko: Artificial -ish intelligence =project. For client -a in Ruoholahti -in. 
Luca: How get -self to Ruoholahti -in? 
Jarkko: Take tram. Or company -of electric -bike. On it winter -s tire =s. 
`;

const storyEnglish = `
Boss: Welcome! 
Luca: Thanks. 
The boss and Luca shake hands. 
Boss: I'm Jarkko. 
Luca: I'm Luca. 
Jarkko: Do you want coffee? 
Luca: Yes, please. 
Jarkko: I will have coffee too. Monday morning. 
The men take coffee from the machine. 
The machine makes a loud sound: brrrr. 
Luca: There are very few people here. 
Jarkko: Hybrid work. 
Luca: Aha. 
Jarkko: I have your first task. 
Luca: What task? 
Jarkko: An artificial intelligence project. For a client in Ruoholahti. 
Luca: How do I get to Ruoholahti? 
Jarkko: Take the tram. Or the company's electric bike. It has winter tires. 
`;

const storySpokenFinnish = `
Босс: Добро пожаловать! 
Лука: Спасиб -о. 
Босс и Лука пожима -ют рук -и. 
Босс: Мен -я зов -ут Яркко. 
Лука: Мен -я зов -ут Лука. 
Яркко: Хоч -ешь =ли кофе? 
Лука: Да, спасиб -о. 
Яркко: Я -тоже бер -у кофе. Понедельник -утро. 
Мужчин -ы бер -ут кофе из автомат -а. 
Из автомат -а ид -ёт громк -ий звук: surrrr. 
Лука: Здесь очень мало люд -ей. 
Яркко: Гибрид -работа. 
Лука: Ага. 
Яркко: У мен -я есть перв -ая задач -а для теб -я. 
Лука: Как -ая задач -а? 
Яркко: Искусственн -ый интеллект =проект. Для клиент -а в Руохолахт -и. 
Лука: Как добрат -ься до Руохолахт -и? 
Яркко: Возьми трамвай. Или компани -и электр -велосипед. На нём зимн -ие шин =ы. 
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
