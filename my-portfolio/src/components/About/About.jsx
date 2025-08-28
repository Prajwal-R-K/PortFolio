import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { fadeInUp, scaleIn, viewport as viewportSettings } from '../../utils/animations';

// Not needed in every file if set at App.jsx, but for clarity kept.
Modal.setAppElement("#root");

function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="about" className="pt-20 py-20 px-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <motion.div
        initial={fadeInUp.initial}
        whileInView={fadeInUp.animate}
        viewport={viewportSettings}
        transition={fadeInUp.transition}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
      >
        <motion.img
          src={`${process.env.PUBLIC_URL}/profile.jpg`}
          alt="Prajwal Profile"
          className="w-48 h-48 rounded-full object-cover border-4 border-blue-600 shadow-lg cursor-pointer"
          initial={scaleIn.initial}
          whileInView={scaleIn.animate}
          viewport={viewportSettings}
          transition={scaleIn.transition}
          onClick={() => setIsModalOpen(true)}
        />
        <div className="flex-1 space-y-6 text-base leading-relaxed text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 underline decoration-blue-400">
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

export default About;
