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
    const ids = ["hero", "projects", "about", "skills", "certificates", "contact"];
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
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: [0.2, 0.4, 0.6, 0.8] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${isDarkMode ? "dark" : ""} relative`}>
      <CustomCursor />
      <ScrollProgressBar />

      {/* Quick Controls: Theme + Motion */}
      <div className="fixed top-3 right-3 z-[11000] flex items-center gap-2">
        <button
          onClick={() => setIsDarkMode((v) => !v)}
          className="px-3 py-1.5 rounded-full bg-white/10 dark:bg-white/10 text-xs text-white backdrop-blur border border-white/15 hover:border-white/30 shadow-glow transition"
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {isDarkMode ? '🌙 Dark' : '🌗 Light'}
        </button>
        <button
          onClick={() => setReducedMotion((v) => !v)}
          className="px-3 py-1.5 rounded-full bg-white/10 dark:bg-white/10 text-xs text-white backdrop-blur border border-white/15 hover:border-white/30 shadow-glow transition"
          aria-label="Toggle reduced motion"
          title="Toggle reduced motion"
        >
          {reducedMotion ? '🛑 Motion Off' : '🌀 Motion On'}
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
      <SectionTransitionWrapper variant="split">
        <Projects setSelectedProject={setSelectedProject} />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper variant="circle">
        <About />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper variant="diagonal">
        <Skills />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper variant="split">
        <Certificates />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper variant="circle">
        <Contact />
      </SectionTransitionWrapper>
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <NextSectionButton />
    </div>
  );
}
export default App;
