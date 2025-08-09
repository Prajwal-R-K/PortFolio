// src/components/Buttons/MagneticButton.jsx
import React, { useRef } from "react";

export default function MagneticButton({ children, onClick }) {
  const ref = useRef();
  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };
  const handleLeave = () => {
    ref.current.style.transform = "translate(0,0)";
  };
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="px-6 py-3 rounded-xl bg-pink-500 text-white transition-transform duration-200"
    >
      {children}
    </button>
  );
}
