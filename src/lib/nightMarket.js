// nightMarket.js
// Night Market eligibility rules. A skin is shown when the Night Market
// toggle is on only if every rule below passes.
//
// Eligible:
//   * Gun skins classed Select, Deluxe, or Premium edition.
//   * Knife (melee) skins classed Select, Deluxe, or Premium edition.
//
// Never appear:
//   * Gear skins.
//   * Battle Pass / standard (unpriced) skins.
//   * Melee skins priced above 1250 VP.
//   * Gun skins classed Exclusive or Ultra edition.
//   * Knives that are part of a skin collection classed Exclusive or Ultra.
//   * Skins released fewer than two acts before the act the Night Market
//     was opened in (enforced only when release data is known).
//

export const NM_EDITION_TIERS = new Set(["select", "deluxe", "premium"]);
export const NM_EXCLUDED_TIERS = new Set(["exclusive", "ultra"]);
export const NM_MELEE_PRICE_CAP = 3550;

// Gun categories per the weapon map in skinsAdapter.js.
export const GUN_CATEGORIES = new Set([
  "Heavy",
  "Rifle",
  "Sidearm",
  "Shotgun",
  "Sniper",
  "SMG",
]);

// Current act in which the Night Market is "opened". Skins must have been
// released at least two acts before this. Set to null (default) so the
// act-recency gate only excludes skins whose releaseAct is known - the
// static snapshot carries no per-skin release data today.
export const NIGHT_MARKET_CURRENT_ACT = null;

// Collection ids that contain at least one Exclusive/Ultra skin. Knives
// from these collections are ineligible.
export function exclusiveUltraCollectionIds(skins) {
  const ids = new Set();
  for (const s of skins || []) {
    if (NM_EXCLUDED_TIERS.has(s.tierId)) ids.add(s.collectionId);
  }
  return ids;
}

export function isNightMarketEligible(skin, options = {}) {
  const { currentAct = NIGHT_MARKET_CURRENT_ACT, exclusiveUltraCollections = new Set() } = options;

  const melee = !!skin.isMelee;
  const gun = !melee && GUN_CATEGORIES.has(skin.category);

  // Gear skins never appear.
  if (!gun && !melee) return false;

  // Battle pass / standard (unpriced) skins never appear.
  if (skin.isStandard) return false;

  // Melee skins priced above 1250 never appear.
  if (melee && skin.price != null && skin.price > NM_MELEE_PRICE_CAP) return false;

  // Edition eligibility: Select / Deluxe / Premium only. This excludes
  // Exclusive and Ultra gun skins outright.
  if (!NM_EDITION_TIERS.has(skin.tierId)) return false;

  // Knives in an Exclusive/Ultra-classed collection never appear.
  if (melee && exclusiveUltraCollections.has(skin.collectionId)) return false;

  // Released at least two acts prior to the Night Market act (when known).
  if (currentAct != null && skin.releaseAct != null) {
    if (currentAct - skin.releaseAct < 2) return false;
  }

  return true;
}
