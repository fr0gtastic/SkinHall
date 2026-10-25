// Stats.jsx - the collection statistics page.
// Total bundles + bundles & skins per rarity. Agent Gear (no rarity) is excluded.
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCatalog } from "@/lib/useCatalog";
import StatsSummary from "@/components/StatsSummary";

// Tier rank for ordering rows (Select -> Ultra -> Standard).
const TIER_RANK = {
  standard: 0,
  select: 1,
  deluxe: 2,
  premium: 3,
  exclusive: 4,
  ultra: 5,
};

export default function Stats() {
  const { data, loading, error } = useCatalog();

  const [selected, setSelected] = useState(null);
  const [showRarity, setShowRarity] = useState(true);
  const [showRarityWeapon, setShowRarityWeapon] = useState(true);
  const [showWeapon, setShowWeapon] = useState(true);

  const { rows, totals } = useMemo(() => {
    if (!data) return { rows: [], totals: { bundles: 0, skins: 0 } };

    const AGENT_GEAR_SLUG = "agent-gear";

    // Skins per rarity (drop Agent Gear, which has no tierId).
    // VCT collections are their own category, not counted under Standard.
    const skinCounts = {};
    let vctSkins = 0;
    for (const s of data.skins) {
      if (s.isAgentGear) continue;
      if (s.isVct) {
        vctSkins += 1;
        continue;
      }
      if (s.tierId) skinCounts[s.tierId] = (skinCounts[s.tierId] || 0) + 1;
    }

    // Bundles per primary rarity. A bundle's primary tier is the mode of its
    // member skins' tiers (same logic the adapter uses to finalize melees).
    const bundleCounts = {};
    let totalBundles = 0;
    let totalSkins = 0;
    let vctBundles = 0;
    for (const c of data.collections) {
      if (c.id === AGENT_GEAR_SLUG) continue;
      totalBundles += 1;
      totalSkins += c.count || 0;

      const isVct = c.name && c.name.toUpperCase().startsWith("VCT");
      if (isVct) {
        vctBundles += 1;
        continue;
      }

      const tiers = (c.members || [])
        .filter((m) => !m.isAgentGear && m.tierId)
        .map((m) => m.tierId);
      if (tiers.length === 0) continue;

      const counts = {};
      for (const t of tiers) counts[t] = (counts[t] || 0) + 1;
      const ids = Object.keys(counts);
      ids.sort(
        (a, b) =>
          counts[b] - counts[a] || (TIER_RANK[a] ?? 0) - (TIER_RANK[b] ?? 0)
      );
      const primary = ids[0];
      bundleCounts[primary] = (bundleCounts[primary] || 0) + 1;
    }

    const rows = data.tiers
      .map((t) => ({
        id: t.id,
        name: t.name,
        bundles: bundleCounts[t.id] || 0,
        skins: skinCounts[t.id] || 0,
      }))
      .filter((r) => r.bundles > 0 || r.skins > 0)
      .sort((a, b) => (TIER_RANK[a.id] ?? 0) - (TIER_RANK[b.id] ?? 0));

    if (vctBundles > 0 || vctSkins > 0) {
      rows.push({ id: "vct", name: "VCT", bundles: vctBundles, skins: vctSkins });
    }

    return {
      rows,
      totals: { bundles: totalBundles, skins: totalSkins },
    };
  }, [data]);

  const filteredRows = selected
    ? rows.filter((r) => selected.has(r.id))
    : rows;
  const filteredTotals = {
    bundles: filteredRows.reduce((a, r) => a + r.bundles, 0),
    skins: filteredRows.reduce((a, r) => a + r.skins, 0),
  };

  const toggleRarity = (id) => {
    const base = selected ?? new Set(rows.map((r) => r.id));
    const next = new Set(base);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Loading stats...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="font-display text-sm uppercase tracking-wider text-primary">
          Data load failed
        </p>
        <p className="text-xs text-muted-foreground">The skins snapshot could not be read.</p>
      </div>
    );
  }

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
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16">
        <p className="eyebrow-rule font-display text-xs uppercase tracking-[0.28em] text-primary">
          Overview
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
          Collection
          <span className="block text-primary text-glow-red">Statistics</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A breakdown of every bundle and skin in the catalog, grouped by
          rarity tier. Agent Gear is excluded (it carries no rarity).
        </p>

        {/* hero stat */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Total Bundles
            </p>
            <p className="mt-2 font-mono text-4xl font-bold text-white">
              {filteredTotals.bundles}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Total Skins
            </p>
            <p className="mt-2 font-mono text-4xl font-bold text-white">
              {filteredTotals.skins}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card/60 p-5 v-cut-sm col-span-2 sm:col-span-1">
            <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Rarity Tiers
            </p>
            <p className="mt-2 font-mono text-4xl font-bold text-white">
              {filteredRows.length}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {rows.map((r) => {
            const active = selected ? selected.has(r.id) : true;
            return (
              <button
                key={r.id}
                onClick={() => toggleRarity(r.id)}
                className={`v-cut-sm border px-3 py-1.5 font-display text-[12px] uppercase tracking-[0.08em] transition-all duration-150 ${
                  active
                    ? "border-primary bg-primary/15 text-primary text-glow-red"
                    : "border-border bg-card/40 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                <span
                  className="mr-1.5 inline-block h-2 w-2 rotate-45 rounded-[1px] align-middle"
                  style={{ backgroundColor: `hsl(var(--tier-${r.id === "vct" ? "standard" : r.id}))` }}
                />
                {r.name}
              </button>
            );
          })}
        </div>
        
        <details open className="mt-6">
          <summary className="cursor-pointer font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">By Rarity</summary>
          <div className="mt-2">
            <StatsSummary tiers={data.tiers} rows={filteredRows} totals={filteredTotals} />
          </div>
        </details>

        <details open className="mt-10">
          <summary className="cursor-pointer font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Skins by Weapon</summary>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {Object.entries(
              data.skins.reduce((acc, s) => {
                if (s.isAgentGear) return acc;
                if (selected && !selected.has(s.tierId)) return acc;
                const w = s.weaponName || "Unknown";
                acc[w] = (acc[w] || 0) + 1;
                return acc;
              }, {})
            )
              .sort((a, b) => b[1] - a[1])
              .map(([name, count]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded border border-border/60 bg-card/30 px-3 py-2"
                >
                  <span className="text-sm text-foreground/80">{name}</span>
                  <span className="font-mono text-sm font-bold text-white">
                    {count}{" "}
                    <span className="text-[10px] text-muted-foreground">
                      ({filteredTotals.skins ? Math.round((count / filteredTotals.skins) * 100) : 0}%)
                    </span>
                  </span>
                </div>
              ))}
          </div>
        </details>

        <details open className="mt-10">
          <summary className="cursor-pointer font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Rarities by Weapon</summary>
          <div className="mt-4 rounded-lg border border-border bg-card/40 p-5 v-cut-sm">
          <div className="mt-4 space-y-3">
            {Object.entries(
            data.skins.reduce((acc, s) => {
              if (s.isAgentGear) return acc;
              if (selected && !selected.has(s.tierId)) return acc;
              const w = s.weaponName || "Unknown";
              const t = s.tierId;
              if (!t) return acc;
              acc[w] = acc[w] || {};
              acc[w][t] = (acc[w][t] || 0) + 1;
              return acc;
            }, {})
          )
            .sort((a, b) =>
              Object.values(b[1]).reduce((x, y) => x + y, 0) -
              Object.values(a[1]).reduce((x, y) => x + y, 0)
            )
            .map(([weapon, rarityCounts]) => {
              const weaponRows = data.tiers
                .filter((t) => !selected || selected.has(t.id))
                .map((t) => ({
                  id: t.id,
                  name: t.name,
                  skins: rarityCounts[t.id] || 0,
                }))
                .filter((r) => r.skins > 0);
              const weaponTotal = weaponRows.reduce((a, r) => a + r.skins, 0);
              if (weaponTotal === 0) return null;
              const maxSkins = Math.max(1, ...weaponRows.map((r) => r.skins));
              return (
                <div key={weapon} className="border-b border-border/40 pb-3 last:border-0 last:pb-0">
                  <p className="mb-2 font-display text-sm font-semibold text-white">
                    {weapon}{" "}
                    <span className="font-mono text-[10px] text-muted-foreground">
                      ({weaponTotal} skins)
                    </span>
                  </p>
                  <div className="space-y-1">
                    {weaponRows.map((r) => (
                      <div key={r.id} className="flex items-center gap-2">
                        <span className="w-20 font-display text-[11px] uppercase text-foreground/70">
                          {r.name}
                        </span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-border/60">
                          <div
                            className="h-full rounded-full opacity-70"
                            style={{
                              width: `${(r.skins / maxSkins) * 100}%`,
                              backgroundColor: `hsl(var(--tier-${r.id === "vct" ? "standard" : r.id}))`,
                            }}
                          />
                        </div>
                        <span className="w-16 text-right font-mono text-[10px] text-muted-foreground">
                          {r.skins} ({Math.round((r.skins / weaponTotal) * 100)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
        </div>
        </details>
      </div>
    </div>
  );
}