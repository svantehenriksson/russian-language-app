const storyFinnish = `
Luca herä -ä kova -an ääne -en. 
Luca pelästy -y. 
Seinä -n takana porata -an. 
Kuka pora -a näin aikaisin? 
Kello on seitsemän. 
Luca on vielä väsynyt. 

Luca nouse -e sängy -stä. 
Luca keittää kahvi -n. 
Luca mene -e porras -käytävä =än. 
Luca näke -e Aino -n. 
Aino: Hieno yö -puku. 
Luca: Ööh, grazie. 
Luca: Mikä tämä kova ääni on? 
Aino: Putki -remontti. 
Luca: Putki -remontti? 
Aino: Kyllä. Sii -tä kerrot -tiin talo -yhtiö =n WhatsApp -—ryhmä =ssä. 
Luca: Kuinka kauan se kestää? 
Aino: Kolme kuukau -tta. 
Luca: Mamma mia! 
Aino: Minä muuta -n äidi -n luo huomenna. 

Luca mene -e toimisto -lle. 
Jarkko: Luca, näytä -t väsynee -ltä. 
Jarkko: Ole -t =ko kunno -ssa? 
Luca: Talo -ssa =ni on putki -remontti. 
Luca: Minu -n pitää muuttaa. 
Jarkko: Hei, ei hätä -ä. Yritykse -llä on asunto. Se on vapaa -na. 
`;

const storyFakeEnglish = `
Luca wake -s hard -to sound -to. 
Luca frighten -s. 
Wall 's behind to_drill -happens. 
Who drill -s so early? 
Clock is seven. 
Luca is still tired. 

Luca rise -s bed -from. 
Luca boils coffee -one. 
Luca goe -s stair -case =into. 
Luca see -s Aino -one. 
Aino: Nice night -suit. 
Luca: Uhh, grazie. 
Luca: What this loud sound is? 
Aino: Pipe -renovation. 
Luca: Pipe -renovation? 
Aino: Yes. About -it tell -was house -company -'s WhatsApp -group -in. 
Luca: How long it lasts? 
Aino: Three month -s. 
Luca: Mamma mia! 
Aino: I move -I mother -'s home tomorrow. 

Luca goe -s office -to. 
Jarkko: Luca, look -you tired -of. 
Jarkko: Be -you =? condition -in? 
Luca: House -in =my is pipe -renovation. 
Luca: Me -of must move. 
Jarkko: Hey, no emergency -some. Company -with has apartment. It is free -as. 
`;

const storyEnglish = `
Luca wakes up to a loud sound. 
Luca gets startled. 
Someone is drilling behind the wall. 
Who drills this early? 
It's seven o'clock. 
Luca is still tired. 

Luca gets out of bed. 
Luca brews coffee. 
Luca goes to the stairwell. 
Luca sees Aino. 
Aino: Nice pyjamas. 
Luca: Uh, grazie. 
Luca: What is this loud sound? 
Aino: Pipe renovation. 
Luca: Pipe renovation? 
Aino: Yes. It was mentioned in the housing company's WhatsApp group. 
Luca: How long will it last? 
Aino: Three months. 
Luca: Mamma mia! 
Aino: I'm moving to my mom's tomorrow. 

Luca goes to the office. 
Jarkko: Luca, you look tired. 
Jarkko: Are you okay? 
Luca: There is pipe renovation in my building. 
Luca: I have to move. 
Jarkko: Hey, no worries. The company has an apartment. It's free. 
`;

const storySpokenFinnish = `
Luca herä -ä kova -an ääne -en. 
Luca pelästy -y. 
Seinä -n takana porata -an. 
Kuka pora -a näin aikasin? 
Kello on seittemän. 
Luca on viel väsyny. 

Luca nouse -e sängy -st. 
Luca keittää kahvi -n. 
Luca mene -e rappu -käytävä =än. 
Luca näke -e Aino -n. 
Aino: Hieno yö -puku. 
Luca: Ööh, grazie. 
Luca: Mikä tää kova ääni on? 
Aino: Putki -remontti. 
Luca: Putki -remontti? 
Aino: Joo. Sii -t kerrot -tiin talo -yhtiö =n WhatsApp -—ryhmä =s. 
Luca: Kuin kauan se kestää? 
Aino: Kolme kuukau -t. 
Luca: Mamma mia! 
Aino: Mä muuta -n äidi -n luo huomen. 

Luca mene -e toimisto -l. 
Jarkko: Luca, sä_näytä -t väsynee -lt. 
Jarkko: Oo -t =sä kunno -s? 
Luca: Mun_talo -s = on putki -remontti. 
Luca: Mu -n pitää muuttaa. 
Jarkko: Hei, ei hätä -ä. Firma -l on asunto. Se on vapaa -na. 
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
