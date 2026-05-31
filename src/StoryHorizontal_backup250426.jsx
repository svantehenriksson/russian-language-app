import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Story.css";
import StoryQuiz from "./story/StoryQuiz";
import { chapterTitles } from "./story/titles/titles";

//For Supabase analytics:
import { trackStoryOpened } from "./supabaseAnalytics";
import { fetchProgress, getCurrentUserId, incrementProgress } from "./supabaseProgress";

const MAX_ENDING_CHAIN = 3;
const TOTAL_CHAPTERS = Object.keys(chapterTitles).length;
const MIN_AUDIO_SPEED = 0.3;
const MAX_AUDIO_SPEED = 3.0;
const AUDIO_SPEED_STEP = 0.1;


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

const endsSentence = (token) => /[.!?]["”']?$/.test(token);

export default function Story({ initialChapter = 1 }) {
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [view, setView] = useState("story");
  const [showChapterJump, setShowChapterJump] = useState(false);
  const [chapterJumpInput, setChapterJumpInput] = useState("");
  const [chapterJumpError, setChapterJumpError] = useState("");
  const [storyData, setStoryData] = useState(null);
  const [startTimes, setStartTimes] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  // wordsPerQuiz almost certainly shouldn't be "state" and now we manipulate this in many places of the code.
  // Coding quickly now but will pay later for this mess with a slower re-factoring:
  const [wordsPerQuiz, setWordsPerQuiz] = useState(0);
  const [quizLoadError, setQuizLoadError] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(0.75);
  const [openGrammarIndex, setOpenGrammarIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [audioEl, setAudioEl] = useState(null);
  const [storyScrollLeft, setStoryScrollLeft] = useState(0);
  const [storyScrollMax, setStoryScrollMax] = useState(0);

  /* SUPABASE START */
  const [readCount, setReadCount] = useState(0);
  const [isReadAnimating, setIsReadAnimating] = useState(false);
  const [canMarkRead, setCanMarkRead] = useState(false);
  const [showLoginSaveHint, setShowLoginSaveHint] = useState(false);
  /* SUPABASE END */

  const scrollRef = useRef(null);
  const audioRef = useRef(null);
  const audioChapterRef = useRef(null);
  const runIdRef = useRef(0);
  const lastActiveIndexesRef = useRef([]);
  const speedHoldTimeoutRef = useRef(null);
  const speedHoldIntervalRef = useRef(null);

  /* SUPABASE START */
  const readTimerRef = useRef(null);
  const loginHintTimerRef = useRef(null);
  /* SUPABASE END */

  const wordEntries = useMemo(() => {
    if (!storyData) return [];
    const { highlightWords, highlightWords2, highlightWords4 } = storyData;
    const length = Math.min(
      highlightWords.length,
      highlightWords2.length,
      highlightWords4.length,
    );

    return Array.from({ length }, (_, idx) =>
      buildWordEntry(
        highlightWords[idx],
        highlightWords2[idx],
        "",
        highlightWords4[idx],
      ),
    );
  }, [storyData]);

  const englishWords = useMemo(
    () => (storyData?.highlightWords3 ?? []).filter((word) => word.trim() !== ""),  //AI added this filter to remove empty words - would be better to find root cause instead.
    [storyData],
  );

  useEffect(() => {
    const parsed = Number.parseInt(String(initialChapter), 10);
    if (!Number.isInteger(parsed)) return;
    if (parsed < 1 || parsed > TOTAL_CHAPTERS) return;
    setCurrentChapter(parsed);
  }, [initialChapter]);

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
        const grammarModules = import.meta.glob('./story/chapter*/grammar.js');

        const chapterId = String(currentChapter);

        const storyModule = await storyTextModules[`./story/chapter${chapterId}/story_text.js`]?.();
        if (!storyModule) throw new Error(`Missing story_text for chapter ${chapterId}`);

        const timesModule = await timesModules[`./story/chapter${chapterId}/words_and_start_times.js`]?.();
        if (!timesModule) throw new Error(`Missing words_and_start_times for chapter ${chapterId}`);

        const quizModule = await quizModules[`./story/chapter${chapterId}/quiz_questions.js`]?.();
        const grammarModule = await grammarModules[`./story/chapter${chapterId}/grammar.js`]?.();
        const quizList = quizModule?.quizQuestions ?? [];
        const grammarNotes = grammarModule?.grammarNotes ?? [];

        if (!isMounted) return;

        setStoryData({
          highlightWords: storyModule.highlightWords ?? [],
          highlightWords2: storyModule.highlightWords2 ?? [],
          highlightWords3: storyModule.highlightWords3 ?? [],
          highlightWords4: storyModule.highlightWords4 ?? [],
          grammarNotes,
        });
        
        /* SUPABASE START */
        // Log that a story chapter has been opened for minimal analytics.
        trackStoryOpened(chapterId);
        /* SUPABASE END */
        
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


  /* SUPABASE START */
  useEffect(() => {
    let isMounted = true;

    const loadProgress = async () => {
      
      /* SUPABASE START */
      // Load chapter progress for the Mark as Read button.
      const userId = await getCurrentUserId();
      if (!isMounted) return;
      setCanMarkRead(Boolean(userId));
      if (!userId) {
        setReadCount(0);
        return;
      }
      const completed = await fetchProgress({
        contentType: "story_chapter",
        contentKey: `chapter_${currentChapter}`,
      });
      if (!isMounted) return;
      setReadCount(completed);
      /* SUPABASE END */
      
    };

    loadProgress();

    return () => {
      isMounted = false;
      if (readTimerRef.current) {
        clearTimeout(readTimerRef.current);
        readTimerRef.current = null;
      }
      if (loginHintTimerRef.current) {
        clearTimeout(loginHintTimerRef.current);
        loginHintTimerRef.current = null;
      }
    };
  }, [currentChapter]);
  /* SUPABASE END */


  useEffect(() => {
    return () => {
      runIdRef.current += 1;
      if (speedHoldTimeoutRef.current) {
        clearTimeout(speedHoldTimeoutRef.current);
        speedHoldTimeoutRef.current = null;
      }
      if (speedHoldIntervalRef.current) {
        clearInterval(speedHoldIntervalRef.current);
        speedHoldIntervalRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      audioChapterRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = audioSpeed;
    }
  }, [audioSpeed]);

  const resetAudioState = ({ clearHighlights = true } = {}) => {
    runIdRef.current += 1;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    audioChapterRef.current = null;
    setAudioEl(null);
    setIsPlaying(false);
    setIsPaused(false);
    setPausedTime(0);
    if (clearHighlights) {
      lastActiveIndexesRef.current = [];
      setActiveIndexes([]);
    }
  };

  const ensureAudioForCurrentChapter = () => {
    if (
      !audioRef.current ||
      audioChapterRef.current !== currentChapter
    ) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(
        `${import.meta.env.BASE_URL}story/chapter${currentChapter}/chapter${currentChapter}.mp3`,
      );
      audioRef.current.playbackRate = audioSpeed;
      audioChapterRef.current = currentChapter;
      setAudioEl(audioRef.current);
    }
    return audioRef.current;
  };

  useEffect(() => {
    resetAudioState();
  }, [currentChapter]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    const updateScrollMetrics = () => {
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      setStoryScrollLeft(el.scrollLeft);
      setStoryScrollMax(max);
    };

    updateScrollMetrics();
    el.addEventListener("scroll", updateScrollMetrics, { passive: true });
    window.addEventListener("resize", updateScrollMetrics);

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateScrollMetrics);
      resizeObserver.observe(el);
    }

    return () => {
      el.removeEventListener("scroll", updateScrollMetrics);
      window.removeEventListener("resize", updateScrollMetrics);
      resizeObserver?.disconnect();
    };
  }, [wordEntries.length, view, currentChapter]);

  useEffect(() => {
    if (openGrammarIndex === null) return;

    const handleOutsideClick = (event) => {
      if (event.target.closest(".story-grammar-toggle")) return;
      if (event.target.closest(".story-grammar-panel")) return;
      setOpenGrammarIndex(null);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpenGrammarIndex(null);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openGrammarIndex]);

  // Helper used by handlePlay and audio in general to map playback time to word number.
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

  // Helper used by handlePlay and audio in general to map a word number to a word index.
  const findWordIndexForWordNumber = (wordNumber) => {
    if (wordNumber <= 1) return 0;
    let count = 0;
    for (let i = 0; i < wordEntries.length; i += 1) {
      if (wordEntries[i].isEnding1 || wordEntries[i].isEnding2) continue; // ADDED OR STATEMENT HERE. BUG SUSPECTED. EARLIER IT ONLY CHECKED FOR ENDING1. 15/02/2026
      count += 1;
      if (count === wordNumber) return i;
    }
    return 0;
  };

  // Helper used by handlePlay and audio in general to map a word index to a word number.
  const findWordNumberForIndex = (wordIndex) => {
    let count = 0;
    for (let i = 0; i <= wordIndex && i < wordEntries.length; i += 1) {
      if (wordEntries[i].isEnding1 || wordEntries[i].isEnding2) continue;
      count += 1;
    }
    return Math.max(1, count);
  };

  // Helper used by handlePlay and audio in general to pick the base word index for endings.
  const getBaseWordIndex = (wordIndex) => {
    let baseIndex = wordIndex;
    while (
      baseIndex > 0 &&
      (wordEntries[baseIndex]?.isEnding1 || wordEntries[baseIndex]?.isEnding2)
    ) {
      baseIndex -= 1;
    }
    return Math.max(0, baseIndex);
  };

  // Helper used by handlePlay and audio in general to compute the active word indexes for a base word.
  const getActiveIndexesForBaseIndex = (baseIndex) => {
    const indexes = [baseIndex];
    for (let step = 1; step <= MAX_ENDING_CHAIN; step += 1) {
      const nextIndex = baseIndex + step;
      if (wordEntries[nextIndex]?.isEnding1 || wordEntries[nextIndex]?.isEnding2) {
        indexes.push(nextIndex);
      } else {
        break;
      }
    }
    return indexes;
  };

  // Helper used by handlePlay and audio in general to compute active indexes for a playback time.
  const getActiveIndexesForTime = (timeSeconds) => {
    if (!wordEntries.length) return [];
    const wordNumber = findWordNumberForTime(timeSeconds);
    const wordIndex = findWordIndexForWordNumber(wordNumber);
    return getActiveIndexesForBaseIndex(wordIndex);
  };

  // Helper used by handlePlay and audio in general to avoid redundant state updates.
  const areSameIndexes = (nextIndexes, currentIndexes) =>
    nextIndexes.length === currentIndexes.length &&
    nextIndexes.every((value, idx) => value === currentIndexes[idx]);

  // Helper used by handlePlay and audio in general to update highlights from the current time.
  const updateActiveIndexesForTime = (timeSeconds) => {
    const nextIndexes = getActiveIndexesForTime(timeSeconds);
    if (areSameIndexes(nextIndexes, lastActiveIndexesRef.current)) return;
    lastActiveIndexesRef.current = nextIndexes;
    setActiveIndexes(nextIndexes);
  };

  // Effect used by handlePlay and audio in general to keep UI state in sync with audio events.
  useEffect(() => {
    if (!audioEl) return undefined;

    const handleTimeUpdate = () => {
      updateActiveIndexesForTime(audioEl.currentTime);
      /* DEBUG START */
      const currentAudioTime = audioEl.currentTime;
      const totalDuration = audioEl.duration;

      const wordNumber = findWordNumberForTime(currentAudioTime);
      const wordIndex = findWordIndexForWordNumber(wordNumber);

      console.log(`Time: ${currentAudioTime.toFixed(2)}s / ${totalDuration.toFixed(2)}s`);
      console.log(`Calculated Word Index: ${wordIndex}`);
      console.log(`Word Entries Length: ${wordEntries.length}`);

      if (wordIndex >= wordEntries.length) {
        console.warn("Audio time exceeds available word mapping!");
      }
      console.log("Last start time:", startTimes[startTimes.length - 1]);
      console.log("Audio duration:", audioEl.duration);
      /*DEBUG END*/
    };

    const handleAudioPlay = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    const handleAudioPause = () => {
      setIsPlaying(false);
      setIsPaused(true);
      setPausedTime(audioEl.currentTime);
    };

    const handleAudioEnded = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setPausedTime(0);
      lastActiveIndexesRef.current = [];
      setActiveIndexes([]);
    };

    const handleAudioError = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    audioEl.addEventListener("timeupdate", handleTimeUpdate);
    /* DEBUG START */
    const handleAudioEndedDebug = () => {
      console.log("Audio truly ended");
      setIsPlaying(false);
    };
    audioEl.addEventListener("ended", handleAudioEndedDebug);
    /*DEBUG END*/
    audioEl.addEventListener("play", handleAudioPlay);
    audioEl.addEventListener("pause", handleAudioPause);
    audioEl.addEventListener("ended", handleAudioEnded);
    audioEl.addEventListener("error", handleAudioError);

    return () => {
      audioEl.removeEventListener("timeupdate", handleTimeUpdate);
      /* DEBUG START */
      audioEl.removeEventListener("ended", handleAudioEndedDebug);
      /*DEBUG END*/
      audioEl.removeEventListener("play", handleAudioPlay);
      audioEl.removeEventListener("pause", handleAudioPause);
      audioEl.removeEventListener("ended", handleAudioEnded);
      audioEl.removeEventListener("error", handleAudioError);
    };
  }, [audioEl, startTimes, wordEntries]);

  // Helper used by handlePlay and audio in general to seek to a word index from user input.
  const handleSeekToWordIndex = (wordIndex) => {
    if (!Array.isArray(startTimes) || startTimes.length === 0) return;
    ensureAudioForCurrentChapter();

    const baseIndex = getBaseWordIndex(wordIndex);
    const wordNumber = findWordNumberForIndex(baseIndex);
    const startTime = startTimes[wordNumber - 1];
    if (typeof startTime !== "number") return;

    audioRef.current.currentTime = startTime;
    setPausedTime(startTime);
    updateActiveIndexesForTime(startTime);
    scrollToWordIndex(baseIndex, "smooth");
  };

  const handlePlayFromWordIndex = async (wordIndex) => {
    handleSeekToWordIndex(wordIndex);
    if (!audioRef.current) return;

    try {
      audioRef.current.playbackRate = audioSpeed;
      await audioRef.current.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  const scrollToWordIndex = (wordIndex, behavior = "smooth") => {
    if (!scrollRef.current) return;
    const target = scrollRef.current.querySelector(
      `[data-word-index="${wordIndex}"]`,
    );
    if (!target) return;

    const containerLeft = scrollRef.current.getBoundingClientRect().left;
    const targetLeft = target.getBoundingClientRect().left;
    const nextLeft = scrollRef.current.scrollLeft + (targetLeft - containerLeft);
    scrollRef.current.scrollTo({
      left: Math.max(0, nextLeft),
      behavior,
    });
  };

  // Handler used by audio controls to start playback and sync highlights to the audio element.
  const handlePlay = async () => {
    if (isPlaying || wordEntries.length === 0 || startTimes.length === 0) return;

    const resumeTime = pausedTime > 0 ? pausedTime : 0;
    const resumeWordNumber = resumeTime > 0 ? findWordNumberForTime(resumeTime) : 1;
    const resumeIndex = resumeTime > 0 ? findWordIndexForWordNumber(resumeWordNumber) : 0;
    const sentenceStartIndex =
      resumeTime > 0
        ? sentenceGroups.find((sentence) => sentence.includes(resumeIndex))?.[0] ?? 0
        : 0;

    setIsPlaying(true);
    setIsPaused(false);
    setPausedTime(0);
    runIdRef.current += 1;
    const runId = runIdRef.current;

    if (!isPaused) {
      resetAudioState({ clearHighlights: false });
    }
    const audio = ensureAudioForCurrentChapter();
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

    scrollToWordIndex(sentenceStartIndex, "smooth");
    if (runIdRef.current === runId) {
      updateActiveIndexesForTime(resumeTime);
    }
  };

  const handlePause = () => {
    runIdRef.current += 1;
    setIsPlaying(false);
    setIsPaused(true);
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
    lastActiveIndexesRef.current = [];
    setActiveIndexes([]);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    scrollToWordIndex(0, "smooth");
  };

  const nudgeAudioSpeed = (direction) => {
    const next = Number((audioSpeed + direction * AUDIO_SPEED_STEP).toFixed(1));
    const clamped = Math.min(MAX_AUDIO_SPEED, Math.max(MIN_AUDIO_SPEED, next));
    setAudioSpeed(clamped);
  };

  const stopSpeedHold = () => {
    if (speedHoldTimeoutRef.current) {
      clearTimeout(speedHoldTimeoutRef.current);
      speedHoldTimeoutRef.current = null;
    }
    if (speedHoldIntervalRef.current) {
      clearInterval(speedHoldIntervalRef.current);
      speedHoldIntervalRef.current = null;
    }
  };

  const startSpeedHold = (direction) => {
    nudgeAudioSpeed(direction);
    stopSpeedHold();
    speedHoldTimeoutRef.current = setTimeout(() => {
      speedHoldIntervalRef.current = setInterval(() => {
        setAudioSpeed((prev) => {
          const next = Number((prev + direction * AUDIO_SPEED_STEP).toFixed(1));
          return Math.min(MAX_AUDIO_SPEED, Math.max(MIN_AUDIO_SPEED, next));
        });
      }, 70);
    }, 280);
  };

  const openChapterJump = () => {
    setChapterJumpInput(String(currentChapter));
    setChapterJumpError("");
    setShowChapterJump(true);
  };

  const closeChapterJump = () => {
    setShowChapterJump(false);
    setChapterJumpError("");
  };

  const applyChapterJump = (nextValue) => {
    const parsed = Number.parseInt(String(nextValue).trim(), 10);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > TOTAL_CHAPTERS) {
      setChapterJumpError(`Chapters 1 - ${TOTAL_CHAPTERS} available`);
      return;
    }
    resetAudioState();
    setCurrentChapter(parsed);
    setView("story");
    setChapterJumpError("");
    setShowChapterJump(false);
  };

  const nudgeChapterJump = (delta) => {
    const currentValue = Number.parseInt(String(chapterJumpInput).trim(), 10);
    const base = Number.isInteger(currentValue) ? currentValue : currentChapter;
    const next = Math.max(1, Math.min(TOTAL_CHAPTERS, base + delta));
    setChapterJumpInput(String(next));
    setChapterJumpError("");
  };

  const parsedChapterJumpInput = Number.parseInt(String(chapterJumpInput).trim(), 10);
  const hasValidChapterPreview =
    Number.isInteger(parsedChapterJumpInput) &&
    parsedChapterJumpInput >= 1 &&
    parsedChapterJumpInput <= TOTAL_CHAPTERS;
  const chapterPreviewTitle = hasValidChapterPreview
    ? (chapterTitles[parsedChapterJumpInput] ?? `Chapter ${parsedChapterJumpInput}`)
    : "";
  const [chapterPreviewFinnish, ...chapterPreviewEnglishParts] =
    chapterPreviewTitle.split(" - ");
  const chapterPreviewEnglish = chapterPreviewEnglishParts.join(" - ");


  /* SUPABASE START */
  const handleMarkRead = async () => {
    if (!canMarkRead) {
      setShowLoginSaveHint(true);
      if (loginHintTimerRef.current) {
        clearTimeout(loginHintTimerRef.current);
      }
      loginHintTimerRef.current = setTimeout(() => {
        setShowLoginSaveHint(false);
        loginHintTimerRef.current = null;
      }, 2200);
      return;
    }
    setShowLoginSaveHint(false);
    setIsReadAnimating(true);
    if (readTimerRef.current) {
      clearTimeout(readTimerRef.current);
    }
    readTimerRef.current = setTimeout(() => {
      setIsReadAnimating(false);
      readTimerRef.current = null;
    }, 650);

    
    /* SUPABASE START */
    // Increment read progress for the current story chapter.
    const nextCompleted = await incrementProgress({
      contentType: "story_chapter",
      contentKey: `chapter_${currentChapter}`,
    });
    if (typeof nextCompleted === "number") {
      setReadCount(nextCompleted);
    }
    /* SUPABASE END */
    
  };

  /* SUPABASE END */

  const activeSet = useMemo(() => new Set(activeIndexes), [activeIndexes]);
  const activeAnchorIndex = hoveredIndex ?? activeIndexes[0] ?? null;
  const sentenceGroups = useMemo(() => {
    const groups = [];
    let current = [];

    wordEntries.forEach((word, idx) => {
      if (
        word.display1.trim() === "" &&
        word.display2.trim() === "" &&
        word.display4.trim() === ""
      ) {
        return;
      }

      current.push(idx);
      if (endsSentence(word.display1)) {
        groups.push(current);
        current = [];
      }
    });

    if (current.length > 0) {
      groups.push(current);
    }

    return groups;
  }, [wordEntries]);


  // The code is getting patchy and spaghetti-like but the English translations are not working as expected.
// That's because the English sentences are a different length than the other 3, that are designed to be the same length.
// Below a vibe-coded helper function, but stuff in the beginning was heavily edited as well by AI.
// For example, the English story is now imported in a separate statement from the rest.

  const englishSentenceGroups = useMemo(() => {
    const groups = [];
    let current = [];

    englishWords.forEach((word, idx) => {
      current.push(idx);
      if (endsSentence(word)) {
        groups.push(current);
        current = [];
      }
    });

    if (current.length > 0) {
      groups.push(current);
    }

    return groups;
  }, [englishWords]);

  useEffect(() => {
    console.log("englishSentenceGroups:", englishSentenceGroups);
  }, [englishSentenceGroups]);






  const getWordClass = (word, idx) => {
    const isHighlighted = hoveredIndex === idx || activeSet.has(idx);
    return [
      "highlight-span",
      word.isEnding1 ? "ending1" : "",
      word.isEnding2 ? "ending2" : "",
      isHighlighted ? "highlighted" : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  useEffect(() => {
    if (!scrollRef.current || activeAnchorIndex === null) return;
    const target = scrollRef.current.querySelector(
      `[data-word-index="${activeAnchorIndex}"]`,
    );
    if (!target) return;

    const containerLeft = scrollRef.current.getBoundingClientRect().left;
    const targetLeft = target.getBoundingClientRect().left;
    const nextLeft = scrollRef.current.scrollLeft + (targetLeft - containerLeft);

    if (
      isPlaying &&
      activeAnchorIndex !== null &&
      wordEntries[activeAnchorIndex] &&
      endsSentence(wordEntries[activeAnchorIndex - 1]?.display1 || "")
    ) {
      scrollRef.current.scrollTo({
        left: Math.max(0, nextLeft),
        behavior: "smooth",
      });
    }
  }, [activeAnchorIndex, isPlaying, wordEntries]);

  const scrollProgressRatio = storyScrollMax > 0 ? storyScrollLeft / storyScrollMax : 1;
  const scrollProgressPercent = Math.round(scrollProgressRatio * 100);
  const estimatedSentenceIndex = sentenceGroups.length > 0
    ? Math.min(
        sentenceGroups.length,
        Math.max(1, Math.floor(scrollProgressRatio * sentenceGroups.length) + 1),
      )
    : 1;

  if (loadError) {
    return (
      <div className="story-page">
        <div className="container">
          <section className="card story-card">
            <header className="story-header">
              <h1 className="story-title">
                {chapterTitles[currentChapter] ?? `Chapter ${currentChapter}`}
              </h1>
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
              <h1 className="story-title">
                {chapterTitles[currentChapter] ?? `Chapter ${currentChapter}`}
              </h1>
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
            <h1 className="story-title">
              {chapterTitles[currentChapter] ?? `Chapter ${currentChapter}`}
            </h1>
          </header>

          {view === "story" ? (
            <>
              {/* 
                In web design, a "hero" section refers to a large, prominent banner area at the top of a page,
                often used to draw attention to key content or actions. Here, "story-hero" is used 
                to style the intro/audio controls as the visually prominent top section of the story card.
              */}
              <div className="story-hero">
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
                  <div className="story-speed-stepper" role="group" aria-label="Playback speed">
                    <button
                      className="ghost-btn story-speed-step-btn"
                      type="button"
                      onPointerDown={(event) => {
                        event.preventDefault();
                        startSpeedHold(-1);
                      }}
                      onPointerUp={stopSpeedHold}
                      onPointerLeave={stopSpeedHold}
                      onPointerCancel={stopSpeedHold}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          nudgeAudioSpeed(-1);
                        }
                      }}
                      disabled={audioSpeed <= MIN_AUDIO_SPEED}
                      aria-label="Decrease playback speed"
                      title="Decrease playback speed"
                    >
                      -
                    </button>
                    <span className="story-speed-value" aria-live="polite">
                      {audioSpeed.toFixed(1)}x
                    </span>
                    <button
                      className="ghost-btn story-speed-step-btn"
                      type="button"
                      onPointerDown={(event) => {
                        event.preventDefault();
                        startSpeedHold(1);
                      }}
                      onPointerUp={stopSpeedHold}
                      onPointerLeave={stopSpeedHold}
                      onPointerCancel={stopSpeedHold}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          nudgeAudioSpeed(1);
                        }
                      }}
                      disabled={audioSpeed >= MAX_AUDIO_SPEED}
                      aria-label="Increase playback speed"
                      title="Increase playback speed"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="story-horizontal-scroll" ref={scrollRef}>
                {sentenceGroups.map((sentence, sentenceIndex) => (
                  <div key={`sentence-${sentenceIndex}`} className="story-sentence-block">
                    <div className="story-sentence-row story-sentence-row-primary">
                    
                      {sentence.map((idx) => {
                        const word = wordEntries[idx];
                        return (
                          <span
                            key={`fi-${idx}`}
                            className={getWordClass(word, idx)}
                            data-word-index={idx}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => handleSeekToWordIndex(idx)}
                            onDoubleClick={() => handlePlayFromWordIndex(idx)}
                          >
                            {word.display1}
                          </span>
                        );
                      })}
                    </div>
                    <div className="story-sentence-row story-sentence-row-secondary story-sentence-row-gap">
                      {sentence.map((idx) => {
                        const word = wordEntries[idx];
                        return (
                          <span
                            key={`fake-en-${idx}`}
                            className={getWordClass(word, idx)}
                            onClick={() => handleSeekToWordIndex(idx)}
                            onDoubleClick={() => handlePlayFromWordIndex(idx)}
                          >
                            {word.display2}
                          </span>
                        );
                      })}
                    </div>
                    <div className="story-sentence-row story-sentence-row-secondary story-sentence-row-small">
                      {sentence.map((idx) => {
                        const word = wordEntries[idx];
                        return (
                          <span
                            key={`fi-spoken-${idx}`}
                            className={getWordClass(word, idx)}
                            onClick={() => handleSeekToWordIndex(idx)}
                            onDoubleClick={() => handlePlayFromWordIndex(idx)}
                          >
                            {word.display4}
                          </span>
                        );
                      })}
                    </div>
                    <div className="story-sentence-row story-sentence-row-secondary story-sentence-row-small">
                      {(englishSentenceGroups[sentenceIndex] ?? []).map((idx) => (
                        <span key={`en-${sentenceIndex}-${idx}`} className="highlight-span">
                          {englishWords[idx]}
                        </span>
                      ))}
                    </div>
                    <div className="story-sentence-row story-sentence-row-secondary story-sentence-row-grammar">
                      {(() => {
                        const note =
                          storyData?.grammarNotes?.[sentenceIndex] ?? "No grammar notes for this sentence";
                        const normalizedNote = note.trim().toLowerCase();
                        const isPlaceholderNote = normalizedNote.startsWith("no grammar notes");
                        const isOpen = openGrammarIndex === sentenceIndex;

                        if (isPlaceholderNote) return null;

                        return (
                          <span
                            className="story-grammar-toggle"
                            role="button"
                            tabIndex={0}
                            aria-label={note}
                            onClick={() => setOpenGrammarIndex(isOpen ? null : sentenceIndex)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                setOpenGrammarIndex(isOpen ? null : sentenceIndex);
                              }
                            }}
                          >
                            💡 Grammar 💡
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="story-scroll-rail" aria-label="Story progress and horizontal scroll">
                <div className="story-scroll-rail-top">
                  <span className="story-scroll-progress-label">
                    Sentence {estimatedSentenceIndex}/{Math.max(1, sentenceGroups.length)}
                  </span>
                  <span className="story-scroll-progress-percent">{scrollProgressPercent}%</span>
                </div>
                <input
                  className="story-scroll-range"
                  type="range"
                  min="0"
                  max={Math.max(1, Math.round(storyScrollMax))}
                  step="1"
                  value={Math.min(Math.round(storyScrollLeft), Math.max(1, Math.round(storyScrollMax)))}
                  disabled={storyScrollMax <= 0}
                  onChange={(event) => {
                    const nextLeft = Number(event.target.value);
                    if (!scrollRef.current) return;
                    scrollRef.current.scrollTo({ left: nextLeft, behavior: "auto" });
                    setStoryScrollLeft(nextLeft);
                  }}
                  aria-label="Scroll story horizontally"
                />
              </div>
              {openGrammarIndex !== null && (
                <div className="story-grammar-panel" role="region" aria-live="polite">
                  <span className="story-grammar-note">
                    {storyData?.grammarNotes?.[openGrammarIndex] ?? "No grammar notes for this sentence"}
                  </span>{" "}
                  <span
                    className="story-grammar-hide"
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpenGrammarIndex(null)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setOpenGrammarIndex(null);
                      }
                    }}
                  >
                    Hide
                  </span>
                </div>
              )}
              <div className="story-illustration-container">
                <img
                  className="story-illustration"
                  src={`${import.meta.env.BASE_URL}story/chapter${currentChapter}/image${currentChapter}.png`}
                  alt={`Chapter ${currentChapter} illustration`}
                />
              </div>
            </>
          ) : (
            <StoryQuiz
              chapterNumber={currentChapter}
              questions={quizQuestions}
                wordsPerQuiz={wordsPerQuiz}
              loadError={quizLoadError}
              onBack={() => setView("story")}
              onNextChapter={() => {
                const nextChapter = Math.min(currentChapter + 1, TOTAL_CHAPTERS);
                resetAudioState();
                setCurrentChapter(nextChapter);
                setView("story");
              }}
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
                    <button
                      className={`ghost-btn status-mark-btn ${isReadAnimating ? "status-animate" : ""}`}
                      type="button"
                      onClick={handleMarkRead}
                      aria-disabled={!canMarkRead}
                      title={canMarkRead ? "Mark chapter as read" : "Login to track progress"}
                    >
                      {readCount > 0 ? `✅ ${readCount >= 9 ? "9+" : readCount} Mark as re-read` : "Mark as Read ✅"}
                    </button>
                    {!canMarkRead && showLoginSaveHint && (
                      <span className="story-progress-login-hint">Log in to save progress</span>
                    )}
                <div className="story-chapter-switch">
                  <button
                    className="ghost-btn story-action-btn"
                    type="button"
                    onClick={openChapterJump}
                  >
                    Change Chapter
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  className="ghost-btn story-action-btn"
                  type="button"
                  onClick={() => setView("story")}
                >
                  🔙 Back to story
                </button>
                <button
                  className={`ghost-btn status-mark-btn ${isReadAnimating ? "status-animate" : ""}`}
                  type="button"
                  onClick={handleMarkRead}
                  aria-disabled={!canMarkRead}
                  title={canMarkRead ? "Mark chapter as read" : "Login to track progress"}
                >
                  {readCount > 0 ? `✅ ${readCount >= 9 ? "9+" : readCount} Mark as re-read` : "Mark as Read ✅"}
                </button>
                {!canMarkRead && showLoginSaveHint && (
                  <span className="story-progress-login-hint">Log in to save progress</span>
                )}
              </>
            )}
          </div>
          {showChapterJump && (
            <div className="jump-backdrop" role="presentation" onClick={closeChapterJump}>
              <div
                className="jump-dialog"
                role="dialog"
                aria-modal="true"
                aria-label={`Jump to chapter 1 - ${TOTAL_CHAPTERS}`}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="jump-header">
                  <div className="jump-title">Change chapter</div>
                  <div className="jump-subtitle">Chapters 1 - {TOTAL_CHAPTERS}</div>
                </div>
                <div className="jump-controls">
                  <button className="ghost-btn jump-step" type="button" onClick={() => nudgeChapterJump(-1)}>
                    −
                  </button>
                  <input
                    className="jump-input"
                    type="text"
                    inputMode="numeric"
                    value={chapterJumpInput}
                    onChange={(event) => {
                      setChapterJumpInput(event.target.value);
                      setChapterJumpError("");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        applyChapterJump(chapterJumpInput);
                      }
                    }}
                    aria-label="Chapter number"
                  />
                  <button className="ghost-btn jump-step" type="button" onClick={() => nudgeChapterJump(1)}>
                    +
                  </button>
                </div>
                {hasValidChapterPreview ? (
                  <div className="jump-header" aria-live="polite">
                    <div className="jump-subtitle">Chapter {parsedChapterJumpInput}</div>
                    <div className="jump-title">{chapterPreviewFinnish}</div>
                    {chapterPreviewEnglish && (
                      <div className="jump-subtitle">{chapterPreviewEnglish}</div>
                    )}
                  </div>
                ) : (
                  <div className="jump-subtitle muted">Enter chapter 1 - {TOTAL_CHAPTERS}</div>
                )}
                {chapterJumpError && <div className="jump-error">{chapterJumpError}</div>}
                <div className="jump-actions">
                  <button className="ghost-btn" type="button" onClick={closeChapterJump}>
                    Cancel
                  </button>
                  <button className="primary-btn" type="button" onClick={() => applyChapterJump(chapterJumpInput)}>
                    Jump
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
