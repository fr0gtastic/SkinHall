// FilterBar.jsx — the persistent filter HUD: weapon pills, bundle picker,
// sort control, radianite toggle, density, search, rarity, category-hide
// toggles, reset, and share.
import { useEffect, useMemo, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  X,
  ArrowUpDown,
  Search,
  Layers,
  Crosshair,
  EyeOff,
  Columns3,
  Gem,
} from "lucide-react";
import { SORT_KEYS, MIN_COLS, MAX_COLS } from "@/lib/urlState";
import { TIERS } from "@/lib/adapters/skinsAdapter";
import CopyLinkButton from "@/components/CopyLinkButton";

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`v-cut-sm border px-3 py-1.5 font-display text-[12px] uppercase tracking-[0.08em] transition-all duration-150 ${
        active
          ? "border-primary bg-primary/15 text-primary text-glow-red"
          : "border-border bg-card/40 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

// Category-hide toggle pill. Active = hiding (destructive red).
function HidePill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`v-cut-sm flex items-center gap-1.5 border px-2.5 py-1.5 font-display text-[11px] uppercase tracking-[0.08em] transition-all duration-150 ${
        active
          ? "border-destructive bg-destructive/15 text-destructive"
          : "border-border bg-card/40 text-foreground/60 hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      <EyeOff className="h-3 w-3" />
      {children}
    </button>
  );
}

