// Quiz.js
import React, { useState, useEffect } from 'react';
import './Quiz.css';

const congratsMessages = [
  "🐷 Sika hyvä!", "Mahtavaa!", "Loistavaa!", "Hyvä!", "👑Täydellistä!", "Upeaa!",
  "🙂 Jee, oikein!", "Oikein! Onneksi olkoon!", "😲No huhhuh!",
  "🍀Tuuria vai taitoa? Ei väliä, sillä SE ON OIKEIN!",
  "🦜10 pistettä ja papukaijamerkki!", "Kyllä!", "🧠 Terävää!", "🔥 Olet tulessa!",
  "🥳 Oikein meni!", "💪 Vahva suoritus!", "🎯 Napakymppi!", "👏 Iso käsi!",
  "🦉 Viisaasti valittu!", "🌟 Tähtihetki!"
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getImageSrc = (imgPath) => {
  if (!imgPath) return '';
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://') || imgPath.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${imgPath.replace(/^\//, '')}`;
  }
  const normalized = imgPath.startsWith('visual_dictionary/') ? imgPath : `visual_dictionary/${imgPath}`;
  return `${import.meta.env.BASE_URL}${normalized}`;
};

const Quiz = ({ wordsAndImages }) => {
  const [shuffled, setShuffled] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState(null);

  // Shuffle only once when wordsAndImages changes
  useEffect(() => {
    if (Array.isArray(wordsAndImages) && wordsAndImages.length > 0) {
      const shuffledList = shuffleArray(wordsAndImages);
      setShuffled(shuffledList);
      setIndex(0);
      setScore(0);
      setFinished(false);
      setIsLocked(false);
      setSelectedAnswer(null);
      setLastCorrectAnswer(null);
    }
  }, [wordsAndImages]);

  // Update options each time the index or shuffled list changes
  useEffect(() => {
    if (shuffled.length > 0 && index < shuffled.length) {
      const correct = shuffled[index];
      if (!correct) return;

      const incorrect = shuffleArray(
        shuffled.filter((f) => f.fi !== correct.fi)
      ).slice(0, 2);

      const mixed = shuffleArray([correct.fi, ...incorrect.map((i) => i.fi)]);
      setOptions(mixed);
      setIsLocked(false);
      setSelectedAnswer(null);
      setLastCorrectAnswer(correct.fi);
    }
  }, [shuffled, index]);

  const handleAnswer = (answer) => {
    if (isLocked) return;
    setIsLocked(true);
    setSelectedAnswer(answer);

    const correct = shuffled[index].fi;
    setLastCorrectAnswer(correct);
    const isCorrect = answer === correct;

    if (isCorrect) setScore((prevScore) => prevScore + 1);

    const message = isCorrect
      ? congratsMessages[Math.floor(Math.random() * congratsMessages.length)]
      : "❌ Väärä vastaus 😢";

    const x = 30 + Math.random() * 40;
    const y = 20 + Math.random() * 30;
    setFeedback({ message, x, y });

    setTimeout(() => {
      setFeedback(null);
      if (index + 1 < shuffled.length) {
        setIndex(index + 1);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  const getOptionStyle = (option) => {
    if (!isLocked || !lastCorrectAnswer) return undefined;

    const isCorrect = option === lastCorrectAnswer;
    const isSelected = option === selectedAnswer;

    if (isSelected && isCorrect) {
      return {
        background: 'linear-gradient(135deg, #ffd700, #ffec8b)',
        color: '#3d2b00',
        borderColor: '#caa000',
        boxShadow: '0 0 12px rgba(255, 215, 0, 0.6)',
        transform: 'translateY(-1px)'
      };
    }

    if (isSelected && !isCorrect) {
      return {
        background: 'linear-gradient(135deg, #ff6b6b, #ff9a9a)',
        color: '#3a0a0a',
        borderColor: '#cc3b3b',
        boxShadow: '0 0 10px rgba(255, 80, 80, 0.45)'
      };
    }

    if (isCorrect) {
      return {
        background: 'linear-gradient(135deg, #b7f7d4, #d7ffe9)',
        color: '#0b3d2a',
        borderColor: '#4bbf7c'
      };
    }

    return {
      background: '#e6e6e6',
      color: '#666',
      borderColor: '#cfcfcf'
    };
  };

  // Guard against loading state
  if (!Array.isArray(wordsAndImages) || wordsAndImages.length === 0 || shuffled.length === 0) {
    return <div>Ladataan...</div>;
  }

  // Guard against invalid index
  const current = shuffled[index];
  if (!current) {
    return <div>Virhe: tuntematon sana.</div>;
  }

  if (finished) {
    return (
      <div className="quiz-container">
        <h2>Valmis! Pisteesi: {score} / {shuffled.length}</h2>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Mikä sana?</h2>
      <img
        src={getImageSrc(current.img)}
        alt={current.fi}
        className="quiz-image"
      />
      <div className="quiz-options">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            disabled={isLocked}
            style={getOptionStyle(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <p>{index + 1} / {shuffled.length}</p>

      {feedback && (
        <div
          className="floating-feedback"
          style={{
            top: `${feedback.y}%`,
            left: `${feedback.x}%`
          }}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default Quiz;


