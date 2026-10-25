// StatsSummary.jsx - per-rarity breakdown card for the Stats page.
// Counts skins and bundles per rarity tier. Agent Gear (no rarity) is excluded.
import RarityBadge from "@/components/RarityBadge";

export default function StatsSummary({ tiers, rows, totals }) {
  const maxBundles = Math.max(1, ...rows.map((r) => r.bundles));
  const maxSkins = Math.max(1, ...rows.map((r) => r.skins));

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card/40 v-cut-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3 sm:px-5">
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            By Rarity
          </p>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {totals.bundles} bundles
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/50" />
            {totals.skins} skins
          </span>
        </div>
      </div>

      <div className="divide-y divide-border/50">
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] items-center gap-3 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2.5">
              <RarityBadge tierId={r.id} tierName={r.name} size={14} />
              <span className="font-display text-sm font-semibold text-white">
                {r.name}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="grid grid-cols-[5rem_1fr] items-center gap-2">
                <span className="text-right font-mono text-[11px] text-muted-foreground">
                  {r.bundles} bundle{r.bundles === 1 ? "" : "s"}
                </span>
                <div className="h-2 overflow-hidden rounded-full bg-border/60">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(r.bundles / maxBundles) * 100}%`,
                      backgroundColor: `hsl(var(--tier-${r.id === "vct" ? "standard" : r.id}))`,
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-[5rem_1fr] items-center gap-2">
                <span className="text-right font-mono text-[11px] text-muted-foreground">
                  {r.skins} skin{r.skins === 1 ? "" : "s"}
                </span>
                <div className="h-2 overflow-hidden rounded-full bg-border/60">
                  <div
                    className="h-full rounded-full opacity-70"
                    style={{
                      width: `${(r.skins / maxSkins) * 100}%`,
                      backgroundColor: `hsl(var(--tier-${r.id === "vct" ? "standard" : r.id}))`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-mono text-sm font-bold text-white">
                {Math.round((r.bundles / totals.bundles) * 100)}%
              </p>
              <p className="font-mono text-[10px] text-muted-foreground">of bundles</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}