export default function FilterBar({
  weapons,
  collections,
  state,
  onChange,
  total,
  shown,
}) {
  const [bundleOpen, setBundleOpen] = useState(false);
  const [bundleQuery, setBundleQuery] = useState("");
  const [searchInput, setSearchInput] = useState(state.q);
  const debounceRef = useRef(null);

  // keep the local search box synced when the URL value changes (reset, share link)
  useEffect(() => {
    setSearchInput(state.q);
  }, [state.q]);

  // debounced push of the search box to the URL
  useEffect(() => {
    if (searchInput === state.q) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange({ q: searchInput });
    }, 250);
    return () => clearTimeout(debounceRef.current);
  }, [searchInput, state.q, onChange]);

  const weaponActive = new Set(state.weapons);
  const collectionActive = new Set(state.collections);
  const rarityActive = new Set(state.rarity);

  const toggleWeapon = (id) => {
    const next = new Set(weaponActive);
    next.has(id) ? next.delete(id) : next.add(id);
    onChange({ weapons: [...next] });
  };

  const toggleCollection = (id) => {
    const next = new Set(collectionActive);
    next.has(id) ? next.delete(id) : next.add(id);
    onChange({ collections: [...next] });
  };

  const toggleRarity = (id) => {
    const next = new Set(rarityActive);
    next.has(id) ? next.delete(id) : next.add(id);
    onChange({ rarity: [...next] });
  };

  const setSort = (key) => {
    let dir = state.sort.dir;
    if (state.sort.key === key) dir = dir === "asc" ? "desc" : "asc";
    else dir = key === "name" || key === "bundle" || key === "weapon" ? "asc" : "desc";
    onChange({ sort: { key, dir } });
  };

  const toggleHide = (key) => onChange({ [key]: !state[key] });

  const filteredCollections = useMemo(() => {
    const q = bundleQuery.trim().toLowerCase();
    if (!q) return collections;
    return collections.filter((c) => c.name.toLowerCase().includes(q));
  }, [collections, bundleQuery]);

  const hasFilters =
    state.weapons.length ||
    state.collections.length ||
    state.rarity.length ||
    state.q;
  const reset = () =>
    onChange({ weapons: [], collections: [], rarity: [], q: "" });

  return (
    <div className="sm:sticky sm:top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* row 1: weapon pills + bundle + sort + actions */}
        <div className="flex flex-wrap items-center gap-2 py-3">
          <span className="mr-1 hidden items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex">
            <Crosshair className="h-3.5 w-3.5" /> Weapons
          </span>
          {weapons.map((w) => (
            <Pill key={w.id} active={weaponActive.has(w.id)} onClick={() => toggleWeapon(w.id)}>
              {w.name}
            </Pill>
          ))}

          <div className="mx-1 hidden h-6 w-px bg-border/70 sm:block" />

          {/* Bundle picker */}
          <Popover open={bundleOpen} onOpenChange={setBundleOpen}>
            <PopoverTrigger asChild>
              <button
                className={`v-cut-sm flex items-center gap-2 border px-3 py-1.5 font-display text-[12px] uppercase tracking-[0.08em] transition-all ${
                  collectionActive.size
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border bg-card/40 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                Bundles
                {collectionActive.size > 0 && (
                  <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                    {collectionActive.size}
                  </span>
                )}
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-[320px] border-border bg-popover p-0"
              sideOffset={8}
            >
              <div className="border-b border-border p-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={bundleQuery}
                    onChange={(e) => setBundleQuery(e.target.value)}
                    placeholder="Search bundles…"
                    className="border-transparent bg-card/50 pl-8 text-sm"
                  />
                </div>
              </div>
              <ScrollArea className="h-[280px]">
                <div className="p-1">
                  {filteredCollections.map((c) => (
                    <label
                      key={c.id}
                      className="flex cursor-pointer items-center gap-2.5 rounded px-2 py-1.5 hover:bg-card/60"
                    >
                      <Checkbox
                        checked={collectionActive.has(c.id)}
                        onCheckedChange={() => toggleCollection(c.id)}
                      />
                      <span className="flex-1 truncate text-sm text-foreground/90">{c.name}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{c.count}</span>
                    </label>
                  ))}
                  {filteredCollections.length === 0 && (
                    <p className="px-3 py-6 text-center text-xs text-muted-foreground">
                      No bundles match.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>

            <div className="ml-auto flex flex-wrap items-center gap-2">
            {/* sort */}
            <div className="flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              {SORT_KEYS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSort(s.key)}
                  className={`v-cut-sm border px-2 py-1.5 font-display text-[11px] uppercase tracking-[0.08em] transition-all ${
                    state.sort.key === s.key
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-card/40 text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {s.label}
                  {state.sort.key === s.key && (
                    <span className="ml-1 text-[9px] opacity-70">
                      {state.sort.dir === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-border/70" />

            {/* density control */}
            <div className="flex items-center gap-2 border border-border bg-card/40 px-2.5 py-1.5 v-cut-sm">
              <Columns3 className="h-3.5 w-3.5 text-muted-foreground" />
              <Slider
                value={[state.cols]}
                min={MIN_COLS}
                max={MAX_COLS}
                step={1}
                onValueChange={([v]) => onChange({ cols: v })}
                className="w-20"
                aria-label="Columns per row"
              />
              <span className="w-5 text-center font-mono text-[11px] font-semibold text-foreground/80">
                {state.cols}
              </span>
            </div>

            <div className="h-6 w-px bg-border/70" />

            {/* price toggle */}
            <label className="flex cursor-pointer select-none items-center gap-2 border border-border bg-card/40 px-2.5 py-1.5 v-cut-sm">
              <Switch
                checked={state.price}
                onCheckedChange={(v) => onChange({ price: v })}
                className="data-[state=checked]:bg-[hsl(var(--primary))]"
              />
              <span
                className={`font-display text-[11px] uppercase tracking-[0.08em] ${
                  state.price ? "text-[hsl(var(--primary))]" : "text-foreground/60"
                }`}
              >
                Price
              </span>
            </label>

            {/* levels toggle */}
            <label className="flex cursor-pointer select-none items-center gap-2 border border-border bg-card/40 px-2.5 py-1.5 v-cut-sm">
              <Switch
                checked={state.levels}
                onCheckedChange={(v) => onChange({ levels: v })}
                className="data-[state=checked]:bg-[hsl(var(--primary))]"
              />
              <span
                className={`font-display text-[11px] uppercase tracking-[0.08em] ${
                  state.levels ? "text-[hsl(var(--primary))]" : "text-foreground/60"
                }`}
              >
                Levels
              </span>
            </label>
            <label className="flex cursor-pointer select-none items-center gap-2 border border-border bg-card/40 px-2.5 py-1.5 v-cut-sm">
              <Switch
                checked={state.rp}
                onCheckedChange={(v) => onChange({ rp: v })}
                className="data-[state=checked]:bg-[hsl(var(--radianite))]"
              />
              <span
                className={`font-display text-[11px] uppercase tracking-[0.08em] ${
                  state.rp ? "text-[hsl(var(--radianite))]" : "text-foreground/60"
                }`}
              >
                RP
              </span>
            </label>

            {hasFilters ? (
              <Button
                onClick={reset}
                variant="ghost"
                className="h-8 gap-1 px-2.5 text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" /> Reset
              </Button>
            ) : null}

            <CopyLinkButton />
          </div>
        </div>

        {/* row 2: search + rarity + hide toggles + count */}
        <div className="flex flex-wrap items-center gap-2 border-t border-border/40 pt-2 pb-3 sm:border-0 sm:pt-0">
          {/* search */}
          <div className="relative min-w-[140px] flex-1 sm:max-w-[260px]">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search skin name…"
              className="border-border bg-card/50 py-1.5 pl-8 text-sm"
            />
          </div>

          {/* rarity */}
          <span className="mr-1 hidden items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex">
            <Gem className="h-3.5 w-3.5" /> Rarity
          </span>
          {TIERS.map((t) => (
            <Pill
              key={t.id}
              active={rarityActive.has(t.id)}
              onClick={() => toggleRarity(t.id)}
            >
              <span
                className="mr-1.5 inline-block h-2 w-2 rotate-45 rounded-[1px] align-middle"
                style={{ backgroundColor: `hsl(var(${t.colorVar}))` }}
              />
              {t.name}
            </Pill>
          ))}

          <div className="mx-1 hidden h-6 w-px bg-border/70 sm:block" />
          <div className="basis-full h-px bg-border/40 sm:hidden" />

          {/* category-hide toggles */}
          <span className="mr-1 hidden items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex">
            Hide
          </span>
          <HidePill active={state.hideVct} onClick={() => toggleHide("hideVct")}>
            VCT
          </HidePill>
          <HidePill active={state.hideBp} onClick={() => toggleHide("hideBp")}>
            Battlepass
          </HidePill>
          <HidePill active={state.hideSd} onClick={() => toggleHide("hideSd")}>
            Select &amp; Deluxe
          </HidePill>

          {/* count */}
          <span className="ml-auto whitespace-nowrap font-mono text-[11px] text-muted-foreground">
            {shown.toLocaleString()} / {total.toLocaleString()} skins
            {collectionActive.size > 0 &&
              ` · ${collectionActive.size} bundle${collectionActive.size === 1 ? "" : "s"}`}
          </span>
        </div>
      </div>
    </div>
  );
}