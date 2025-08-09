// src/components/Skills/SkillsWheel.jsx
import React from "react";
import "./SkillsWheel.css";

const skills = ["React", "NodeJS", "Python", "Java", "MongoDB", "C++"];

export default function SkillsWheel() {
  return (
    <div className="skills-wheel">
      {skills.map((s, i) => (
        <div key={i} className="skill" style={{ "--i": i }}>
          {s}
        </div>
      ))}
    </div>
  );
}
