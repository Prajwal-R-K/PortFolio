import React from "react";
import { useScroll, motion } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Track */}
      <div className="h-2 w-full bg-white/10 dark:bg-black/30 backdrop-blur-sm" />
      {/* Progress */}
      <motion.div
        className="absolute top-0 left-0 h-2 origin-left rounded-r-full shadow-[0_0_12px_rgba(56,189,248,0.7)] bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600"
        style={{ scaleX: scrollYProgress, right: 0 }}
      />
    </div>
  );
}
