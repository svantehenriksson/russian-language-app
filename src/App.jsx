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
import ChapterPicker from "./ChapterPicker";
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
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
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
                        }}
                      >
                        Home
                      </NavLink>
                      <div className="hamburger-story-dropdown">
                        <ChapterPicker
                          triggerLabel="Story Chapters"
                          chapterTitles={chapterTitles}
                          totalChapters={TOTAL_CHAPTERS}
                          currentChapter={homeChapter}
                          onSelectChapter={(chapterNumber) => {
                            setHomeChapter(chapterNumber);
                            setHasCustomHomeChapter(true);
                            setShowHamburgerMenu(false);
                          }}
                          to="/story"
                          wrapperClassName="chapter-picker-hamburger"
                          triggerClassName="hamburger-link hamburger-link-trigger"
                          menuClassName="chapter-picker-menu hamburger-story-dropdown-menu"
                          optionClassName="hamburger-story-chapter-link"
                          activeOptionClassName="chapter-picker-option-active"
                          menuAriaLabel="Story chapters"
                        />
                      </div>
                      <NavLink
                        to="/quiz"
                        className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
                        onClick={() => {
                          setShowHamburgerMenu(false);
                        }}
                      >
                        Quiz
                      </NavLink>
                      <NavLink
                        to="/visual-dictionary"
                        className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
                        onClick={() => {
                          setShowHamburgerMenu(false);
                        }}
                      >
                        Visual Dictionary
                      </NavLink>
                      <NavLink
                        to="/articles"
                        className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
                        onClick={() => {
                          setShowHamburgerMenu(false);
                        }}
                      >
                        Articles
                      </NavLink>
                      <NavLink
                        to="/about"
                        className={({ isActive }) => `hamburger-link ${isActive ? "active" : ""}`}
                        onClick={() => {
                          setShowHamburgerMenu(false);
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
                      <div className="card-body">
                        <Link to="/story" className="home-story-link">
                          <img
                            className="home-story-image"
                            src={`${import.meta.env.BASE_URL}story/chapter${homeChapter}/image${homeChapter}.png`}
                            alt={`Chapter ${homeChapter} illustration`}
                          />
                          <div className="home-story-caption">
                            Ch. {homeChapter}: {chapterTitles[homeChapter] ?? `Chapter ${homeChapter}`}
                          </div>
                        </Link>
                        <div className="home-story-cta-row">
                          <Link to="/story" className="primary-btn as-link home-quick-cta home-story-header-cta home-story-cta-primary">
                            <span className="home-quick-label">▶️ Play Story</span>
                          </Link>
                          <div className="home-chapter-switch home-story-cta-secondary">
                            <ChapterPicker
                              triggerLabel="Jump to Chapter"
                              chapterTitles={chapterTitles}
                              totalChapters={TOTAL_CHAPTERS}
                              currentChapter={homeChapter}
                              onSelectChapter={(chapterNumber) => {
                                setHomeChapter(chapterNumber);
                                setHasCustomHomeChapter(true);
                              }}
                              to="/story"
                              wrapperClassName="chapter-picker-inline"
                              triggerClassName="ghost-btn home-chapter-btn"
                              menuClassName="chapter-picker-menu chapter-picker-menu-floating"
                              optionClassName="chapter-picker-option"
                              activeOptionClassName="chapter-picker-option-active"
                              menuAriaLabel="Jump to chapter"
                            />
                          </div>
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
                    <div className="card home-card home-practice-card">
                      <div className="card-body">
                        <div className="home-practice-list">
                          <Link to="/quiz" className="ghost-btn as-link home-practice-cta">
                            <span className="home-practice-main">
                              <span className="home-practice-label">Quiz</span>
                              <span className="home-practice-progress">{progressSummary.nextQuizLevel}/{totalQuizLevels}</span>
                            </span>
                            <span className="home-practice-subcopy">Learn the most common 500 words</span>
                          </Link>
                          <Link to="/visual-dictionary" className="ghost-btn as-link home-practice-cta">
                            <span className="home-practice-main">
                              <span className="home-practice-label">Visual Dictionary</span>
                              <span className="home-practice-progress">{progressSummary.studiedTopicsCount}/{totalTopics}</span>
                            </span>
                            <span className="home-practice-subcopy">Learn vocabulary from images</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </section>
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
