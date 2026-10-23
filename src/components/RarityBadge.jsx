// RarityBadge.jsx - per-tier diamond with the Valorant content-tier color.
export default function RarityBadge({ tierId, tierName, size = 12, withLabel = false }) {
  const colorVar =
    ({
      select: "--tier-select",
      deluxe: "--tier-deluxe",
      premium: "--tier-premium",
      exclusive: "--tier-exclusive",
      ultra: "--tier-ultra",
      standard: "--tier-standard",
    })[tierId] || "--tier-standard";

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block rotate-45 rounded-[2px]"
        style={{
          width: size,
          height: size,
          backgroundColor: `hsl(var(${colorVar}))`,
          boxShadow: `0 0 8px hsl(var(${colorVar}) / 0.5)`,
        }}
        title={tierName}
      />
      {withLabel && (
        <span
          className="font-display text-[11px] uppercase tracking-[0.14em]"
          style={{ color: `hsl(var(${colorVar}))` }}
        >
          {tierName}
        </span>
      )}
    </span>
  );
}