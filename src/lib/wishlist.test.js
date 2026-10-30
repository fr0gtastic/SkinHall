import { describe, it, expect, beforeEach } from "vitest";
import {
  DEFAULT_KEY,
  loadWishlist,
  saveWishlist,
  clearWishlist,
  encodeWishlist,
  decodeWishlist,
  toggleWishlist,
  isWishlisted,
} from "./wishlist";

const KEY = "test.wishlist";

beforeEach(() => {
  localStorage.clear();
});

describe("toggleWishlist", () => {
  it("adds when not present", () => {
    expect(toggleWishlist(["a"], "b")).toEqual(["a", "b"]);
  });
  it("removes when present", () => {
    expect(toggleWishlist(["a", "b"], "a")).toEqual(["b"]);
  });
  it("does not mutate input", () => {
    const input = ["a", "b"];
    const copy = [...input];
    toggleWishlist(input, "a");
    expect(input).toEqual(copy);
    expect(toggleWishlist(input, "a")).not.toBe(input);
  });
});

describe("isWishlisted", () => {
  it("true when present", () => {
    expect(isWishlisted(["a", "b"], "a")).toBe(true);
  });
  it("false when absent", () => {
    expect(isWishlisted(["a", "b"], "z")).toBe(false);
  });
});

describe("encodeWishlist", () => {
  it("contains no + / =", () => {
    const out = encodeWishlist(["a/b", "c+d", "e=f"]);
    expect(out).not.toMatch(/[+/=]/);
  });
});

describe("encode/decode round trip", () => {
  it("empty", () => {
    expect(decodeWishlist(encodeWishlist([]))).toEqual([]);
  });
  it("one", () => {
    expect(decodeWishlist(encodeWishlist(["abc"]))).toEqual(["abc"]);
  });
  it("many", () => {
    expect(decodeWishlist(encodeWishlist(["a", "b", "c"]))).toEqual(["a", "b", "c"]);
  });
  it("hyphens and underscores", () => {
    expect(decodeWishlist(encodeWishlist(["a-b", "c_d"]))).toEqual(["a-b", "c_d"]);
  });
});

describe("decodeWishlist invalid", () => {
  it("empty string", () => {
    expect(decodeWishlist("")).toEqual([]);
  });
  it("not base64", () => {
    expect(decodeWishlist("not base64!!!")).toEqual([]);
  });
  it("valid base64 of not json", () => {
    const b64 = btoa("not json");
    const urlsafe = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    expect(decodeWishlist(urlsafe)).toEqual([]);
  });
  it("valid base64 of JSON object", () => {
    const b64 = btoa(JSON.stringify({ a: 1 }));
    const urlsafe = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    expect(decodeWishlist(urlsafe)).toEqual([]);
  });
  it("valid base64 of [a, 42]", () => {
    const b64 = btoa(JSON.stringify(["a", 42]));
    const urlsafe = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    expect(decodeWishlist(urlsafe)).toEqual([]);
  });
});

describe("loadWishlist", () => {
  it("missing key returns []", () => {
    expect(loadWishlist(KEY)).toEqual([]);
  });
  it("corrupt json returns []", () => {
    localStorage.setItem(KEY, "{bad");
    expect(loadWishlist(KEY)).toEqual([]);
  });
});

describe("save/load round trip", () => {
  it("round trips", () => {
    saveWishlist(["x", "y"], KEY);
    expect(loadWishlist(KEY)).toEqual(["x", "y"]);
  });
});

describe("clearWishlist", () => {
  it("makes load return []", () => {
    saveWishlist(["x"], KEY);
    clearWishlist(KEY);
    expect(loadWishlist(KEY)).toEqual([]);
  });
});

describe("DEFAULT_KEY", () => {
  it("is correct", () => {
    expect(DEFAULT_KEY).toBe("skinhall.wishlist");
  });
});
