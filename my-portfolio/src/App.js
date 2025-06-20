import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./index.css";
import { FaFilePdf } from "react-icons/fa";
import Modal from "react-modal";
import emailjs from 'emailjs-com';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
Modal.setAppElement('#root');
// Required for accessibility
Modal.setAppElement("#root");

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

// Toggle dark mode by toggling a CSS class on <html>
useEffect(() => {
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [isDarkMode]);
const [selectedProject, setSelectedProject] = useState(null);

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
• Features include deposit, withdrawal, balance check, and user account simulation  
• Built as part of Samsung Innovation Campus – Python Certification program  
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


/* 👨‍💻 About Me Section */
function AboutSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="about" className="pt-20 py-20 px-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
      >
        {/* Profile Photo with Zoom */}
        <motion.img
          src={`${process.env.PUBLIC_URL}/profile.jpg`}
          alt="Prajwal Profile"
          className="w-48 h-48 rounded-full object-cover border-4 border-blue-600 shadow-lg cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          onClick={() => setIsModalOpen(true)}
        />

        {/* Text Content */}
        <div className="flex-1 space-y-6 text-base leading-relaxed text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-500 dark:text-blue-400 underline decoration-blue-400">
            👨‍💻 About Me
          </h2>

          <p>Hello! I'm <span className="font-semibold text-blue-600 dark:text-blue-400">Prajwal R K</span>, a curious and passionate Computer Science & Engineering student from Cambridge Institute of Technology, Bangalore. I'm currently pursuing my B.Tech (2022–2026) and hold a CGPA of 8.6.</p>
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
          I'm <span className="font-semibold text-blue-600 dark:text-blue-400">Prajwal R K</span>, a full-stack developer passionate about building impactful software and exploring the latest in web, mobile, and backend technologies.
        </p>
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </Modal>
    </section>
  );
}

