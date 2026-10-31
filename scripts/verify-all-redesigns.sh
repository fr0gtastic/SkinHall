#!/usr/bin/env bash
# All-7-branches completion gate. Exit 0 only when all 7 exist and each passes.
set -uo pipefail

BRANCHES=(
  "redesign/1-liquid-glass:400"
  "redesign/2-bento-editorial:300"
  "redesign/3-soft-brutalism:400"
  "redesign/4-kinetic-typography:400"
  "redesign/5-goldsrc-terminal:400"
  "redesign/6-glossed-material:400"
  "redesign/7-frutiger-aero:400"
)
BASE="${VERIFY_BASE:-pre-redesign-base}"

FAIL=0; PRESENT=0; PASSED=0; MISSING=0

for entry in "${BRANCHES[@]}"; do
  name="${entry%:*}"; min="${entry##*:}"
  if ! git rev-parse --verify "refs/heads/$name" >/dev/null 2>&1; then
    echo "MISSING  $name"; MISSING=$((MISSING+1)); FAIL=1; continue
  fi
  PRESENT=$((PRESENT+1))
  STAT=$(git diff --numstat "$BASE..$name")
  ADD=$(echo "$STAT" | awk '$1 ~ /^[0-9]+$/ {a+=$1} END {print a+0}')
  DEL=$(echo "$STAT" | awk '$2 ~ /^[0-9]+$/ {d+=$2} END {print d+0}')
  FILES=$(echo "$STAT" | grep -c . 2>/dev/null || echo 0)
  TOTAL=$((ADD + DEL))
  ok=1
  [ "$TOTAL" -lt "$min" ] && { echo "WEAK     $name (+$ADD -$DEL = $TOTAL < $min)"; ok=0; }
  [ "$FILES" -lt 3 ] && { echo "WEAK     $name ($FILES files < 3)"; ok=0; }
  echo "$STAT" | grep -q 'tailwind\.config\.js' || { echo "NO-TW    $name (tailwind.config.js untouched)"; ok=0; }
  echo "$STAT" | grep -qE 'src/style\.css|src/App\.(jsx?|tsx?)|src/index\.css|src/components/' || { echo "NO-SRC   $name (no src changes)"; ok=0; }
  if [ "$ok" -eq 1 ]; then
    echo "PASS     $name (+$ADD -$DEL = $TOTAL, $FILES files)"
    PASSED=$((PASSED+1))
  else
    FAIL=1
  fi
done

echo "---"
echo "present: $PRESENT/7  passed: $PASSED/7  missing: $MISSING/7"
[ "$FAIL" -ne 0 ] && exit 1
echo "ALL PASS"
exit 0
