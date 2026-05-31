const storyFinnish = `
Nov -aya kvartir -a khorosh -aya. 
Kvartir -a v Ullanlinn -e. 
Iz kvartir -y vid -en mor -e. 
No v kvartir -e tikh -o. 
Slishkom tikh -o. 

Luca khochet nayti drug -ey. 
Yemu nuzh -en khobb -i. 
On id -yot v internet. 
On ishch -et futb -ol klub -y. 
Futzal -klub v Hakaniem -i. 
Trenirovk -a cherez chas. 
Idealn -o. 

Luca yed -et v Hakaniem -i tramvay -em. 
On nakhod -it zal. 
Ryad -om s pole -m neskolko igrok -ov. 
Luca: Privet, vy iz FC Pallura? 
Igrok: Da. 
Luca: Mog -u =li priyti igrat? 
Igrok: Net. 
Igrok: V seredin -e sezon -a nelzya voyti. 
Luca: Ay, zhal, eto b -yl -o by veselo. 
Igrok 2: Nas segodnya tolko sem. 
Igrok 2: Pereode -n -sya. Bud -et chetyre protiv chetyre. 
`;

const storyFakeEnglish = `
New -ish apartment -a good -ish. 
Apartment -a in Ullanlinna -in. 
From apartment -of seen -is sea -a. 
But in apartment -in quiet -ly. 
Too quiet -ly. 

Luca wants find friend -s. 
To_him need -is hobby -a. 
He go -es to internet. 
He search -es foot -ball club -s. 
Futsal -club in Hakaniemi -in. 
Training -a in_an hour. 
Perfect -ly. 

Luca go -es to Hakaniemi -in by_tram -by. 
He find -s hall. 
Beside -by with field -by few player -s. 
Luca: Hi, you from FC Pallura? 
Player: Yes. 
Luca: Can -I =Q come play? 
Player: No. 
Player: In middle -of season -of cannot join. 
Luca: Ah, pity, it b -was -it by fun. 
Player 2: Us today only seven. 
Player 2: Change -imp -self. Will -be four against four. 
`;

const storyEnglish = `
The new apartment is nice. 
The apartment is in Ullanlinna. 
The apartment has a sea view. 
But the apartment is quiet. 
Too quiet. 

Luca wants to make friends. 
He needs a hobby. 
He goes online. 
He searches for a football club. 
A futsal club in Hakaniemi. 
Practice starts in an hour. 
Perfect. 

Luca travels to Hakaniemi by tram. 
He finds the hall. 
Next to the field there are a few players. 
Luca: Hi, are you from FC Pallura? 
Player: Yes. 
Luca: Can I come play? 
Player: No. 
Player: You can't join in mid-season. 
Luca: Ah, that's a pity, it would have been fun. 
Player 2: There are only seven of us today. 
Player 2: Change clothes. We'll get four against four. 
`;

const storySpokenFinnish = `
Нов -ая квартир -а хорош -ая. 
Квартир -а в Улланлинн -е. 
Из квартир -ы вид -ен мор -е. 
Но в квартир -е тих -о. 
Слишком тих -о. 

Лука хочет найти друг -ей. 
Ему нуж -ен хобб -и. 
Он ид -ёт в интернет. 
Он ищ -ет футб -ол клуб -ы. 
Футзал -клуб в Хаканием -и. 
Тренировк -а через час. 
Идеальн -о. 

Лука ед -ет в Хаканием -и трамвай -ем. 
Он наход -ит зал. 
Ряд -ом с поле -м несколько игрок -ов. 
Лука: Привет, вы из FC Pallura? 
Игрок: Да. 
Лука: Мог -у =ли прийти играть? 
Игрок: Нет. 
Игрок: В середин -е сезон -а нельзя войти. 
Лука: Ай, жаль, это б -ыл -о бы весело. 
Игрок 2: Нас сегодня только семь. 
Игрок 2: Переоде -н -ся. Буд -ет четыре против четыре. 
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
