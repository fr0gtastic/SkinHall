// Hero.jsx - liquid glass catalog header.
import { Link } from 'react-router-dom';
import { BarChart3, Search } from 'lucide-react';
import { isMac } from '@/lib/platform';

export default function Hero({ count, filtered, onReset, onSearch }) {
  return (
    <header className="hero-root relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-orb hero-orb--primary" />
        <div className="hero-orb hero-orb--ultra" />
        <div className="hero-orb hero-orb--accent" />
      </div>
      <div className="relative mx-auto max-w-[1600px] px-5 pt-24 pb-12 sm:px-8 sm:py-16">
        <div className="hero-glass-panel rounded-3xl px-6 py-10 sm:px-10 sm:py-14">
          <div className="flex flex-wrap gap-2">
            <span className="hero-chip">Collection</span>
            <span className="hero-chip">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {count.toLocaleString()} skins
            </span>
            {filtered !== count && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground/70 cursor-default select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                {filtered.toLocaleString()} shown
              </span>
            )}
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
            VALORANT
            <button type="button" onClick={onReset} className="block text-primary text-glow-red cursor-pointer border-0 bg-transparent p-0 hover:opacity-80">
              SKINHALL
            </button>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every skin across 21 weapons, with every chroma and variant as first-class
            content. Filter by weapon and bundle, sort the way you want, and share the view.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/stats" className="inline-flex items-center gap-2 hero-chip transition-colors hover:bg-primary hover:text-primary-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
              View Skin Statistics
            </Link>
            <Link to="/guide" className="inline-flex items-center gap-2 hero-chip transition-colors hover:bg-primary hover:text-primary-foreground">Guide</Link>
            <button type="button" onClick={onSearch} className="group inline-flex items-center gap-2 hero-chip transition-colors hover:bg-primary hover:text-primary-foreground">
              <Search className="h-3.5 w-3.5" />
              <span>Smart search</span>
              <kbd className="hidden rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-primary transition-colors group-hover:border-white/40 group-hover:bg-white/20 group-hover:text-primary-foreground sm:inline-block">
                {isMac() ? "Cmd+K" : "Ctrl+K"}
              </kbd>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
