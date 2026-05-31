

const storyFinnish = `
Luca -lla on kylmä. 
Luca menee vaate -kauppa =an. 
Myyjä: Hei! Miten voi -n auttaa? 
Luca: Minu -lla on kylmä. 
Myyjä: Suosittel -en pitk -iä kalsar -eita. 
Luca: Suosittel -et pitk -iä kalsar -eita? 
Myyjä: Kyllä. Kuten kalsarit, mutta pitkä -t. Ne näyttä -vät leggings -eiltä. 
Luca: Mies -ten leggingsit. 
Myyjä: Ja sinu -n takki -si on ohut. Osta talvi -takki. 
Luca: Missä talvi -taki =t ovat? 
Myyjä: Suoraan eteenpäin ja vasemma -lle. 
Luca: Kiitos. 
Luca löytää musta -n talvi -taki =n. 
Myyjä: Siinä kaikki? 
Luca: Siinä kaikki. 
Myyjä: Osta vielä pipo. 
Luca: Okei, pipo vielä. 
Myyjä: Musta vai valkoinen? 
Luca: Valkoinen. 
Myyjä: 238 euro -a, kiitos. 
Luca maksaa korti -lla. 
Myyjä: Halua -t ==ko kuiti -n? 
Luca: Kyllä, kiitos. 
Myyjä: Entä muovi -pussi =n? 
Luca: En, kiitos. 
Luca: Kiitos! Hei hei. 
Myyjä: Kiitos! Moi moi.
`;

const storyFakeEnglish = `
Luca -with is cold. 
Luca goes clothing -store -into. 
Salesperson: Hello! How can -I help? 
Luca: I -with is cold. 
Salesperson: Recommend -I long -some underwear -some. 
Luca: Recommend -you long -some underwear -some? 
Salesperson: Yes. Like underwear, but long -s. They look -they leggings -like. 
Luca: Men 's leggings. 
Salesperson: And you -r jacket -your is thin. Buy winter -coat. 
Luca: Where winter -coat =s are? 
Salesperson: Straight ahead and left -onto.
Luca: Thanks. 
Luca finds black  -one winter -coat =one. 
Salesperson: There all? 
Luca: There all. 
Salesperson: Buy also beanie. 
Luca: Okay, beanie also. 
Salesperson: Black or white? 
Luca: White. 
Salesperson: 238 euro -s, thank_you. 
Luca pays card -with. 
Salesperson: Want -you ==(question) receipt -one? 
Luca: Yes, thanks. 
Salesperson: How_about plastic -bag =one? 
Luca: No, thanks. 
Luca: Thanks! Bye bye. 
Salesperson: Thanks! Bye bye. 
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
Luca -l on kylmä. 
Luca menee vaate -kauppa =a. 
Myyjä: Moi! Mite voi -n auttaa? 
Luca: Mu -l on kylmä. 
Myyjä: Suosittel -en pitk -ii kalsar -eit. 
Luca: Suosittel -et pitk -ii kalsar -eit? 
Myyjä: Joo. Niinku kalsarit mut pitkä -t. Ne näyttä -ä leggingsei -lt. 
Luca: Mies -ten leggingsit. 
Myyjä: Ja su -n takki -s on ohut. Osta talvi -takki. 
Luca: Mis talvi- tak =it on? 
Myyjä: Suoraa eteenpäin ja vasemma -l. 
Luca: Kiitti. 
Luca löytää musta -n talvi -taki =n. 
Myyjä: Siin kaikki? 
Luca: Siin kaikki. 
Myyjä: Osta viel pipo. 
Luca: Okei, pipo viel. 
Myyjä: Musta vai valkonen? 
Luca: Valkonen. 
Myyjä: 238 euro -o, kiitti. 
Luca maksaa korti -l. 
Myyjä: Haluu -t ==sä kuiti -n? 
Luca: Joo, kiitti. 
Myyjä: Entä muovi -kassi =n? 
Luca: En, kiitti. 
Luca: Kiitos! Hei hei. 
Myyjä: Kiitos! Moi moi. 
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
