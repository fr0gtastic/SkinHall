// scripts/list-melee.mjs
// Prints every melee skin with its ID, name, assigned collection, and VP price.
// Also validates MELEE_COLLECTION_OVERRIDES: every key must be a real skin ID,
// no duplicate keys, and every value must be a non-empty slug.
//
// Usage:  node scripts/list-melee.mjs [--singles]
//         (no flag)  prints every melee skin + full collections summary
//         --singles  prints only single-skin bundles (the review candidates)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

import { normalize } from "../src/lib/adapters/skinsAdapter.js";
import { MELEE_COLLECTION_OVERRIDES } from "../src/data/meleeCollectionOverrides.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const raw = JSON.parse(readFileSync(join(repoRoot, "public", "data", "skins.json"), "utf8"));

const MELEE_ID = "2F59173C-4BED-B6C3-2191-DEA9B58BE9C7";
const VP_CURRENCY = "85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741";
const singlesOnly = process.argv.includes("--singles");

const { skins } = normalize(raw);
const meleeSkins = skins.filter((s) => s.isMelee);

const overrideKeys = Object.keys(MELEE_COLLECTION_OVERRIDES).map((k) => k.toUpperCase());

// Build set of all raw skin IDs for validation.
const rawSkinIds = new Set();
for (const w of Object.values(raw)) {
  for (const s of w.skins) rawSkinIds.add(s.id.toUpperCase());
}

const errors = [];

// Duplicate override keys (case-insensitive).
const seen = new Set();
for (const k of overrideKeys) {
  if (seen.has(k)) errors.push(`Duplicate override key: ${k}`);
  seen.add(k);
}

// Unknown override IDs.
for (const k of overrideKeys) {
  if (!rawSkinIds.has(k)) errors.push(`Override key not found in raw data: ${k}`);
}

// Empty override values.
for (const [k, v] of Object.entries(MELEE_COLLECTION_OVERRIDES)) {
  if (typeof v !== "string" || v.trim() === "") {
    errors.push(`Override value is empty for key: ${k}`);
  }
}

if (errors.length) {
  console.error("Override validation errors:");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

// Group ALL skins (guns + melee) by collection so bundle size is global.
// A melee-only bundle is only "single" when no gun skins share the same slug.
const allByCollection = new Map();
for (const s of skins) {
  const list = allByCollection.get(s.collectionId) ?? [];
  list.push(s);
  allByCollection.set(s.collectionId, list);
}

const sorted = [...allByCollection.entries()].sort((a, b) =>
  a[0].localeCompare(b[0])
);
const singles = sorted.filter(([, list]) => list.length === 1);
const meleeSingles = singles.filter(([, list]) => list[0].isMelee);

if (singlesOnly) {
  console.log(`Single-skin bundles (${meleeSingles.length}):\n`);
  for (const [slug, list] of meleeSingles) {
    const s = list[0];
    console.log(`"${s.id}": "${slug}", // ${s.name}`);
  }
} else {
  console.log(`Melee skins: ${meleeSkins.length}  |  Overrides: ${overrideKeys.length}\n`);

  for (const s of meleeSkins) {
    const price = s.price == null ? "Standard" : s.price;
    const overridden = overrideKeys.includes(s.id.toUpperCase()) ? " *OVR*" : "";
    console.log(
      `${s.id}  ${s.name.padEnd(44)}  ->  ${s.collectionName.padEnd(30)}  ${price}${overridden}`
    );
  }

  console.log(`\nCollections (${allByCollection.size}):`);
  for (const [slug, list] of sorted) {
    console.log(`  ${slug}  (${list.length})  ${list.map((s) => s.name).join(", ")}`);
  }
}