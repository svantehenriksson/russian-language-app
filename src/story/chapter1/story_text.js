const storyFinnish = `
Luca v aeroport -e. 
Luca ustal -yy. 
Luca pyot kofe. 
Kofe dorog -oy. 
Kofe nemnog -o strann -yy. 
No kofe pomoga -et. 
Finn -y pyut eto kazhd -yy den? 
Luca ishch -et avtobus. 
Avtobus prikhod -it. 
Voditel ne govor -it po-angliysk -i. 
Voditel ne govor -it nichego. 
Luca govor -it: "Privet." 
Voditel ne govor -it nichego. 
Na ulitse id -yot sneg. 
Mnogo sneg -a. 
Kholodn -o. 
Ochen kholodn -o. 
Sneg krasiv -yy. 
Luca ulyba -etsya. 
Eto Finlyandiya.`;

const storyFakeEnglish = `
Luca in airport -in. 
Luca tired -is. 
Luca drink -s coffee. 
Coffee expensive -is. 
Coffee a_little -of strange -is. 
But coffee help -s. 
Finn -s drink this every -y day? 
Luca search -s bus. 
Bus arrive -s. 
Driver not speak -s English -ly. 
Driver not speak -s nothing. 
Luca speak -s: "Hi." 
Driver not speak -s nothing. 
On street go -es snow. 
Many snow -of. 
Cold -ly. 
Very cold -ly. 
Snow beautiful -is. 
Luca smile -s_self. 
This Finland.
`;

const storyEnglish = `
Luca is at the airport. 
Luca is tired. 
Luca drinks coffee. 
The coffee is expensive. 
The coffee is a bit strange. 
But the coffee helps. 
Finns drink this every day? 
Luca is looking for the bus. 
The bus arrives. 
The driver doesn't speak English. 
The driver doesn't say anything. 
Luca says: "Hi." 
The driver doesn't say anything. 
It's snowing outside. 
A lot of snow. 
It's cold. 
Really cold. 
The snow is beautiful. 
Luca smiles. 
This is Finland.`;

const storySpokenFinnish = `
Лука в аэропорт -е. 
Лука устал -ый. 
Лука пьёт кофе. 
Кофе дорог -ой. 
Кофе немного странн -ый. 
Но кофе помога -ет. 
Финн -ы пьют это кажд -ый день? 
Лука ищ -ет автобус. 
Автобус приход -ит. 
Водитель не говор -ит по-английск -и. 
Водитель не говор -ит ничего. 
Лука говор -ит: "Привет." 
Водитель не говор -ит ничего. 
На улице ид -ёт снег. 
Много снег -а. 
Холодн -о. 
Очень холодн -о. 
Снег красив -ый. 
Лука улыба -ется. 
Это Финляндия.`;


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
