const storyFinnish = `
Luca on lentokentä -llä. 
Luca on väsynyt. 
Luca juo kahvi -a. 
Kahvi on kallis -ta. 
Kahvi on vähän outo -a. 
Mutta kahvi auttaa. 
Suomalai -set juo -vat tätä joka päivä? 
Luca ets -ii bussi -a. 
Bussi tul -ee. 
Kuljettaja ei puhu englanti -a. 
Kuljettaja ei puhu mitään. 
Luca sanoo: "Hei." 
Kuljettaja ei sano mitään. 
Ulkona sataa lun -ta. 
Paljon lun -ta. 
On kylmä. 
Tosi kylmä. 
Lumi on kaunis -ta. 
Luca hymyil -ee. 
Tämä on Suomi.`;

const storyFakeEnglish = `
Luca is airport -at. 
Luca is tired. 
Luca drinks coffee -some. 
Coffee is expensive -some. 
Coffee is a_bit strange -some. 
But coffee helps. 
Finn -s(the) drink -they this every day? 
Luca look -he bus -some. 
The_bus come -s. 
Driver not speak English -some. 
Driver not say anything. 
Luca says: "Hi." 
The_driver not say anything. 
Outside rains snow -some. 
A_lot_of snow -some. 
It's cold. 
Really cold. 
The_snow is beautiful -some. 
Luca smile -s. 
This is Finland.
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
Luca on lentokentä -l. 
Luca on väsyny. 
Luca juo kahvi -i. 
Kahvi on kallis -t. 
Kahvi on vähän outo -o. 
Mut kahvi auttaa. 
Suomalai -set juo - tätä joka päivä?" 
Luca ett -ii bussi -i. 
Bussi tul -ee. 
Kuljettaja ei puhu englanti -i. 
Kuljettaja ei puhu mitää. 
Luca sanoo: "Hei." 
Kuljettaja ei sano mitää. 
Ulkona sataa lun -ta. 
Paljon lun -ta. 
On kylmä. 
Tosi kylmä. 
Lumi on kaunis -t. 
Luca hymyil -ee. 
Tää on Suomi.`;


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
