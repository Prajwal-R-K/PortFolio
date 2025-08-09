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
      className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition z-50"
      style={{ fontSize: "2rem", fontWeight: "bold" }}
    >
      ↓
    </button>
  );
}
