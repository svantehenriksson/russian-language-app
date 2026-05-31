


import React, { useEffect, useRef, useState } from 'react';
import ImageList from './visual_dictionary/ImageList';
import Quiz from './visual_dictionary/Quiz';

import './VisualDictionary.css';
import { topics } from './visual_dictionary/topics';

// For Supabase analytics:
import { trackTopicOpened } from "./supabaseAnalytics";
import { fetchProgress, getCurrentUserId, incrementProgress } from "./supabaseProgress";

function VisualDictionary() {
  const topicKeys = Object.keys(topics);
  const [view, setView] = useState('home'); // start at home
  const [topicIndex, setTopicIndex] = useState(0);
  const [showTopicMenu, setShowTopicMenu] = useState(false);

  /* SUPABASE START */
  const [studiedCount, setStudiedCount] = useState(0);
  const [isStudiedAnimating, setIsStudiedAnimating] = useState(false);
  const [canMarkStudied, setCanMarkStudied] = useState(false);
  const studiedTimerRef = useRef(null);
  /* SUPABASE END */


  const currentTopicKey = topicKeys[topicIndex];
  const currentTopic = topics[currentTopicKey];
  const { name, wordsAndImages } = currentTopic;

  /* SUPABASE START */
  useEffect(() => {
    let isMounted = true;

    const loadProgress = async () => {
      
      /* SUPABASE START */
      // Load topic progress for the Mark as Studied button.
      const userId = await getCurrentUserId();
      if (!isMounted) return;
      setCanMarkStudied(Boolean(userId));
      if (!userId) {
        setStudiedCount(0);
        return;
      }
      const completed = await fetchProgress({
        contentType: "dictionary_topic",
        contentKey: `topic_${currentTopicKey}`,
      });
      if (!isMounted) return;
      setStudiedCount(completed);
      /* SUPABASE END */
      
    };

    loadProgress();

    return () => {
      isMounted = false;
      if (studiedTimerRef.current) {
        clearTimeout(studiedTimerRef.current);
        studiedTimerRef.current = null;
      }
    };
  }, [currentTopicKey]);
 /* SUPABASE END */



 
  const handleTopicSelect = (index) => {
    /*SUPABASE START*/
    // Log topic open when a visual dictionary topic is selected.
    trackTopicOpened(topicKeys[index]);
    /*SUPABASE END*/
    setTopicIndex(index);
    setView('imagelist');
    setShowTopicMenu(false);
  };


  /* SUPABASE START */
  const handleMarkStudied = async () => {
    if (!canMarkStudied) return;
    setIsStudiedAnimating(true);
    if (studiedTimerRef.current) {
      clearTimeout(studiedTimerRef.current);
    }
    studiedTimerRef.current = setTimeout(() => {
      setIsStudiedAnimating(false);
      studiedTimerRef.current = null;
    }, 650);

    
    /* SUPABASE START */
    // Increment studied progress for the current topic.
    const nextCompleted = await incrementProgress({
      contentType: "dictionary_topic",
      contentKey: `topic_${currentTopicKey}`,
    });
    if (typeof nextCompleted === "number") {
      setStudiedCount(nextCompleted);
    }
    /* SUPABASE END */
    
  };
  /* SUPABASE END */



  return (
    <div className="visual-dictionary">
      <div className="container">
        {view === 'home' && (
          <section className="vd-home card card-glow">
            <div className="vd-home-inner">
              <div className="vd-header">
                <div className="pill">Visual Dictionary</div>
                <h1 className="vd-title">Visuaalinen sanakirja</h1>
                <p className="vd-subtitle">Visual Dictionary</p>
              </div>

              <div className="dictionary-bounce">
                <img
                  src={`${import.meta.env.BASE_URL}visual_dictionary/dictionary.png`}
                  alt="dictionary"
                  className="dictionary-image"
                />
              </div>

              <div className="topic-list">
                {topicKeys.map((key, idx) => (
                  <button
                    key={key}
                    type="button"
                    className="topic-option"
                    onClick={() => handleTopicSelect(idx)}
                  >
                    {topics[key].name}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {view !== 'home' && (
          <section className="vd-section">
            <div className="vd-topbar">
              <div className="vd-topbar-text">
                <div className="pill">Topic</div>
                <h1 className="vd-title">{name}</h1>
              </div>

              <div className="vd-actions">
                {view !== 'quiz' && (
                  <button className="primary-btn vd-btn" onClick={() => setView('quiz')}>
                    ❓❓Quiz❓❓
                  </button>
                )}
                {view === 'quiz' && (
                  <button className="ghost-btn vd-btn" onClick={() => setView('imagelist')}>
                    🔙 Takaisin – Back
                  </button>
                )}
                <div className="vd-topic-switch">
                  <button className="ghost-btn vd-btn" onClick={() => setShowTopicMenu(!showTopicMenu)}>
                    🔄 Vaihda aihetta – Change topic
                  </button>
                  {showTopicMenu && (
                    <div className="topic-dropdown">
                      {topicKeys.map((key, idx) => (
                        <button
                          key={key}
                          type="button"
                          className={`topic-option ${idx === topicIndex ? 'active' : ''}`}
                          onClick={() => handleTopicSelect(idx)}
                        >
                          {topics[key].name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  className={`ghost-btn vd-btn status-mark-btn ${isStudiedAnimating ? "status-animate" : ""}`}
                  onClick={handleMarkStudied}
                  disabled={!canMarkStudied}
                  title={canMarkStudied ? "Mark topic as studied" : "Login to track progress"}
                >
                  {studiedCount > 0 ? `✅ ${studiedCount >= 9 ? "9+" : studiedCount} Mark as re-studied` : "Mark as Studied"}
                </button>
                <button className="ghost-btn vd-btn" onClick={() => setView('home')}>
                  🏠 Etusivu – Home
                </button>
              </div>
            </div>

            <div className="vd-content">
              {view === 'imagelist' && (
                <>
                  <ImageList wordsAndImages={wordsAndImages} />
                  <div className="vd-bottom-cta">
                    <button className="primary-btn vd-btn vd-bottom-quiz-btn" onClick={() => setView('quiz')}>
                      ❓❓Quiz❓❓
                    </button>
                  </div>
                </>
              )}
              {view === 'quiz' && <Quiz wordsAndImages={wordsAndImages} />}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default VisualDictionary;


