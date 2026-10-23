// urlState.js
// The URL is the single source of truth for filters, sort, toggles, search, and density.
// Pure parse/serialize helpers used by the catalog + detail pages.

export const DEFAULT_SORT = { key: "price", dir: "desc" };

export const SORT_KEYS = [
  { key: "price", label: "Price" },
  { key: "bundle", label: "Bundle" },
  { key: "weapon", label: "Weapon" },
  { key: "name", label: "Name" },
  { key: "tier", label: "Rarity" },
];

export function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
}

export function defaultCols() {
  return isMobileViewport() ? 3 : 5;
}

export const DEFAULT_COLS = 5;
export const MIN_COLS = 3;
export const MAX_COLS = 10;

// Parse a URLSearchParams into the catalog state.
export function parseState(searchParams) {
  const w = (searchParams.get("w") || "").split(",").filter(Boolean);
  const b = (searchParams.get("b") || "").split(",").filter(Boolean);
  const sortKey = searchParams.get("sort") || DEFAULT_SORT.key;
  const dir = searchParams.get("dir") || DEFAULT_SORT.dir;
  const rp = searchParams.get("rp") === "1";
  const price = searchParams.get("price") !== "0";
  const levels = searchParams.get("levels") !== "0";
  const hideVct = searchParams.get("hvct") === "1";
  const hideBp = searchParams.get("hbp") === "1";
  const hideSd = searchParams.get("hsd") === "1";
  const hideNm = searchParams.get("nm") === "1";
  const rarity = (searchParams.get("rarity") || "").split(",").filter(Boolean);
  const q = (searchParams.get("q") || "").trim();
  const colsRaw = parseInt(searchParams.get("cols"), 10);
  const cols = Number.isFinite(colsRaw) && colsRaw >= MIN_COLS && colsRaw <= MAX_COLS ? colsRaw : defaultCols();
  return {
    weapons: w,
    collections: b,
    sort: { key: sortKey, dir },
    rp,
    price,
    levels,
    hideVct,
    hideBp,
    hideSd,
    hideNm,
    rarity,
    q,
    cols,
  };
}

// Build a query string from a state object.
export function buildSearch(state) {
  const params = new URLSearchParams();
  if (state.weapons && state.weapons.length) params.set("w", state.weapons.join(","));
  if (state.collections && state.collections.length) params.set("b", state.collections.join(","));
  if (state.sort) {
    params.set("sort", state.sort.key);
    params.set("dir", state.sort.dir);
  }
  if (state.rp) params.set("rp", "1");
  if (state.price === false) params.set("price", "0");
  if (state.levels === false) params.set("levels", "0");
  if (state.hideVct) params.set("hvct", "1");
  if (state.hideBp) params.set("hbp", "1");
  if (state.hideSd) params.set("hsd", "1");
  if (state.hideNm) params.set("nm", "1");
  if (state.rarity && state.rarity.length) params.set("rarity", state.rarity.join(","));
  if (state.q) params.set("q", state.q);
  if (state.cols && state.cols !== defaultCols()) params.set("cols", String(state.cols));
  const s = params.toString();
  return s ? `?${s}` : "";
}

export function dirLabel(dir) {
  return dir === "asc" ? "Asc" : "Desc";
}