#!/usr/bin/env bash
# Per-branch redesign gate. Usage: ./verify-redesign.sh [min-lines] [min-files]
set -euo pipefail

MIN_LINES="${1:-400}"
MIN_FILES="${2:-3}"
BASE="${VERIFY_BASE:-pre-redesign-base}"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"

if ! git rev-parse --verify "$BASE" >/dev/null 2>&1; then
  echo "FAIL: base branch '$BASE' not found" >&2; exit 1
fi

# On base with clean tree = between-branch transition. OK.
if [ "$BRANCH" = "$BASE" ]; then
  if git diff --quiet && git diff --cached --quiet && \
     [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo "branch: $BRANCH (base, clean) — between-branch transition"
    echo "PASS"
    exit 0
  fi
  echo "FAIL: working on $BASE with uncommitted changes. Create a redesign branch." >&2
  exit 1
fi

git add -A >/dev/null 2>&1 || true
STAT=$(git diff --numstat "$BASE")
ADD=$(echo "$STAT" | awk '$1 ~ /^[0-9]+$/ {a+=$1} END {print a+0}')
DEL=$(echo "$STAT" | awk '$2 ~ /^[0-9]+$/ {d+=$2} END {print d+0}')
FILES=$(echo "$STAT" | grep -c . 2>/dev/null || echo 0)
TOTAL=$((ADD + DEL))

echo "branch: $BRANCH  vs  $BASE"
echo "files: $FILES  lines: +$ADD -$DEL = $TOTAL"
echo "thresholds: ≥$MIN_LINES lines, ≥$MIN_FILES files"

FAIL=0
[ "$TOTAL" -lt "$MIN_LINES" ] && { echo "FAIL: $TOTAL lines < $MIN_LINES" >&2; FAIL=1; }
[ "$FILES" -lt "$MIN_FILES" ] && { echo "FAIL: $FILES files < $MIN_FILES" >&2; FAIL=1; }
echo "$STAT" | grep -q 'tailwind\.config\.js' || { echo "FAIL: tailwind.config.js not modified" >&2; FAIL=1; }
echo "$STAT" | grep -qE 'src/style\.css|src/App\.(jsx?|tsx?)|src/index\.css|src/components/' || { echo "FAIL: no src changes" >&2; FAIL=1; }

[ "$FAIL" -ne 0 ] && exit 1
echo "PASS"
exit 0
