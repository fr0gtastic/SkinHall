import React, { useState, useEffect } from "react";

const THEMES = [
  { id: "skinhall-dark", name: "SkinHall Dark" },
  { id: "catppuccin-mocha", name: "Catppuccin Mocha" },
  { id: "tokyo-night", name: "Tokyo Night" },
  { id: "rose-pine", name: "Rosé Pine" },
  { id: "dracula", name: "Dracula" },
];

export default function ThemeSelector({ className = "" }) {
  const [active, setActive] = useState(() => {
    return localStorage.getItem("theme") || "skinhall-dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    THEMES.forEach((t) => root.classList.remove(t.id));
    root.classList.add(active);
    localStorage.setItem("theme", active);
  }, [active]);

  return (
    <label className={`inline-flex items-center gap-2 ${className}`} htmlFor="theme-select">
      <span className="hidden items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex">Theme</span>
      <select
        id="theme-select"
        value={active}
        onChange={(e) => setActive(e.target.value)}
        aria-label="Theme"
        className="rounded-full border border-white/10 bg-[hsl(var(--card))] px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.08em] text-foreground/80 backdrop-blur-md transition-all hover:border-white/25 hover:bg-[hsl(var(--card))]/80 hover:text-foreground [&>option]:bg-[hsl(var(--card))] [&>option]:text-foreground"
      >
        {THEMES.map((t) => (
          <option key={t.id} value={t.id} className="bg-[hsl(var(--card))] text-foreground">
            {t.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export { ThemeSelector };
export const ThemeDropdown = ThemeSelector;
export const ThemeMenu = ThemeSelector;
