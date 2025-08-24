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
          Hi, I'm {" "}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 bg-clip-text text-transparent">
            Prajwal R K
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg text-gray-300 dark:text-gray-600 max-w-xl mx-auto"
        >
          A passionate developer crafting interactive, creative, and unique web experiences.
        </motion.p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <motion.button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-6 py-3 rounded-full font-semibold shadow-lg text-white bg-gradient-to-br from-cyan-400 to-blue-600"
          >
            View My Work
          </motion.button>
          <a
            href={`${process.env.PUBLIC_URL}/Resume.pdf`}
            download
            className="inline-block px-6 py-3 rounded-full font-semibold border border-sky-500 text-sky-400 hover:bg-sky-600 hover:text-white transition duration-300"
          >
            Download Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
