// useCatalog.js
// Fetches the embedded data snapshot once, normalizes it through the adapter,
// and memoizes the result so every component shares one in-memory catalog.
import { useEffect, useState } from "react";
import { normalize } from "@/lib/adapters/skinsAdapter";

let cache = null;
let promise = null;

function load() {
  if (cache) return Promise.resolve(cache);
  if (!promise) {
    promise = fetch(`${import.meta.env.BASE_URL}data/skins.json`)
      .then((r) => r.json())
      .then((raw) => {
        cache = normalize(raw);
        return cache;
      })
      .catch((err) => {
        promise = null;
        throw err;
      });
  }
  return promise;
}

export function useCatalog() {
  const [state, setState] = useState({ data: cache, loading: !cache, error: null });

  useEffect(() => {
    if (cache) {
      setState({ data: cache, loading: false, error: null });
      return;
    }
    let alive = true;
    setState((s) => ({ ...s, loading: true }));
    load()
      .then((data) => {
        if (alive) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (alive) setState({ data: null, loading: false, error });
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}