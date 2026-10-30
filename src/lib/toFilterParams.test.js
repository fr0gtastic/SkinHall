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
