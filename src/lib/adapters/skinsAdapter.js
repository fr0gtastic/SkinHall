// skinsAdapter.js
// Single normalization layer for the Valorant skins data.
// Raw shape: object keyed by weapon UUID -> { weaponId, displayName, displayIcon, skins[] }
// A future live API or updated file touches only this module.

import { MELEE_COLLECTION_OVERRIDES } from "../../data/meleeCollectionOverrides.js";

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
export const MELEE_TYPE_WORDS = new Set([
  "Knife", "Knives", "Sword", "Blade", "Blades", "Karambit", "Dagger", "Daggers",
  "Axe", "Axes", "Battleaxe", "Hammer", "Fan", "Fanblade", "Baton", "Staff",
  "Kunai", "Bat", "Scythe", "Splitter", "Crowbar", "Comb", "Harvester", "Anchor",
  "Hook", "Knuckles", "Gauntlet", "Gauntlets", "Claw", "Wand", "Cane", "Stick",
  "Lasso", "Mace", "Balisong", "Gloves", "Stiletto", "Chainsaw", "Drill", "Foil",
  "Electroblade", "Coiler", "Ascender", "Melee", "Spear", "Edge",
]);

// Agent Gear weapon skins: unlockable at Tier 10 using Kingdom Credits when the
// agent is unlocked. Keyed by skin name -> associated agent name. These are
// collapsed into a single "Agent Gear" bundle with no rarity assigned.
export const AGENT_GEAR = {
  "Eclipse Ghost": "Astra",
  "RagnaRocker Frenzy": "Breach",
  "Peacekeeper Sheriff": "Brimstone",
  "Finesse Classic": "Chamber",
  "Flutter Ghost": "Clove",
  "Hush Ghost": "Cypher",
  "Resolution Classic": "Deadlock",
  "Karabasan Shorty": "Fade",
  "Sidekick Shorty": "Gekko",
  "Wayfarer Sheriff": "Harbor",
  "Mythmaker Sheriff": "Iso",
  "Game Over Sheriff": "Jett",
  "FIRE/arm Classic": "KAYO",
  "Wunderkind Shorty": "Killjoy",
  "Headbanger Classic": "Miks",
  "Live Wire Frenzy": "Neon",
  "Soul Silencer Ghost": "Omen",
  "Spitfire Frenzy": "Phoenix",
  "Pistolinha Classic": "Raze",
  "Vendetta Ghost": "Reyna",
  "Final Chamber Classic": "Sage",
  "Swooping Frenzy": "Skye",
  "Protektor Sheriff": "Sova",
  "Hard Bargain Shorty": "Tejo",
  "Enforcer Sheriff": "Veto",
  "Snakebite Shorty": "Viper",
  "Steel Resolve Classic": "Vyse",
  "Kaleidoscope Frenzy": "Waylay",
  "Death Wish Sheriff": "Yoru",
};

function slugify(s) {
  return (
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item"
  );
}

// Reverse of slugify: turn a slug into a display name.
// Used when an override references a collection that has not been
// created yet, so we need a fallback display name from the slug itself.
function unslugify(slug) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim() || slug;
}

function consolidateVctBundle(name) {
  if (!name) return null;
  const n = name.trim();
  if (/^VCT\s*LOCK\/\/IN\s*Misericordia/i.test(n)) return "VCT LOCK//IN Misericordia";
  if (/^VCT25\s+x\b/i.test(n)) return "VCT25 x";
  if (/^VCT26\s+x\b/i.test(n)) return "VCT26 x";
  if (/^VCT\s+x\b/i.test(n)) return "VCT x";
  return null;
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
      return consolidateVctBundle(base) || base || skinName;
    }
    return consolidateVctBundle(skinName) || skinName;
  }
  if (skinName.endsWith(weaponName)) {
    const base = skinName.slice(0, skinName.length - weaponName.length).trim();
    return consolidateVctBundle(base) || base || skinName;
  }
  return consolidateVctBundle(skinName) || skinName;
}

