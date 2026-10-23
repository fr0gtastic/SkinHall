// Catalog.jsx — the main directory: filter + sort grid, URL-driven.
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCatalog } from "@/lib/useCatalog";
import { parseState, buildSearch } from "@/lib/urlState";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import SkinCard from "@/components/SkinCard";
import Pagination from "@/components/Pagination";

const TIER_RANK = {
  standard: 0,
  select: 1,
  deluxe: 2,
  premium: 3,
  exclusive: 4,
  ultra: 5,
};

const PAGE_SIZE = 40;

export default function Catalog() {
  const { data, loading, error } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const state = useMemo(() => parseState(searchParams), [searchParams]);

  // keep the URL in sync whenever the state changes (generic over all keys)
  const updateState = (next) => {
    const merged = { ...state, ...next };
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      ["w", "b", "sort", "dir", "rp", "price", "levels", "hvct", "hbp", "hsd", "rarity", "q", "cols"].forEach((k) =>
        params.delete(k)
      );
      const search = buildSearch(merged);
      const nextParams = new URLSearchParams(search.replace(/^\?/, ""));
      nextParams.forEach((v, k) => params.set(k, v));
      return params;
    });
  };

  // Skins remaining after the category-hide toggles (VCT / Battlepass / Select & Deluxe).
  // These also govern which bundles appear in the dropdown.
  const hideFiltered = useMemo(() => {
    if (!data) return [];
    return data.skins.filter((s) => {
      if (state.hideVct && s.isVct) return false;
      if (state.hideBp && s.isStandard) return false;
      if (state.hideSd && (s.tierId === "select" || s.tierId === "deluxe")) return false;
      return true;
    });
  }, [data, state.hideVct, state.hideBp, state.hideSd]);

  // Bundles shown in the dropdown = those with at least one non-hidden skin.
  const visibleCollections = useMemo(() => {
    if (!data) return [];
    const counts = new Map();
    for (const s of hideFiltered) {
      counts.set(s.collectionId, (counts.get(s.collectionId) || 0) + 1);
    }
    return data.collections
      .filter((c) => counts.has(c.id))
      .map((c) => ({ ...c, count: counts.get(c.id) }));
  }, [data, hideFiltered]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const wSet = state.weapons.length ? new Set(state.weapons) : null;
    const bSet = state.collections.length ? new Set(state.collections) : null;
    const rSet = state.rarity.length ? new Set(state.rarity) : null;
    const q = state.q.trim().toLowerCase();

    let list = hideFiltered.filter((s) => {
      if (wSet && !wSet.has(s.weaponId)) return false;
      if (bSet && !bSet.has(s.collectionId)) return false;
      if (rSet && !rSet.has(s.tierId)) return false;
      if (q && !s.name.toLowerCase().includes(q)) return false;
      return true;
    });

    const dir = state.sort.dir === "asc" ? 1 : -1;
    const key = state.sort.key;
    const byPrice = (a, b) => {
      const pa = a.price ?? 0;
      const pb = b.price ?? 0;
      return (pa - pb) * dir;
    };
    const cmp = (a, b) => a.localeCompare(b, "en", { sensitivity: "base" }) * dir;

    const sorted = [...list];
    switch (key) {
      case "price":
        sorted.sort((a, b) => byPrice(a, b) || cmp(a.name, b.name));
        break;
      case "bundle":
        sorted.sort((a, b) => cmp(a.collectionName, b.collectionName) || cmp(a.name, b.name));
        break;
      case "weapon":
        sorted.sort((a, b) => cmp(a.weaponName, b.weaponName) || cmp(a.name, b.name));
        break;
      case "tier":
        sorted.sort(
          (a, b) =>
            (TIER_RANK[a.tierId] - TIER_RANK[b.tierId]) * dir || byPrice(a, b) || cmp(a.name, b.name)
        );
        break;
      case "name":
      default:
        sorted.sort((a, b) => cmp(a.name, b.name));
        break;
    }
    return sorted;
  }, [hideFiltered, state]);

  // reset to page 1 on filter/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    state.weapons.join(","),
    state.collections.join(","),
    state.sort.key,
    state.sort.dir,
    state.rarity.join(","),
    state.q,
    state.hideVct,
    state.hideBp,
    state.hideSd,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSlice = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Loading catalog...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="font-display text-sm uppercase tracking-wider text-primary">
          Data load failed
        </p>
        <p className="text-xs text-muted-foreground">The skins snapshot could not be read.</p>
      </div>
    );
  }

  const shown = pageSlice;

  return (
    <div className="min-h-screen bg-background">
      <Hero count={data.skins.length} filtered={filtered.length} />
      <FilterBar
        weapons={data.weapons}
        collections={visibleCollections}
        state={state}
        onChange={updateState}
        total={data.skins.length}
        shown={filtered.length}
      />

      <div className="mx-auto max-w-[1600px] px-5 pt-6 sm:px-8 sm:pt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <main className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8 sm:py-8">
        {shown.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
            <p className="font-display text-sm uppercase tracking-[0.16em] text-foreground/70">
              No skins match
            </p>
            <p className="text-xs text-muted-foreground">
              Try clearing a filter to widen the view.
            </p>
          </div>
        ) : (
          <div
            className="density-grid grid gap-3 sm:gap-4"
            style={{ gridTemplateColumns: `repeat(${state.cols}, minmax(0, 1fr))` }}
          >
            {shown.map((skin) => (
              <SkinCard key={skin.id} skin={skin} showRadianite={state.rp} showPrice={state.price} showLevels={state.levels} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}