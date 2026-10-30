import { describe, it, expect } from "vitest";
import { toFilterParams } from "./parseSearchQuery";

describe("toFilterParams", () => {
  it("maps parsed names to URL params", () => {
    expect(toFilterParams({ rarity: "Ultra", weaponType: "Ghost", sort: "price_asc" })).toEqual({
      w: "1BAA85B4-4C70-1284-64BB-6481DFC3BB4E",
      rarity: "ultra",
      sort: "price",
      dir: "asc",
    });
  });
});

describe("toFilterParams long-name weapons", () => {
  it("Bandit", () => expect(toFilterParams({ weaponType: "Bandit" })).toEqual({ w: "410B2E0B-4CEB-1321-1727-20858F7F3477" }));
  it("Melee", () => expect(toFilterParams({ weaponType: "Melee" })).toEqual({ w: "2F59173C-4BED-B6C3-2191-DEA9B58BE9C7" }));
  it("Outlaw", () => expect(toFilterParams({ weaponType: "Outlaw" })).toEqual({ w: "5F0AAF7A-4289-3998-D5FF-EB9A5CF7EF5C" }));
  it("Warden", () => expect(toFilterParams({ weaponType: "Warden" })).toEqual({ w: "8DB0A1BF-4A50-832A-4566-FAAAA6D250CA" }));
});
