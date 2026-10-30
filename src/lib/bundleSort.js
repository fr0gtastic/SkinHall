import { TIERS } from "@/lib/adapters/skinsAdapter";

const TIER_RANK = new Map(TIERS.map((t, i) => [t.id, i]));

function tierIdOf(bundle) {
  if (!bundle) return null;
  const t =
    bundle.primaryTier ||
    bundle.tier ||
    bundle.rarity ||
    (bundle.collection && bundle.collection.primaryTier);
  if (t && typeof t === "object") return t.id ?? t.name ?? null;
  if (typeof t === "string") return t;
  return null;
}

function tierRank(bundle) {
  const id = tierIdOf(bundle);
  if (id === "standard") return -1;
  if (id == null) return TIER_RANK.size;
  if (TIER_RANK.has(id)) return TIER_RANK.get(id);
  // fall back: match by name
  const found = TIERS.find((t) => t.name === id);
  return found ? TIER_RANK.get(found.id) : TIER_RANK.size;
}

function nameOf(b) {
  return b && b.name != null ? String(b.name) : "";
}

export function sortBundles(bundles, { byRarity } = {}) {
  const list = Array.isArray(bundles) ? [...bundles] : [];
  const cmpName = (a, b) =>
    nameOf(a).localeCompare(nameOf(b), "en", { sensitivity: "base" });

  if (!byRarity) {
    list.sort(cmpName);
    return list;
  }

  list.sort((a, b) => {
    const r = tierRank(b) - tierRank(a);
    if (r !== 0) return r;
    return cmpName(a, b);
  });
  return list;
}

export default sortBundles;