// Tier rank used for tie-breaking when a collection's gun tiers disagree.
const TIER_RANK = {
  standard: 0,
  select: 1,
  deluxe: 2,
  premium: 3,
  exclusive: 4,
  ultra: 5,
};

// Most common tier id among `tierIds`; ties resolve to the lowest rank.
function modeTierId(tierIds) {
  const counts = {};
  for (const id of tierIds) counts[id] = (counts[id] || 0) + 1;
  const ids = Object.keys(counts);
  ids.sort((a, b) => counts[b] - counts[a] || TIER_RANK[a] - TIER_RANK[b]);
  const t = TIERS.find((x) => x.id === ids[0]);
  return t ? { id: t.id, name: t.name } : null;
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

// For a melee skin, find the longest existing collection name that is a
// word-boundary prefix of the skin name (case-insensitive). Returns the
// collection slug if found, otherwise null.
function findMeleeCollectionSlug(skinName, collectionMap) {
  const lower = skinName.toLowerCase();
  let best = null;
  let bestLen = 0;
  let bestScore = 0;
const STOP = new Set(["blade", "blades", "of", "to", "the", "knife", "knives", "flail"]);
    const skinWords = lower.split(/\s+/).filter((w) => !STOP.has(w));
  for (const [slug, c] of collectionMap) {
    const cn = c.name.toLowerCase();
    if (lower === cn) return slug;
    if (lower.startsWith(cn) && (lower.length === cn.length || /\s/.test(lower[cn.length]))) {
      if (cn.length > bestLen) { best = slug; bestLen = cn.length; bestScore = 999; }
    }
    if (lower.endsWith(cn) && (lower.length === cn.length || /\s/.test(lower[lower.length - cn.length - 1]))) {
      if (cn.length > bestLen) { best = slug; bestLen = cn.length; bestScore = 999; }
    }
const collWords = cn.split(/\s+/).filter((w) => !STOP.has(w));
    let score = 0;
    for (const sw of skinWords) {
      for (const cw of collWords) {
        if (sw === cw && sw.length >= 4) score += 2;
        else if (sw.length >= 5 && cw.length >= 5 && (sw.startsWith(cw) || cw.startsWith(sw) || (sw.length >= 7 && cw.length >= 7 && sw.slice(0, 7) === cw.slice(0, 7)))) score += 1;
      }
    }
    if (score > bestScore || (score === bestScore && score > 0 && cn.length > bestLen)) {
      bestScore = score;
      best = slug;
      bestLen = cn.length;
    }
  }
  return bestScore > 0 ? best : null;
}

export function normalize(raw) {
  const weapons = [];
  const collectionMap = new Map(); // slug -> { id, name, count, members: Skin[] }
  const skins = [];

  const weaponEntries = Object.values(raw);
  const ordered = [...weaponEntries].sort((a, b) =>
    (a.weaponId === MELEE_ID) - (b.weaponId === MELEE_ID)
  );

  for (const w of ordered) {
    const isMelee = w.weaponId === MELEE_ID;
    const category = WEAPON_CATEGORIES[w.weaponId] || "Other";
    weapons.push({ id: w.weaponId, name: w.displayName, category, icon: w.displayIcon });

    for (const s of w.skins) {
      // Drop junk entries that aren't real weapon skins (e.g. "Random Favorite Skin").
      if (/^Random .+ Skin$/i.test(s.name)) continue;
      const skinName = (s.name || "").trim();

      let collectionName;
      let collectionSlug;
      if (isMelee) {
        const overrideSlug = MELEE_COLLECTION_OVERRIDES[s.id];
        if (overrideSlug) {
          collectionSlug = overrideSlug;
          const existing = collectionMap.get(overrideSlug);
          collectionName = existing ? existing.name : unslugify(overrideSlug);
        } else {
          const matchedSlug = findMeleeCollectionSlug(skinName, collectionMap);
          if (matchedSlug) {
            collectionSlug = matchedSlug;
            collectionName = collectionMap.get(matchedSlug).name;
          } else {
            collectionName = deriveCollection(skinName, w.displayName, true);
            collectionSlug = slugify(collectionName);
          }
        }
      } else {
        collectionName = deriveCollection(skinName, w.displayName, false);
        collectionSlug = slugify(collectionName);
      }
      const agentGearAgent = AGENT_GEAR[skinName];
      if (agentGearAgent) {
        collectionName = "Agent Gear";
        collectionSlug = "agent-gear";
      }
      const price = s.price ? s.price[VP_CURRENCY] : null;
      const rawTier = agentGearAgent ? null : tierForPrice(price, isMelee);
      const isVct = collectionName.toUpperCase().startsWith("VCT");
      const isStandard = price == null && !agentGearAgent;

      // Skins with "Standard" in name should not appear as cards
      if (/^standard\b/i.test(skinName)) continue;

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
        name: skinName,
        weaponId: w.weaponId,
        weaponName: w.displayName,
        category,
        isMelee,
        collectionId: collectionSlug,
        collectionName,
        // Default tier from this skin's own VP price (original behavior).
        tierId: rawTier ? rawTier.id : null,
        tierName: rawTier ? rawTier.name : null,
        // Price-derived tier kept so melees can inherit their bundle's gun tier below.
        _rawTierId: rawTier ? rawTier.id : null,
        _rawTierName: rawTier ? rawTier.name : null,
        releaseAct: s.releaseAct ?? null,
        defaultImage,
        price, // null => Standard
        isVct,
        isStandard, // battlepass / default skins (Standard tier)
        isAgentGear: !!agentGearAgent,
        agentName: agentGearAgent || null,
        chromas,
        levels,
      };
      skins.push(skin);

      if (!collectionMap.has(collectionSlug)) {
        collectionMap.set(collectionSlug, { id: collectionSlug, name: collectionName, count: 0, members: [] });
      }
      const entry = collectionMap.get(collectionSlug);
      entry.count += 1;
      entry.members.push(skin);
    }
  }

  // For melees in a bundle that also contains guns, inherit the bundle's gun
  // tier (guns carry honest content-tier prices). Melee prices are inflated for
  // the same tier, so a melee's own price can map to a higher tier than its
  // bundle's guns (e.g. Minima Karambit 3550 VP -> Premium while Minima guns
  // are 1275 VP -> Deluxe). Melee-only bundles and all guns keep their own
  // price-derived tier.
  const collectionGunTier = new Map();
  for (const entry of collectionMap.values()) {
    const gunTiers = entry.members
      .filter((m) => !m.isMelee && m._rawTierId != null)
      .map((m) => m._rawTierId);
    if (gunTiers.length > 0) {
      collectionGunTier.set(entry.id, modeTierId(gunTiers));
    }
  }

  for (const skin of skins) {
    if (
      skin.isMelee &&
      skin._rawTierId != null &&
      collectionGunTier.has(skin.collectionId)
    ) {
      const coll = collectionGunTier.get(skin.collectionId);
      skin.tierId = coll.id;
      skin.tierName = coll.name;
    }
  }

  // Each collection's primary tier = mode of its member skins' tiers
  // (Agent Gear members have no tier and are excluded). Reuses modeTierId.
  for (const entry of collectionMap.values()) {
    const memberTiers = entry.members
      .filter((m) => !m.isAgentGear && m.tierId)
      .map((m) => m.tierId);
    entry.primaryTier = memberTiers.length ? modeTierId(memberTiers) : null;
  }

  const collections = [...collectionMap.values()].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );

  weapons.sort((a, b) => a.name.localeCompare(b.name, "en"));

  return { skins, weapons, collections, tiers: TIERS };
}

export const COUNTS = { weapons: 21 };

export { slugify };