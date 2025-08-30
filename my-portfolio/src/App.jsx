import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Certificates from "./components/Certificates/Certificates";
import Contact from "./components/Contact/Contact";
import ProjectModal from "./components/Shared/ProjectModal";
import CustomCursor from "./components/Shared/CustomCursor";
import PointerBubblesDOM from "./components/Shared/PointerBubblesDOM";
import ThemePicker from "./components/Shared/ThemePicker";

import SectionTransitionWrapper from "./components/Shared/SectionTransitionWrapper";
import ScrollProgressBar from "./components/Navigation/ScrollProgressBar";
import NextSectionButton from "./components/Navigation/NextSectionButton";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    const hour = new Date().getHours();
    return !(hour >= 6 && hour < 18);
  });
  const [reducedMotion, setReducedMotion] = useState(() => {
    const saved = localStorage.getItem("reducedMotion");
    if (saved != null) return saved === "true";
    const media = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    return !!(media && media.matches);
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    // Handle theme classes/vars based on dark mode
    const root = document.documentElement;
    const themes = ["techy","minimal","neon"]; // retro removed
    // Always clear theme classes first
    root.classList.remove(...themes.map(id => `theme-${id}`));
    if (!isDarkMode) {
      // Remove inline CSS vars when exiting dark mode
      ["--accent-from","--accent-to"].forEach(k => root.style.removeProperty(k));
    } else {
      // Apply saved theme when entering dark mode
      const saved = localStorage.getItem('pref-theme') || 'techy';
      root.classList.add(`theme-${saved}`);
    }
  }, [isDarkMode]);

  // Apply reduced motion preference globally and notify listeners
  useEffect(() => {
    localStorage.setItem("reducedMotion", String(reducedMotion));
    // expose a global for imperative listeners
    window.__reducedMotion = reducedMotion;
    document.dispatchEvent(new CustomEvent('reduced-motion-changed', { detail: { reduced: reducedMotion } }));
  }, [reducedMotion]);

  // Scrollspy: observe sections intersecting viewport
  useEffect(() => {
    const ids = ["hero", "about", "skills", "projects", "certificates", "contact"]; // exclude footer from nav highlight
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { root: null, rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${isDarkMode ? "dark" : ""} relative bg-transparent`}>
      {/* Themed background across the whole app (dark only) */}
      {isDarkMode && <div aria-hidden className="fixed inset-0 -z-10 themed-bg" />}
      <PointerBubblesDOM density={26} maxParticles={1500} sizeMin={1} sizeMax={3} drift={48} duration={900} />
      <CustomCursor />
      <ScrollProgressBar />

      {/* Light mode soft brightening overlay */}
      {!isDarkMode && (
        <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-white/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.16),_transparent_60%)]" />
        </div>
      )}

      {/* Quick Controls: Theme + Motion */}
      <div className="fixed top-3 right-3 z-[11000] flex items-center gap-2">
        {isDarkMode && <ThemePicker compact labelWhite darkDropdown />}
        {/* Theme toggle */}
        <button
          onClick={() => setIsDarkMode((v) => !v)}
          className="px-3 py-1.5 rounded-full text-xs transition border 
            bg-white text-gray-800 border-gray-300 hover:bg-gray-50 
            dark:bg-white/10 dark:text-white dark:border-white/15 dark:hover:border-white/30 backdrop-blur shadow-glow"
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {isDarkMode ? '🌙 Dark' : '🌗 Light'}
        </button>
        {/* Motion switch */}
        <button
          onClick={() => setReducedMotion((v) => !v)}
          role="switch"
          aria-checked={!reducedMotion}
          aria-label="Toggle motion effects"
          title="Toggle motion effects"
          className={`relative w-16 h-8 rounded-full border backdrop-blur text-xs shadow-glow transition 
            ${reducedMotion 
              ? 'bg-white border-gray-300 text-gray-800 dark:bg-white/10 dark:border-white/20 dark:text-white' 
              : 'bg-white border-gray-300 text-gray-800 dark:bg-gradient-to-r dark:from-[#7C4DFF] dark:to-[#00D1FF] dark:border-white/20 dark:text-white'}`}
        >
          <span className="sr-only">Motion</span>
          <span
            className={`absolute top-0.5 left-0.5 h-7 w-7 rounded-full bg-white/90 text-[#0b1020] grid place-items-center transition-transform duration-300 ${
              reducedMotion ? 'translate-x-0' : 'translate-x-8'
            }`}
          >
            {reducedMotion ? '❌' : '⚡'}
          </span>
        </button>
      </div>

      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        activeSection={activeSection}
      />

      <SectionTransitionWrapper variant="diagonal">
        <Hero />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper variant="circle">
        <About />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper variant="diagonal">
        <Skills />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper variant="split">
        <Projects setSelectedProject={setSelectedProject} />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper variant="split">
        <Certificates />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper variant="circle">
        <Contact />
      </SectionTransitionWrapper>
      {/* Footer */}
      <footer id="footer" className="mt-10 py-10 px-6 text-center text-sm text-gray-600 dark:text-gray-300">
        <div className="max-w-6xl mx-auto">
          <div className="h-px w-full mb-6 bg-gray-200 dark:bg-white/10" />
          <p>
            © {new Date().getFullYear()} Prajwal R K. All rights reserved.
          </p>
        </div>
      </footer>
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <NextSectionButton />
    </div>
  );
}
export default App;