// Function to send email using EmailJS
const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm(
    'portfolio-service',       // Replace with your Service ID
    'portfolio-template',      // Replace with your Template ID
    e.target,
    'fnYFj6MM5DXSvACRX'        // Replace with your Public API key
  )
  .then(
    () => {
      alert("Message sent successfully!");
    },
    (error) => {
      alert("Failed to send message. Please try again.");
      console.error(error);
    }
  );

  e.target.reset();
};

  return (
  <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen text-white bg-gray-900 dark:bg-white  
text-white dark:text-black  
bg-blue-600 dark:bg-blue-500
">
    

<nav className="fixed top-0 left-0 w-full bg-gray-950 border-b border-gray-800 shadow-md z-50">
  <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
    <div className="text-xl font-bold text-blue-400">Prajwal</div>

    {/* Desktop menu */}
    <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-300">
      <a href="#hero" className="hover:text-blue-400 transition">Home</a>
      <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
      <a href="#about" className="hover:text-blue-400 transition">About</a>
      <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
      <a href="#certificates" className="hover:text-blue-400 transition">Certificates</a>
      <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer"   className="hover:text-blue-400 transition">  View Resume</a>

    </div>

    {/* Mobile hamburger icon */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="md:hidden text-gray-300 text-2xl focus:outline-none"
    >
      {menuOpen ? "✖" : "☰"}
    </button>
  </div>

  {/* Mobile menu dropdown */}
  {menuOpen && (
    <div className="md:hidden bg-gray-900 px-6 pb-4 space-y-4 text-sm text-gray-300">
      {["hero", "projects", "about", "contact"].map((section) => (
        <a
          key={section}
          href={`#${section}`}
          onClick={() => setMenuOpen(false)} // Close menu on click
          className="block hover:text-blue-400 transition"
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </a>
      ))}
  <a
  href={`${process.env.PUBLIC_URL}/Resume.pdf`}
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-blue-400 transition"
>
  View Resume
</a>


    </div>
  )}



  <button
  onClick={() => setIsDarkMode(!isDarkMode)}
  className="ml-4 text-lg hover:text-blue-400 transition"
  aria-label="Toggle Dark Mode"
>
  {isDarkMode ? "☀️" : "🌙"}
</button>

</nav>

    {/* 🧑‍💻 Hero Section */}
    <section id="hero" className="pt-20 flex items-center justify-center min-h-screen p-6">
      <motion.section
  id="hero"
  className="pt-20 flex items-center justify-center min-h-screen p-6"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-center space-y-6 max-w-2xl"
      >
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-5xl font-extrabold"
        >
          Hi, I'm <span className="text-blue-500">Prajwal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg text-gray-300"
        >
          A passionate developer crafting interactive, creative, and unique web experiences.
        </motion.p>

        <motion.button
  onClick={() => {
    const projects = document.getElementById("projects");
    projects?.scrollIntoView({ behavior: "smooth" });
  }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold shadow-lg"
>
  View My Work
</motion.button>
<a
  href={`${process.env.PUBLIC_URL}/Resume.pdf`}
  download
  className="inline-block mt-4 bg-transparent text-blue-400 border border-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
>
  Download Resume
</a>


</motion.div>
</motion.section>
</section>

{/* 💼 Projects Section */}
<section id="projects" className="py-20 px-4 bg-gray-950 text-white">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="w-full max-w-6xl mx-auto"
  >
    <h2 className="text-3xl font-bold mb-10 text-center text-blue-400 underline decoration-blue-400">
      🚀 My Projects
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projectList.map((project, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => setSelectedProject(project)}
          className="bg-gray-800 hover:bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-52 object-cover"
          />
          <div className="p-5 space-y-2">
            <h3 className="text-xl font-bold text-blue-400">{project.title}</h3>
            <p className="text-sm text-gray-300 line-clamp-3 whitespace-pre-line">
              {project.description}
            </p>
            <p className="text-xs text-gray-400 italic">{project.tech}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>



{/* 👨‍💻 About Me Section */}
<AboutSection />



{/* 📬 Contact Me Section */}
<motion.section
  id="contact"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className="pt-20 py-20 px-6 bg-gray-950 text-white"
>
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="max-w-3xl mx-auto text-center"
  >
    <h2 className="text-3xl font-bold mb-8 text-blue-400">Contact Me</h2>

    <form onSubmit={sendEmail} className="space-y-6">
      <div>
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          required
          className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div>
        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
          required
          className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div>
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        ></textarea>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold shadow-lg"
      >
        Send Message
      </motion.button>
    </form>
  </motion.div>
</motion.section>


{/* 🧠 Skills Section */}
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



{/* 🏅 Certificates Section */}
<section id="certificates" className="py-20 px-6 bg-gray-100 dark:bg-gray-900 dark:text-white">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="max-w-6xl mx-auto text-center"
  >
    <h2 className="text-3xl font-bold mb-12 text-blue-600 dark:text-blue-400 underline decoration-blue-400">
      🏅 My Certificates
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {[
        //{ file: "sap_certificate.jpg", title: "SAP Certificate" },
        //{ file: "azure_cert.png", title: "Azure Cloud" },
        { file: "IOT_Infosys.pdf", title: "IoT Platforms Overview" },
        { file: "JavaFoundation_Infosys.pdf", title: "Java Foundation Certification" },
        { file: "JavaProgramming_Infosys.pdf", title: "Programming using Java" },
        { file: "JavaDataStructures_Infosys.pdf", title: "Data Structures and Algorithms using Java" },
        { file: "PythonFoundation_Infosys.pdf", title: "Python Foundation Certification" },
        { file: "MLFoundation_Infosys.pdf", title: "Machine Learning Foundation Certification" },
        { file: "MLPython_Infosys.pdf", title: "Explore Machine Learning using Python" },
      ].map((cert, index) => (
        <motion.div
          key={`cert-${index}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="relative group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all border-4 border-transparent hover:border-blue-500 hover:shadow-2xl hover:rotate-1 hover:scale-[1.02] duration-500"
        >
          <div className="relative z-10 p-6 h-full flex flex-col justify-between rounded-xl">
            {cert.file.endsWith('.pdf') ? (
              <>
                <div className="pb-4 font-semibold text-gray-800 dark:text-white text-lg group-hover:underline transition-all duration-300">
                  {cert.title}
                </div>
                <a
                  href={`${process.env.PUBLIC_URL}/certificates/${cert.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  <FaFilePdf className="mr-2" /> View PDF
                </a>
              </>
            ) : (
              <>
                <motion.img
                  src={`${process.env.PUBLIC_URL}/certificates/${cert.file}`}
                  alt={cert.title}
                  className="w-full h-64 object-cover rounded shadow-sm group-hover:scale-105 group-hover:rotate-1 transition duration-500"
                />
                <div className="pt-4 text-lg font-semibold text-gray-800 dark:text-white group-hover:underline transition-all duration-300">
                  {cert.title}
                </div>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>


<Modal
  isOpen={!!selectedProject}
  onRequestClose={() => setSelectedProject(null)}
  contentLabel="Project Details"
  className="max-w-lg mx-auto mt-24 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl outline-none"
  overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start z-50"
>
  {selectedProject && (
    <div className="text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
      <p className="mb-4 text-sm text-gray-500">{selectedProject.tech}</p>
      <img
        src={selectedProject.image}
        alt={selectedProject.title}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <p className="mb-4 whitespace-pre-line">{selectedProject.description}</p>

      {selectedProject.github && (
        <a
          href={selectedProject.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700"
        >
          🔗 View on GitHub
        </a>
      )}

      <div className="mt-6 text-right">
        <button
          onClick={() => setSelectedProject(null)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  )}
</Modal>



  </div>
);

}

export default App;
