import React from "react";

function Navbar({ isDarkMode, setIsDarkMode, menuOpen, setMenuOpen, activeSection }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/30 bg-white/70 dark:bg-black/40 border-b border-white/20 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="relative group">
          <a
            href="#hero"
            aria-label="Prajwal R K"
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 rounded"
          >
            <span className="relative inline-block align-middle">
              {/* Base short name */}
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                R K
              </span>
              {/* Expanding full name overlay */}
              <span className="absolute left-0 top-0 whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-[18ch] group-focus-within:max-w-[18ch] transition-all duration-300 ease-out">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Prajwal R K
                </span>
              </span>
            </span>
          </a>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {[
            { href: "#hero", label: "Home" },
            { href: "#projects", label: "Projects" },
            { href: "#about", label: "About" },
            { href: "#skills", label: "Skills" },
            { href: "#certificates", label: "Certifications" },
            { href: "#contact", label: "Contact me" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-gradient-to-r from-cyan-400 to-blue-600 hover:after:w-full after:transition-all ${
                activeSection === item.href.replace('#','') ? 'text-blue-600 dark:text-cyan-300 after:w-full' : 'hover:text-blue-500'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={`${process.env.PUBLIC_URL}/Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            View Resume
          </a>
        </div>
        {/* Mobile */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300 text-2xl focus:outline-none"
            aria-label="Mobile Menu"
          >
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 text-sm text-gray-800 dark:text-gray-300 bg-white/80 dark:bg-black/60 backdrop-blur">
          {[
            { id: 'hero', label: 'Home' },
            { id: 'projects', label: 'Projects' },
            { id: 'about', label: 'About' },
            { id: 'skills', label: 'Skills' },
            { id: 'certificates', label: 'Certifications' },
            { id: 'contact', label: 'Contact me' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className={`block transition ${activeSection === item.id ? 'text-blue-600 dark:text-cyan-300 font-semibold' : 'hover:text-blue-500'}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={`${process.env.PUBLIC_URL}/Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition block"
          >
            View Resume
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
