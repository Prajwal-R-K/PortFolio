import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlidingRow from "../Shared/SlidingRow";
import { fadeInUp, viewport as viewportSettings } from '../../utils/animations';
import { FaDownload } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

const certificates = [
  { 
    file: "IOT_Infosys.pdf", 
    title: "IoT Platforms Overview",
    organization: "Infosys",
    platform: "Infosys Springboard",
    logo: "infosys-logo.png",
    progress: 38,
    icon: "🌐",
    gradient: "from-purple-500 to-blue-500"
  },
  { 
    file: "JavaFoundation_Infosys.pdf", 
    title: "Java Foundation",
    organization: "Infosys",
    platform: "Infosys Springboard",
    logo: "",
    progress: 95,
    icon: "☕",
    gradient: "from-amber-500 to-orange-500"
  },
  { 
    file: "JavaProgramming_Infosys.pdf", 
    title: "Programming using Java",
    organization: "Infosys",
    platform: "Infosys Springboard",
    logo: "",
    progress: 88,
    icon: "☕",
    gradient: "from-amber-500 to-orange-500"
  },
  { 
    file: "JavaDataStructures_Infosys.pdf", 
    title: "Data Structures and Algorithms",
    organization: "Infosys",
    platform: "Infosys Springboard",
    logo: "",
    progress: 92,
    icon: "☕",
    gradient: "from-amber-500 to-orange-500"
  },
  { 
    file: "PythonFoundation_Infosys.pdf", 
    title: "Python Foundation",
    organization: "Infosys",
    platform: "Infosys Springboard",
    logo: "infosys-logo.png",
    progress: 85,
    icon: "🐍",
    gradient: "from-emerald-500 to-blue-500"
  },
  { 
    file: "MLFoundation_Infosys.pdf", 
    title: "Machine Learning Foundation",
    organization: "Infosys",
    platform: "Infosys Springboard",
    logo: "infosys-logo.png",
    progress: 42,
    icon: "🤖",
    gradient: "from-pink-500 to-purple-500"
  },
  { 
    file: "MLPython_Infosys.pdf", 
    title: "Machine Learning with Python",
    organization: "Infosys",
    platform: "Infosys Springboard",
    logo: "infosys-logo.png",
    progress: 65,
    icon: "🤖",
    gradient: "from-pink-500 to-purple-500"
  },
];

// now uses shared SlidingRow

