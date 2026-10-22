// PriceTag.jsx — VP price (white mono) + optional Radianite cost (cyan).
import { Sparkles } from "lucide-react";

export default function PriceTag({ price, radianite, showRadianite = false, size = "md" }) {
  const isStandard = price == null;
  const px = size === "sm" ? "text-[11px]" : "text-xs";
  const numSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="flex flex-col items-end gap-0.5 leading-none">
      <div className={`font-mono font-semibold ${numSize} text-white`}>
        {isStandard ? (
          <span className="text-muted-foreground">Standard</span>
        ) : (
          <span className="flex items-baseline gap-1">
            <span>{price.toLocaleString()}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              VP
            </span>
          </span>
        )}
      </div>

      {showRadianite && radianite && radianite.total > 0 && (
        <div
          className={`flex items-center gap-1 font-mono ${px} radianite-glow rounded px-1.5 py-0.5`}
          style={{ color: "hsl(var(--radianite))" }}
        >
          <Sparkles className="h-3 w-3" strokeWidth={2.5} />
          <span className="font-semibold">{radianite.total}</span>
          <span className="text-[9px] uppercase tracking-wider opacity-70">RP</span>
        </div>
      )}
    </div>
  );
}