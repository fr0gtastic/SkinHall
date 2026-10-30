import { describe, it, expect, vi } from "vitest";
import { isMac } from "./platform";

describe("isMac", () => {
  it("returns true for Mac userAgent", () => {
    const orig = navigator.userAgent;
    Object.defineProperty(navigator, "userAgent", { value: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", configurable: true });
    expect(isMac()).toBe(true);
    Object.defineProperty(navigator, "userAgent", { value: orig, configurable: true });
  });

  it("returns true for iPhone userAgent", () => {
    const orig = navigator.userAgent;
    Object.defineProperty(navigator, "userAgent", { value: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)", configurable: true });
    expect(isMac()).toBe(true);
    Object.defineProperty(navigator, "userAgent", { value: orig, configurable: true });
  });

  it("returns false for Linux userAgent", () => {
    const orig = navigator.userAgent;
    Object.defineProperty(navigator, "userAgent", { value: "Mozilla/5.0 (X11; Linux x86_64)", configurable: true });
    expect(isMac()).toBe(false);
    Object.defineProperty(navigator, "userAgent", { value: orig, configurable: true });
  });
});
