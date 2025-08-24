import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white dark:bg-white dark:text-black">
      {/* Animated gradient blobs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <motion.div
          className="absolute w-[40vw] h-[40vw] bg-gradient-to-br from-cyan-500/40 to-blue-700/30 blur-3xl rounded-full -top-24 -left-24"
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -10, 15, 0],
            rotate: [0, 10, -5, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[35vw] h-[35vw] bg-gradient-to-tr from-sky-400/30 to-indigo-600/30 blur-3xl rounded-full -bottom-24 -right-24"
          animate={{
            x: [0, -15, 10, 0],
            y: [0, 20, -10, 0],
            rotate: [0, -8, 6, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

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
