// src/components/Shared/ConfettiOnClick.jsx
import React, { useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiOnClick({ children }) {
  const [confetti, setConfetti] = useState(false);

  const triggerConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  return (
    <>
      <button onClick={triggerConfetti}>{children}</button>
      {confetti && <Confetti recycle={false} numberOfPieces={300} />}
    </>
  );
}
