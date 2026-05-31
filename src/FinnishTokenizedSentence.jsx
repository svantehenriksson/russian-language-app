import React, { useEffect, useRef, useState } from "react";
import { wordTranslations } from "./data2";

function tokenizeFI(sentence) {
  return String(sentence ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((raw) => {
      const clean = raw.replace(/[.,!?;:()"”„]/g, "");
      return { raw, clean };
    });
}

export default function FinnishTokenizedSentence({ sentence, className = "", ariaLabel = "Finnish example with word translations" }) {
  const [openTokenIndex, setOpenTokenIndex] = useState(null);
  const [hoveredTokenIndex, setHoveredTokenIndex] = useState(null);
  const containerRef = useRef(null);
  const tokens = tokenizeFI(sentence);
  const activeTokenIndex = hoveredTokenIndex ?? openTokenIndex;

  useEffect(() => {
    setOpenTokenIndex(null);
    setHoveredTokenIndex(null);
  }, [sentence]);

  useEffect(() => {
    const handlePointerDownOutside = (event) => {
      if (!containerRef.current) return;
      if (containerRef.current.contains(event.target)) return;
      setOpenTokenIndex(null);
      setHoveredTokenIndex(null);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpenTokenIndex(null);
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className={`fi-tooltip-line ${className}`.trim()} aria-label={ariaLabel}>
      {tokens.map((token, idx) => {
        const translation = wordTranslations[token.clean];
        if (!translation) {
          return (
            <span key={`${token.raw}-${idx}`} className="fi-token">
              {token.raw}
              {idx < tokens.length - 1 ? " " : ""}
            </span>
          );
        }

        const isOpen = openTokenIndex === idx;
        const isActive = activeTokenIndex === idx;
        return (
          <span key={`${token.raw}-${idx}`} className={`fi-token has-tr ${isActive ? "is-open" : ""}`}>
            <button
              type="button"
              className="fi-token-btn"
              onClick={() => setOpenTokenIndex((prev) => (prev === idx ? null : idx))}
              onMouseEnter={() => setHoveredTokenIndex(idx)}
              onMouseLeave={() => setHoveredTokenIndex(null)}
              aria-expanded={isActive}
              aria-label={`${token.clean}. ${translation}`}
            >
              {token.raw}
            </button>
            {isActive && <span className="fi-token-popover">{translation}</span>}
            {idx < tokens.length - 1 ? " " : ""}
          </span>
        );
      })}
    </div>
  );
}
