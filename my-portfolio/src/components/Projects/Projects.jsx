import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projectList = [
  {
    title: "💬 Real-Time Chat App",
    description: `
• Cross-platform app using Flutter and Firebase
• Real-time messaging with Firebase Auth & Realtime DB
• Sleek UI with chat history, sign-in and group support
    `,
    tech: "Flutter, Firebase, Dart",
    github: "https://github.com/Prajwal-R-K/Flutter_demo_chatApp",
    image: "/certificates/chat_preview.jpg",
  },
  {
    title: "🎅 Secret Santa Game",
    description: `
• Console-based Java app using HashMap & Random
• Ensures no self-pairing in gift assignments
• Follows clean OOP principles for structure
    `,
    tech: "Java, Collections Framework",
    github: "https://github.com/Prajwal-R-K/santagame",
    image: "/certificates/santa_preview.jpg",
  },
  {
    title: "🏦 Bank Management System",
    description: `
• Console-based banking system developed in Python
• Features include deposit, withdrawal, balance check, and account simulation
• Built as part of Samsung Innovation Campus – Python Certification
• Demonstrates file handling, conditional logic, and modular code design
  `,
    tech: "Python (CLI)",
    github: null,
    image: "/certificates/bank_system.jpg",
  },
  {
    title: "🧮 Calculator Application",
    description: `
• Built using Java Swing for GUI
• Performs basic arithmetic with responsive layout
• Implements event-driven programming and error handling
    `,
    tech: "Java (Swing)",
    github: null,
    image: "/certificates/calculator.jpg",
  }
];

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % projectList.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  const cardVariants = {
    enter: (dir) => ({
      x: dir === 1 ? 300 : -300,
      opacity: 0,
      rotateY: dir === 1 ? -45 : 45,
      scale: 0.9,
    }),
    center: {
      x: 0, opacity: 1, rotateY: 0, scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: (dir) => ({
      x: dir === 1 ? -300 : 300,
      opacity: 0,
      rotateY: dir === 1 ? 45 : -45,
      scale: 0.9,
      transition: { duration: 0.5 }
    })
  };

  function slideTo(newIdx, newDir) {
    clearTimeout(timeoutRef.current);
    setDirection(newDir);
    setIndex((newIdx + projectList.length) % projectList.length);
  }

  const touchStartX = useRef(null);
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 40) slideTo(index - 1, -1);
    else if (dx < -40) slideTo(index + 1, 1);
    touchStartX.current = null;
  };

  const openModal = (project) => {
    setModalProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="py-20 bg-gray-950 text-white overflow-hidden">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-blue-400 underline">
          🚀 My Projects
        </h2>
        <div
          className="relative h-[420px] flex items-center justify-center select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full"
            onClick={() => slideTo(index - 1, -1)}
          >←</button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full"
            onClick={() => slideTo(index + 1, 1)}
          >→</button>

          {/* Card */}
          <AnimatePresence custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full max-w-md bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(56,189,248,0.8)"
              }}
              onClick={() => openModal(projectList[index])}
            >
              <img src={projectList[index].image} alt={projectList[index].title} className="w-full h-56 object-cover" />
              <div className="p-5 text-left">
                <h3 className="text-xl font-bold text-blue-400 mb-2">{projectList[index].title}</h3>
                <p className="text-sm text-gray-300 whitespace-pre-line mb-2">{projectList[index].description}</p>
                <p className="text-xs text-gray-400 italic">{projectList[index].tech}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && modalProject && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center z-50 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Flipping glowing card */}
            <motion.div
              key={modalProject.title}
              initial={{ rotateY: 0, opacity: 0, scale: 0.8 }}
              animate={{
                rotateY: 720, // 2 flips = 720deg
                opacity: 1,
                scale: 1
              }}
              exit={{ rotateY: -720, opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-md w-full text-gray-900 dark:text-white glowing-border"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-2 right-2 text-xl font-bold text-blue-500 bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 hover:bg-blue-600 hover:text-white transition"
              >
                ✖
              </button>
              <img src={modalProject.image} alt={modalProject.title} className="w-full h-44 object-cover rounded-xl mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-blue-500">{modalProject.title}</h2>
              <p className="mb-3 text-gray-500 dark:text-gray-200">{modalProject.tech}</p>
              <div className="mb-4 whitespace-pre-line text-base">{modalProject.description}</div>
              {modalProject.github && (
                <a href={modalProject.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
                  🔗 View on GitHub
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
