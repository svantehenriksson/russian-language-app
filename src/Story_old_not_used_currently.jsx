import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Story.css";
import StoryQuiz from "./story/StoryQuiz";

const MAX_ENDING_CHAIN = 3;
const TOTAL_CHAPTERS = 5;


const sanitizeToken = (token = "") => token.replace(/\s+/g, " ").trim();

const buildWordEntry = (word1, word2, word3, word4) => {
  const raw1 = sanitizeToken(word1);
  const raw2 = sanitizeToken(word2);
  const raw3 = sanitizeToken(word3);
  const raw4 = sanitizeToken(word4);

  const isEnding1 = raw1.startsWith("-");
  const isEnding2 = raw1.startsWith("==") || raw1.startsWith("=");

  let display1 = raw1;
  let display2 = raw2;
  let display4 = raw4;

  if (isEnding1) {
    display1 = raw1.slice(1);
    display4 = raw4.startsWith("-") ? raw4.slice(1) : raw4;
  }

  if (isEnding2) {
    display1 = raw1.replace(/^=+/, "");
    display4 = raw4.replace(/^=+/, "");
    display2 = raw2.replace("=", "-");
  }

  return {
    display1,
    display2,
    display3: raw3,
    display4,
    isEnding1,
    isEnding2,
  };
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Story({ initialChapter = 1 }) {
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [view, setView] = useState("story");
  const [showChapterMenu, setShowChapterMenu] = useState(false);
  const [storyData, setStoryData] = useState(null);
  const [startTimes, setStartTimes] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [wordsPerQuiz, setWordsPerQuiz] = useState(0);
  const [quizLoadError, setQuizLoadError] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [audioSpeed, setAudioSpeed] = useState(0.75);

  const audioRef = useRef(null);
  const runIdRef = useRef(0);

  const wordEntries = useMemo(() => {
    if (!storyData) return [];
    const {
      highlightWords,
      highlightWords2,
      highlightWords3,
      highlightWords4,
    } = storyData;
    const length = Math.min(
      highlightWords.length,
      highlightWords2.length,
      highlightWords3.length,
      highlightWords4.length,
    );

    return Array.from({ length }, (_, idx) =>
      buildWordEntry(
        highlightWords[idx],
        highlightWords2[idx],
        highlightWords3[idx],
        highlightWords4[idx],
      ),
    );
  }, [storyData]);

  useEffect(() => {
    let isMounted = true;

    const loadChapter = async () => {
      try {
        setLoadError(null);
        setStoryData(null);
        setStartTimes([]);
        setQuizQuestions([]);
        setWordsPerQuiz(0);
        setQuizLoadError(null);

// Here was some other AI-generated code before with @vite-ignore that apparently still works in dev mode, but not in production.
        const storyTextModules = import.meta.glob('./story/chapter*/story_text.js');
        const timesModules = import.meta.glob('./story/chapter*/words_and_start_times.js');
        const quizModules = import.meta.glob('./story/chapter*/quiz_questions.js');

        const chapterId = String(currentChapter);

        const storyModule = await storyTextModules[`./story/chapter${chapterId}/story_text.js`]?.();
        if (!storyModule) throw new Error(`Missing story_text for chapter ${chapterId}`);

        const timesModule = await timesModules[`./story/chapter${chapterId}/words_and_start_times.js`]?.();
        if (!timesModule) throw new Error(`Missing words_and_start_times for chapter ${chapterId}`);

        const quizModule = await quizModules[`./story/chapter${chapterId}/quiz_questions.js`]?.();
        const quizList = quizModule?.quizQuestions ?? [];

        if (!isMounted) return;

        setStoryData({
          highlightWords: storyModule.highlightWords ?? [],
          highlightWords2: storyModule.highlightWords2 ?? [],
          highlightWords3: storyModule.highlightWords3 ?? [],
          highlightWords4: storyModule.highlightWords4 ?? [],
        });
        setStartTimes(timesModule.startTimes ?? []);
        setQuizQuestions(quizList);
        setWordsPerQuiz(Array.isArray(quizList) ? quizList.length : 0);
        if (!quizModule) {
          setQuizLoadError(`Chapter ${currentChapter} quiz not available yet.`);
        }
      } catch (error) {
        console.error("Failed to load chapter:", error);
        if (isMounted) {
          setLoadError(`Chapter ${currentChapter} not available yet.`);
        }
      }
    };

    loadChapter();

    return () => {
      isMounted = false;
    };
  }, [currentChapter]);

  useEffect(() => {
    return () => {
      runIdRef.current += 1;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = audioSpeed;
    }
  }, [audioSpeed]);

  const findWordNumberForTime = (timeSeconds) => {
    if (!Array.isArray(startTimes) || startTimes.length === 0) return 1;
    let wordNumber = 1;
    for (let i = 0; i < startTimes.length; i += 1) {
      const startTime = startTimes[i];
      if (typeof startTime !== "number") break;
      if (startTime <= timeSeconds + 0.01) {
        wordNumber = i + 1;
      } else {
        break;
      }
    }
    return wordNumber;
  };

  const findWordIndexForWordNumber = (wordNumber) => {
    if (wordNumber <= 1) return 0;
    let count = 0;
    for (let i = 0; i < wordEntries.length; i += 1) {
      if (wordEntries[i].isEnding1) continue;
      count += 1;
      if (count === wordNumber) return i;
    }
    return 0;
  };

  const handlePlay = async () => {
    if (isPlaying || wordEntries.length === 0 || startTimes.length === 0) return;

    const resumeTime = isPaused ? pausedTime : 0;
    const resumeWordNumber = resumeTime > 0 ? findWordNumberForTime(resumeTime) : 1;
    const resumeIndex = resumeTime > 0 ? findWordIndexForWordNumber(resumeWordNumber) : 0;

    setIsPlaying(true);
    setIsPaused(false);
    setPausedTime(0);
    setActiveIndexes([]);
    runIdRef.current += 1;
    const runId = runIdRef.current;

    if (!audioRef.current || !isPaused) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(
        `${import.meta.env.BASE_URL}story/chapter${currentChapter}/chapter${currentChapter}.mp3`,
      );
    }

    const audio = audioRef.current;
    audio.playbackRate = audioSpeed;
    audio.currentTime = resumeTime;
    try {
      await audio.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
      setIsPlaying(false);
      setIsPaused(false);
      return;
    }

    let wordCounter = resumeTime > 0 ? Math.max(0, resumeWordNumber - 1) : 0;

    for (let i = resumeIndex; i < wordEntries.length; i += 1) {
      if (runIdRef.current !== runId) return;
      if (wordEntries[i].isEnding1) {
        continue;
      }

      wordCounter += 1;
      const nextStart = startTimes[wordCounter];
      if (typeof nextStart !== "number") break;

      const indexes = [i];
      for (let step = 1; step <= MAX_ENDING_CHAIN; step += 1) {
        const nextIndex = i + step;
        if (wordEntries[nextIndex]?.isEnding1) {
          indexes.push(nextIndex);
        } else {
          break;
        }
      }

      setActiveIndexes(indexes);
      const delay = Math.max(
        0,
        (1000 * (nextStart - audio.currentTime)) / audio.playbackRate,
      );
      await sleep(delay);

      if (runIdRef.current !== runId) return;
      setActiveIndexes([]);
    }

    if (runIdRef.current === runId) {
      setIsPlaying(false);
      setIsPaused(false);
      setPausedTime(0);
    }
  };

  const handlePause = () => {
    runIdRef.current += 1;
    setIsPlaying(false);
    setIsPaused(true);
    setActiveIndexes([]);
    if (audioRef.current) {
      audioRef.current.pause();
      setPausedTime(audioRef.current.currentTime);
    }
  };

  const handleReset = () => {
    runIdRef.current += 1;
    setIsPlaying(false);
    setIsPaused(false);
    setPausedTime(0);
    setActiveIndexes([]);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const activeSet = useMemo(() => new Set(activeIndexes), [activeIndexes]);

  if (loadError) {
    return (
      <div className="story-page">
        <div className="container">
          <section className="card story-card">
            <header className="story-header">
              <h1 className="story-title">Luca story</h1>
              <p className="story-subtitle">{loadError}</p>
            </header>
          </section>
        </div>
      </div>
    );
  }

  if (!storyData) {
    return (
      <div className="story-page">
        <div className="container">
          <section className="card story-card">
            <header className="story-header">
              <h1 className="story-title">Luca story</h1>
              <p className="story-subtitle">Loading chapter {currentChapter}…</p>
            </header>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="story-page">
      <div className="container">
        <section className="card story-card">
          <header className="story-header">
            <h1 className="story-title">Luca story</h1>
            <p className="story-subtitle">Follow along and hover words to compare forms.</p>
          </header>

          {view === "story" ? (
            <>
              <div className="story-hero">
                <div className="story-illustration-container">
                  <img
                    className="story-illustration"
                    src={`${import.meta.env.BASE_URL}story/chapter${currentChapter}/image${currentChapter}.png`}
                    alt={`Chapter ${currentChapter} illustration`}
                  />
                </div>
                <button
                  className="primary-btn story-play-btn-large"
                  type="button"
                  onClick={isPlaying ? handlePause : handlePlay}
                  aria-pressed={isPlaying}
                >
                  {isPlaying
                    ? "⏸️ Pause audio"
                    : isPaused
                      ? "▶️ Resume audio"
                      : "▶️ Play audio"}
                </button>
                <button
                  className="ghost-btn story-reset-btn"
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset audio"
                  title="Reset audio"
                >
                  ↺
                </button>
                <div className="story-audio-controls">
                  <label className="story-audio-label" htmlFor="audio-speed">
                    Speed: {audioSpeed.toFixed(1)}x
                  </label>
                  <input
                    className="story-audio-slider"
                    id="audio-speed"
                    type="range"
                    min="0.3"
                    max="2"
                    step="0.1"
                    value={audioSpeed}
                    onChange={(event) => setAudioSpeed(Number(event.target.value))}
                  />
                </div>
              </div>

              <div className="highlight-words-container">
                {wordEntries.map((word, idx) => {
                  const isHighlighted = hoveredIndex === idx || activeSet.has(idx);
                  const className = [
                    "highlight-span",
                    word.isEnding1 ? "ending1" : "",
                    word.isEnding2 ? "ending2" : "",
                    isHighlighted ? "highlighted" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <span
                      key={`fi-${idx}`}
                      className={className}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {word.display1}
                    </span>
                  );
                })}
              </div>

              <div className="highlight-words-container">
                {wordEntries.map((word, idx) => {
                  const isHighlighted = hoveredIndex === idx || activeSet.has(idx);
                  const className = [
                    "highlight-span",
                    word.isEnding1 ? "ending1" : "",
                    word.isEnding2 ? "ending2" : "",
                    isHighlighted ? "highlighted" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <span key={`fake-en-${idx}`} className={className}>
                      {word.display2}
                    </span>
                  );
                })}
              </div>

              <div className="highlight-words-container">
                {wordEntries.map((word, idx) => (
                  <span key={`en-${idx}`} className="highlight-span">
                    {word.display3}
                  </span>
                ))}
              </div>

              <div className="highlight-words-container">
                {wordEntries.map((word, idx) => {
                  const isHighlighted = hoveredIndex === idx || activeSet.has(idx);
                  const className = [
                    "highlight-span",
                    word.isEnding1 ? "ending1" : "",
                    word.isEnding2 ? "ending2" : "",
                    isHighlighted ? "highlighted" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <span key={`fi-spoken-${idx}`} className={className}>
                      {word.display4}
                    </span>
                  );
                })}
              </div>
            </>
          ) : (
            <StoryQuiz
              chapterNumber={currentChapter}
              questions={quizQuestions}
                wordsPerQuiz={wordsPerQuiz}
              loadError={quizLoadError}
              onBack={() => setView("story")}
            />
          )}

          <div className="story-actions">
            {view === "story" ? (
              <>
                <button
                  className="primary-btn story-action-btn"
                  type="button"
                  onClick={() => {
                    if (isPlaying || isPaused) {
                      handleReset();
                    }
                    setView("quiz");
                  }}
                >
                  🧠 Chapter Quiz
                </button>
                <div className="story-chapter-switch">
                  <button
                    className="ghost-btn story-action-btn"
                    type="button"
                    onClick={() => setShowChapterMenu((prev) => !prev)}
                  >
                    Change Chapter
                  </button>
                  {showChapterMenu && (
                    <div className="story-chapter-menu">
                      {Array.from({ length: TOTAL_CHAPTERS }, (_, idx) => {
                        const chapterNumber = idx + 1;
                        return (
                          <button
                            key={chapterNumber}
                            type="button"
                            className={`story-chapter-option ${chapterNumber === currentChapter ? "active" : ""}`}
                            onClick={() => {
                              if (isPlaying || isPaused) {
                                handleReset();
                              }
                              setCurrentChapter(chapterNumber);
                              setShowChapterMenu(false);
                              setView("story");
                            }}
                          >
                            Chapter {chapterNumber}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                className="ghost-btn story-action-btn"
                type="button"
                onClick={() => setView("story")}
              >
                🔙 Back to story
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
