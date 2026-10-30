import { describe, it, expect } from "vitest";
import { parseSearchQuery } from "./parseSearchQuery";

describe("parseSearchQuery", () => {
  it("empty string -> {}", () => {
    expect(parseSearchQuery("")).toEqual({});
  });

  it("case-insensitive rarity", () => {
    expect(parseSearchQuery("ULTRA")).toEqual({ rarity: "Ultra" });
  });

  it("order-independent", () => {
    expect(parseSearchQuery("ultra ghost")).toEqual({ rarity: "Ultra", weaponType: "Ghost" });
    expect(parseSearchQuery("ghost ultra")).toEqual({ rarity: "Ultra", weaponType: "Ghost" });
  });

  it("sort cheapest", () => {
    expect(parseSearchQuery("cheap")).toEqual({ sort: "price_asc" });
  });

  it("sort expensive", () => {
    expect(parseSearchQuery("high")).toEqual({ sort: "price_desc" });
  });

  it("unknown ignored", () => {
    expect(parseSearchQuery("foo bar")).toEqual({});
  });
});
