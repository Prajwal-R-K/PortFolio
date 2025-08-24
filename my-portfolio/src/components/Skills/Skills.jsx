import React from "react";
import { motion } from "framer-motion";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function Skills() {
  const profMap = {
    C: 70,
    Python: 85,
    Java: 78,
    JavaScript: 88,
    MySQL: 80,
    MongoDB: 74,
    "Firebase DB": 76,
    Neo4j: 65,
    React: 86,
    "Node.js": 72,
    "Tailwind CSS": 82,
    Flask: 68,
    GitHub: 84,
    Firebase: 78,
    "VS Code": 90,
    Figma: 60,
  };
  return (
    <section id="skills" className="pt-20 px-6 bg-gradient-to-r from-black to-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-12 text-center text-blue-400">My Tech Stack</h2>
        {/* Category: Languages */}
        <h3 className="text-xl font-semibold text-left text-gray-300 mb-4">👨‍💻 Languages</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 mb-10">
          {[
            { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", desc: "Structured programming language" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", desc: "Versatile scripting and backend language" },
            { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", desc: "OOP-based backend language" },
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", desc: "Frontend scripting language" },
          ].map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.08, rotate: 1.5 }}
              whileTap={{ scale: 0.96 }}
              className="text-center cursor-pointer group"
              data-tooltip-id={`tooltip-${tech.name}`}
              data-tooltip-content={tech.desc}
            >
              <div className="relative inline-flex items-center justify-center">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100"
                  animate={{ opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.img
                  src={tech.icon}
                  alt={tech.name}
                  className="h-12 mx-auto drop-shadow"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <p className="mt-2 text-sm">{tech.name}</p>
              <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, profMap[tech.name] || 72)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <Tooltip id={`tooltip-${tech.name}`} />
            </motion.div>
          ))}
        </div>
        {/* Category: Databases */}
        <h3 className="text-xl font-semibold text-left text-gray-300 mb-4">🗃️ Databases</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 mb-10">
          {[
            { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", desc: "Relational database system" },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", desc: "NoSQL document database" },
            { name: "Firebase DB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", desc: "Realtime backend solution" },
            { name: "Neo4j", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg", desc: "Graph database for relationships" },
          ].map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.08, rotate: 1.5 }}
              whileTap={{ scale: 0.96 }}
              className="text-center cursor-pointer group"
              data-tooltip-id={`tooltip-${tech.name}`}
              data-tooltip-content={tech.desc}
            >
              <div className="relative inline-flex items-center justify-center">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100"
                  animate={{ opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.img
                  src={tech.icon}
                  alt={tech.name}
                  className="h-12 mx-auto drop-shadow"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <p className="mt-2 text-sm">{tech.name}</p>
              <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, profMap[tech.name] || 72)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <Tooltip id={`tooltip-${tech.name}`} />
            </motion.div>
          ))}
        </div>
        {/* Category: Frameworks & Libraries */}
        <h3 className="text-xl font-semibold text-left text-gray-300 mb-4">⚙️ Frameworks & Libraries</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 mb-10">
          {[
            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", desc: "Frontend component library" },
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", desc: "Backend JavaScript runtime" },
            { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", desc: "Utility-first CSS framework" },
            { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", desc: "Lightweight Python web framework" },
          ].map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.08, rotate: 1.5 }}
              whileTap={{ scale: 0.96 }}
              className="text-center cursor-pointer group"
              data-tooltip-id={`tooltip-${tech.name}`}
              data-tooltip-content={tech.desc}
            >
              <div className="relative inline-flex items-center justify-center">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100"
                  animate={{ opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.img
                  src={tech.icon}
                  alt={tech.name}
                  className="h-12 mx-auto drop-shadow"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <p className="mt-2 text-sm">{tech.name}</p>
              <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, profMap[tech.name] || 72)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <Tooltip id={`tooltip-${tech.name}`} />
            </motion.div>
          ))}
        </div>
        {/* Category: Tools */}
        <h3 className="text-xl font-semibold text-left text-gray-300 mb-4">🧰 Tools & Platforms</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {[
            { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", desc: "Code hosting and collaboration" },
            { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", desc: "Realtime database & hosting" },
            { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", desc: "Code editor" },
            { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", desc: "UI/UX design tool" },
          ].map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.08, rotate: 1.5 }}
              whileTap={{ scale: 0.96 }}
              className="text-center cursor-pointer group"
              data-tooltip-id={`tooltip-${tech.name}`}
              data-tooltip-content={tech.desc}
            >
              <div className="relative inline-flex items-center justify-center">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100"
                  animate={{ opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.img
                  src={tech.icon}
                  alt={tech.name}
                  className="h-12 mx-auto drop-shadow"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <p className="mt-2 text-sm">{tech.name}</p>
              <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, profMap[tech.name] || 72)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <Tooltip id={`tooltip-${tech.name}`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Skills;
