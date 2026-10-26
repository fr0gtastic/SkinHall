// Hero.jsx - the catalog header: eyebrow, heading, count.
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';

export default function Hero({ count, filtered, onReset }) {
  return (
    <header className="relative overflow-hidden border-b border-border/60">
      {/* atmospheric backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-[hsl(var(--tier-ultra)/0.06)] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 py-12 sm:px-8 sm:py-16">
        <p className="eyebrow-rule font-display text-xs uppercase tracking-[0.28em] text-primary">
          Collection
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
          VALORANT
          <button
            type="button"
            onClick={onReset}
            className="block text-primary text-glow-red cursor-pointer border-0 bg-transparent p-0 hover:opacity-80"
          >
            SkinHall
          </button>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Every skin across {21} weapons, with every chroma and variant as first-class
          content. Filter by weapon and bundle, sort the way you want, and share the view.
        </p>
        <div className="mt-5 flex items-center gap-4 font-mono text-xs text-foreground/70">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {count.toLocaleString()} skins
          </span>
          {filtered !== count && (
            <span className="flex items-center gap-1.5 text-foreground/50">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
              {filtered.toLocaleString()} shown
            </span>
          )}
        </div>
        <div className="mt-6">
          <Link
            to="/stats"
            className="inline-flex items-center gap-2 rounded-md border border-primary/60 bg-primary/10 px-5 py-2.5 font-display text-xs uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <BarChart3 className="h-4 w-4" />
            View Skin Statistics
          </Link>
        </div>
      </div>
    </header>
  );
}