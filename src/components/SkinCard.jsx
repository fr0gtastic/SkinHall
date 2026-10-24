// SkinCard.jsx - a single skin in the catalog grid.
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RarityBadge from "@/components/RarityBadge";
import PriceTag from "@/components/PriceTag";
import { deriveRadianite } from "@/lib/adapters/skinsAdapter";

export default function SkinCard({ skin, showRadianite, showPrice = true, showLevels = true }) {
  const variantCount = Math.max(0, (skin.chromas?.length || 1) - 1);
  const levelCount = (skin.levels?.length || 0) - 1;
  const radianite = deriveRadianite(skin);

  return (
    <Link
      to={`/skin/${skin.id}${showRadianite ? "?rp=1" : ""}`}
      className="group relative block"
      aria-label={`${skin.name} - ${skin.weaponName}${skin.tierName ? ", " + skin.tierName : ""}`}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full v-cut border border-border bg-card overflow-hidden transition-all duration-200 hover:border-primary/70 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(255,70,85,0.35)]"
      >
        {/* tier edge accent */}
        {skin.tierId && (
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ backgroundColor: `hsl(var(--tier-${skin.tierId}))` }}
          />
        )}

        {/* render */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-black/40 to-black/10">
          <img
            src={skin.defaultImage}
            alt={skin.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-300 ease-out group-hover:scale-[1.06]"
            onError={(e) => {
              e.currentTarget.style.opacity = "0.15";
            }}
          />
          {/* variant count chip */}
          {variantCount > 0 && (
            <span className="absolute left-2 top-2 flex items-center gap-1 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/80 backdrop-blur-sm v-cut-sm">
              +{variantCount} variant{variantCount === 1 ? "" : "s"}
            </span>
          )}
          {skin.tierId && (
            <span className="absolute right-2 top-2">
              <RarityBadge tierId={skin.tierId} tierName={skin.tierName} />
            </span>
          )}
        </div>

        {/* meta */}
        <div className="flex flex-col items-start gap-1 px-3 pb-3 pt-2.5 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
          <div className="min-w-0">
            <h3 className="break-words font-display text-sm font-semibold text-white sm:truncate">
              {skin.name}
            </h3>
            <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground sm:truncate">
              <span className="block sm:inline">{skin.weaponName}</span>
              {showLevels && levelCount > 0 && (
                <span className="block sm:inline opacity-60"> · {skin.levels.length} levels</span>
              )}
            </p>
          </div>
          {showPrice && skin.agentName ? (
            <div className="font-mono font-semibold text-sm text-white text-end">
              {skin.agentName}
            </div>
          ) : showPrice && (
            <PriceTag
              price={skin.price}
              radianite={radianite}
              showRadianite={showRadianite}
              size="sm"
            />
          )}
        </div>
      </motion.div>
    </Link>
  );
}