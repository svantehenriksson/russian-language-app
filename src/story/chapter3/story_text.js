

const storyFinnish = `
U Luca -y kholodn -o. 
Luca id -yot v odezhd -magazin. 
Prodavets: Privet! Kak mog -u pomoch? 
Luca: U men -ya kholodn -o. 
Prodavets: Rekomendu -yu dlinn -ye kalson -y. 
Luca: Rekomendu -esh dlinn -ye kalson -y? 
Prodavets: Da. Kak kalsony, no dlinn -ye. Oni vyglyad -yat kak leggings -i. 
Luca: Muzhsk -ie leggings -y. 
Prodavets: I tvoy kurtk -a tonk -aya. Kupi zimn -yu kurtk -u. 
Luca: Gde zimn -ie kurtk -i? 
Prodavets: Pryam -o vperyod i nalev -o. 
Luca: Spasib -o. 
Luca nakhod -it chyorn -uyu zimn -yu kurtk -u. 
Prodavets: Eto vsyo? 
Luca: Eto vsyo. 
Prodavets: Kupi yeshchyo shapk -u. 
Luca: Okei, shapk -u yeshchyo. 
Prodavets: Chyorn -aya ili bel -aya? 
Luca: Bel -aya. 
Prodavets: 238 evro -a, spasib -o. 
Luca plat -it kart -oy. 
Prodavets: Khoch -esh ==li chek? 
Luca: Da, spasib -o. 
Prodavets: A plastikov -yy paket =odin? 
Luca: Net, spasib -o. 
Luca: Spasib -o! Poka poka. 
Prodavets: Spasib -o! Poka poka.
`;

const storyFakeEnglish = `
At Luca -dat cold -ly. 
Luca go -es to clothing -store. 
Seller: Hi! How can -I help? 
Luca: At me -obj cold -ly. 
Seller: Recommend -I long -ones longjohn -s. 
Luca: Recommend -you long -ones longjohn -s? 
Seller: Yes. Like longjohns, but long -ones. They look -they like leggings -s. 
Luca: Men -'s legging -s. 
Seller: And your jacke -t thin -is. Buy winte -r jacke -t. 
Luca: Where winte -r jacke -ts? 
Seller: Straigh -t ahead and lef -t. 
Luca: Thank -s. 
Luca find -s blac -k winte -r jacke -t. 
Seller: That all? 
Luca: That all. 
Seller: Buy also beani -e. 
Luca: Okay, beani -e also. 
Seller: Blac -k or whit -e? 
Luca: Whit -e. 
Seller: 238 euro -s, thank -you. 
Luca pay -s car -d. 
Seller: Wan -t ==Q chek? 
Luca: Yes, thank -s. 
Seller: And plasti -c bag =one? 
Luca: No, thank -s. 
Luca: Thank -s! Bye bye. 
Seller: Thank -s! Bye bye. 
`;


const storyEnglish = `
Luca is cold.   
Luca goes to a clothing store.   
Salesperson: Hi! How can I help?   
Luca: I am cold.   
Salesperson: I recommend longjohns.   
Luca: You recommend longjohns?   
Salesperson: Yes. Like underwear, but long. They look like leggings.   
Luca: Men's leggings.   
Salesperson: And your jacket is thin. Buy a winter coat.   
Luca: Where are the winter coats?   
Salesperson: Straight ahead and to the left.   
Luca: Thanks.   
Luca finds a black winter coat.   
Salesperson: Is that all?   
Luca: That’s all.   
Salesperson: Buy a beanie too.   
Luca: Okay, a beanie too.   
Salesperson: Black or white?   
Luca: White.   
Salesperson: 238 euros, please.   
Luca pays by card.   
Salesperson: Do you want a receipt? 
Luca: Yes, please. 
Salesperson: How about a plastic bag? 
Luca: No, thank you. 
Luca: Thanks! Bye bye. 
Salesperson: Thanks! Bye bye. 
`;

const storySpokenFinnish = `
У Лука -и холодн -о. 
Лука ид -ёт в одежд -магазин. 
Продавец: Привет! Как мог -у помочь? 
Лука: У мен -я холодн -о. 
Продавец: Рекоменд -ую длинн -ые кальсон -ы. 
Лука: Рекоменд -уешь длинн -ые кальсон -ы? 
Продавец: Да. Как кальсоны, но длинн -ые. Они выгляд -ят как леггинс -ы. 
Лука: Мужск -ие леггинс -ы. 
Продавец: И твой куртк -а тонк -ая. Купи зимн -юю куртк -у. 
Лука: Где зимн -ие куртк -и? 
Продавец: Прям -о вперёд и налев -о. 
Лука: Спасиб -о. 
Лука наход -ит чёрн -ую зимн -юю куртк -у. 
Продавец: Это всё? 
Лука: Это всё. 
Продавец: Купи ещё шапк -у. 
Лука: Окей, шапк -у ещё. 
Продавец: Чёрн -ая или бел -ая? 
Лука: Бел -ая. 
Продавец: 238 евро -а, спасиб -о. 
Лука плат -ит карт -ой. 
Продавец: Хоч -ешь ==ли чек? 
Лука: Да, спасиб -о. 
Продавец: А пластиков -ый пакет =один? 
Лука: Нет, спасиб -о. 
Лука: Спасиб -о! Пока пока. 
Продавец: Спасиб -о! Пока пока. 
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
