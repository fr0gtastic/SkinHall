// skinsAdapter.js
// Single normalization layer for the Valorant skins data.
// Raw shape: object keyed by weapon UUID -> { weaponId, displayName, displayIcon, skins[] }
// A future live API or updated file touches only this module.

const VP_CURRENCY = "85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741";
const RP_CURRENCY = "e59aa87c-4cbf-517a-5983-6e81511be9b7";
const MELEE_ID = "2F59173C-4BED-B6C3-2191-DEA9B58BE9C7";

// Static weapon -> category map (the 21 weapons in the data).
const WEAPON_CATEGORIES = {
  "63E6C2B6-4A8E-869C-3D4C-E38355226584": "Heavy", // Odin
  "55D8A0F4-4274-CA67-FE2C-06AB45EFDF58": "Heavy", // Ares
  "9C82E19D-4575-0200-1A81-3EACF00CF872": "Rifle", // Vandal
  "8DB0A1BF-4A50-832A-4566-FAAAA6D250CA": "Sidearm", // Warden
  "AE3DE142-4D85-2547-DD26-4E90BED35CF7": "Rifle", // Bulldog
  "EE8E8D15-496B-07AC-E5F6-8FAE5D4C7B1A": "Rifle", // Phantom
  "EC845BF4-4F79-DDDA-A3DA-0DB3774B2794": "Shotgun", // Judge
  "910BE174-449B-C412-AB22-D0873436B21B": "Shotgun", // Bucky
  "44D4E95C-4157-0037-81B2-17841BF2E8E3": "Sidearm", // Frenzy
  "29A0CFAB-485B-F5D5-779A-B59F85E204A8": "Sidearm", // Classic
  "410B2E0B-4CEB-1321-1727-20858F7F3477": "Sidearm", // Bandit
  "1BAA85B4-4C70-1284-64BB-6481DFC3BB4E": "Sidearm", // Ghost
  "E336C6B8-418D-9340-D77F-7A9E4CFE0702": "Sidearm", // Sheriff
  "42DA8CCC-40D5-AFFC-BEEC-15AA47B42EDA": "Sidearm", // Shorty
  "A03B24D3-4319-996D-0F8C-94BBFBA1DFC7": "Sniper", // Operator
  "4ADE7FAA-4CF1-8376-95EF-39884480959B": "Sniper", // Guardian
  "5F0AAF7A-4289-3998-D5FF-EB9A5CF7EF5C": "Sniper", // Outlaw
  "C4883E50-4494-202C-3EC3-6B8A9284F00B": "Sniper", // Marshal
  "462080D1-4035-2937-7C09-27AA2A5C27A7": "SMG", // Spectre
  "F7E1B454-4AD4-1063-EC0A-159E56B58941": "SMG", // Stinger
  "2F59173C-4BED-B6C3-2191-DEA9B58BE9C7": "Melee", // Melee
};

// Rarity tiers. Price maps split gun vs melee. Colors follow Valorant content tiers.
const GUN_TIERS = [
  { id: "select", name: "Select", prices: [875], colorVar: "--tier-select" },
  { id: "deluxe", name: "Deluxe", prices: [1275], colorVar: "--tier-deluxe" },
  { id: "premium", name: "Premium", prices: [1775], colorVar: "--tier-premium" },
  { id: "exclusive", name: "Exclusive", prices: [2175, 2375, 2675], colorVar: "--tier-exclusive" },
  { id: "ultra", name: "Ultra", prices: [2475, 2975], colorVar: "--tier-ultra" },
];
const MELEE_TIERS = [
  { id: "select", name: "Select", prices: [1750], colorVar: "--tier-select" },
  { id: "deluxe", name: "Deluxe", prices: [2550], colorVar: "--tier-deluxe" },
  { id: "premium", name: "Premium", prices: [3550], colorVar: "--tier-premium" },
  { id: "exclusive", name: "Exclusive", prices: [4350, 5350], colorVar: "--tier-exclusive" },
  { id: "ultra", name: "Ultra", prices: [4950, 5950], colorVar: "--tier-ultra" },
];
const STANDARD_TIER = { id: "standard", name: "Standard", prices: [], colorVar: "--tier-standard" };

export const TIERS = [
  { ...GUN_TIERS[0] },
  { ...GUN_TIERS[1] },
  { ...GUN_TIERS[2] },
  { ...GUN_TIERS[3] },
  { ...GUN_TIERS[4] },
  STANDARD_TIER,
];

// Known melee weapon-type suffix words, used to derive a melee skin's collection.
const MELEE_TYPE_WORDS = new Set([
  "Knife", "Knives", "Sword", "Blade", "Blades", "Karambit", "Dagger", "Daggers",
  "Axe", "Axes", "Battleaxe", "Hammer", "Fan", "Fanblade", "Baton", "Staff",
  "Kunai", "Bat", "Scythe", "Splitter", "Crowbar", "Comb", "Harvester", "Anchor",
  "Hook", "Knuckles", "Gauntlet", "Gauntlets", "Claw", "Wand", "Cane", "Stick",
  "Lasso", "Mace", "Balisong", "Gloves", "Stiletto", "Chainsaw", "Drill", "Foil",
  "Electroblade", "Coiler", "Ascender", "Melee", "Spear", "Edge",
]);

function slugify(s) {
  return (
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item"
  );
}

