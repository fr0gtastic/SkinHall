// Stats.jsx - the collection statistics page.
// Total bundles + bundles & skins per rarity. Agent Gear (no rarity) is excluded.
import { useMemo } from "react";
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
              {totals.bundles}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card/60 p-5 v-cut-sm">
            <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Total Skins
            </p>
            <p className="mt-2 font-mono text-4xl font-bold text-white">
              {totals.skins}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card/60 p-5 v-cut-sm col-span-2 sm:col-span-1">
            <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Rarity Tiers
            </p>
            <p className="mt-2 font-mono text-4xl font-bold text-white">
              {rows.length}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <StatsSummary tiers={data.tiers} rows={rows} totals={totals} />
        </div>
      </div>
    </div>
  );
}