export default function Certificates() {
  // Modal state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
  // Helpers
  const openPreview = useCallback((cert) => {
    // Scroll to certificates section
    document.getElementById('certificates').scrollIntoView({ behavior: 'smooth' });
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    setActiveCert(cert);
    setPreviewOpen(true);
  }, []);

  // Clean up scroll lock when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const closePreview = useCallback(() => {
    // Unlock body scroll
    document.body.style.overflow = 'auto';
    setPreviewOpen(false);
    setActiveCert(null);
  }, []);

  // Using shared animation variants from utils/animations.js

  return (
    <section
      id="certificates"
      className="relative py-20 px-6 bg-transparent text-gray-900 dark:text-white overflow-hidden"
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
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-30 hidden dark:block"
        style={{
          background: 'radial-gradient(circle at center, rgba(99,102,241,0.35), transparent 60%)',
          transform: 'translate3d(calc(var(--parx,0)*20px), calc(var(--pary,0)*-10px), 0)'
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-25 hidden dark:block"
        style={{
          background: 'radial-gradient(circle at center, rgba(34,211,238,0.35), transparent 60%)',
          transform: 'translate3d(calc(var(--parx,0)*-15px), calc(var(--pary,0)*12px), 0)'
        }}
      />
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2 accent-text-gradient">
          🏅 My Certificates
        </h2>
        <p className="mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          These certifications reflect my technical learning and expertise in programming and data structures.
        </p>
        {/* Sliding window controls */}
        <SlidingRow
          items={certificates}
          ariaLabel="Certificates slider"
          renderItem={(cert, index) => (
            <motion.div
              key={cert.file}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={viewportSettings}
              transition={{ ...fadeInUp.transition, delay: index * 0.05 }}
              className={`group relative rounded-2xl border border-white/20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-xl overflow-hidden h-full will-change-transform 
                transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-1
                hover:bg-gradient-to-br ${cert.gradient} hover:bg-opacity-10
                after:absolute after:inset-0 after:pointer-events-none after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
                ${
                  cert.gradient.includes('blue') 
                    ? 'hover:shadow-blue-500/20 after:bg-gradient-to-br after:from-blue-500/5 after:to-transparent' 
                    : cert.gradient.includes('orange') 
                      ? 'hover:shadow-orange-500/20 after:bg-gradient-to-br after:from-orange-500/5 after:to-transparent' 
                      : 'hover:shadow-purple-500/20 after:bg-gradient-to-br after:from-purple-500/5 after:to-transparent'
                }
              `}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                el.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
                el.style.setProperty('--ry', `${(x * 6).toFixed(2)}deg`);
                el.style.transform = 'perspective(800px) rotateX(var(--rx, 0)) rotateY(var(--ry, 0))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
              }}
            >
              {/* Platform Badge (top-center) with theme color */}
              <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-sm
                  bg-white/90 text-gray-800 dark:bg-gray-900/50 dark:text-gray-100 border border-black/5 dark:border-white/10
                  transition-all duration-300 group-hover:scale-105 group-hover:shadow-md`}>
                  {cert.platform}
                </span>
              </div>
              
              {/* Card Content */}
              <div className="h-full flex flex-col">
                <div className="flex-1 p-6 pt-16">
                {/* Removed platform row (icon + text) */}

                {/* Centered Logo / Preview */}
                <div className="flex justify-center mb-4">
                  <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full p-0.5 bg-gradient-to-br ${cert.gradient} shadow-inner`}> 
                    <div className="w-full h-full rounded-full bg-white/90 dark:bg-gray-800/85 flex items-center justify-center 
                      group-hover:[animation:pulse_1.5s_ease-in-out_infinite] group-hover:ring-2 group-hover:ring-white/30">
                      <img 
                        src={`/images/logos/${cert.logo}`}
                        alt={cert.title}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const iconEl = e.currentTarget.nextElementSibling;
                          if (iconEl) iconEl.style.display = 'inline-flex';
                        }}
                      />
                      <span className="text-4xl hidden" aria-hidden>{cert.icon}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 text-center">
                  {cert.title}
                </h3>
                {/* Organization text removed from center */}
                
                {/* Progress bar removed */}
              </div>
                
                {/* Action Buttons with Labels */}
                <div className="relative z-10 flex items-center justify-center gap-6 p-5 bg-white/50 dark:bg-gray-900/30 border-t border-white/10">
                  {/* Preview Button */}
                  <div className="flex flex-col items-center group">
                    <button 
                      type="button"
                      onClick={() => openPreview(cert)}
                      className="p-3 rounded-full transition-all duration-300 transform hover:scale-110 cursor-pointer z-10
                        bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm
                        text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400
                        hover:bg-blue-50/80 dark:hover:bg-blue-900/30
                        border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900/30"
                      aria-label="Preview certificate"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <span className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-white/90 transition-colors">
                      Preview
                    </span>
                  </div>

                  {/* Download Button */}
                  <div className="flex flex-col items-center group">
                    <a 
                      href={`${process.env.PUBLIC_URL}/certificates/${cert.file}`} 
                      download
                      className="p-3 rounded-full transition-all duration-300 transform hover:scale-110 cursor-pointer z-10
                        bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm
                        text-gray-700 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400
                        hover:bg-green-50/80 dark:hover:bg-green-900/30
                        border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-900/30"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </a>
                    <span className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      Download
                    </span>
                  </div>

                  {/* Open in New Tab Button */}
                  <div className="flex flex-col items-center group">
                    <a 
                      href={`${process.env.PUBLIC_URL}/certificates/${cert.file}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full transition-all duration-300 transform hover:scale-110 cursor-pointer z-10
                        bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm
                        text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400
                        hover:bg-purple-50/80 dark:hover:bg-purple-900/30
                        border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900/30"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                    <span className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Open
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                style={{ 
                  background: 'radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(56, 189, 248, 0.1), transparent 60%)' 
                }} 
              />
            </motion.div>
          )}
        />
      </div>

      {/* Wave divider */}
      <div className="absolute left-0 right-0 bottom-0 translate-y-full" aria-hidden>
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-[120px]">
          <path fill="url(#grad)" fillOpacity="0.6" d="M0,64L60,80C120,96,240,128,360,122.7C480,117,600,75,720,69.3C840,64,960,96,1080,96C1200,96,1320,64,1380,48L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE"/>
              <stop offset="100%" stopColor="#6366F1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewOpen && activeCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black p-4 pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreview}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] min-h-[60vh] mt-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close"
                className="absolute top-3 right-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-full px-3 py-1"
                onClick={closePreview}
              >
                ✖
              </button>
              {activeCert.file.endsWith('.pdf') ? (
                <object
                  data={`${process.env.PUBLIC_URL}/certificates/${activeCert.file}#zoom=page-fit`}
                  type="application/pdf"
                  className="w-full h-[60vh] md:h-[65vh] mx-auto my-2 rounded-none border-0"
                >
                  <div className="p-6 text-center">
                    <p className="mb-2">PDF preview is not available in this browser.</p>
                    <a
                      href={`${process.env.PUBLIC_URL}/certificates/${activeCert.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >Open PDF</a>
                  </div>
                </object>
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/certificates/${activeCert.file}`}
                  alt={activeCert.title}
                  className="max-w-[95%] max-h-[60vh] md:max-h-[65vh] object-contain mx-auto my-2"
                />
              )}
              <div className="p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold accent-text-gradient">{activeCert.title}</h3>
                <div className="flex gap-2">
                  <a
                    href={`${process.env.PUBLIC_URL}/certificates/${activeCert.file}`}
                    download
                    className="inline-flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition shadow-md"
                  >
                    <FaDownload className="mr-2" /> Download
                  </a>
                  <a
                    href={`${process.env.PUBLIC_URL}/certificates/${activeCert.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center accent-gradient text-white px-3 py-2 rounded-full hover:brightness-110 transition shadow-md"
                  >
                    <FaExternalLinkAlt className="mr-2" /> Open
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
