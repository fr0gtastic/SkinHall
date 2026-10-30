## Goal
Implement the wishlist storage layer in src/lib/wishlist.js with loadWishlist, saveWishlist, clearWishlist, encodeWishlist, decodeWishlist, toggleWishlist, isWishlisted, and DEFAULT_KEY exports. Add comprehensive tests in src/lib/wishlist.test.js. Commit only when npm test passes and git status is clean.

## Task
Create src/lib/wishlist.js. The wishlist is a list of skin IDs persisted in localStorage on-device, portable between devices as a URL-safe base64 string. NO UI, NO React hooks in this task — pure logic only.

Data model: `string[]` of skin IDs. The identifier field on skin objects is `id` (verify by checking src/pages/SkinDetail.jsx for the useParams call, or src/lib/adapters/skinsAdapter.js — but do not guess other field names).

Required exports:

- `DEFAULT_KEY = "skinhall.wishlist"` — the default localStorage key
- `loadWishlist(key = DEFAULT_KEY): string[]` — reads localStorage, JSON-parses. Returns [] when key is missing, value is not valid JSON, or parsed value is not an array of strings. Never throws.
- `saveWishlist(ids, key = DEFAULT_KEY): void` — writes JSON.stringify(ids) to localStorage. Catches quota errors and returns silently.
- `clearWishlist(key = DEFAULT_KEY): void` — removes the key from localStorage.
- `encodeWishlist(ids: string[]): string` — URL-safe base64 of JSON.stringify(ids). Replace `+` with `-`, `/` with `_`, strip trailing `=`.
- `decodeWishlist(str: string): string[]` — inverse of encodeWishlist. Restore padding, replace `-` with `+` and `_` with `/`, base64-decode, JSON.parse, validate result is an array of strings. Returns [] on any error (empty input, bad base64, valid base64 of non-JSON, valid JSON that is not an array, array with non-string entries). Never throws.
- `toggleWishlist(ids: string[], id: string): string[]` — pure, returns a NEW array. If id is present, remove it. If not, append it. Does not mutate input.
- `isWishlisted(ids: string[], id: string): boolean` — pure, membership check.

Create src/lib/wishlist.test.js using jsdom's built-in localStorage. Use unique test keys (e.g. "test.wishlist") so the default key is not polluted. Call `localStorage.clear()` in beforeEach.

Tests must cover:
- toggleWishlist adds a new id, removes an existing id, does not mutate input
- isWishlisted true and false cases
- encodeWishlist output contains no `+`, `/`, or `=`
- encode/decode round-trip for: empty array, one id, many ids, ids with hyphens and underscores
- decodeWishlist returns [] for: empty string, "not base64!!!", valid base64 of "not json", valid base64 of a JSON object (not array), valid base64 of ["a", 42] (non-string element)
- loadWishlist returns [] when key missing
- loadWishlist returns [] when stored value is corrupt JSON
- saveWishlist + loadWishlist round-trip preserves the array
- clearWishlist makes loadWishlist return [] (key is gone)

Out of scope (do NOT add): React hooks, UI, compression, sync, IndexedDB, other storage backends.

Constraints:
- Run full `npm test` before committing (no --run filter)
- New files must end with a newline
- Only create src/lib/wishlist.js and src/lib/wishlist.test.js. Do not modify any other files. Do not add dependencies.
- Commit with explicit paths: `git add src/lib/wishlist.js src/lib/wishlist.test.js` then `git commit -m "feat: add wishlist storage layer with base64 portability"`
- Your task is not done until `git status --porcelain` is empty (clean tracked tree, no untracked files). The gauntlet checks this.
