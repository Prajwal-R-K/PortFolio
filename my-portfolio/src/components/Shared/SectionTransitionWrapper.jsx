// src/components/Shared/SectionTransitionWrapper.jsx
import React from "react";
import { motion } from "framer-motion";

export default function SectionTransitionWrapper({ children, variant = "diagonal" }) {
  const variants = {
    diagonal: {
      initial: { x: "100%", y: "-100%", opacity: 0 },
      animate: { x: 0, y: 0, opacity: 1 },
      exit: { x: "-100%", y: "100%", opacity: 0 },
    },
    circle: {
      initial: { clipPath: "circle(0% at 50% 50%)" },
      animate: { clipPath: "circle(150% at 50% 50%)" },
      exit: { clipPath: "circle(0% at 50% 50%)" },
    },
    split: {
      initial: { clipPath: "inset(0 0 0 0)" },
      animate: { clipPath: "inset(0 0 0 0)" },
      exit: { clipPath: "inset(0 50% 0 50%)" },
    },
    fade: {
      initial: { opacity: 0, filter: "blur(6px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(6px)" },
    },
    slideUp: {
      initial: { y: 32, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -24, opacity: 0 },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
      variants={variants[variant]}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
