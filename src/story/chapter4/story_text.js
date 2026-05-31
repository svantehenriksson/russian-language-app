const storyFinnish = `
Pomo: Tervetuloa! 
Luca: Kiitos. 
Pomo ja Luca kättele -vät. 
Pomo: Minä ole -n Jarkko. 
Luca: Minä ole -n Luca. 
Jarkko: Halua -t =ko kahvi -a? 
Luca: Kyllä, kiitos. 
Jarkko: Minä -kin ota -n kahvi -a. Maanantai -aamu. 
Mie -het otta -vat kahvi -a automaati -sta. 
Automaati -sta lähte -e kova ääni: surrrr. 
Luca: Täällä on tosi vähän ihmi -siä. 
Jarkko: Hybridi -työ. 
Luca: Ahaa. 
Jarkko: Minu -lla on ensimmäinen työ sinu -lle. 
Luca: Mikä työ? 
Jarkko: Teko -äly =projekti. Asiakkaa -lle Ruoholahde -ssa. 
Luca: Miten pääse -n Ruoholaht -een? 
Jarkko: Ota raitiovaunu. Tai yrityk -sen sähkö -pyörä. Siinä on talvi -renka =at. 
`;

const storyFakeEnglish = `
Boss: Welcome! 
Luca: Thanks. 
Boss and Luca shake_hands- they. 
Boss: I am -I Jarkko. 
Luca: I am -I Luca. 
Jarkko: Want -you -eh coffee -some? 
Luca: Yes, thanks. 
Jarkko: I -too take -I coffee -some. Monday morning. 
Men -the take -they coffee -some machine -from. 
Machine -from leave -s hard sound: brrrr. 
Luca: Here are really few human -s. 
Jarkko: Hybrid work. 
Luca: Uhhuh. 
Jarkko: I -with have first job you -for. 
Luca: What job? 
Jarkko: Artificial intelligence project. Client -for Ruoholahti -in. 
Luca: How get -I Ruoholahti -to? 
Jarkko: Take tram. Or company 's electric bike. It has winter tire -s. 
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
Pomo: Tervetuloo! 
Luca: Kiitos. 
Pomo ja Luca kättel -ee. 
Pomo: Mä oo -n Jarkko. 
Luca: Mä oo -n Luca. 
Jarkko: Halu -ut -sä kahvi -i? 
Luca: Joo, kiitti. 
Jarkko: Mä -ki ota -n kahvi -i. Maanantai -aamu. 
Miehe -t otta -a kahvi -i automaati -st. 
Automaati -st lähte -e kova ääni: surrrr. 
Luca: Tääl on tosi vähän ihmi -sii. 
Jarkko: Hybridi -duuni. 
Luca: Ahaa. 
Jarkko: Mu -l on eka duuni su -lle. 
Luca: Mikä duuni? 
Jarkko: Teko -äly =projekti. Asiakkaa -l Ruoholahde -ssa. 
Luca: Miten pääse -n Ruoholaht -ee? 
Jarkko: Ota ratikka. Tai firma -n sähkö -pyörä. Siin on talvi -renka =at. 
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
