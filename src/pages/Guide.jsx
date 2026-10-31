import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 border border-border bg-card/60 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:border-primary hover:text-primary v-cut-sm">
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function Card({ title, desc, example }) {
  return (
    <div className="rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      <div className="mt-3 flex items-center gap-2">
        <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">{example}</code>
        <CopyBtn text={example} />
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export default function Guide() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link to="/" className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16">
        <p className="eyebrow-rule font-display text-xs uppercase tracking-[0.28em] text-primary">Reference</p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
          Features
          <span className="block text-primary text-glow-red">Guide</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A tour of every feature in SkinHall and how to use it.
        </p>
        <div className="mt-8 rounded-lg border border-primary/60 bg-primary/10 p-6 v-cut-sm">
          <h2 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-primary">Ctrl+K smart search</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            One-shot filter and sort from typed tokens. Prefix matching works ("sel" becomes Select).
          </p>
          <div className="mt-3 flex items-center gap-2">
            <code className="flex-1 rounded border border-primary/60 bg-primary/15 px-2 py-1 font-mono text-xs text-primary">excl bandit cheapest</code>
            <CopyBtn text="excl bandit cheapest" />
          </div>
        </div>
        <Section title="Smart Search">
          <div className="rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">Search syntax keywords</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">cheap/lowest -&gt; price asc, expensive/highest -&gt; price desc. Weapon and rarity names accept prefixes.</p>
            <ul className="mt-5 space-y-5">
              <li>
                <p className="text-xs text-muted-foreground">Premium rarity Phantoms sorted by price ascending</p>
                <div className="mt-1 flex items-center gap-2">
                  <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">ph prem cheap</code>
                  <CopyBtn text="ph prem cheap" />
                </div>
              </li>
              <li>
                <p className="text-xs text-muted-foreground">Exclusive rarity Vandals sorted by price descending</p>
                <div className="mt-1 flex items-center gap-2">
                  <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">excl vandal expensive</code>
                  <CopyBtn text="excl vandal expensive" />
                </div>
              </li>
              <li>
                <p className="text-xs text-muted-foreground">Select rarity Ghosts (prefix match)</p>
                <div className="mt-1 flex items-center gap-2">
                  <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">sel ghost</code>
                  <CopyBtn text="sel ghost" />
                </div>
              </li>
            </ul>
          </div>
        </Section>
        <Section title="URLs and Sharing">
          <Card title="URL state / deep links" desc="Every filter, sort, toggle, search term, and grid density lives in the URL. Share a link and the recipient sees the exact same view." example="?rarity=exclusive&w=...&sort=price&dir=asc" />
          <Card title="Reset via logo click" desc="Click the SkinHall wordmark in the header to clear all filters and reset the view." example="click SKINHALL" />
        </Section>
        <Section title="Filters">
          <Card title="Bundle dropdown adapts" desc="The bundle filter only shows bundles with items matching your current filters and hide toggles. It shrinks as you filter." example="filter -> bundle list shrinks" />
          <Card title="Night Market filter" desc="Hide skins that aren't Night Market eligible (excludes gear, Battle Pass, Exclusive, Ultra; enforces melee price cap)." example="nm=1" />
          <Card title="Hide toggles" desc="Five hide pills: VCT, Battle Pass/standard, Select & Deluxe, agent gear, Night Market-ineligible. Each persists in the URL." example="hvct=1&hbp=1&hsd=1&hag=1&nm=1" />
        </Section>
        <Section title="Everything Else">
          <Card title="Grid density control" desc="+/- column count, clamped to min and max, shareable via cols=." example="cols=4" />
          <Card title="Sort options" desc="Sort by name, price, bundle, weapon, or tier, ascending or descending." example="sort=price&dir=asc" />
          <Card title="Per-skin detail pages" desc="/skin/:id shows pricing, rarity, and the Radianite upgrade breakdown. Shareable." example="/skin/abc123" />
          <Card title="Stats page" desc="Aggregate counts and summaries for the whole catalog." example="/stats" />
          <Card title="Theme selector" desc="Multiple themes available in the header." example="theme=rose-pine" />
          <Card title="Display toggles" desc="Show price, upgrade levels, and Radianite points on cards via the FilterBar toggles." example="price=1&levels=1&rp=1" />
        </Section>
      </div>
    </div>
  );
}
