#!/usr/bin/env bash
# scripts/verify-redesign.sh — is this a real redesign, or a lazy color swap?
# Usage: scripts/verify-redesign.sh [min-lines] [min-files]
# Auto-stages all changes (so untracked new files count), then compares against base.
set -euo pipefail

MIN_LINES="${1:-400}"
MIN_FILES="${2:-3}"
BASE="${VERIFY_BASE:-pre-redesign-base}"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"

if ! git rev-parse --verify "$BASE" >/dev/null 2>&1; then
  echo "FAIL: base branch '$BASE' not found" >&2; exit 1
fi
if [ "$BRANCH" = "$BASE" ]; then
  echo "FAIL: current branch IS the base ($BASE). Create a redesign branch first." >&2; exit 1
fi

# Stage everything so untracked new components count toward the diff.
# (The agent will commit later; this just makes the metric accurate.)
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
if [ "$TOTAL" -lt "$MIN_LINES" ]; then
  echo "FAIL: $TOTAL lines < $MIN_LINES required" >&2; FAIL=1
fi
if [ "$FILES" -lt "$MIN_FILES" ]; then
  echo "FAIL: $FILES files < $MIN_FILES required" >&2; FAIL=1
fi
if ! echo "$STAT" | grep -q 'tailwind\.config\.js'; then
  echo "FAIL: tailwind.config.js not modified" >&2; FAIL=1
fi
if ! echo "$STAT" | grep -qE 'src/style\.css|src/App\.(jsx?|tsx?)|src/index\.css|src/components/'; then
  echo "FAIL: no src/style.css, src/App.*, src/index.css, or src/components/ changes" >&2; FAIL=1
fi

[ "$FAIL" -ne 0 ] && exit 1
echo "PASS"
exit 0
