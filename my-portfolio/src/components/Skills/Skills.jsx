import React from "react";
import { motion } from "framer-motion";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function Skills() {
  return (
    <section id="skills" className="pt-20 px-6 bg-gradient-to-r from-black to-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
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
              whileHover={{ scale: 1.1 }}
              className="text-center cursor-pointer"
              data-tooltip-id={`tooltip-${tech.name}`}
              data-tooltip-content={tech.desc}
            >
              <img src={tech.icon} alt={tech.name} className="h-12 mx-auto" />
              <p className="mt-2 text-sm">{tech.name}</p>
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
              whileHover={{ scale: 1.1 }}
              className="text-center cursor-pointer"
              data-tooltip-id={`tooltip-${tech.name}`}
              data-tooltip-content={tech.desc}
            >
              <img src={tech.icon} alt={tech.name} className="h-12 mx-auto" />
              <p className="mt-2 text-sm">{tech.name}</p>
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
              whileHover={{ scale: 1.1 }}
              className="text-center cursor-pointer"
              data-tooltip-id={`tooltip-${tech.name}`}
              data-tooltip-content={tech.desc}
            >
              <img src={tech.icon} alt={tech.name} className="h-12 mx-auto" />
              <p className="mt-2 text-sm">{tech.name}</p>
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
              whileHover={{ scale: 1.1 }}
              className="text-center cursor-pointer"
              data-tooltip-id={`tooltip-${tech.name}`}
              data-tooltip-content={tech.desc}
            >
              <img src={tech.icon} alt={tech.name} className="h-12 mx-auto" />
              <p className="mt-2 text-sm">{tech.name}</p>
              <Tooltip id={`tooltip-${tech.name}`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Skills;
