import React from "react";

function Navbar({ isDarkMode, setIsDarkMode, menuOpen, setMenuOpen, activeSection }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/30 bg-white/70 dark:bg-black/40 border-b border-white/20 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Prajwal R K
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {[
            { href: "#hero", label: "Home" },
            { href: "#projects", label: "Projects" },
            { href: "#about", label: "About" },
            { href: "#contact", label: "Contact" },
            { href: "#certificates", label: "Certificates" },
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
          {["hero", "projects", "about", "contact", "certificates"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => setMenuOpen(false)}
              className={`block transition ${activeSection === section ? 'text-blue-600 dark:text-cyan-300 font-semibold' : 'hover:text-blue-500'}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
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
