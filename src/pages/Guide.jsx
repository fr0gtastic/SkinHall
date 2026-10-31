import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, EyeOff, Coins, ArrowUpDown, Columns3, Plus, Minus, BarChart3 } from "lucide-react";
import { SORT_KEYS, MIN_COLS, MAX_COLS } from "@/lib/urlState";
import { Switch } from "@/components/ui/switch";
import { HidePill, NmPill } from "@/components/filters/Pill";
import CopyLinkButton from "@/components/CopyLinkButton";
import ThemeSelector from "@/components/ThemeSelector";

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
    <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      <div className="mt-auto flex items-center gap-2 pt-3">
        <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">{example}</code>
        <CopyBtn text={example} />
      </div>
    </div>
  );
}

function spacedAmps(text) {
  return String(text).split("&").reduce((acc, part, i) =>
    i === 0 ? [part] : [...acc, <span key={i} className="mx-1">&</span>, part], []);
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
  const [hides, setHides] = useState({ vct: false, bp: false, sd: false, ag: true, nm: true });
  const toggleHide = (key) => setHides((h) => ({ ...h, [key]: !h[key] }));
  const hideCode = [hides.vct && "hvct=1", hides.bp && "hbp=1", hides.sd && "hsd=1", hides.ag && "hag=1"].filter(Boolean).join("&");
  const [cols, setCols] = useState(4);
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [disp, setDisp] = useState({ price: true, levels: false, rp: true });
  const toggleDisp = (k) => setDisp((d) => ({ ...d, [k]: !d[k] }));
  const dispCode = `price=${disp.price ? 1 : 0}&levels=${disp.levels ? 1 : 0}&rp=${disp.rp ? 1 : 0}`;
  const setSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };
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
          <div className="mt-auto flex items-center gap-2 pt-3">
            <code className="flex-1 rounded border border-primary/60 bg-primary/15 px-2 py-1 font-mono text-xs text-primary">excl bandit cheapest</code>
            <CopyBtn text="excl bandit cheapest" />
          </div>
        </div>
        <Section title="Smart Search">
          <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
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
          <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">URL state / deep links</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Every filter, sort, toggle, search term, and grid density lives in the URL. Share a link and the recipient sees the exact same view.</p>
            <p className="mt-3 text-xs text-muted-foreground">Exclusive skins sorted by price ascending</p>
            <div className="mt-auto flex items-center gap-2 pt-3">
              <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">{spacedAmps("/?rarity=exclusive&sort=price&dir=asc")}</code>
              <Link to="/?rarity=exclusive&sort=price&dir=asc" className="inline-flex items-center gap-1.5 border border-border bg-card/60 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:border-primary hover:text-primary v-cut-sm">
                Open
              </Link>
              <CopyLinkButton text="/?rarity=exclusive&sort=price&dir=asc" className="px-2.5 py-1 text-[10px]" />
            </div>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">Reset via logo click</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Click the SkinHall wordmark in the header to clear all filters and reset the view.</p>
            <div className="mt-auto pt-3">
              <button
                type="button"
                onClick={() => {}}
                className="block text-primary text-glow-red cursor-pointer border-0 bg-transparent p-0 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight hover:opacity-80"
              >
                SKINHALL
              </button>
            </div>
          </div>
        </Section>
        <Section title="Filters">
          <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">Bundle dropdown adapts</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">The bundle filter only shows bundles with items matching your current filters and hide toggles. It shrinks as you filter.</p>
            <div className="mt-auto pt-3">
              <code className="block rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">filter -&gt; bundle list shrinks</code>
            </div>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">Night Market filter</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Show skins that are Night Market eligible (excludes gear, Battle Pass, Exclusive, Ultra; enforces melee price cap).</p>
            <div className="mt-auto flex items-center gap-2 pt-3">
              <NmPill active={hides.nm} onClick={() => toggleHide("nm")}>
                <Coins className="h-3 w-3" />
                Night Market
              </NmPill>
            </div>
            <div className="mt-auto flex items-center gap-2 pt-3">
              <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">{hides.nm ? "nm=1" : "nm=0"}</code>
              <Link to={hides.nm ? "/?nm=1" : "/?nm=0"} className="inline-flex items-center gap-1.5 border border-border bg-card/60 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:border-primary hover:text-primary v-cut-sm">
                Open
              </Link>
            </div>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">Hide toggles</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Four hide pills: VCT, Battle Pass/Standard, Select &amp; Deluxe, Agent Gear. Each persists in the URL. Any combination works.</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <HidePill active={hides.vct} onClick={() => toggleHide("vct")} icon={EyeOff}>VCT</HidePill>
              <HidePill active={hides.bp} onClick={() => toggleHide("bp")} icon={EyeOff}>Battle Pass</HidePill>
              <HidePill active={hides.sd} onClick={() => toggleHide("sd")} icon={EyeOff}>Select &amp; Deluxe</HidePill>
              <HidePill active={hides.ag} onClick={() => toggleHide("ag")} icon={EyeOff}>Agent Gear</HidePill>
            </div>
            <div className="mt-auto flex items-center gap-2 pt-2">
              <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">{spacedAmps(hideCode || "(none)")}</code>
              <Link to={hideCode ? `/?${hideCode}` : "/"} className="inline-flex items-center gap-1.5 border border-border bg-card/60 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:border-primary hover:text-primary v-cut-sm">
                Open
              </Link>
            </div>
          </div>
        </Section>
        <Section title="Everything Else">
          <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">Grid density control</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">+/- column count, clamped to min and max, shareable via cols=.</p>
            <div className="mt-3 flex items-center gap-1.5 border border-border bg-card/40 px-1.5 py-1.5 v-cut-sm">
              <Columns3 className="h-3.5 w-3.5 text-muted-foreground" />
              <button onClick={() => setCols((c) => Math.max(MIN_COLS, c - 1))} disabled={cols <= MIN_COLS} aria-label="Fewer columns" className="flex h-6 w-6 items-center justify-center rounded border border-border bg-card/60 text-foreground/70 transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-5 text-center font-mono text-[11px] font-semibold text-foreground/80">{cols}</span>
              <button onClick={() => setCols((c) => Math.min(MAX_COLS, c + 1))} disabled={cols >= MAX_COLS} aria-label="More columns" className="flex h-6 w-6 items-center justify-center rounded border border-border bg-card/60 text-foreground/70 transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-auto flex items-center gap-2 pt-3">
              <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">cols={cols}</code>
              <Link to={`/?cols=${cols}`} className="inline-flex items-center gap-1.5 border border-border bg-card/60 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:border-primary hover:text-primary v-cut-sm">
                Open
              </Link>
            </div>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">Sort options</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Sort by name, price, bundle, weapon, or tier, ascending or descending.</p>
            <div className="mt-3 flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              {SORT_KEYS.map((sk) => (
                <button
                  key={sk.key}
                  onClick={() => setSort(sk.key)}
                  className={`v-cut-sm border px-2 py-1.5 font-display text-[11px] uppercase tracking-[0.08em] transition-all ${
                    sortKey === sk.key ? "border-primary bg-primary/15 text-primary" : "border-border bg-card/40 text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {sk.label}
                  {sortKey === sk.key && <span className="ml-1 text-[9px] opacity-70">{sortDir === "asc" ? "↑" : "↓"}</span>}
                </button>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-2 pt-3">
              <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">{spacedAmps(`sort=${sortKey}&dir=${sortDir}`)}</code>
              <Link to={`/?sort=${sortKey}&dir=${sortDir}`} className="inline-flex items-center gap-1.5 border border-border bg-card/60 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:border-primary hover:text-primary v-cut-sm">
                Open
              </Link>
            </div>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">Per-skin detail pages</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">/skin/:id shows pricing, rarity, variants, and the Radianite upgrades breakdown.</p>
            <div className="mt-auto pt-3">
              <p className="mb-1 text-xs text-muted-foreground">Evori Dreamwings Vandal</p>
              <div className="flex items-center gap-2">
              <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">/skin/4F5EE03A-4204-5526-6941-BCA4F911A768</code>
              <Link to="/skin/4F5EE03A-4204-5526-6941-BCA4F911A768" className="inline-flex items-center gap-1.5 border border-border bg-card/60 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:border-primary hover:text-primary v-cut-sm">
                Open
              </Link>
            </div>
            </div>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">Stats page</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Aggregate counts and summaries for the whole catalog.</p>
            <div className="mt-3">
              <Link to="/stats" className="inline-flex items-center gap-2 rounded-md border border-primary/60 bg-primary/10 px-5 py-2.5 font-display text-xs uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <BarChart3 className="h-4 w-4" />
                View Skin Statistics
              </Link>
            </div>
            <div className="mt-auto flex items-center gap-2 pt-3">
              <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">/stats</code>
              <Link to="/stats" className="inline-flex items-center gap-1.5 border border-border bg-card/60 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:border-primary hover:text-primary v-cut-sm">
                Open
              </Link>
            </div>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">Theme selector</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Multiple themes available in the header.</p>
            <div className="mt-3">
              <ThemeSelector />
            </div>
          </div>
          <div className="flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">Display toggles</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Show price, upgrade levels, and Radianite points on cards via the FilterBar toggles.</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <label className="flex cursor-pointer select-none items-center gap-2 border border-border bg-card/40 px-2.5 py-1.5 v-cut-sm">
                <Switch checked={disp.price} onCheckedChange={() => toggleDisp("price")} className="data-[state=checked]:bg-[hsl(var(--primary))]" />
                <span className={`font-display text-[11px] uppercase tracking-[0.08em] ${disp.price ? "text-[hsl(var(--primary))]" : "text-foreground/60"}`}>Price</span>
              </label>
              <label className="flex cursor-pointer select-none items-center gap-2 border border-border bg-card/40 px-2.5 py-1.5 v-cut-sm">
                <Switch checked={disp.levels} onCheckedChange={() => toggleDisp("levels")} className="data-[state=checked]:bg-[hsl(var(--primary))]" />
                <span className={`font-display text-[11px] uppercase tracking-[0.08em] ${disp.levels ? "text-[hsl(var(--primary))]" : "text-foreground/60"}`}>Levels</span>
              </label>
              <label className="flex cursor-pointer select-none items-center gap-2 border border-border bg-card/40 px-2.5 py-1.5 v-cut-sm">
                <Switch checked={disp.rp} onCheckedChange={() => toggleDisp("rp")} className="data-[state=checked]:bg-[hsl(var(--radianite))]" />
                <span className={`font-display text-[11px] uppercase tracking-[0.08em] ${disp.rp ? "text-[hsl(var(--radianite))]" : "text-foreground/60"}`}>RP</span>
              </label>
            </div>
            <div className="mt-auto flex items-center gap-2 pt-3">
              <code className="flex-1 rounded border border-border/60 bg-card/30 px-2 py-1 font-mono text-xs text-foreground/80">{spacedAmps(dispCode)}</code>
              <Link to={`/?${dispCode}`} className="inline-flex items-center gap-1.5 border border-border bg-card/60 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:border-primary hover:text-primary v-cut-sm">
                Open
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
