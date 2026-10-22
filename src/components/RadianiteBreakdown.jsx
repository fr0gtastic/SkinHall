// RadianiteBreakdown.jsx — the level/variant RP cost breakdown (detail view).
import { deriveRadianite } from "@/lib/adapters/skinsAdapter";
import { Sparkles, TrendingUp, Palette } from "lucide-react";

export default function RadianiteBreakdown({ skin }) {
  const rp = deriveRadianite(skin);
  if (!rp || rp.total <= 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No Radianite upgrades for this skin.
      </div>
    );
  }

  const Row = ({ icon, label, value }) => (
    <div className="flex items-center justify-between py-2 border-b border-border/60 last:border-0">
      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <span style={{ color: "hsl(var(--radianite))" }}>{icon}</span>
        <span>{label}</span>
      </div>
      <span className="font-mono text-sm font-semibold" style={{ color: "hsl(var(--radianite))" }}>
        {value} RP
      </span>
    </div>
  );

  return (
    <div className="rounded-lg border border-border bg-card/60 p-4 v-cut-sm">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4" style={{ color: "hsl(var(--radianite))" }} />
        <h4 className="font-display text-xs uppercase tracking-[0.16em] text-foreground/80">
          Radianite Upgrades
        </h4>
      </div>
      <div className="space-y-0">
        <Row
          icon={<TrendingUp className="h-3.5 w-3.5" />}
          label={`Levels (${rp.paidLevels} upgrade${rp.paidLevels === 1 ? "" : "s"})`}
          value={rp.levelCost}
        />
        <Row
          icon={<Palette className="h-3.5 w-3.5" />}
          label={`Variants (${rp.variantCount})`}
          value={rp.variantCost}
        />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
        <span className="font-display text-xs uppercase tracking-[0.16em] text-foreground/80">
          Total
        </span>
        <span
          className="font-mono text-lg font-bold radianite-glow rounded px-2 py-0.5"
          style={{ color: "hsl(var(--radianite))" }}
        >
          {rp.total} RP
        </span>
      </div>
      {rp.isORA && (
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          ORA by OneTap pricing: the final level costs 25 RP instead of 10.
        </p>
      )}
    </div>
  );
}