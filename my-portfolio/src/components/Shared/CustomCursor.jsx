import React, { useEffect, useRef } from "react";
import "./CustomCursor.css";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    const burst = (e) => {
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement("div");
        spark.className = "particle-burst";
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 900);
      }
    };
    document.addEventListener("mousedown", burst);
    return () => {
      document.removeEventListener("mousemove", () => {});
      document.removeEventListener("mousedown", burst);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
