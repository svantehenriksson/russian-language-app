// Quiz.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { wordPairs } from "./data";
import FinnishTokenizedSentence from "./FinnishTokenizedSentence";


// For Supabase analytics:
import { trackQuizStarted } from "./supabaseAnalytics";
import { setProgressCompleted } from "./supabaseProgress";

const WORDS_PER_LEVEL = 10;
const GREAT_RATIO = 0.8;
const OK_RATIO = 0.5;

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

// Clamp a number to a range for level navigation.
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// Shuffle answer options for each quiz question.
function shuffle(arr) {
  const a = [...arr]; // Make a shallow copy of the input array to avoid mutating the original
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Sample distinct wrong answers for each question.
function sampleDistinct(arr, count, excludeSet = new Set()) {
  const pool = arr.filter((x) => !excludeSet.has(x));
  if (pool.length <= count) return shuffle(pool).slice(0, count);
  const out = [];
  const used = new Set();
  while (out.length < count) {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (used.has(pick)) continue;
    used.add(pick);
    out.push(pick);
  }
  return out;
}

// Play example audio inside quiz questions.
function AudioButton({ src }) {
  const audioRef = useRef(null);

  const play = async () => {
    try {
      if (!src) return;
      if (!audioRef.current) {
        audioRef.current = new Audio(src);
      } else if (audioRef.current.src !== src) {
        audioRef.current.pause();
        audioRef.current = new Audio(src);
      }
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
    } catch {
      // ignore autoplay / missing file errors 
    }
  };

  return (
    <button className="audio-btn" type="button" onClick={play} disabled={!src} title={src ? "Play audio" : "No audio"}>
      <span className="audio-icon" aria-hidden="true">🔊</span>
      <span className="audio-text">Audio</span>
    </button>
  );
}

// Main quiz experience for the Finnish word pairs.
export default function Quiz({ initialLevel = 1 }) {
  const totalLevels = Math.ceil(wordPairs.length / WORDS_PER_LEVEL);
  const initialLevelIndex = clamp((Number(initialLevel) || 1) - 1, 0, Math.max(totalLevels - 1, 0));

  const [levelIndex, setLevelIndex] = useState(initialLevelIndex); // 0-based
  const [mode, setMode] = useState("pre"); // "pre" | "preview" | "quiz" | "done"
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCorrect, setAnsweredCorrect] = useState(() => new Set());
  const [firstTryCorrectCount, setFirstTryCorrectCount] = useState(0);
  const [, setAttemptedOnce] = useState(() => new Set());

  const [current, setCurrent] = useState(null); // question payload
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null); // "correct" | "incorrect" | null
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showNextWordPulse, setShowNextWordPulse] = useState(false);

  //Adding some more states for the jump to level feature:
  const [showJump, setShowJump] = useState(false);
  const [jumpInput, setJumpInput] = useState("");
  const [jumpError, setJumpError] = useState("");
  //end of new states

  const feedbackTimerRef = useRef(null);
  const nextWordPulseTimerRef = useRef(null);
  const answeredCorrectRef = useRef(answeredCorrect);
  const attemptedOnceRef = useRef(new Set());
  const firstTryCorrectRef = useRef(new Set());

  /* SUPABASE START */
  const completionLoggedRef = useRef(null);
  /* SUPABASE END */

  useEffect(() => {
    const nextIndex = clamp((Number(initialLevel) || 1) - 1, 0, Math.max(totalLevels - 1, 0));
    setLevelIndex(nextIndex);
  }, [initialLevel, totalLevels]);

  const levelSlice = useMemo(() => {
    const start = levelIndex * WORDS_PER_LEVEL;
    const end = start + WORDS_PER_LEVEL;
    return wordPairs.slice(start, end).map((p, i) => ({ ...p, _idx: start + i }));
  }, [levelIndex]);

  const allEnglishAnswers = useMemo(() => wordPairs.map((p) => p.english), []);

  const levelTitle = `Level ${levelIndex + 1} / ${totalLevels}`;
  const startWordNumber = levelIndex * WORDS_PER_LEVEL + 1;
  const endWordNumber = Math.min((levelIndex + 1) * WORDS_PER_LEVEL, wordPairs.length);
  const levelTotal = levelSlice.length;
  const estimatedMinutes = Math.max(1, Math.round(levelTotal * 0.2));
  const firstTryRatio = levelTotal > 0 ? firstTryCorrectCount / levelTotal : 0;
  const isPerfectFirstTry = levelTotal > 0 && firstTryCorrectCount === levelTotal;
  const celebrationEmojis = [
    "👍",
    "✌️",
    "👏",
    "🙌",
    "🥳",
    "🤩",
    "🤠",
    "✨",
    "⭐️",
    ...(isPerfectFirstTry ? ["🎆", "🎇", "💯", "🏆", "🔥", "🌟"] : ["🙂", "🎉"]),
  ];

  // Reset selection and result when moving to a new question.
  const resetQuestionState = () => {
    setSelected(null);
    setResult(null);
    setLocked(false);
    setFeedback(null);
    setShowNextWordPulse(false);
  };

  // Clear delayed transitions between questions.
  const clearTimer = () => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
    if (nextWordPulseTimerRef.current) {
      clearTimeout(nextWordPulseTimerRef.current);
      nextWordPulseTimerRef.current = null;
    }
  };

  // Build the current question with shuffled options.
  const buildQuestion = (answeredSet = answeredCorrectRef.current) => {
    if (levelSlice.length === 0) return;

    const remaining = levelSlice.filter((p) => !answeredSet.has(p._idx));

    if (remaining.length === 0) {
      setMode("done");
      setCurrent(null);
      resetQuestionState();
      return;
    }

    const pair = remaining[Math.floor(Math.random() * remaining.length)];
    const correct = pair.english;

    const wrongs = sampleDistinct(allEnglishAnswers, 3, new Set([correct]));
    const options = shuffle([correct, ...wrongs]);

    setCurrent({
      prompt: pair.finnish,
      correct,
      options,
      pairIndex: pair._idx,
      exampleFI: pair.exampleFI,
      exampleEN: pair.exampleEN,
      audio: pair.audio, // e.g. "olla.mp3"
    });

    console.log("Current word:", pair.finnish, "- Index:", pair._idx);

    resetQuestionState();
  };

  useEffect(() => {
    clearTimer();
    setMode("pre");
    setCorrectCount(0);
    setAnsweredCorrect(new Set());
    setFirstTryCorrectCount(0);
    setAttemptedOnce(new Set());
    answeredCorrectRef.current = new Set();
    attemptedOnceRef.current = new Set();
    firstTryCorrectRef.current = new Set();
    setCurrent(null);
    resetQuestionState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIndex]);

  useEffect(() => {
    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  /* SUPABASE START */
  useEffect(() => {
    if (mode !== "done") return;
    const key = `quiz_${levelIndex + 1}`;
    if (completionLoggedRef.current === key) return;
    completionLoggedRef.current = key;

    // Persist quiz completion progress when a level finishes.
    setProgressCompleted({
      contentType: "quiz_level",
      contentKey: key,
      completed: correctCount,
    });
  }, [mode, levelIndex, correctCount]);
  /* SUPABASE END */
  
  // Start the quiz mode from the pre-screen.
  const startQuiz = () => {
    
    /* SUPABASE START */
    // Log quiz start at the current level for minimal analytics.
    trackQuizStarted(levelIndex + 1);
    /* SUPABASE END */
    
    setMode("quiz");
    setCorrectCount(0);
    setFirstTryCorrectCount(0);
    setAttemptedOnce(new Set());
    answeredCorrectRef.current = new Set();
    attemptedOnceRef.current = new Set();
    firstTryCorrectRef.current = new Set();
    buildQuestion();
  };

  // Switch to preview mode to show the word list.
  const startPreview = () => setMode("preview");
  // Return to the pre-screen from preview mode.
  const backToPre = () => setMode("pre");

  // Handle an answer choice and wait for explicit "Next word" CTA.
  const onPick = (opt) => {
    if (!current || locked) return;

    setSelected(opt);
    setLocked(true);

    const isCorrect = opt === current.correct;
    setResult(isCorrect ? "correct" : "incorrect");

    if (!attemptedOnceRef.current.has(current.pairIndex)) {
      const nextAttempted = new Set(attemptedOnceRef.current);
      nextAttempted.add(current.pairIndex);
      attemptedOnceRef.current = nextAttempted;
      setAttemptedOnce(nextAttempted);

      if (isCorrect) {
        const nextFirstTry = new Set(firstTryCorrectRef.current);
        nextFirstTry.add(current.pairIndex);
        firstTryCorrectRef.current = nextFirstTry;
        setFirstTryCorrectCount(nextFirstTry.size);
      }
    }

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setAnsweredCorrect((prev) => {
        const next = new Set(prev);
        next.add(current.pairIndex);
        answeredCorrectRef.current = next;
        return next;
      });
    }

    clearTimer();

    const message = isCorrect
      ? congratsMessages[Math.floor(Math.random() * congratsMessages.length)]
      : "❌ Väärä vastaus 😢";
    const x = 30 + Math.random() * 40;
    const y = 20 + Math.random() * 30;
    setFeedback({ message, x, y });
    feedbackTimerRef.current = setTimeout(() => {
      setFeedback(null);
      feedbackTimerRef.current = null;
    }, 1500);
    setShowNextWordPulse(false);
    nextWordPulseTimerRef.current = setTimeout(() => {
      setShowNextWordPulse(true);
      nextWordPulseTimerRef.current = null;
    }, 5000);
  };

  const goToNextWord = () => {
    if (!locked) return;
    buildQuestion(answeredCorrectRef.current);
  };

  // Advance to the next level.
  const nextLevel = () => setLevelIndex((i) => clamp(i + 1, 0, totalLevels - 1));
  // Restart the current level and reset quiz progress.
  const restartLevel = () => {
    clearTimer();
    setMode("pre");
    setCorrectCount(0);
    setFirstTryCorrectCount(0);
    setAttemptedOnce(new Set());
    answeredCorrectRef.current = new Set();
    attemptedOnceRef.current = new Set();
    firstTryCorrectRef.current = new Set();
    setCurrent(null);
    resetQuestionState();
  };

  const openJump = () => {
    setJumpInput(String(levelIndex + 1));
    setJumpError("");
    setShowJump(true);
  };

  const closeJump = () => {
    setShowJump(false);
    setJumpError("");
  };

  const applyJump = (nextValue) => {
    const parsed = Number.parseInt(String(nextValue).trim(), 10);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > totalLevels) {
      setJumpError(`Levels 1 - ${totalLevels} available`);
      return;
    }
    setJumpError("");
    setShowJump(false);
    setLevelIndex(parsed - 1);
  };

  const nudgeJump = (delta) => {
    const currentValue = Number.parseInt(String(jumpInput).trim(), 10);
    const base = Number.isInteger(currentValue) ? currentValue : levelIndex + 1;
    const next = clamp(base + delta, 1, totalLevels);
    setJumpInput(String(next));
    setJumpError("");
  };

  return (
    <div className="container">
      <section className="quiz-shell">
          <div className="quiz-header">
          <div>
            <div className="quiz-eyebrow">{levelTitle}</div>
            <h2 className="quiz-title">Quiz</h2>
          </div>

          <div className="quiz-header-actions">
            <button
              className="ghost-btn quiz-header-reset"
              type="button"
              onClick={restartLevel}
              aria-label="Reset level"
              title="Reset level"
            >
              ↺
            </button>
            <button className="ghost-btn" type="button" onClick={openJump}>
              Jump to level
            </button>
          </div>
        </div>

        {mode === "pre" && (
          <div className="card quiz-card">
            <div className="card-header">
              <div className="card-title">
                Ready to practice Finnish words {startWordNumber} to {endWordNumber}? 💪 🧠
              </div>
              <div className="card-chip">{WORDS_PER_LEVEL} words • ~{estimatedMinutes} min</div>
            </div>

            <div className="card-body">
              <p className="quiz-copy">
                Start the level, or preview words and example sentences.
              </p>
              <div className="quiz-pre-context">
                {levelIndex > 0
                  ? `You have completed ${levelIndex} level${levelIndex === 1 ? "" : "s"}. Let's do level ${levelIndex + 1}.`
                  : "Starting at level 1. Build momentum with 10 words at a time."}
              </div>

              <div className="quiz-cta">
                <button className="primary-btn" type="button" onClick={startQuiz}>
                  {levelIndex > 0 ? `Continue level ${levelIndex + 1}` : "Start level"}
                </button>
                <button className="ghost-btn" type="button" onClick={startPreview}>
                  Show words first
                </button>
              </div>

           
            </div>
          </div>
        )}

        {mode === "preview" && (
          <div className="card quiz-card">
            <div className="card-header">
              <div className="card-title">Words in this level</div>
              <div className="card-chip">{levelSlice.length} items</div>
            </div>

            <div className="card-body">
              <div className="preview-grid">
                {levelSlice.map((p) => (
                  <div className="preview-item" key={p._idx}>
                    <div className="preview-top">
                      <div>
                        <div className="preview-fi">{p.finnish}</div>
                        <div className="preview-en">{p.english}</div>
                      </div>
                      <AudioButton src={p.audio ? `${import.meta.env.BASE_URL}audio/${p.audio}` : ""} />
                    </div>

                    <div className="preview-ex">
                      <FinnishTokenizedSentence sentence={p.exampleFI} />
                      <div className="preview-ex-en">{p.exampleEN}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="quiz-cta">
                <button className="primary-btn" type="button" onClick={startQuiz}>
                  Start quiz
                </button>
                <button className="ghost-btn" type="button" onClick={backToPre}>
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {mode === "quiz" && current && (
          <div className="card quiz-card">
            <div className="card-body">
              <div className="question">
                <div className="question-top">
                  <div>
                    <div className="question-label">Finnish</div>
                    <div className="question-word">{current.prompt}</div>
                  </div>
                  <AudioButton src={current.audio ? `${import.meta.env.BASE_URL}audio/${current.audio}` : ""} />
                </div>

                {locked && (
                  <div className="question-examples">
                    <FinnishTokenizedSentence sentence={current.exampleFI} />
                    <div className="question-ex-en">{current.exampleEN}</div>
                  </div>
                )}
              </div>

              <div className="options">
                {current.options.map((opt) => {
                  const isSelected = selected === opt;
                  const isCorrect = opt === current.correct;
                  const showCorrect = locked && isCorrect;
                  const showWrong = locked && isSelected && !isCorrect;

                  const cls = [
                    "option-btn",
                    isSelected ? "selected" : "",
                    showCorrect ? "correct" : "",
                    showWrong ? "incorrect" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <button key={opt} type="button" className={cls} onClick={() => onPick(opt)} disabled={locked}>
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="result-row" aria-live="polite">
                {result === "correct" && <div className="result correct-text">CORRECT!</div>}
                {result === "incorrect" && <div className="result incorrect-text">INCORRECT</div>}
                {!result && <div className="result muted"> </div>}
              </div>

              {locked && (
                <div className="quiz-next-word-row">
                  <button
                    className={`primary-btn quiz-next-word-btn ${showNextWordPulse ? "quiz-next-word-pulse" : ""}`.trim()}
                    type="button"
                    onClick={goToNextWord}
                  >
                    {answeredCorrectRef.current.size >= WORDS_PER_LEVEL
                      ? "See results - Näe tulokset"
                      : "Next word - Seuraava sana"}
                  </button>
                </div>
              )}

              <div className="progress">
                <div className="progress-label">
                  <span>Progress</span>
                  <span className="muted">
                    {correctCount} / {WORDS_PER_LEVEL}
                  </span>
                </div>
                <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={WORDS_PER_LEVEL} aria-valuenow={correctCount}>
                  <div className="progress-fill" style={{ width: `${(correctCount / WORDS_PER_LEVEL) * 100}%` }} />
                </div>
              </div>
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
        )}

        {mode === "done" && (
          <div className="card quiz-card quiz-done">
            <div className="card-header">
              <div className="card-title">Level complete - Taso valmis</div>
              <div className="card-chip">{correctCount} / {levelTotal}</div>
            </div>

            <div className="card-body">
              <div className="quiz-celebration" aria-hidden="true">
                {celebrationEmojis.map((emoji, idx) => (
                  <span
                    key={`${emoji}-${idx}`}
                    className="celebration-emoji"
                    style={{
                      left: `${10 + (idx * 12) % 80}%`,
                      bottom: `${8 + (idx % 3) * 8}%`,
                      animationDelay: `${idx * 0.15}s`,
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
              <div className="quiz-score-hero" aria-label={`First try score ${firstTryCorrectCount} out of ${levelTotal}`}>
                {firstTryCorrectCount}/{levelTotal}
              </div>
              <h3 className="done-title">
                {isPerfectFirstTry
                  ? "Perfect! Täydellistä!"
                  : firstTryRatio >= GREAT_RATIO
                    ? "Great job! Upeaa työtä!"
                    : firstTryRatio >= OK_RATIO
                      ? "You did okay - Ihan hyvä 👍"
                      : "Practice more - Harjoittele lisää 🤓"}
              </h3>
              <p className="quiz-copy">
                {isPerfectFirstTry
                  ? "Perfect! All correct at first try. - Täydellistä! Kaikki oikein ensimmäisellä yrittämällä."
                  : "First-try score shown above. - Ensimmäisen yrityksen tulos yllä."}
              </p>

              <div className="quiz-cta">
                <button className="ghost-btn" type="button" onClick={startPreview}>
                  Show words again - Näytä sanat
                </button>
                <button className="ghost-btn" type="button" onClick={restartLevel}>
                  Retry level - Yritä uudelleen
                </button>
                <button
                  className="primary-btn"
                  type="button"
                  onClick={nextLevel}
                  disabled={levelIndex >= totalLevels - 1}
                  title={levelIndex >= totalLevels - 1 ? "No more levels available" : "Go to next level"}
                >
                  Next level - Seuraava taso
                </button>
              </div>

              {levelIndex >= totalLevels - 1 && <div className="muted quiz-note">You’ve reached the last level currently available. - Olet viimeisellä tasolla.</div>}
            </div>
          </div>
        )}
      </section>

      {showJump && (
        <div className="jump-backdrop" role="presentation" onClick={closeJump}>
          <div
            className="jump-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Jump to level 1 - ${totalLevels}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="jump-header">
              <div className="jump-title">Jump to level</div>
              <div className="jump-subtitle">Levels 1 - {totalLevels}</div>
            </div>
            <div className="jump-controls">
              <button className="ghost-btn jump-step" type="button" onClick={() => nudgeJump(-1)}>
                −
              </button>
              <input
                className="jump-input"
                type="text"
                inputMode="numeric"
                value={jumpInput}
                onChange={(event) => {
                  setJumpInput(event.target.value);
                  setJumpError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    applyJump(jumpInput);
                  }
                }}
                aria-label="Level number"
              />
              <button className="ghost-btn jump-step" type="button" onClick={() => nudgeJump(1)}>
                +
              </button>
            </div>
            {jumpError && <div className="jump-error">{jumpError}</div>}
            <div className="jump-actions">
              <button className="ghost-btn" type="button" onClick={closeJump}>
                Cancel
              </button>
              <button className="primary-btn" type="button" onClick={() => applyJump(jumpInput)}>
                Jump
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
