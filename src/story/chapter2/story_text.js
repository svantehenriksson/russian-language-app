
const storyFinnish = `
Luca menee hissi -in. 
Hissi -ssä on nainen. 
Nainen seiso -o hiljaa. 
Luca seiso -o myös hiljaa. 
Luca katso -o nais -ta. 
Nainen katso -o Luca -a. 
Luca sano -o: "Hei." 
Nainen sano -o: "Moi." 
Nainen hymyil -ee. 
Luca hymyil -ee myös. 
Luca kysy -y: "Mikä sinu -n nime -si on?" 
Nainen sano -o: "Aino." 
Luca: "Minu -n nime -ni on Luca." 
Luca: "Asu -n toise -ssa kerrokse -ssa." 
Aino: "Asu -n yläkerra -ssa =si." 
Hissi pysähty -y. 
Ding! 
Luca astu -u ulos.`;


const storyFakeEnglish = `
Luca goes elevator -into. 
Elevator -in is woman. 
Woman stand -s silently. 
Luca stand -s also silently. 
Luca look -s woman -at. 
Woman look -s Luca -at. 
Luca say -s: "Hello." 
Woman say -s: "Hi." 
Woman smile -s. 
Luca smile -s also. 
Luca ask -s: "What your 's name -yours is?" 
Woman say -s: "Aino." 
Luca: "I 's name -my is Luca." 
Luca: "Live -I second -in floor -in". 
Aino: "Live -I upstairs -in -yours." 
Elevator stop -s. 
Ding! 
Luca step -s out. 
`;


const storyEnglish = `
Luca goes into the elevator.    
There is a woman in the elevator.    
The woman stands silently.    
Luca also stands silently.    
Luca looks at the woman.    
The woman looks at Luca.    
Luca says: "Hello."    
The woman says: "Hi."    
The woman smiles.    
Luca smiles as well.    
Luca asks: "What is your name?"    
The woman says: "Aino."    
Luca: "My name is Luca."    
Luca: "I live on the second floor."    
Aino: "I live upstairs from you."    
The elevator stops.    
Ding!    
Luca steps out.`;

const storySpokenFinnish = `
Luca menee hissi -i. 
Hissi -s on nainen. 
Nainen seiso -o hiljaa. 
Luca seiso -o kans hiljaa. 
Luca katto -o nais -ta. 
Nainen katto -o Luca -a. 
Luca sano -o: "Hei." 
Nainen sano -o: "Moi." 
Nainen hymyil -ee. 
Luca hymyil -ee kans. 
Luca kysy -y: "Mikä su -n nime -s on?" 
Nainen sano -o: "Aino." 
Luca: "Mu -n nimi - on Luca." 
Luca: "Asu -n toka -s kerrokse -s." 
Aino: "Asu -n yläkerra -ssa -s." 
Hissi pysähty -y. 
Ding! 
Luca astu -u ulos.`;


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
