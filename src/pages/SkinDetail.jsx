// SkinDetail.jsx - the Chroma Chamber: every chroma as a switchable gallery,
// variant levels as a text list, price + rarity, optional radianite breakdown.
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Layers, ListTree } from "lucide-react";
import { useCatalog } from "@/lib/useCatalog";
import { deriveRadianite } from "@/lib/adapters/skinsAdapter";
import RarityBadge from "@/components/RarityBadge";
import PriceTag from "@/components/PriceTag";
import RadianiteBreakdown from "@/components/RadianiteBreakdown";
import CopyLinkButton from "@/components/CopyLinkButton";

export default function SkinDetail() {
  const { id } = useParams();
  const { data, loading } = useCatalog();
  const [activeChroma, setActiveChroma] = useState(0);

  const skin = useMemo(
    () => (data ? data.skins.find((s) => s.id === id) : null),
    [data, id]
  );

  useEffect(() => {
    setActiveChroma(0);
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
      </div>
    );
  }

  if (!skin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-display text-sm uppercase tracking-wider text-primary">Skin not found</p>
        <Link to="/" className="text-xs text-muted-foreground underline hover:text-foreground">
          Back to catalog
        </Link>
      </div>
    );
  }

  const chroma = skin.chromas[activeChroma] || skin.chromas[0] || {};
  const radianite = deriveRadianite(skin);

  return (
    <div className="min-h-screen bg-background">
      {/* top bar */}
      <div className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> SkinHall
          </Link>
          <CopyLinkButton />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:py-12">
        {/* gallery */}
        <div>
          <div className="relative aspect-[4/3] v-cut border border-border bg-card overflow-hidden">
            {skin.tierId && (
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                style={{ backgroundColor: `hsl(var(--tier-${skin.tierId}))` }}
              />
            )}
            <AnimatePresence mode="wait">
              <motion.img
                key={chroma.id || skin.id}
                src={chroma.image || skin.defaultImage}
                alt={chroma.name || skin.name}
                initial={{ opacity: 0, filter: "brightness(0.5) blur(4px)" }}
                animate={{ opacity: 1, filter: "brightness(1) blur(0)" }}
                exit={{ opacity: 0, filter: "brightness(0.5) blur(4px)" }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 h-full w-full object-contain p-6"
              />
            </AnimatePresence>
            {skin.tierId && (
              <span className="absolute right-3 top-3">
                <RarityBadge tierId={skin.tierId} tierName={skin.tierName} size={14} />
              </span>
            )}
          </div>

          {/* chroma swatches */}
          {skin.chromas.length > 1 && (
            <div className="mt-4">
              <p className="mb-2.5 flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <Layers className="h-3.5 w-3.5" /> Chromas & Variants
              </p>
              <div className="flex flex-wrap gap-2">
                {skin.chromas.map((c, i) => {
                  const active = i === activeChroma;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveChroma(i)}
                      title={c.name}
                      className={`group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border transition-all v-cut-sm ${
                        active
                          ? "border-primary border-2 bg-primary/10 ring-2 ring-primary/50 shadow-[0_0_0_4px_hsl(var(--primary)/15),0_0_18px_-2px_hsl(var(--primary)/60)]"
                          : "border-border bg-card/40 hover:border-foreground/40"
                      }`}
                    >
                      <span className="h-12 w-12 overflow-hidden">
                        {c.swatch ? (
                          <img
                            src={c.swatch}
                            alt={c.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img
                            src={c.image}
                            alt={c.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {chroma.name || "Default"}
              </p>
            </div>
          )}
        </div>

        {/* meta panel */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="eyebrow-rule font-display text-[11px] uppercase tracking-[0.2em] text-primary">
              {skin.weaponName}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold uppercase leading-tight text-white">
              {skin.name}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {skin.collectionName} collection · {skin.category}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-card/60 p-4 v-cut-sm">
            {skin.tierId && (
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Rarity
                </p>
                <div className="mt-1.5">
                  <RarityBadge tierId={skin.tierId} tierName={skin.tierName} withLabel />
                </div>
              </div>
            )}
            <div className="text-right">
              <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Price
              </p>
              <div className="mt-1.5">
                {skin.agentName ? (
                  <span className="font-mono font-semibold text-base text-white">
                    {skin.agentName}
                  </span>
                ) : (
                  <PriceTag price={skin.price} radianite={radianite} showRadianite />
                )}
              </div>
            </div>
          </div>

          <RadianiteBreakdown skin={skin} />

          {/* variant levels (text only - no art in the data) */}
          {skin.levels.length > 0 && (
            <div className="rounded-lg border border-border bg-card/60 p-4 v-cut-sm">
              <p className="mb-2 flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] text-foreground/80">
                <ListTree className="h-3.5 w-3.5" /> Upgrade Levels
              </p>
              <ul className="space-y-2">
                {skin.levels.map((l, i) => (
                  <li key={l.id} className="flex flex-col gap-0.5 text-sm">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {l.name}
                      </span>
                    </div>
                    {l.description && (
                      <span className="ml-7 text-[11px] italic leading-relaxed text-muted-foreground/80">
                        {l.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* stats */}
          <div className="grid grid-cols-3 gap-2">
            <Stat label="Chromas" value={skin.chromas.length} />
            <Stat label="Levels" value={skin.levels.length} />
            <Stat
              label="Variants"
              value={Math.max(0, skin.chromas.length - 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded border border-border bg-card/40 p-3 text-center v-cut-sm">
      <p className="font-mono text-xl font-bold text-white">{value}</p>
      <p className="mt-0.5 font-display text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}