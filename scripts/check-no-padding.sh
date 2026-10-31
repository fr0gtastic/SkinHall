#!/usr/bin/env bash
# Fail if CSS defines too many classes that no component references.
set -uo pipefail
MAX_ORPHANS="${1:-5}"

mapfile -t CSS_FILES < <(git diff --name-only pre-redesign-base -- '*.css' 2>/dev/null)
if [ "${#CSS_FILES[@]}" -eq 0 ]; then
  echo "no CSS changes"
  exit 0
fi

orphans=0
orphan_list=""

for css in "${CSS_FILES[@]}"; do
  [ -f "$css" ] || continue
  mapfile -t classes < <(grep -oE '^\.[a-zA-Z][a-zA-Z0-9_-]+' "$css" | sed 's/^\.//' | sort -u)
  for cls in "${classes[@]}"; do
    n=$( { grep -rlE "\b${cls}\b" src --include='*.jsx' --include='*.js' 2>/dev/null || true; } | wc -l )
    if [ "$n" -eq 0 ]; then
      orphans=$((orphans+1))
      orphan_list="${orphan_list}${cls}"$'\n'
    fi
  done
done

echo "orphan CSS classes: $orphans (limit $MAX_ORPHANS)"
if [ "$orphans" -gt "$MAX_ORPHANS" ]; then
  echo "FAIL: too many unused CSS classes — likely padding" >&2
  printf '%s' "$orphan_list" | head -50 >&2
  exit 1
fi
echo "PASS"
