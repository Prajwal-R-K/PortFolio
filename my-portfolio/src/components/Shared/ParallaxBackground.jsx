import React, { useEffect } from "react";

const ParallaxBackground = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.querySelectorAll('.parallax').forEach((el, i) => {
        const speed = (i + 1) * 0.02;
        const x = (window.innerWidth - e.clientX * speed) / 100;
        const y = (window.innerHeight - e.clientY * speed) / 100;
        el.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <img
        src="/images/stars1.png"
        alt="stars"
        className="parallax fixed top-20 left-20 w-32 opacity-40 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <img
        src="/images/cloud.png"
        alt="cloud"
        className="parallax fixed top-40 right-20 w-40 opacity-30 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <img
        src="/images/planet.png"
        alt="planet"
        className="parallax fixed bottom-20 left-32 w-28 opacity-30 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Add more floating shapes as you wish */}
    </>
  );
};
export default ParallaxBackground;
