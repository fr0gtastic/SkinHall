import React, { useState } from "react";

const THEMES = [{ id: "skinatlas-dark", name: "Skinatlas Dark" }];

export default function ThemeSelector({ className = "" }) {
  const [active, setActive] = useState(THEMES[0].id);
  return (
    <label className={`inline-flex items-center gap-2 ${className}`}>
      <span className="text-xs text-muted-foreground">Theme</span>
      <select
        value={active}
        onChange={(e) => setActive(e.target.value)}
        className="rounded border border-border bg-card px-2 py-1 text-xs text-foreground"
      >
        {THEMES.map((t) => (
          <option key={t.id} value={t.id}>
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
