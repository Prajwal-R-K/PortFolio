import React, { useEffect, useState } from 'react';

const THEMES = [
  { id: 'techy', label: 'Techy', vars: { '--accent-from': '#22d3ee', '--accent-to': '#6366f1' } },
  { id: 'minimal', label: 'Minimal', vars: { '--accent-from': '#64748b', '--accent-to': '#94a3b8' } },
  { id: 'neon', label: 'Neon', vars: { '--accent-from': '#22d3ee', '--accent-to': '#14b8a6' } },
];

function applyTheme(id) {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  // Always clear theme classes first
  root.classList.remove(...THEMES.map(t => `theme-${t.id}`));
  if (!isDark) {
    // In light mode, ensure no theme vars override
    THEMES.forEach(t => Object.keys(t.vars).forEach(k => root.style.removeProperty(k)));
    return;
  }
  const theme = THEMES.find(t => t.id === id) || THEMES[0];
  root.classList.add(`theme-${theme.id}`);
  // Fallback set inline vars to ensure availability
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

export default function ThemePicker({ compact = false, labelWhite = false, darkDropdown = false }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('pref-theme') || 'techy');

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('pref-theme', theme);
  }, [theme]);

  return (
    <label className={`inline-flex items-center gap-2 text-xs md:text-sm ${compact ? '' : 'px-2 py-1 rounded-full bg-black/5 dark:bg-white/10'}`}>
      <span className={`hidden sm:inline ${labelWhite ? 'text-white' : 'opacity-70'}`}>Theme</span>
      <select
        aria-label="Theme selector"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className={`${darkDropdown 
          ? 'bg-gray-900 text-white border-white/20' 
          : 'bg-transparent text-gray-900 dark:text-gray-200 border-white/20 dark:border-white/10'} rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--accent-from)]`}
      >
        {THEMES.map(t => (
          <option key={t.id} value={t.id}>{t.label}</option>
        ))}
      </select>
    </label>
  );
}
