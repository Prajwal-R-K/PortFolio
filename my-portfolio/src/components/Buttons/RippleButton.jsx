// src/components/Buttons/RippleButton.jsx
import React, { useRef, useState } from "react";
import "./RippleButton.css";

export default function RippleButton({ children, onClick }) {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef();

  const handleClick = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, key: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.key !== newRipple.key));
    }, 500);
    if (onClick) onClick();
  };

  return (
    <button ref={buttonRef} onClick={handleClick} className="ripple-btn">
      {children}
      {ripples.map((r) => (
        <span
          key={r.key}
          className="ripple"
          style={{ top: r.y, left: r.x, width: r.size, height: r.size }}
        />
      ))}
    </button>
  );
}
