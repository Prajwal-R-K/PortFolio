import React from "react";

export default function NextSectionButton() {
  const scrollToNextSection = () => {
    // Put your section IDs here in order
    const sections = [
      "hero",
      "projects",
      "about",
      "skills",
      "certificates",
      "contact"
    ];
    const scrollPos = window.scrollY;

    for (let id of sections) {
      const elem = document.getElementById(id);
      if (!elem) continue;
      const top = elem.getBoundingClientRect().top + window.scrollY;
      if (top > scrollPos + 20) {
        window.scrollTo({ top, behavior: "smooth" });
        break;
      }
    }
  };

  return (
    <button
      onClick={scrollToNextSection}
      aria-label="Go to next section"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center select-none
                 bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-xl
                 hover:scale-105 active:scale-95 transition-transform duration-200
                 ring-0 focus:outline-none focus:ring-4 focus:ring-cyan-300/40 animate-pulse"
      style={{ fontSize: "2rem", fontWeight: "bold", lineHeight: 1 }}
    >
      ↓
    </button>
  );
}
