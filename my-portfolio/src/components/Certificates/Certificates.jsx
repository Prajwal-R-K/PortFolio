import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlidingRow from "../Shared/SlidingRow";
import { FaFilePdf } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

const certificates = [
  { file: "IOT_Infosys.pdf", title: "IoT Platforms Overview" },
  { file: "JavaFoundation_Infosys.pdf", title: "Java Foundation Certification" },
  { file: "JavaProgramming_Infosys.pdf", title: "Programming using Java" },
  { file: "JavaDataStructures_Infosys.pdf", title: "Data Structures and Algorithms using Java" },
  { file: "PythonFoundation_Infosys.pdf", title: "Python Foundation Certification" },
  { file: "MLFoundation_Infosys.pdf", title: "Machine Learning Foundation Certification" },
  { file: "MLPython_Infosys.pdf", title: "Explore Machine Learning using Python" },
];

// now uses shared SlidingRow

export default function Certificates() {
  // Modal state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
  // Helpers
  const openPreview = useCallback((cert) => {
    setActiveCert(cert);
    setPreviewOpen(true);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewOpen(false);
    setActiveCert(null);
  }, []);

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.96 },
    in: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section
      id="certificates"
      className="relative py-20 px-6 bg-gray-100 dark:bg-gray-900 dark:text-white overflow-hidden"
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
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(99,102,241,0.35), transparent 60%)',
          transform: 'translate3d(calc(var(--parx,0)*20px), calc(var(--pary,0)*-10px), 0)'
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-25"
        style={{
          background: 'radial-gradient(circle at center, rgba(34,211,238,0.35), transparent 60%)',
          transform: 'translate3d(calc(var(--parx,0)*-15px), calc(var(--pary,0)*12px), 0)'
        }}
      />
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          🏅 My Certificates
        </h2>
        <p className="mb-10 text-gray-600 dark:text-gray-300">Browse my certifications. Click to preview, download, or open.</p>
        {/* Sliding window controls */}
        <SlidingRow
          items={certificates}
          ariaLabel="Certificates slider"
          renderItem={(cert, index) => (
            <motion.div
              key={cert.file}
              variants={cardVariants}
              initial="initial"
              whileInView="in"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group relative rounded-2xl border border-white/10 bg-white/70 dark:bg-gray-800/70 backdrop-blur shadow-lg overflow-hidden h-full will-change-transform"
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
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(200px circle at var(--mx,50%) var(--my,50%), rgba(56,189,248,0.18), transparent 40%)' }} />
              <div
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
                }}
                className="p-5 flex flex-col h-full"
              >
                {cert.file.endsWith('.pdf') ? (
                  <div className="flex-1 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 mb-4">
                    <FaFilePdf className="text-red-500" size={42} />
                  </div>
                ) : (
                  <motion.img
                    src={`${process.env.PUBLIC_URL}/certificates/${cert.file}`}
                    alt={cert.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.25 }}
                  />
                )}
                <h3 className="text-left text-lg font-semibold text-gray-800 dark:text-white">{cert.title}</h3>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => openPreview(cert)}
                    className="inline-flex items-center justify-center bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition shadow-md text-sm will-change-transform"
                    onMouseMove={(e) => {
                      const b = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - (b.left + b.width / 2);
                      const y = e.clientY - (b.top + b.height / 2);
                      e.currentTarget.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0) scale(1.03)`;
                    }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate3d(0,0,0) scale(1)'; }}
                  >
                    <FaFilePdf className="mr-1" size={14} /> Preview
                  </button>
                  <a
                    href={`${process.env.PUBLIC_URL}/certificates/${cert.file}`}
                    download
                    className="inline-flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-2.5 py-1.5 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition shadow-md text-sm will-change-transform"
                    onMouseMove={(e) => {
                      const b = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - (b.left + b.width / 2);
                      const y = e.clientY - (b.top + b.height / 2);
                      e.currentTarget.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0) scale(1.03)`;
                    }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate3d(0,0,0) scale(1)'; }}
                  >
                    <FaDownload className="mr-1" size={14} /> Download
                  </a>
                  <a
                    href={`${process.env.PUBLIC_URL}/certificates/${cert.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-cyan-600 text-white px-2.5 py-1.5 rounded-full hover:bg-cyan-700 transition shadow-md text-sm will-change-transform"
                    onMouseMove={(e) => {
                      const b = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - (b.left + b.width / 2);
                      const y = e.clientY - (b.top + b.height / 2);
                      e.currentTarget.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0) scale(1.03)`;
                    }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate3d(0,0,0) scale(1)'; }}
                  >
                    <FaExternalLinkAlt className="mr-1" size={14} /> Open
                  </a>
                </div>
              </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreview}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
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
                  data={`${process.env.PUBLIC_URL}/certificates/${activeCert.file}`}
                  type="application/pdf"
                  className="w-full h-[70vh]"
                >
                  <div className="p-6 text-center">
                    <p className="mb-2">PDF preview is not available in this browser.</p>
                    <a
                      href={`${process.env.PUBLIC_URL}/certificates/${activeCert.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >Open PDF</a>
                  </div>
                </object>
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/certificates/${activeCert.file}`}
                  alt={activeCert.title}
                  className="w-full h-auto"
                />
              )}
              <div className="p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">{activeCert.title}</h3>
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
                    className="inline-flex items-center justify-center bg-cyan-600 text-white px-3 py-2 rounded-full hover:bg-cyan-700 transition shadow-md"
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
