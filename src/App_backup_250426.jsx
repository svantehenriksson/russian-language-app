// App.js
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, NavLink, useLocation } from "react-router-dom";
import Quiz from "./Quiz";

// Using only horizontal story for now, multiple subtitles just look better.
import Story from "./StoryHorizontal";
import VisualDictionary from "./VisualDictionary";
import "./App.css";
import { wordPairs } from "./data";
import FinnishTokenizedSentence from "./FinnishTokenizedSentence";
import Authgate from "./Authgate";
import PrivacyEtc from "./PrivacyEtc";
import Articles from "./Articles";
import About from "./About";
// Supabase-related import:
import { supabase } from "./SupabaseClient";
import { topics } from "./visual_dictionary/topics";
import { chapterTitles } from "./story/titles/titles";

/* SUPABASE-RELATED HELPER FUNCTIONS START */
function LocationListener({ onChange }) {
  const location = useLocation();

  useEffect(() => {
    onChange(location.pathname);
  }, [location.pathname, onChange]);

  return null;
}

/* SUPABASE-RELATED HELPER FUNCTIONS END */

function App() {

  const WORDS_PER_LEVEL = 10;
  const TOTAL_CHAPTERS = Object.keys(chapterTitles).length;
  const totalQuizLevels = Math.ceil(wordPairs.length / WORDS_PER_LEVEL);
  const totalTopics = Object.keys(topics).length;

  const [randomIndex, setRandomIndex] = useState(
    () => Math.floor(Math.random() * wordPairs.length),
  );
  const randomWord = useMemo(() => wordPairs[randomIndex], [randomIndex]);
  const [progressSummary, setProgressSummary] = useState({
    nextChapter: 1,
    nextQuizLevel: 1,
    studiedTopicsCount: 0,
  });
  const [homeChapter, setHomeChapter] = useState(1);
  const [hasCustomHomeChapter, setHasCustomHomeChapter] = useState(false);
  const [showHomeChapterJump, setShowHomeChapterJump] = useState(false);
  const [homeChapterInput, setHomeChapterInput] = useState("");
  const [homeChapterError, setHomeChapterError] = useState("");
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [showHamburgerStoryChapters, setShowHamburgerStoryChapters] = useState(false);
  const hamburgerMenuRef = useRef(null);
  const [currentPath, setCurrentPath] = useState("/");

  /* SUPABASE-RELATED STATE VARIABLES START */
  const [progressRefreshTick, setProgressRefreshTick] = useState(0);

  const handleLocationChange = useCallback((pathname) => {
    setCurrentPath(pathname);
    setProgressRefreshTick((prev) => prev + 1);
  }, []);

  /* SUPABASE-RELATED STATE VARIABLES END */

  const nextRandomWord = () => {
    if (wordPairs.length === 0) return;
    let nextIndex = Math.floor(Math.random() * wordPairs.length);
    if (wordPairs.length > 1) {
      while (nextIndex === randomIndex) {
        nextIndex = Math.floor(Math.random() * wordPairs.length);
      }
    }
    setRandomIndex(nextIndex);
  };

  useEffect(() => {
    if (!hasCustomHomeChapter) {
      setHomeChapter(progressSummary.nextChapter);
    }
  }, [hasCustomHomeChapter, progressSummary.nextChapter]);

  useEffect(() => {
    if (!showHamburgerMenu) return;

    const handleOutsideClick = (event) => {
      if (!hamburgerMenuRef.current) return;
      if (hamburgerMenuRef.current.contains(event.target)) return;
      setShowHamburgerMenu(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowHamburgerMenu(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showHamburgerMenu]);

  useEffect(() => {
    if (!showHamburgerMenu) {
      setShowHamburgerStoryChapters(false);
    }
  }, [showHamburgerMenu]);

  /* SUPABASE START */
  useEffect(() => {
    let isMounted = true;

    /* SUPABASE START */
    // Fetch minimal progress summary for the home page.
    if (!supabase) return undefined;

    const computeSummary = (rows) => {
      const progressByType = rows.reduce((acc, row) => {
        if (!acc[row.content_type]) acc[row.content_type] = {};
        acc[row.content_type][row.content_key] = row.completed ?? 0;
        return acc;
      }, {});

      const nextChapter = Array.from({ length: TOTAL_CHAPTERS }, (_, idx) => idx + 1).find((num) => {
        const key = `chapter_${num}`;
        return (progressByType.story_chapter?.[key] ?? 0) < 1;
      }) ?? 1;

      const levelTotals = Array.from({ length: totalQuizLevels }, (_, idx) => {
        const start = idx * WORDS_PER_LEVEL;
        return Math.min(WORDS_PER_LEVEL, wordPairs.length - start);
      });

      const nextQuizLevel = Array.from({ length: totalQuizLevels }, (_, idx) => idx + 1).find((num) => {
        const key = `quiz_${num}`;
        const completed = progressByType.quiz_level?.[key] ?? 0;
        return completed < levelTotals[num - 1];
      }) ?? 1;

      const studiedTopicsCount = Object.values(progressByType.dictionary_topic ?? {}).filter(
        (count) => count > 0,
      ).length;

      return { nextChapter, nextQuizLevel, studiedTopicsCount };
    };

    const loadProgress = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      if (!userId) {
        if (!isMounted) return;
        setProgressSummary({
          nextChapter: 1,
          nextQuizLevel: 1,
          studiedTopicsCount: 0,
        });
        return;
      }

      const { data, error } = await supabase
        .from("user_progress")
        .select("content_type, content_key, completed")
        .eq("user_id", userId);

      if (!isMounted) return;
      if (error) {
        console.warn("Supabase progress summary fetch failed:", error);
        return;
      }

      setProgressSummary(computeSummary(data ?? []));
    };

    loadProgress();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadProgress();
    });

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, [progressRefreshTick, totalQuizLevels, totalTopics]);
    /* SUPABASE END */

  const useWideHeaderAlignment =
    currentPath.startsWith("/story") ||
    currentPath.startsWith("/quiz") ||
    currentPath.startsWith("/visual-dictionary") ||
    currentPath.startsWith("/articles") ||
    currentPath.startsWith("/about") ||
    currentPath.startsWith("/privacy_terms_support");

  const openHomeChapterJump = () => {
    setHomeChapterInput(String(homeChapter));
    setHomeChapterError("");
    setShowHomeChapterJump(true);
  };

  const closeHomeChapterJump = () => {
    setShowHomeChapterJump(false);
    setHomeChapterError("");
  };

  const applyHomeChapterJump = (nextValue) => {
    const parsed = Number.parseInt(String(nextValue).trim(), 10);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > TOTAL_CHAPTERS) {
      setHomeChapterError(`Chapters 1 - ${TOTAL_CHAPTERS} available`);
      return;
    }
    setHomeChapter(parsed);
    setHasCustomHomeChapter(true);
    setHomeChapterError("");
    setShowHomeChapterJump(false);
  };

  const nudgeHomeChapterJump = (delta) => {
    const currentValue = Number.parseInt(String(homeChapterInput).trim(), 10);
    const base = Number.isInteger(currentValue) ? currentValue : homeChapter;
    const next = Math.max(1, Math.min(TOTAL_CHAPTERS, base + delta));
    setHomeChapterInput(String(next));
    setHomeChapterError("");
  };

  const parsedHomeChapterInput = Number.parseInt(String(homeChapterInput).trim(), 10);
  const hasValidHomeChapterPreview =
    Number.isInteger(parsedHomeChapterInput) &&
    parsedHomeChapterInput >= 1 &&
    parsedHomeChapterInput <= TOTAL_CHAPTERS;
  const homeChapterPreviewTitle = hasValidHomeChapterPreview
    ? (chapterTitles[parsedHomeChapterInput] ?? `Chapter ${parsedHomeChapterInput}`)
    : "";
  const [homeChapterPreviewFinnish, ...homeChapterPreviewEnglishParts] =
    homeChapterPreviewTitle.split(" - ");
  const homeChapterPreviewEnglish = homeChapterPreviewEnglishParts.join(" - ");

  return (
    <Router>
      <LocationListener onChange={handleLocationChange} />
      <div className="app-shell">
        {/* Top Nav */}
        <header className="topbar">
          <div className={`topbar-inner ${useWideHeaderAlignment ? "topbar-inner-wide" : ""}`}>
            <Link to="/" className="brand" aria-label="Fluenzo Home">
              <div className="brand-mark" aria-hidden="true">
                F
              </div>
              <div className="brand-text">
                <div className="brand-name">Fluenzo</div>
              </div>
            </Link>

            <div className="topbar-actions">
              <Authgate mode="triggerOnly" />
              <div className="hamburger-shell" ref={hamburgerMenuRef}>
                <button
                  className={`ghost-btn hamburger-btn ${showHamburgerMenu ? "active" : ""}`}
                  type="button"
                  aria-label="Open menu"
                  aria-expanded={showHamburgerMenu}
                  aria-haspopup="menu"
                  onClick={() => setShowHamburgerMenu((prev) => !prev)}
                >
                  <span />
                  <span />
                  <span />
                </button>
                {showHamburgerMenu && (
                  <div className="hamburger-menu" role="menu" aria-label="Site menu">
                    <nav className="hamburger-nav" aria-label="Primary">
                      <NavLink
                        to="/"
                        end
                        className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
                        onClick={() => {
                          setShowHamburgerMenu(false);
                          setShowHamburgerStoryChapters(false);
                        }}
                      >
                        Home
                      </NavLink>
                      <div
                        className="hamburger-story-dropdown"
                        onMouseLeave={() => setShowHamburgerStoryChapters(false)}
                      >
                        <button
                          type="button"
                          className="hamburger-link hamburger-link-trigger"
                          aria-expanded={showHamburgerStoryChapters}
                          aria-haspopup="menu"
                          onMouseEnter={() => setShowHamburgerStoryChapters(true)}
                          onFocus={() => setShowHamburgerStoryChapters(true)}
                          onTouchStart={() => setShowHamburgerStoryChapters(true)}
                          onClick={() => setShowHamburgerStoryChapters((prev) => !prev)}
                        >
                          Story chapters
                        </button>
                        {showHamburgerStoryChapters && (
                          <div className="hamburger-story-dropdown-menu" role="menu" aria-label="Story chapters">
                            {Array.from({ length: TOTAL_CHAPTERS }, (_, idx) => {
                              const chapterNumber = idx + 1;
                              return (
                                <NavLink
                                  key={chapterNumber}
                                  to="/story"
                                  className="hamburger-story-chapter-link"
                                  onClick={() => {
                                    setHomeChapter(chapterNumber);
                                    setHasCustomHomeChapter(true);
                                    setShowHamburgerStoryChapters(false);
                                    setShowHamburgerMenu(false);
                                  }}
                                >
                                  {`Ch ${chapterNumber}: ${chapterTitles[chapterNumber] ?? `Chapter ${chapterNumber}`}`}
                                </NavLink>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <NavLink
                        to="/quiz"
                        className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
                        onClick={() => {
                          setShowHamburgerMenu(false);
                          setShowHamburgerStoryChapters(false);
                        }}
                      >
                        Quiz
                      </NavLink>
                      <NavLink
                        to="/visual-dictionary"
                        className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
                        onClick={() => {
                          setShowHamburgerMenu(false);
                          setShowHamburgerStoryChapters(false);
                        }}
                      >
                        Visual Dictionary
                      </NavLink>
                      <NavLink
                        to="/articles"
                        className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
                        onClick={() => {
                          setShowHamburgerMenu(false);
                          setShowHamburgerStoryChapters(false);
                        }}
                      >
                        Articles
                      </NavLink>
                      <NavLink
                        to="/about"
                        className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
                        onClick={() => {
                          setShowHamburgerMenu(false);
                          setShowHamburgerStoryChapters(false);
                        }}
                      >
                        About
                      </NavLink>
                    </nav>
                    <div className="hamburger-divider" />
                    <Authgate mode="menuPanel" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container">


                  <section className="home-grid">
                    <div className="card home-card home-story-card">
                      <div className="card-header">
                        <Link to="/story" className="primary-btn as-link home-quick-cta home-story-header-cta">
                          <span className="home-quick-label">Resume Story</span>
                        </Link>
                        <div className="home-chapter-switch">
                          <button
                            className="ghost-btn home-chapter-btn"
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              openHomeChapterJump();
                            }}
                          >
                            Jump to Chapter
                          </button>
                        </div>
                      </div>
                      <Link to="/story" className="home-story-link">
                        <div className="card-body">
                          <img
                            className="home-story-image"
                            src={`${import.meta.env.BASE_URL}story/chapter${homeChapter}/image${homeChapter}.png`}
                            alt={`Chapter ${homeChapter} illustration`}
                          />
                          <div className="home-story-caption">
                            Ch. {homeChapter}: {chapterTitles[homeChapter] ?? `Chapter ${homeChapter}`}
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="card home-card home-practice-card">
                      <div className="card-body">
                        <div className="home-practice-list">
                          <Link to="/quiz" className="primary-btn as-link home-practice-cta">
                            <span className="home-practice-main">
                              <span className="home-practice-label">Quiz</span>
                              <span className="home-practice-progress">{progressSummary.nextQuizLevel}/{totalQuizLevels}</span>
                            </span>
                          </Link>
                          <Link to="/visual-dictionary" className="primary-btn as-link home-practice-cta">
                            <span className="home-practice-main">
                              <span className="home-practice-label">Visual Dictionary</span>
                              <span className="home-practice-progress">{progressSummary.studiedTopicsCount}/{totalTopics}</span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="card home-card">
                      <div className="card-header">
                        <div className="card-title">Random Word</div>
                        <button className="ghost-btn home-random-next" type="button" onClick={nextRandomWord}>
                          Next random word
                        </button>
                      </div>
                      <div className="card-body">
                        <div className="home-word-row">
                          <div>
                            <div className="home-word-fi">{randomWord.finnish}</div>
                            <div className="home-word-en">{randomWord.english}</div>
                          </div>
                        </div>
                        <div className="home-word-example">
                          <FinnishTokenizedSentence sentence={randomWord.exampleFI} />
                          <div className="question-ex-en">{randomWord.exampleEN}</div>
                        </div>
                      </div>
                    </div>
                  </section>
                  {showHomeChapterJump && (
                    <div className="jump-backdrop" role="presentation" onClick={closeHomeChapterJump}>
                      <div
                        className="jump-dialog"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Jump to chapter 1 - ${TOTAL_CHAPTERS}`}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="jump-header">
                          <div className="jump-title">Jump to chapter</div>
                          <div className="jump-subtitle">Chapters 1 - {TOTAL_CHAPTERS}</div>
                        </div>
                        <div className="jump-controls">
                          <button className="ghost-btn jump-step" type="button" onClick={() => nudgeHomeChapterJump(-1)}>
                            −
                          </button>
                          <input
                            className="jump-input"
                            type="text"
                            inputMode="numeric"
                            value={homeChapterInput}
                            onChange={(event) => {
                              setHomeChapterInput(event.target.value);
                              setHomeChapterError("");
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                applyHomeChapterJump(homeChapterInput);
                              }
                            }}
                            aria-label="Chapter number"
                          />
                          <button className="ghost-btn jump-step" type="button" onClick={() => nudgeHomeChapterJump(1)}>
                            +
                          </button>
                        </div>
                        {hasValidHomeChapterPreview ? (
                          <div className="jump-header" aria-live="polite">
                            <div className="jump-subtitle">Chapter {parsedHomeChapterInput}</div>
                            <div className="jump-title">{homeChapterPreviewFinnish}</div>
                            {homeChapterPreviewEnglish && (
                              <div className="jump-subtitle">{homeChapterPreviewEnglish}</div>
                            )}
                          </div>
                        ) : (
                          <div className="jump-subtitle muted">Enter chapter 1 - {TOTAL_CHAPTERS}</div>
                        )}
                        {homeChapterError && <div className="jump-error">{homeChapterError}</div>}
                        <div className="jump-actions">
                          <button className="ghost-btn" type="button" onClick={closeHomeChapterJump}>
                            Cancel
                          </button>
                          <button className="primary-btn" type="button" onClick={() => applyHomeChapterJump(homeChapterInput)}>
                            Jump
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              }
            />
            <Route path="/story" element={<Story initialChapter={homeChapter} />} />
            <Route path="/quiz" element={<Quiz initialLevel={progressSummary.nextQuizLevel} />} />
            <Route path="/visual-dictionary" element={<VisualDictionary />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy_terms_support" element={<PrivacyEtc />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-left">
              <span className="footer-brand">Fluenzo</span>
              <span className="footer-sep">•</span>
              <span className="muted">Finally learn Finnish.</span>
            </div>
            <div className="footer-right">
              <Link className="footer-link" to="/privacy_terms_support#privacy">
                Privacy
              </Link>
              <Link className="footer-link" to="/privacy_terms_support#terms">
                Terms
              </Link>
              <Link className="footer-link" to="/privacy_terms_support#support">
                Support
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
