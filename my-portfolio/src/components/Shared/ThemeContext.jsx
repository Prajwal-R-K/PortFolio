// src/components/Shared/ThemeContext.jsx
import { createContext, useState, useEffect } from "react";
export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );
  useEffect(() => localStorage.setItem("theme", dark ? "dark" : "light"), [dark]);
  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
