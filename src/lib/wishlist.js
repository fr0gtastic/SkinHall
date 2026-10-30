export const DEFAULT_KEY = "skinhall.wishlist";

export function loadWishlist(key = DEFAULT_KEY) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    if (!parsed.every((x) => typeof x === "string")) return [];
    return parsed;
  } catch (e) {
    return [];
  }
}

export function saveWishlist(ids, key = DEFAULT_KEY) {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch (e) {
    // quota error etc
  }
}

export function clearWishlist(key = DEFAULT_KEY) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // ignore
  }
}

export function encodeWishlist(ids) {
  const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(ids))));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeWishlist(str) {
  try {
    if (typeof str !== "string" || str === "") return [];
    let s = str.replace(/-/g, "+").replace(/_/g, "/");
    const pad = s.length % 4;
    if (pad) s += "=".repeat(4 - pad);
    const json = decodeURIComponent(escape(atob(s)));
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    if (!parsed.every((x) => typeof x === "string")) return [];
    return parsed;
  } catch (e) {
    return [];
  }
}

export function toggleWishlist(ids, id) {
  const arr = Array.isArray(ids) ? [...ids] : [];
  const idx = arr.indexOf(id);
  if (idx >= 0) {
    arr.splice(idx, 1);
  } else {
    arr.push(id);
  }
  return arr;
}

export function isWishlisted(ids, id) {
  if (!Array.isArray(ids)) return false;
  return ids.indexOf(id) >= 0;
}
