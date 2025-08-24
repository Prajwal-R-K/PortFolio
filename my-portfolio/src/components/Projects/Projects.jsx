import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlidingRow from "../Shared/SlidingRow";

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

// using shared SlidingRow

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const openModal = (project) => {
    setModalProject(project);
    setModalOpen(true);
  };

  // Derive tag set from tech strings
  const allTags = Array.from(
    new Set(
      projectList.flatMap((p) =>
        p.tech
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      )
    )
  );
  const tags = ["All", ...allTags];

  const filtered = projectList.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tech.toLowerCase().includes(query.toLowerCase());
    const matchesTag = activeTag === "All" || p.tech.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <section
      id="projects"
      className="relative py-20 bg-gray-950 text-white overflow-hidden"
      onMouseMove={(e) => {
        const s = e.currentTarget;
        const r = s.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width - 0.5;
        const my = (e.clientY - r.top) / r.height - 0.5;
        s.style.setProperty('--parx', String(mx));
        s.style.setProperty('--pary', String(my));
      }}
    >
      {/* Parallax gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-25"
        style={{
          background: 'radial-gradient(circle at center, rgba(99,102,241,0.35), transparent 60%)',
          transform: 'translate3d(calc(var(--parx,0)*20px), calc(var(--pary,0)*-10px), 0)'
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(34,211,238,0.35), transparent 60%)',
          transform: 'translate3d(calc(var(--parx,0)*-15px), calc(var(--pary,0)*12px), 0)'
        }}
      />
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-blue-400 text-center">
          🚀 My Projects
        </h2>
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`px-3 py-1 rounded-full text-sm border transition will-change-transform ${
                  activeTag === t
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent'
                    : 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10'
                }`}
                onMouseMove={(e) => {
                  const b = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - (b.left + b.width / 2);
                  const y = e.clientY - (b.top + b.height / 2);
                  e.currentTarget.style.transform = `translate3d(${x * 0.08}px, ${y * 0.08}px, 0)`;
                }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate3d(0,0,0)'; }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full md:w-72 rounded-full bg-gray-800/80 border border-white/10 px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
          </div>
        </div>

        {/* Sliding window */}
        <SlidingRow
          items={filtered}
          ariaLabel="Projects slider"
          renderItem={(p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-gray-800/90 rounded-xl shadow-lg overflow-hidden cursor-pointer border border-white/10 backdrop-blur h-full will-change-transform"
              onClick={() => openModal(p)}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                el.style.transform = `perspective(800px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(220px circle at var(--mx) var(--my), rgba(56,189,248,0.25), transparent 45%)' }}
              />
              <div className="relative">
                <img src={p.image} alt={p.title} className="w-full h-44 object-cover transform transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4 text-left">
                <h3 className="text-lg font-bold text-blue-400 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-3 whitespace-pre-line">{p.description}</p>
                <p className="mt-2 text-xs text-gray-400 italic">{p.tech}</p>
              </div>
            </motion.div>
          )}
        />
      </div>
      {/* Wave divider */}
      <div className="absolute left-0 right-0 bottom-0 translate-y-full" aria-hidden>
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-[120px]">
          <path fill="url(#gradProjects)" fillOpacity="0.6" d="M0,64L60,80C120,96,240,128,360,122.7C480,117,600,75,720,69.3C840,64,960,96,1080,96C1200,96,1320,64,1380,48L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
          <defs>
            <linearGradient id="gradProjects" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE"/>
              <stop offset="100%" stopColor="#6366F1"/>
            </linearGradient>
          </defs>
        </svg>
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
