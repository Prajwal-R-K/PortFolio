import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { fadeInUp, scaleIn, viewport as viewportSettings } from '../../utils/animations';

// Not needed in every file if set at App.jsx, but for clarity kept.
Modal.setAppElement("#root");

function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="about" className="relative overflow-hidden pt-20 py-20 px-6 bg-transparent text-gray-900 dark:text-white">
      {/* Subtle animated background (kept very soft for readability) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-20 dark:opacity-25"
          style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))' }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.18, 0.25, 0.18] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 left-16 w-44 h-44 rounded-full blur-2xl opacity-15 dark:opacity-20"
          style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-to), var(--accent-from))' }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <motion.div
        initial={fadeInUp.initial}
        whileInView={fadeInUp.animate}
        viewport={viewportSettings}
        transition={fadeInUp.transition}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
      >
        {/* Floating avatar with subtle orbiting skill logos */}
        <div className="relative w-[14rem] h-[14rem] flex items-center justify-center">
          {(() => {
            const icons = [
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' },
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', alt: 'Java' },
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg', alt: 'HTML5' },
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg', alt: 'CSS3' },
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', alt: 'MySQL' },
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB' },
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', alt: 'Firebase' },
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', alt: 'Git' },
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', alt: 'GitHub' },
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', alt: 'VS Code' },
              { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', alt: 'Figma' },
            ];
            const count = 10; // limit to avoid overlap on small screens
            const radius = 112; // half of 14rem container -> exact ring around centered avatar
            return (
              <div className="absolute inset-0 pointer-events-none select-none z-10" aria-hidden>
                {icons.slice(0, count).map((icon, i) => {
                  const theta = (2 * Math.PI * i) / count;
                  const x = Math.cos(theta) * radius;
                  const y = Math.sin(theta) * radius;
                  return (
                    <motion.img
                      key={icon.alt}
                      src={icon.src}
                      alt={icon.alt}
                      title={icon.alt}
                      className="absolute w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 drop-shadow-md"
                      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
                      // lock position to maintain perfect circle
                    />
                  );
                })}
              </div>
            );
          })()}
          <motion.div
            animate={{ y: [0, -8, 0], boxShadow: ['0 0 0 0 rgba(0,0,0,0)', '0 0 32px 0 rgba(0,0,0,0.08)', '0 0 0 0 rgba(0,0,0,0)'] }}
            whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-full relative z-0"
          >
            <motion.img
              src={`${process.env.PUBLIC_URL}/profile.jpg`}
              alt="Prajwal Profile"
              className="w-48 h-48 rounded-full object-cover border-4 shadow-lg cursor-pointer transition-transform will-change-transform 
                border-gray-300 dark:border-white/10"
              initial={scaleIn.initial}
              whileInView={scaleIn.animate}
              viewport={viewportSettings}
              transition={scaleIn.transition}
              onClick={() => setIsModalOpen(true)}
            />
          </motion.div>
          {/* Pulsing glow ring */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full -z-10"
            style={{
              backgroundImage: 'radial-gradient(closest-side, rgba(255,255,255,0.7), transparent 70%)'
            }}
            animate={{ opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Orbit icons moved to logo ring above */}
        </div>
        <div className="flex-1 space-y-6 text-base leading-relaxed text-center md:text-left">
          <h2 className="text-3xl font-bold">
            <span className="accent-text-gradient">👨‍💻 About Me</span>
          </h2>
          <p>Hello! I'm <span className="font-semibold accent-text-gradient">Prajwal R K</span>, a curious and passionate Computer Science & Engineering student from Cambridge Institute of Technology, Bangalore. I'm currently pursuing my B.Tech (2022–2026) and hold a CGPA of 8.6.</p>
          <p>I specialize in building real-world software solutions — from mobile apps like a <strong>real-time chat application</strong> to Java-based desktop utilities like a <strong>Secret Santa pairing system</strong>. I’ve also built responsive frontends and server-side apps using <strong>React, Node.js, Firebase, Flask</strong>, and REST APIs.</p>
          <p>My technical stack includes <strong>Java, JavaScript, Python, Flutter, MySQL, Tailwind CSS</strong>, and I’m confident working with tools like GitHub, Figma, and VS Code.</p>
          <p>I believe in learning by doing. I enjoy collaborating with peers, experimenting with new technologies, and building things that create impact.</p>
          <p>I'm currently looking for internship opportunities where I can apply my skills, gain industry experience, and contribute meaningfully to tech-driven teams.</p>
          <div className="pt-6 text-sm text-gray-700 dark:text-gray-400 space-y-1">
            <p><strong>Core Skills:</strong> Full-Stack Development, Flutter, REST APIs, Data Structures, OOP, DBMS</p>
            <p><strong>Tools:</strong> Git, GitHub, Firebase, VS Code, Eclipse, Figma</p>
            <p><strong>Soft Skills:</strong> Problem Solving, Team Collaboration, Communication, Adaptability</p>
          </div>
        </div>
      </motion.div>
      {/* Modal with Profile Picture + Text Content */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Zoomed Profile"
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl max-w-3xl w-full mx-auto mt-20 outline-none text-gray-800 dark:text-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start z-50"
      >
        <img
          src={`${process.env.PUBLIC_URL}/profile.jpg`}
          alt="Zoomed Profile"
          className="w-full max-h-[400px] object-contain rounded-xl mb-6"
        />
        <p className="text-center mb-4 text-base">
          I'm <span className="font-semibold accent-text-gradient">Prajwal R K</span>, a full-stack developer passionate about building impactful software and exploring the latest in web, mobile, and backend technologies.
        </p>
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(false)}
            className="accent-gradient hover:brightness-110 text-white px-5 py-2 rounded shadow-glow"
          >
            Close
          </button>
        </div>
      </Modal>
    </section>
  );
}

export default About;
