import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";

const certificates = [
  { file: "IOT_Infosys.pdf", title: "IoT Platforms Overview" },
  { file: "JavaFoundation_Infosys.pdf", title: "Java Foundation Certification" },
  { file: "JavaProgramming_Infosys.pdf", title: "Programming using Java" },
  { file: "JavaDataStructures_Infosys.pdf", title: "Data Structures and Algorithms using Java" },
  { file: "PythonFoundation_Infosys.pdf", title: "Python Foundation Certification" },
  { file: "MLFoundation_Infosys.pdf", title: "Machine Learning Foundation Certification" },
  { file: "MLPython_Infosys.pdf", title: "Explore Machine Learning using Python" },
];

export default function Certificates() {
  const cardWidth = 280;
  const gap = 20;
  const speed = 0.2; // px/ms slow auto-scroll
  const totalCards = certificates.length;

  // Refs & state
  const containerRefs = useRef([]);
  const [mousePositions, setMousePositions] = useState(
    certificates.map(() => ({ x: 0, y: 0 }))
  );
  const shadowMove = 10;
  const mainMove = 5;

  const [position, setPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const animRef = useRef();
  const lastTimeRef = useRef();
  const isDragging = useRef(false);
  const velocityRef = useRef(0);

  // Floating depth effect handlers
  const handleMouseMove = (index, e) => {
    const rect = containerRefs.current[index].getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePositions((prev) => {
      const copy = [...prev];
      copy[index] = { x, y };
      return copy;
    });
  };
  const handleMouseLeave = (index) => {
    setMousePositions((prev) => {
      const copy = [...prev];
      copy[index] = { x: 0, y: 0 };
      return copy;
    });
  };

  // Infinite scroll with flick momentum and hover pause
useEffect(() => {
  const animateFrame = (time) => {
    if (lastTimeRef.current && !isDragging.current && !isHovered) {
      const delta = time - lastTimeRef.current;
      if (Math.abs(velocityRef.current) > 0.01) {
        setPosition((prev) => {
          const move = prev - velocityRef.current * delta;
          const totalWidth = (cardWidth + gap) * totalCards;
          const mod = ((move % totalWidth) + totalWidth) % totalWidth;
          setCurrentPage(Math.round(mod / (cardWidth + gap)) % totalCards);
          return mod;
        });
        velocityRef.current *= 0.95; // inertia decay
      } else {
        setPosition((prev) => {
          const move = prev - speed * delta;
          const totalWidth = (cardWidth + gap) * totalCards;
          const mod = ((move % totalWidth) + totalWidth) % totalWidth;
          setCurrentPage(Math.round(mod / (cardWidth + gap)) % totalCards);
          return mod;
        });
      }
    }
    lastTimeRef.current = time;
    animRef.current = requestAnimationFrame(animateFrame);
  };

  animRef.current = requestAnimationFrame(animateFrame);
  return () => cancelAnimationFrame(animRef.current);
}, [totalCards, isHovered]); // <-- include isHovered


  // Mouse wheel horizontal scroll handler
  const onWheel = (e) => {
    e.preventDefault();
    isDragging.current = true;
    velocityRef.current = 0; // stop momentum on wheel scroll

    let deltaX = e.deltaX;
    let deltaY = e.deltaY;
    if (deltaX === 0 && Math.abs(deltaY) > 0) deltaX = deltaY;

    setPosition((prev) => {
      const totalWidth = (cardWidth + gap) * totalCards;
      let newPos = prev + deltaX;
      newPos = ((newPos % totalWidth) + totalWidth) % totalWidth;
      setCurrentPage(Math.round(newPos / (cardWidth + gap)) % totalCards);
      return newPos;
    });

    // Resume auto-scroll after short delay
    clearTimeout(animRef.current);
    animRef.current = setTimeout(() => {
      isDragging.current = false;
    }, 1500);
  };

  const loopedCertificates = [...certificates, ...certificates];

  return (
    <section
      id="certificates"
      className="py-20 px-6 bg-gray-100 dark:bg-gray-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-400 underline decoration-blue-400">
          🏅 My Certificates
        </h2>

        {/* Carousel */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onWheel={onWheel}
          onMouseEnter={() => setIsHovered(true)}   // pause auto-scroll on hover
          onMouseLeave={() => setIsHovered(false)}  // resume auto-scroll on leave
        >
          <motion.div
            className="flex"
            style={{ gap: `${gap}px` }}
            drag="x"
            dragConstraints={{ left: -Infinity, right: Infinity }}
            dragElastic={0.05}
            onDragStart={() => {
              isDragging.current = true;
              velocityRef.current = 0;
            }}
            onDragEnd={(e, info) => {
              isDragging.current = false;
              velocityRef.current = info.velocity.x / 1000; // px/s to px/ms
            }}
            animate={{ x: -position }}
            transition={{ ease: "linear", duration: 0 }}
          >
            {loopedCertificates.map((cert, index) => {
              const pos = mousePositions[index % totalCards];
              return (
                <div
                  key={index}
                  ref={(el) => (containerRefs.current[index % totalCards] = el)}
                  onMouseMove={(e) => handleMouseMove(index % totalCards, e)}
                  onMouseLeave={() => handleMouseLeave(index % totalCards)}
                  className="relative perspective"
                  style={{ width: `${cardWidth}px`, flexShrink: 0 }}
                >
                  {/* Shadow layer */}
                  <motion.div
                    style={{
                      translateX: pos.x * shadowMove,
                      translateY: pos.y * shadowMove,
                    }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-400/30 to-purple-600/30 shadow-xl filter blur-lg"
                  />
                  {/* Main content layer */}
                  <motion.div
                    style={{
                      translateX: pos.x * mainMove,
                      translateY: pos.y * mainMove,
                      rotateX: 0,
                      rotateY:0,
                    }}
                    className="relative rounded-xl bg-white dark:bg-gray-800 overflow-hidden h-72 flex flex-col justify-between px-6 py-7 shadow-lg"
                  >
                    {cert.file.endsWith(".pdf") ? (
                      <>
                        <div className="text-lg font-semibold text-gray-800 dark:text-white underline decoration-blue-400">
                          {cert.title}
                        </div>
                        <a
                          href={`${process.env.PUBLIC_URL}/certificates/${cert.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition shadow-md mt-auto"
                        >
                          <FaFilePdf className="mr-2" /> View PDF
                        </a>
                      </>
                    ) : (
                      <>
                        <motion.img
                          src={`${process.env.PUBLIC_URL}/certificates/${cert.file}`}
                          alt={cert.title}
                          className="w-full h-40 object-cover rounded-md mb-4 shadow-sm"
                          whileHover={{ scale: 1.05, rotate: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="text-lg font-semibold text-gray-800 dark:text-white underline decoration-blue-400">
                          {cert.title}
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalCards }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentPage ? "bg-blue-500" : "bg-gray-400"
              }`}
              animate={{
                scale: i === currentPage ? [1, 1.3, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                repeat: i === currentPage ? Infinity : 0,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`.perspective { perspective: 1000px; }`}</style>
    </section>
  );
}