// Derive a skin's collection (bundle) from its name.
// Guns: strip the trailing weapon name. Melee: strip a known melee-type suffix.
// The default skin ("Standard <weapon>" / the melee "Melee") collapses to "Standard".
function deriveCollection(skinName, weaponName, isMelee) {
  if (skinName === weaponName) return "Standard";
  if (isMelee) {
    const parts = skinName.split(" ");
    const last = parts[parts.length - 1];
    if (MELEE_TYPE_WORDS.has(last)) {
      const base = parts.slice(0, -1).join(" ").trim();
      return base || skinName;
    }
    return skinName;
  }
  if (skinName.endsWith(weaponName)) {
    const base = skinName.slice(0, skinName.length - weaponName.length).trim();
    return base || skinName;
  }
  return skinName;
}

// Rarity tier from VP price. Exact match first, then closest-tier fallback.
// null price -> Standard tier.
function tierForPrice(price, isMelee) {
  if (price == null) return STANDARD_TIER;
  const tiers = isMelee ? MELEE_TIERS : GUN_TIERS;
  for (const t of tiers) {
    if (t.prices.includes(price)) return t;
  }
  let best = tiers[0];
  let bestDist = Infinity;
  for (const t of tiers) {
    for (const p of t.prices) {
      const d = Math.abs(p - price);
      if (d < bestDist) {
        bestDist = d;
        best = t;
      }
    }
  }
  return best;
}

/**
 * Radianite (RP) cost for a skin, computed at render time from per-skin values.
 *   paidLevels   = levels.length - 1
 *   variantCount = chromas.length - 1 (the base/default chroma is free)
 *   isORA        = collection name is "ORA by OneTap" (detected by name only)
 *   isMelee      = weapon is Melee
 *   levelCost = (isORA && maxLevel === oraFinalLevel) ? (paidLevels-1)*10 + 25 : paidLevels*10
 *   variantCost = variantCount * 15
 *   total = levelCost + variantCost
 */
export function deriveRadianite(skin) {
  const maxLevel = (skin.levels && skin.levels.length) || 0;
  const variantCount = Math.max(0, (skin.chromas && skin.chromas.length - 1) || 0);
  const isMelee = skin.isMelee;
  const isORA = skin.collectionName === "ORA by OneTap";
  const paidLevels = Math.max(0, maxLevel - 1);
  const oraFinalLevel = isMelee ? 3 : 5;
  const levelCost =
    isORA && maxLevel === oraFinalLevel ? (paidLevels - 1) * 10 + 25 : paidLevels * 10;
  const variantCost = variantCount * 15;
  const total = levelCost + variantCost;
  return { maxLevel, variantCount, isORA, isMelee, paidLevels, levelCost, variantCost, total };
}

export function tierColorVar(tierId) {
  const t = TIERS.find((x) => x.id === tierId);
  return t ? t.colorVar : "--tier-standard";
}

export function normalize(raw) {
  const weapons = [];
  const collectionMap = new Map(); // slug -> { id, name, count }
  const skins = [];

  const weaponEntries = Object.values(raw);

  for (const w of weaponEntries) {
    const isMelee = w.weaponId === MELEE_ID;
    const category = WEAPON_CATEGORIES[w.weaponId] || "Other";
    weapons.push({ id: w.weaponId, name: w.displayName, category, icon: w.displayIcon });

    for (const s of w.skins) {
      // Drop junk entries that aren't real weapon skins (e.g. "Random Favorite Skin").
      if (/^Random .+ Skin$/i.test(s.name)) continue;

      const collectionName = deriveCollection(s.name, w.displayName, isMelee);
      const collectionSlug = slugify(collectionName);
      const price = s.price ? s.price[VP_CURRENCY] : null;
      const tier = tierForPrice(price, isMelee);
      const isVct = collectionName.toUpperCase().startsWith("VCT");
      const isStandard = price == null;

      const chromas = (s.chromas || []).map((c) => ({
        id: c.id,
        name: (c.name || "").replace(/\s*\n\s*/g, " ").trim(),
        image: c.displayIcon,
        swatch: c.swatch,
      }));
      const levels = (s.levels || []).map((l) => ({
        id: l.id,
        name: (l.name || "").replace(/\s*\n\s*/g, " ").trim(),
      }));

      const defaultImage =
        (chromas[0] && chromas[0].image) || w.displayIcon || "";

      const skin = {
        id: s.id,
        name: s.name,
        weaponId: w.weaponId,
        weaponName: w.displayName,
        category,
        isMelee,
        collectionId: collectionSlug,
        collectionName,
        tierId: tier.id,
        tierName: tier.name,
        defaultImage,
        price, // null => Standard
        isVct,
        isStandard, // battlepass / default skins (Standard tier)
        chromas,
        levels,
      };
      skins.push(skin);

      if (!collectionMap.has(collectionSlug)) {
        collectionMap.set(collectionSlug, { id: collectionSlug, name: collectionName, count: 0 });
      }
      collectionMap.get(collectionSlug).count += 1;
    }
  }

  const collections = [...collectionMap.values()].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );

  weapons.sort((a, b) => a.name.localeCompare(b.name, "en"));

  return { skins, weapons, collections, tiers: TIERS };
}

export const COUNTS = { weapons: 21 };

export { slugify };