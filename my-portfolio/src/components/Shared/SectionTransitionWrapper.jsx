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
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.7 }}
      variants={variants[variant]}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
