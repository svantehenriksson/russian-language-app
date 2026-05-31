const storyFinnish = `

Luca istu -u keittiö -ssä. 
On ilta. 
Ulkona on pimeä -ä. 
Luca ava -a tietokone -en. 
Luca aloittaa video -puhelu =n. 
Näytö -lle tul -ee Luca -n äiti. 
Äiti hymyil -ee. 
Äiti: Hei Luca. 
Luca: Hei äiti. 
Äiti: On -ko kaikki hyvin? 
Luca: On, kaikki hyvin. 
Äiti: On -ko sinu -lla ruoka -a? 
Luca: On. On maito -a. On leipä -ä. 
Äiti: Vain maito -a ja leipä -ä? 
Luca: Ja pasta -a. 
Äiti: Hyvä. 
Äiti: On -ko sinu -lla lämmin takki? 
Luca: On. Musta takki. 
Äiti: Entä pipo? 
Luca: On pipo. Ja hanska -t. 
Äiti: Hyvä. Suome -ssa on tosi kylmä. 
Äiti on hetken hiljaa. 
Äiti: Koto -na on hiljais -ta. 
Luca: Täällä -kin on hiljais -ta. Tosi hiljais -ta. 
Äiti: On -ko sinu -lla ystäv -iä? 
Luca: Ei vielä. 
Äiti: Halua -t =ko tulla koti -in? 
Luca: En. Minä pidä -n Suome -sta. 
Äiti: Oikeasti? 
Luca: Oikeasti. 
Äiti: Soita pian uudestaan. 
Luca: Soita -n, lupaa -n. Hyvää yötä, äiti. 
Luca sulke -e tietokone -en. 
Luca katso -o puhelin -ta. 
Futsal—ryhmä -ssä on uusi viesti. 
Hän hymyil -ee vähän. 
`;

const storyFakeEnglish = `

Luca sit -s kitchen -in. 
Is evening. 
Outside is dark -some. 
Luca open -s computer -the. 
Luca starts video -call =one. 
Screen -to come -s Luca -'s mother. 
Mother smile -s. 
Mother: Hi Luca. 
Luca: Hi mom. 
Mother: Is -? all good? 
Luca: Is, all good. 
Mother: Have -? you -with food -some? 
Luca: Have. Have milk -some. Have bread -some. 
Mother: Only milk -some and bread -some? 
Luca: And pasta -some. 
Mother: Good. 
Mother: Have -? you -with warm jacket? 
Luca: Have. Black jacket. 
Mother: And beanie? 
Luca: Have beanie. And glove -s. 
Mother: Good. Finland -in is very cold. 
Mother is moment quiet. 
Mother: Home -at is quiet -some. 
Luca: Here -too is quiet -some. Very quiet -some. 
Mother: Is -? you -with friend -s? 
Luca: Not yet. 
Mother: Want -you -? come home -to? 
Luca: No. I like -I Finland -of. 
Mother: Really? 
Luca: Really. 
Mother: Call soon again. 
Luca: Call -I, promise -I. Good night, mother. 
Luca close -s computer -the. 
Luca look -s phone -the. 
Futsal—group -in is new message. 
He smile -s little. 
`;

const storyEnglish = `

Luca sits in the kitchen. 
It's evening. 
It's dark outside. 
Luca opens the computer. 
Luca starts a video call. 
Luca's mom appears on the screen. 
Mom smiles. 
Mom: Hi Luca. 
Luca: Hi mom. 
Mom: Is everything okay? 
Luca: Yes, everything is okay. 
Mom: Do you have food? 
Luca: Yes. I have milk. I have bread. 
Mom: Only milk and bread? 
Luca: And pasta. 
Mom: Good. 
Mom: Do you have a warm jacket? 
Luca: Yes. A black jacket. 
Mom: And a beanie? 
Luca: I have a beanie. And gloves. 
Mom: Good. It's very cold in Finland. 
Mom is quiet for a moment. 
Mom: It's quiet at home. 
Luca: It's quiet here too. Very quiet. 
Mom: Do you have friends? 
Luca: Not yet. 
Mom: Do you want to come home? 
Luca: No. I like Finland. 
Mom: Really? 
Luca: Really. 
Mom: Call again soon. 
Luca: I will, I promise. Good night, mom. 
Luca closes the computer. 
Luca looks at the phone. 
There is a new message in the futsal group. 
He smiles a little. 
`;

const storySpokenFinnish = `

Luca istu -u keittiö -s. 
On ilta. 
Ulkona on pimee -tä. 
Luca ava -a tietokonee -n. 
Luca alottaa video -puhelu =n. 
Näytö -lle tul -ee Luca -n äiti. 
Äiti hymyil -ee. 
Äiti: Hei Luca. 
Luca: Hei äiti. 
Äiti: On -ks kaikki hyvin? 
Luca: On, kaikki hyvin. 
Äiti: On -ks su -lla ruoka -a? 
Luca: On. On maito -o. On leipä -ä. 
Äiti: Vaan maito -o ja leipä -ä? 
Luca: Ja pasta -a. 
Äiti: Hyvä. 
Äiti: On -ks su -lla lämmin takki? 
Luca: On. Musta takki. 
Äiti: Entä pipo? 
Luca: On pipo. Ja hanska -t. 
Äiti: Hyvä. Suome -s on tosi kylmä. 
Äiti on hetken hiljaa. 
Äiti: Koto -na on hiljas -ta. 
Luca: Tääl -ki on hiljas -ta. Tosi hiljas -ta. 
Äiti: On -ks su -lla ystäv -ii? 
Luca: Ei viel. 
Äiti: Haluu -k =s tulla koti -in? 
Luca: En. Mä tykkää -n Suome -st. 
Äiti: Oikeesti? 
Luca: Oikeesti. 
Äiti: Soita pian uudestaan. 
Luca: Soita -n, mä_lupaa -n. Hyvää yötä, äiti. 
Luca sulke -e tietokonee -n. 
Luca katto -o puhelin -t. 
Futsal—ryhmä -s on uus viesti. 
Se hymyil -ee vähän. 
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
