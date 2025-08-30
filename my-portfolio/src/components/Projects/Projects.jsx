import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlidingRow from "../Shared/SlidingRow";
import { projectList } from "../../data/projectData";
import { fadeInUp, viewport as viewportSettings } from '../../utils/animations';

// using shared SlidingRow

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  // Lock background scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [modalOpen]);

  // Close modal on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setModalOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  // Conditional image fallback: only use when the project defines a fallbackImage
  const handleImgError = (e, item) => {
    if (!item) return;
    if (item.fallbackImage) {
      e.currentTarget.onerror = null;
      e.currentTarget.src = item.fallbackImage;
    }
  };

  const openModal = (project) => {
    const section = document.getElementById('projects');
    if (!section) {
      setModalProject(project);
      setModalOpen(true);
      return;
    }
    const rect = section.getBoundingClientRect();
    const alreadyInView = rect.top >= 0 && rect.top < 120;
    if (alreadyInView) {
      // Add a tiny delay for consistent UX
      setTimeout(() => {
        setModalProject(project);
        setModalOpen(true);
      }, 150);
      return;
    }
    // Smooth scroll to the Projects section first
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const start = performance.now();
    const maxWait = 1400; // ms safety cap
    const check = () => {
      const r = section.getBoundingClientRect();
      const closeEnough = Math.abs(r.top) < 6;
      if (closeEnough || performance.now() - start > maxWait) {
        setModalProject(project);
        setModalOpen(true);
      } else {
        requestAnimationFrame(check);
      }
    };
    requestAnimationFrame(check);
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
      className="relative py-20 bg-white text-gray-900 dark:bg-gray-950 dark:text-white overflow-hidden font-sans"
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
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-25 hidden dark:block"
        style={{
          background: 'radial-gradient(circle at center, rgba(99,102,241,0.35), transparent 60%)',
          transform: 'translate3d(calc(var(--parx,0)*20px), calc(var(--pary,0)*-10px), 0)'
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-20 hidden dark:block"
        style={{
          background: 'radial-gradient(circle at center, rgba(34,211,238,0.35), transparent 60%)',
          transform: 'translate3d(calc(var(--parx,0)*-15px), calc(var(--pary,0)*12px), 0)'
        }}
      />
      <div className="w-full max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-400 text-center"
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={viewportSettings}
          transition={fadeInUp.transition}
        >
          🚀 My Projects
        </motion.h2>
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
                    : 'text-cyan-700 border-cyan-300 bg-cyan-50 hover:bg-cyan-100 dark:border-cyan-500/40 dark:text-cyan-300 dark:bg-transparent dark:hover:bg-cyan-500/10'
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
              className="w-full md:w-72 rounded-full bg-white text-gray-900 border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800/80 dark:text-white dark:border-white/10"
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
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 overflow-hidden cursor-pointer border border-gray-200 backdrop-blur h-full will-change-transform transition-all duration-300 dark:bg-gray-800/90 dark:border-white/10"
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
              {/* Hover border glow - only on this card */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-cyan-400/40 group-hover:shadow-[0_0_0_2px_rgba(34,211,238,0.35),0_0_24px_4px_rgba(56,189,248,0.25)] transition-all duration-300 z-10"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(220px circle at var(--mx) var(--my), rgba(56,189,248,0.25), transparent 45%)' }}
              />
              {/* Image container with hover overlay */}
              <div className="relative overflow-hidden">
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <img
                    src={p.image}
                    onError={(e) => handleImgError(e, p)}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Inner image border highlight */}
                  <div className="pointer-events-none absolute inset-[6px] rounded-lg ring-1 ring-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Gradient overlay - only on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Caption - only show on hover */}
                  {p.caption && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 text-white border border-white/20 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {p.caption}
                    </span>
                  )}
                </div>
                
                {/* Animated separator line - only on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              <div className="p-4 text-left transition-colors duration-300 group-hover:bg-white/5">
                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 whitespace-pre-line group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                  {p.description}
                </p>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors">
                  {p.tech}
                </p>
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
            className="fixed inset-0 flex justify-center items-center z-[1000] bg-black p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
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
              className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-xl sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-gray-900 dark:text-white glowing-border max-h-[85vh] overflow-y-auto font-sans"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky header with title and close */}
              <div className="sticky top-0 z-10 -mx-6 -mt-6 px-6 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur flex items-center justify-between border-b border-gray-200 dark:border-white/10 rounded-t-2xl">
                <h2 id="project-modal-title" className="text-xl font-semibold text-blue-600 dark:text-blue-400">{modalProject.title}</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 hover:bg-blue-600 hover:text-white transition"
                  aria-label="Close modal"
                >
                  Close ✖
                </button>
              </div>
              <div className="relative w-full mb-4" style={{ paddingTop: '56.25%' }}>
                <img
                  src={modalProject.image}
                  onError={(e) => handleImgError(e, modalProject)}
                  alt={modalProject.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
              </div>
              {/* Animated separator in modal */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-[2px] w-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-4"
                aria-hidden
              />
              {/* Title shown in sticky header above */}
              <p className="mb-3 text-gray-500 dark:text-gray-200">{modalProject.tech}</p>
              <div className="mb-4 whitespace-pre-line text-base">{modalProject.description}</div>
              <div className="flex items-center gap-3 flex-wrap">
                {modalProject.live && (
                  <a
                    href={modalProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm shadow hover:opacity-90 transition"
                  >
                    🚀 Live Demo
                  </a>
                )}
                {modalProject.github && (
                  <a
                    href={modalProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/20 text-blue-400 hover:bg-white/10 text-sm transition"
                  >
                    🔗 View on GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}