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
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className={`${isDarkMode ? "dark" : ""} relative`}>
      <CustomCursor />
      <ScrollProgressBar />

      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
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
