import { TIERS } from "@/lib/adapters/skinsAdapter";

const WEAPON_NAMES = [
  "Classic", "Shorty", "Frenzy", "Ghost", "Sheriff",
  "Stinger", "Spectre", "Bucky", "Judge",
  "Bulldog", "Guardian", "Phantom", "Vandal",
  "Marshal", "Operator", "Ares", "Odin",
];

const RARITY_NAMES = TIERS.map((t) => t.name);

const SORT_MAP = {
  cheapest: "price_asc",
  lowest: "price_asc",
  low: "price_asc",
  cheap: "price_asc",
  expensive: "price_desc",
  highest: "price_desc",
  high: "price_desc",
};

export function parseSearchQuery(input) {
  const result = {};
  if (!input) return result;
  const tokens = String(input).trim().toLowerCase().split(/\s+/).filter(Boolean);
  for (const tok of tokens) {
    if (SORT_MAP[tok]) {
      result.sort = SORT_MAP[tok];
      continue;
    }
    const rarity = RARITY_NAMES.find((n) => n.toLowerCase() === tok);
    if (rarity) {
      result.rarity = rarity;
      continue;
    }
    const weapon = WEAPON_NAMES.find((n) => n.toLowerCase() === tok);
    if (weapon) {
      result.weaponType = weapon;
      continue;
    }
  }
  return result;
}