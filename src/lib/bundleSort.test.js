import { describe, it, expect } from "vitest";
import { sortBundles } from "./bundleSort";

describe("sortBundles", () => {
  const bundles = [
    { id: "b", name: "Beta", primaryTier: { id: "premium", name: "Premium" } },
    { id: "a", name: "Alpha", primaryTier: { id: "select", name: "Select" } },
    { id: "c", name: "Gamma", primaryTier: { id: "premium", name: "Premium" } },
  ];

  it("sorts alphabetically by name when byRarity is false", () => {
    const out = sortBundles(bundles, { byRarity: false });
    expect(out.map((x) => x.name)).toEqual(["Alpha", "Beta", "Gamma"]);
    expect(out).not.toBe(bundles);
  });

  it("sorts alphabetically by name when byRarity omitted", () => {
    const out = sortBundles(bundles);
    expect(out.map((x) => x.name)).toEqual(["Alpha", "Beta", "Gamma"]);
  });

  it("sorts by rarity tier then name when byRarity true", () => {
    const out = sortBundles(bundles, { byRarity: true });
    expect(out.map((x) => x.name)).toEqual(["Alpha", "Beta", "Gamma"]);
  });

  it("does not mutate input", () => {
    const copy = [...bundles];
    sortBundles(bundles, { byRarity: true });
    expect(bundles).toEqual(copy);
  });
});
