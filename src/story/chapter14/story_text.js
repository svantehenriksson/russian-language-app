
// The toise-ksi -> second -as translation is a bit weird
// Improve or make grammar note. Svante 8 Mar 2026
const storyFinnish = `

Sunnuntai -aamu =na Luca herä -ä aikaisin. 
Sukse -t nojaa -vat asunno -n seinä -ä vasten. 
Luca avaa puhelime -n. 
Hän kirjoitta -a viesti -n työ -ryhmä =än. 
“Laina -si =n kirjasto -sta suks -et. 
Missä Helsingi -ssä voi hiihtä -ä?” 
Hetke -n on hiljais -ta. 
Sitten Olli vasta -a. 
“Paloheinä on paras paikka.” 
“Voi -n tulla näyttä -mään.” 
Luca on iloinen. 
Luca lähte -e asunno -lta. 
Bussi 66 vie Paloheinä -än. 
Bussi -ssa on paljon ihmi -siä. 
Moni -lla on sukse -t. 
Luca katso -o om -ia suks -i =aan. 
Ne näyttä -vät hyvin pitk -i =ltä. 
Paloheinä -ssä on paljon metsä -ä. 
Tausta -lla näky -y mäki. 
Paloheinä -n mäki on 59 metri -ä korkea. 
Se on Helsinki -n toise -ksi korke -in paikka. 
Täällä ei ole vuori -a. 
Olli odotta -a parkki -paika =lla. 
Olli: Huomenta. 
Luca: Huomenta. 
Olli: Ole -t =ko hiihtä -nyt ennen? 
Luca: Lapse -na vähän. 
Olli: Hyvä. Muista -t jotain. 
Olli näyttä -ä, miten hiihdetä -än. 
Ensin potku, sitten liuku. 
Luca yrittä -ä. 
Ensimmäinen potku mene -e hyvin. 
Toinen potku mene -e huono -mmin. 
Luca kaatu -u. 
Olli autta -a Luca -n ylös. 
Luca -n vaattee -t ovat täynnä lunta. 
Luca: Tämä on vaikea -a. 
Olli: Joo, aluksi. 
Luca ravista -a lunt -a taki -lta =an. 
Luca yrittä -ä uudestaan. 
Sauva mene -e sukse -n tie -lle. 
Luca horjahta -a. 
Hän yrittä -ä taas. 
Tällä kerta -a hän liuku -u kolme metri -ä. 
Sitten viisi metri -ä. 
Olli: Nyt se näyttä -ä hiihdo -lta. 
He hiihtä -vät hitaas -ti metsä -n läpi. 
Puu -t ovat korke -ita. 
Oks -i =lla on lun -ta. 
Aurinko paista -a pui -den väli -stä. 
Ladu -i =lla on paljon ihmi -siä. 
Yksi nainen hiihtä -ä nopea -sti ohi. 
Nainen osu -u Luca -an. 
Nainen: Pois tie -ltä! 
Luca pysähty -y. 
Luca katso -o Olli -a. 
Olli: Ladu -lla pysytä -än oikea -lla. 

He hiihtä -vät kolme kierros -ta. 
Luca on hiki -nen. 
Luca -n naama on punainen. 
Olli -lle kymmene -n kilometri -ä on lyhyt matka. 
He mene -vät kahvila -an juo -maan kaakao -ta. 
Aurinko laske -e. 
Ilma kylmene -e. 
On aika lähte -ä koti -in. 
`;

const storyFakeEnglish = `

Sunday -morning -on Luca wake -s early. 
Ski -s lean -they apartment -'s wall -of against. 
Luca open phone -the. 
He write -s message -the work -group -to. 
"Borrow -ed -I library -from ski -s. 
Where Helsinki -in can ski -to?" 
Moment -one is quiet -some. 
Then Olli answer -s. 
"Paloheinä is best place." 
"Can -I come show -to." 
Luca is happy. 
Luca leave -s apartment -from. 
Bus 66 takes Paloheinä -to. 
Bus -in is many people -some. 
Many -with is ski -s. 
Luca look -s own -some ski -s -his. 
They look -they very long -s -of. 
Paloheinä -in is many forest -some. 
Background -on show -s hill. 
Paloheinä -'s hill is 59 meter -s high. 
It is Helsinki -'s second -as high -est place. 
Here not is mountain -s. 
Olli wait -s parking -place -at. 
Olli: Morning. 
Luca: Morning. 
Olli: Are -you -? ski -ed before? 
Luca: Child -as a_little. 
Olli: Good. Remember -you something. 
Olli show -s, how ski -to. 
First kick, then glide. 
Luca try -s. 
First kick go -es well. 
Second kick go -es bad -more. 
Luca fall -s. 
Olli help -s Luca -the up. 
Luca -'s clothe -s are full_of snow. 
Luca: This is hard -some. 
Olli: Yeah, at_first. 
Luca shake -s snow -some jacket -from -his. 
Luca try -s again. 
Pole go -es ski -'s way -to. 
Luca stumble -s. 
He try -s again. 
This time -of he glide -s three meter -s. 
Then five meter -s. 
Olli: Now it look -s skiing -of. 
They ski -they slow -ly forest -'s through. 
Tree -s are high -s. 
Branch -es -on is snow -some. 
Sun shine -s tree -'s between -from. 
Track -s -on is many people -some. 
One woman ski -s fast -ly past. 
Woman hit -s Luca -some. 
Woman: Away way -from! 
Luca stop -s. 
Luca look -s Olli -some. 
Olli: Track -on stay -one right -on. 

They ski -they three lap -s. 
Luca is sweat -y. 
Luca -'s face is red. 
Olli -for ten -'s kilometer -s is short trip. 
They go -they cafe -to drink -to cocoa -some. 
Sun set -s. 
Air get_cold -s. 
Is time leave -to home -to. 
`;

