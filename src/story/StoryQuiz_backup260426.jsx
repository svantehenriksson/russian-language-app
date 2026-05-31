import React, { useEffect, useMemo, useState } from "react";

// Supabase-related import:
import { incrementProgress } from "../supabaseProgress";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const congratsMessages = [
  "🐷 Sika hyvä!",
  "Mahtavaa!",
  "Loistavaa!",
  "Hyvä!",
  "👑Täydellistä!",
  "Upeaa!",
  "🙂 Jee, oikein!",
  "Oikein! Onneksi olkoon!",
  "😲No huhhuh!",
  "🍀Tuuria vai taitoa? Ei väliä, sillä SE ON OIKEIN!",
  "🦜10 pistettä ja papukaijamerkki!",
  "Kyllä!",
  "🧠 Terävää!",
  "🔥 Olet tulessa!",
  "🥳 Oikein meni!",
  "💪 Vahva suoritus!",
  "🎯 Napakymppi!",
  "👏 Iso käsi!",
  "🦉 Viisaasti valittu!",
  "🌟 Tähtihetki!",
];

export default function StoryQuiz({
  chapterNumber,
  questions,
  wordsPerQuiz,
  loadError,
  onBack,
  onNextChapter,
}) {
  const availableQuestions = Array.isArray(questions) ? questions : [];
  const quizItems = useMemo(
    () => availableQuestions.slice(0, wordsPerQuiz),
    [availableQuestions, wordsPerQuiz],
  );
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);

  const scoreRatio = wordsPerQuiz > 0 ? score / wordsPerQuiz : 0;
  const scorePercent = Math.round(scoreRatio * 100);
  const isPerfectScore = finished && wordsPerQuiz > 0 && score === wordsPerQuiz;
  const celebrationEmojis = ["👍", "👏", "🙌", "🥳", "✨", "⭐", "🎉", "💯", "🎯", "🔥"];

  /* SUPABASE START */
  const handleMarkRead = async () => {
    await incrementProgress({
      contentType: "story_chapter",
      contentKey: `chapter_${chapterNumber}`,
    });
  };

  const handleNextChapter = async () => {
    await incrementProgress({
      contentType: "story_chapter",
      contentKey: `chapter_${chapterNumber}`,
    });
    if (onNextChapter) {
      onNextChapter();
    } else {
      onBack();
    }
  };
  /* SUPABASE END */

  useEffect(() => {
    setIndex(0);
    setScore(0);
    setOptions([]);
    setSelectedAnswer(null);
    setIsLocked(false);
    setFeedback(null);
    setFinished(false);
  }, [quizItems]);

  useEffect(() => {
    const current = quizItems[index];
    if (!current) return;

    const baseOptions = Array.isArray(current.options) ? current.options : [];
    const uniqueOptions = Array.from(
      new Set([...baseOptions, current.answer]),
    );
    setOptions(shuffleArray(uniqueOptions));
    setSelectedAnswer(null);
    setIsLocked(false);
    setFeedback(null);
  }, [quizItems, index]);

  if (loadError && quizItems.length === 0) {
    return (
      <div className="story-quiz">
        <p className="story-quiz-feedback">{loadError}</p>
        <button className="ghost-btn story-action-btn" type="button" onClick={onBack}>
          🔙 Back to story
        </button>
      </div>
    );
  }

  if (quizItems.length < wordsPerQuiz) {
    return (
      <div className="story-quiz">
        <p className="story-quiz-feedback">
          Chapter {chapterNumber} quiz needs at least {wordsPerQuiz} questions.
        </p>
        <button className="ghost-btn story-action-btn" type="button" onClick={onBack}>
          🔙 Back to story
        </button>
      </div>
    );
  }

  const currentQuestion = quizItems[index];
  if (!currentQuestion) {
    return (
      <div className="story-quiz">
        <p className="story-quiz-feedback">Quiz data is missing.</p>
        <button className="ghost-btn story-action-btn" type="button" onClick={onBack}>
          🔙 Back to story
        </button>
      </div>
    );
  }

  const handleAnswer = (option) => {
    if (isLocked) return;
    const isCorrect = option === currentQuestion.answer;
    setIsLocked(true);
    setSelectedAnswer(option);
    const message = isCorrect
      ? congratsMessages[Math.floor(Math.random() * congratsMessages.length)]
      : "❌ Väärä vastaus 😢";
    const x = 30 + Math.random() * 40;
    const y = 20 + Math.random() * 30;
    setFeedback({ message, x, y });
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    window.setTimeout(() => {
      setFeedback(null);
      if (index + 1 < quizItems.length) {
        setIndex((prev) => prev + 1);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  if (finished) {
    let resultHeadline = "Great job! Upeaa työtä!";
    let resultSubtext = null;

    if (scoreRatio >= 0.8) {
      resultHeadline = "Great job! Upeaa työtä!";
      if (isPerfectScore) {
        resultSubtext = "Perfect! All correct! - Täydellistä! Kaikki oikein!";
      }
    } else if (scoreRatio >= 0.5) {
      resultHeadline = "You did okay - Ihan hyvä 👍";
    } else {
      resultHeadline = "Practice more - Harjoittele lisää 🤓";
    }

    return (
      <div className="story-quiz story-quiz-end quiz-done">
        {isPerfectScore && (
          <div className="quiz-celebration" aria-hidden="true">
            {celebrationEmojis.map((emoji, idx) => (
              <span
                key={`${emoji}-${idx}`}
                className="celebration-emoji"
                style={{
                  left: `${10 + (idx * 9) % 80}%`,
                  bottom: `${8 + (idx % 3) * 8}%`,
                  animationDelay: `${idx * 0.12}s`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
        <h2>{resultHeadline}</h2>
        {resultSubtext ? <p className="story-quiz-result-subtext">{resultSubtext}</p> : null}
        <p>
          Score: {score} / {wordsPerQuiz} ({scorePercent}%)
        </p>
        <button className="primary-btn story-action-btn" type="button" onClick={handleNextChapter}>
          Next Chapter
        </button>
      </div>
    );
  }

  return (
    <div className="story-quiz">
      <div className="story-quiz-header">
        <h2>Chapter {chapterNumber} Quiz</h2>
        <p>
          Question {index + 1} / {wordsPerQuiz}
        </p>
      </div>
      <div className="story-quiz-question">
        What is "{currentQuestion.fi}" in English?
      </div>
      <div className="story-quiz-options">
        {options.map((option) => {
          let stateClass = "";
          if (isLocked) {
            if (option === currentQuestion.answer) {
              stateClass = "correct";
            } else if (option === selectedAnswer) {
              stateClass = "incorrect";
            } else {
              stateClass = "disabled";
            }
          }

          return (
            <button
              key={option}
              className={`story-quiz-option ${stateClass}`.trim()}
              type="button"
              onClick={() => handleAnswer(option)}
              disabled={isLocked}
            >
              {option}
            </button>
          );
        })}
      </div>
      {feedback && (
        <div
          className="floating-feedback"
          style={{
            top: `${feedback.y}%`,
            left: `${feedback.x}%`,
          }}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
}
