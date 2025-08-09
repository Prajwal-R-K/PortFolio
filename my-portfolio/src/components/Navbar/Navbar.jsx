import React from "react";

function Navbar({ isDarkMode, setIsDarkMode, menuOpen, setMenuOpen }) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-950 border-b border-gray-800 shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-400">Prajwal R K</div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-300">
          <a href="#hero" className="hover:text-blue-400 transition">Home</a>
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          <a href="#certificates" className="hover:text-blue-400 transition">Certificates</a>
          <a
            href={`${process.env.PUBLIC_URL}/Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            View Resume
          </a>
        </div>
        {/* Dark Mode / Mobile */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-lg text-gray-300 hover:text-blue-400 transition"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 text-2xl focus:outline-none"
            aria-label="Mobile Menu"
          >
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 px-6 pb-4 space-y-4 text-sm text-gray-300">
          {["hero", "projects", "about", "contact", "certificates"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-blue-400 transition"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
          <a
            href={`${process.env.PUBLIC_URL}/Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition block"
          >
            View Resume
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