const storyEnglish = `

On Sunday morning, Luca wakes up early. 
The skis are leaning against the apartment wall. 
Luca opens his phone. 
He writes a message to the work group. 
"I borrowed skis from the library. 
Where in Helsinki can you ski?" 
For a moment, it is quiet. 
Then Olli replies. 
"Paloheinä is the best place." 
"I can come show you." 
Luca is happy. 
Luca leaves the apartment. 
Bus 66 goes to Paloheinä. 
There are many people on the bus. 
Many of them have skis. 
Luca looks at his own skis. 
They look very long. 
There is a lot of forest in Paloheinä. 
There is a hill in the background. 
The Paloheinä hill is 59 meters high. 
It is the second-highest place in Helsinki. 
There are no mountains here. 
Olli is waiting in the parking lot. 
Olli: Morning. 
Luca: Morning. 
Olli: Have you skied before? 
Luca: A little, as a child. 
Olli: Good. You remember something. 
Olli shows how to ski. 
First a push, then a glide. 
Luca tries. 
The first push goes well. 
The second push goes worse. 
Luca falls. 
Olli helps Luca up. 
Luca's clothes are full of snow. 
Luca: This is hard. 
Olli: Yeah, at first. 
Luca shakes snow off his jacket. 
Luca tries again. 
A pole gets in the way of the ski. 
Luca stumbles. 
He tries again. 
This time he glides three meters. 
Then five meters. 
Olli: Now that looks like skiing. 
They ski slowly through the forest. 
The trees are tall. 
There is snow on the branches. 
The sun shines through the trees. 
There are many people on the tracks. 
One woman skis quickly past. 
The woman bumps into Luca. 
Woman: Out of the way! 
Luca stops. 
Luca looks at Olli. 
Olli: On the track, you stay on the right. 

They ski three laps. 
Luca is sweaty. 
Luca's face is red. 
For Olli, ten kilometers is a short distance. 
They go to a cafe to drink cocoa. 
The sun sets. 
The air gets colder. 
It's time to go home. 
`;

const storySpokenFinnish = `

Sunnuntai -aamu =na Luca herä -ä aikasin. 
Sukse -t noja -a asunno -n seinä -ä vasten. 
Luca avaa puhelime -n. 
Se kirjoitta -a viesti -n työ -ryhmä =än. 
"Mä_laina -si =n kirjasto -st suks -et. 
Mis Helsingi -s voi hiihtä -ä?" 
Hetke -n on hiljas -t. 
Sit Olli vasta -a. 
"Paloheinä on paras paikka." 
"Voi -n tulla näyttä -ä." 
Luca on ilonen. 
Luca lähte -e asunno -lt. 
Bussi 66 vie Paloheinä -än. 
Bussi -s on paljo ihmi -sii. 
Moni -l on sukse -t. 
Luca katto -o om -ii suks -i =aan. 
Ne näyttä -ä tosi pitk -i =lt. 
Paloheinä -s on paljon metsä -ä. 
Tausta -l näky -y mäki. 
Paloheinä -n mäki on 59 metri -i korkee. 
Se on Helsingi -n toise -ks korke -in paikka. 
Tääl ei oo vuori -i. 
Olli odotta -a parkki -paika =l. 
Olli: Huomenta. 
Luca: Huomenta. 
Olli: Oo -t =sä hiihtä -ny ennen? 
Luca: Lapse -na vähän. 
Olli: Hyvä. Muista -t jotain. 
Olli näyttä -ä, miten hiihdetä -än. 
Eka potku, sit liuku. 
Luca yrittä -ä. 
Eka potku mene -e hyvin. 
Toinen potku mene -e huono -mmin. 
Luca kaatu -u. 
Olli autta -a Luca -n ylös. 
Luca -n vaattee -t on täynnä lunta. 
Luca: Tää on vaikee -ta. 
Olli: Joo, aluks. 
Luca ravista -a lunt -a taki -lta =an. 
Luca yrittä -ä uudestaan. 
Sauva mene -e sukse -n tie -lle. 
Luca horjahta -a. 
Se yrittä -ä taas. 
Täl kerta -a se liuku -u kolme metri -ä. 
Sit viis metri -ä. 
Olli: Nyt se näyttä -ä hiihdo -lta. 
Ne hiihtä -ä hitaas -ti metsä -n läpi. 
Puu -t on korke -it. 
Oks -i =l on lun -ta. 
Aurinko paista -a pui -den väli -st. 
Ladu -i =lla on paljon ihmi -sii. 
Yks nainen hiihtä -ä nopee -sti ohi. 
Nainen osu -u Luca -an. 
Nainen: Pois tie -ltä! 
Luca pysähty -y. 
Luca katto -o Olli -a. 
Olli: Ladu -lla pysytä -än oikee -l. 

Ne hiihtä -ä kolme kierros -ta. 
Luca on hiki -nen. 
Luca -n naama on punanen. 
Olli -lle kymmene -n kilometri -i on lyhyt matka. 
Ne mene -e kahvila -an juo -maan kaakao -ta. 
Aurinko laske -e. 
Ilma kylmene -e. 
On aika lähte -e koti -in. 
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

