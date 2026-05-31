const storyFinnish = `
Uusi asunto on hieno. 
Asunto on Ullanlinna -ssa. 
Asunno -sta on meri -näkö =ala. 
Mutta asunno -ssa on hiljais -ta. 
Liian hiljais -ta. 

Luca haluaa saada ystäv -iä. 
Hän tarvitse -e harrastuk -sen. 
Hän menee internet -iin. 
Hän ets -ii jalka -pallo =seuro -ja. 
Futsal -seura Hakanieme -ssä. 
Harjoituk -set tunni -n pää -stä. 
Täydellis -tä. 

Luca matkustaa Hakaniem -een raitiovaunu -lla. 
Hän löytää halli -n. 
Kentä -n viere -llä on muutama pelaaja. 
Luca: Moi, olet -te =ko FC Pallura -sta? 
Pelaaja: Kyllä. 
Luca: Voi -n =ko tulla pelaa -maan? 
Pelaaja: Et. 
Pelaaja: Kesken kaude -n ei pääse mukaan. 
Luca: Ai, harmi, ol -i =si oll -ut hauska -a. 
Pelaaja 2: Mei -tä on tänään vain seitsemän. 
Pelaaja 2: Vaih -da vaatte -et. Saada -an neljä vastaan neljä. 
`;

const storyFakeEnglish = `
New apartment is fine. 
Apartment is Ullanlinna -in. 
Apartment -from is sea -view =area. 
But apartment -in is quiet -some. 
Too quiet -some. 

Luca wants get friend -s. 
He need -s hobby -the. 
He goes internet -to. 
He search -es foot -ball =club -s. 
Futsal -club Hakanieme -in. 
Practice -s hour -'s end -from. 
Perfect -some. 

Luca travels Hakaniem -to tram -by. 
He finds hall -the. 
Field -'s beside -at is some player. 
Luca: Hi, are -you =? FC Ballie -from? 
Player: Yes. 
Luca: Can -I -? come play -to? 
Player: You_not. 
Player: Mid season -'s no get along. 
Luca: Oh, pity, be -have -would be -en fun -some. 
Player 2: We -of is today only seven. 
Player 2: Chang -e clothes -s. Get -is four against four. 
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
Uus kämppä on hieno. 
Kämppä on Ullanlinna -s. 
Kämpä -st on meri -näkö =ala. 
Mut kämpä -s on hiljas -t. 
Liian hiljas -t. 

Luca haluu saada ystäv -ii. 
Se tartte -e harrastuk -sen. 
Se menee netti -in. 
Hän ets -ii jalka -pallo =seuro -ja. 
Futsal -seura Hakanieme -ssä. 
Harjotuk -set tunni -n pää -stä. 
Täydellis -t. 

Luca matkustaa Hakaniem -een ratik -al. 
Se löytää halli -n. 
Kentä -n viere -l on muutama pelaaja. 
Luca: Moi, oot -te =kste FC Pallura -st? 
Pelaaja: Kyllä. 
Luca: Voi -n =ks tulla pela -a? 
Pelaaja: Et. 
Pelaaja: Kesken kaude -n ei pääse mukaan. 
Luca: Ai, harmi. Ol -i =s oll -u hauska -a. 
Pelaaja 2: Mei -t on tänään vain seittemän. 
Pelaaja 2: Vaih -da vaatte -et. Saada -an neljä vastaan neljä. 
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
