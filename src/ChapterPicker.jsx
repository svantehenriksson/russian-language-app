import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function ChapterPicker({
  triggerLabel,
  triggerAriaLabel,
  chapterTitles,
  totalChapters,
  currentChapter,
  onSelectChapter,
  to,
  wrapperClassName = "",
  triggerClassName = "",
  menuClassName = "",
  optionClassName = "",
  activeOptionClassName = "",
  menuAriaLabel = "Story chapters",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  const chapterNumbers = useMemo(
    () => Array.from({ length: totalChapters }, (_, idx) => idx + 1),
    [totalChapters],
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleOutsidePointer = (event) => {
      if (!pickerRef.current) return;
      if (pickerRef.current.contains(event.target)) return;
      setIsOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handleOutsidePointer);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (chapterNumber) => {
    onSelectChapter?.(chapterNumber);
    setIsOpen(false);
  };

  return (
    <div className={`chapter-picker ${wrapperClassName}`.trim()} ref={pickerRef}>
      <button
        type="button"
        className={triggerClassName}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={triggerAriaLabel ?? triggerLabel}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {triggerLabel}
      </button>
      {isOpen && (
        <div className={menuClassName} role="menu" aria-label={menuAriaLabel}>
          {chapterNumbers.map((chapterNumber) => {
            const isActive = chapterNumber === currentChapter;
            const optionClass = [
              optionClassName,
              isActive && activeOptionClassName ? activeOptionClassName : "",
            ]
              .filter(Boolean)
              .join(" ");
            const optionLabel = `Ch ${chapterNumber}: ${
              chapterTitles[chapterNumber] ?? `Chapter ${chapterNumber}`
            }`;

            if (to) {
              return (
                <Link
                  key={chapterNumber}
                  to={to}
                  className={optionClass}
                  role="menuitem"
                  onClick={() => handleSelect(chapterNumber)}
                >
                  {optionLabel}
                </Link>
              );
            }

            return (
              <button
                key={chapterNumber}
                type="button"
                className={optionClass}
                role="menuitem"
                onClick={() => handleSelect(chapterNumber)}
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
