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

  it("prefix rarity sel", () => expect(parseSearchQuery("sel")).toEqual({ rarity: "Select" }));
  it("prefix rarity delux", () => expect(parseSearchQuery("delux")).toEqual({ rarity: "Deluxe" }));
  it("prefix rarity prem", () => expect(parseSearchQuery("prem")).toEqual({ rarity: "Premium" }));
  it("prefix rarity excl", () => expect(parseSearchQuery("excl")).toEqual({ rarity: "Exclusive" }));
  it("prefix weapon outl", () => expect(parseSearchQuery("outl")).toEqual({ weaponType: "Outlaw" }));
  it("prefix weapon guard", () => expect(parseSearchQuery("guard")).toEqual({ weaponType: "Guardian" }));
  it("prefix weapon guar", () => expect(parseSearchQuery("guar")).toEqual({ weaponType: "Guardian" }));
  it("exact rarity select", () => expect(parseSearchQuery("select")).toEqual({ rarity: "Select" }));
  it("exact weapon guardian", () => expect(parseSearchQuery("guardian")).toEqual({ weaponType: "Guardian" }));
  it("compound excl guard", () => expect(parseSearchQuery("excl guard")).toEqual({ rarity: "Exclusive", weaponType: "Guardian" }));
});
