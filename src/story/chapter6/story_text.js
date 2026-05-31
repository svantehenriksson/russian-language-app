const storyFinnish = `
Luca prosypa -et -sya ot gromk -ogo zvuk -a. 
Luca puga -et -sya. 
Za sten -oy sverl -yat. 
Kto sverl -it tak rano? 
Seychas sem chas -ov. 
Luca vsyo eshchyo ustal -yy. 

Luca vstay -ot s krovat -i. 
Luca var -it kofe. 
Luca id -yot v pod-yezd. 
Luca vid -it Aino. 
Aino: Krasiv -aya nochn -aya rubashk -a. 
Luca: Eeeh, grazie. 
Luca: Chto eto za gromk -iy zvuk? 
Aino: Trub -remont. 
Luca: Trub -remont? 
Aino: Da. Ob et -om soobshcha -li v dom -chat WhatsApp -a. 
Luca: Kak dolgo eto dlits -sya? 
Aino: Tri mesyats -a. 
Luca: Mamma mia! 
Aino: Ya pereezha -yu k mam -e zavtra. 

Luca id -yot v ofis. 
Jarkko: Luca, ty vyglyad -ish ustal -ym. 
Jarkko: Ty =li v poryadk -e? 
Luca: V dom -e =moyom trub -remont. 
Luca: Men -e nuzhn -o pereekhat. 
Jarkko: Hey, ne panik -uy. U kompani -i est kvartir -a. Ona svobodn -a. 
`;

const storyFakeEnglish = `
Luca wake -s -self from loud -ish sound -of. 
Luca scare -s -self. 
Behind wall -behind drill -they_passive. 
Who drill -s so early? 
Now seven hour -s. 
Luca still still tired -is. 

Luca rise -s from bed -from. 
Luca brew -s coffee. 
Luca go -es into stairwell. 
Luca see -s Aino. 
Aino: Nice -ish night -ish shirt -a. 
Luca: Uhh, grazie. 
Luca: What this as loud -ish sound? 
Aino: Pipe -renovation. 
Luca: Pipe -renovation? 
Aino: Yes. About it -about inform -ed in house -chat WhatsApp -in. 
Luca: How long this last -s_self? 
Aino: Three month -s. 
Luca: Mamma mia! 
Aino: I move -I to mom -to tomorrow. 

Luca go -es to office. 
Jarkko: Luca, you look -s tired -ish. 
Jarkko: You =Q in okay -state? 
Luca: In build -ing =my pipe -renovation. 
Luca: Me -dat need -ly move. 
Jarkko: Hey, no panic -imp. At company -of is apartment -a. It free -is. 
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
Лука просыпа -ет -ся от громк -ого звук -а. 
Лука пуга -ет -ся. 
За стен -ой сверл -ят. 
Кто сверл -ит так рано? 
Сейчас семь час -ов. 
Лука всё ещё устал -ый. 

Лука вста -ёт с кроват -и. 
Лука вар -ит кофе. 
Лука ид -ёт в подъезд. 
Лука вид -ит Аино. 
Аино: Красив -ая ночн -ая рубашк -а. 
Лука: Эээх, grazie. 
Лука: Что это за громк -ий звук? 
Аино: Труб -ремонт. 
Лука: Труб -ремонт? 
Аино: Да. Об эт -ом сообща -ли в дом -чат WhatsApp -а. 
Лука: Как долго это длит -ся? 
Аино: Три месяц -а. 
Luca: Mamma mia! 
Аино: Я переезжа -ю к мам -е завтра. 

Лука ид -ёт в офис. 
Яркко: Лука, ты выгляд -ишь устал -ым. 
Яркко: Ты =ли в порядк -е? 
Лука: В дом -е =моём труб -ремонт. 
Лука: Мен -е нужн -о переехать. 
Яркко: Эй, не панику -й. У компани -и есть квартир -а. Она свободн -а. 
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
