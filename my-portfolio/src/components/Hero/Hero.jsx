import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section id="hero" className="pt-32 flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white dark:bg-white dark:text-black">
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
          Hi, I'm <span className="text-blue-500">Prajwal R K</span>
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
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
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
    </section>
  );
}

export default Hero;
