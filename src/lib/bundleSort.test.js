import { describe, it, expect } from "vitest";
import { sortBundles } from "./bundleSort";

describe("sortBundles", () => {
  const bundles = [
    { name: "Alpha", primaryTier: { id: "select" } },
    { name: "Beta", primaryTier: { id: "premium" } },
    { name: "Gamma", primaryTier: { id: "premium" } },
    { name: "Ultra", primaryTier: { id: "ultra" } },
  ];

  it("sorts alphabetically by name when byRarity is false", () => {
    const out = sortBundles(bundles, { byRarity: false });
    expect(out.map((x) => x.name)).toEqual(["Alpha", "Beta", "Gamma", "Ultra"]);
    expect(out).not.toBe(bundles);
  });

  it("sorts alphabetically by name when byRarity omitted", () => {
    const out = sortBundles(bundles);
    expect(out.map((x) => x.name)).toEqual(["Alpha", "Beta", "Gamma", "Ultra"]);
  });

  it("sorts by rarity tier then name when byRarity true", () => {
    const out = sortBundles(bundles, { byRarity: true });
    expect(out.map((x) => x.name)).toEqual(["Ultra", "Beta", "Gamma", "Alpha"]);
  });

  it("does not mutate input", () => {
    const copy = [...bundles];
    sortBundles(bundles, { byRarity: true });
    expect(bundles).toEqual(copy);
  });
});
