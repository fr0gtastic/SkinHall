import { TIERS } from "@/lib/adapters/skinsAdapter";

const WEAPON_UUIDS = {
  Classic: "29A0CFAB-485B-F5D5-779A-B59F85E204A8",
  Shorty: "42DA8CCC-40D5-AFFC-BEEC-15AA47B42EDA",
  Frenzy: "44D4E95C-4157-0037-81B2-17841BF2E8E3",
  Ghost: "1BAA85B4-4C70-1284-64BB-6481DFC3BB4E",
  Sheriff: "E336C6B8-418D-9340-D77F-7A9E4CFE0702",
  Stinger: "F7E1B454-4AD4-1063-EC0A-159E56B58941",
  Spectre: "462080D1-4035-2937-7C09-27AA2A5C27A7",
  Bucky: "910BE174-449B-C412-AB22-D0873436B21B",
  Judge: "EC845BF4-4F79-DDDA-A3DA-0DB3774B2794",
  Bulldog: "AE3DE142-4D85-2547-DD26-4E90BED35CF7",
  Guardian: "4ADE7FAA-4CF1-8376-95EF-39884480959B",
  Phantom: "EE8E8D15-496B-07AC-E5F6-8FAE5D4C7B1A",
  Vandal: "9C82E19D-4575-0200-1A81-3EACF00CF872",
  Marshal: "C4883E50-4494-202C-3EC3-6B8A9284F00B",
  Operator: "A03B24D3-4319-996D-0F8C-94BBFBA1DFC7",
  Ares: "55D8A0F4-4274-CA67-FE2C-06AB45EFDF58",
  Odin: "63E6C2B6-4A8E-869C-3D4C-E38355226584",
  Bandit: "410B2E0B-4CEB-1321-1727-20858F7F3477",
  Outlaw: "5F0AAF7A-4289-3998-D5FF-EB9A5CF7EF5C",
  Warden: "8DB0A1BF-4A50-832A-4566-FAAAA6D250CA",
  // "Melee" is a category, not a weapon name in WEAPON_CATEGORIES; canonical name is "Melee" but UUID is MELEE_ID
  Melee: "2F59173C-4BED-B6C3-2191-DEA9B58BE9C7",
};

const WEAPON_NAMES = Object.keys(WEAPON_UUIDS);

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
  const cleaned = String(input).replace(/["']/g, "");
  const tokens = cleaned.trim().toLowerCase().split(/\s+/).filter(Boolean);
  for (const tok of tokens) {
    if (SORT_MAP[tok]) {
      result.sort = SORT_MAP[tok];
      continue;
    }
    let rarity = RARITY_NAMES.find((n) => n.toLowerCase() === tok);
    if (!rarity) {
      const matches = RARITY_NAMES.filter((n) => n.toLowerCase().startsWith(tok));
      if (matches.length === 1) rarity = matches[0];
      else if (matches.length > 1) {
        // tiebreak: prefer shortest name (canonical), e.g. "select" over "select edition"
        rarity = matches.slice().sort((a, b) => a.length - b.length)[0];
      }
    }
    if (rarity) {
      result.rarity = rarity;
      continue;
    }
    let weapon = WEAPON_NAMES.find((n) => n.toLowerCase() === tok);
    if (!weapon) {
      const matches = WEAPON_NAMES.filter((n) => n.toLowerCase().startsWith(tok));
      if (matches.length === 1) weapon = matches[0];
      else if (matches.length > 1) {
        // tiebreak: prefer shortest name (canonical)
        weapon = matches.slice().sort((a, b) => a.length - b.length)[0];
      }
    }
    if (weapon) {
      result.weaponType = weapon;
      continue;
    }
  }
  return result;
}

export function toFilterParams(parsed) {
  const params = {};
  if (parsed.rarity) params.rarity = String(parsed.rarity).toLowerCase();
  if (parsed.weaponType) params.w = WEAPON_UUIDS[parsed.weaponType];
  if (parsed.sort) {
    const [key, dir] = String(parsed.sort).split("_");
    params.sort = key;
    params.dir = dir;
  }
  return params;
}
