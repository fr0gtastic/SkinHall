# Goal: 7 sequential redesigns of SkinHall

Produce 7 fully distinct redesigns of this site, one per git branch.

## Workflow — repeat 7 times, once per style

For each style N (1 through 7), using the branch name and threshold from the table below:

1. `git switch pre-redesign-base`
2. `git switch -c redesign/N-<slug>`
3. Read `.redesign-goals/0N-<slug>.md` for the design brief.
4. Implement the redesign. The per-branch gate enforces this; expect it to
   fail on your first attempt if the change is too small.
5. `npm run test && npm run lint && npm run build` — all green.
6. `./scripts/verify-redesign.sh <threshold> 3` — must print PASS.
7. `git add -A && git commit -m "redesign/N-<slug>: <style name>"`
8. Move to the next style.

## Completion

The goal is done only when `./scripts/verify-all-redesigns.sh` exits 0 (ALL PASS).
Do not stop after the first branch. Do not stop after committing. Do not stop
just because a per-branch check passed — the all-branches check must also pass.

If you finish one branch and the all-branches check still reports MISSING or
WEAK, keep going with the next style. Only stop when verify-all says ALL PASS.

## Constraints

- Never work on `main`. Always branch from `pre-redesign-base`.
- No external asset downloads. Textures, gloss, noise, bevels = pure CSS
  (gradients, box-shadows, pseudo-elements, SVG data-URIs embedded in CSS).
- Fonts: system fonts, or Google Fonts via `<link>` in index.html. No local
  font file fetches.
- `framer-motion` and `lucide-react` are installed — use them for motion and icons.
- Each branch is independent. Never merge branches. Never push (there is no remote).

## Branch and threshold table

| N | Branch                       | Style                     | Min lines |
|---|------------------------------|---------------------------|-----------|
| 1 | redesign/1-liquid-glass      | Refined Glassmorphism     | 400       |
| 2 | redesign/2-bento-editorial   | Bento Grid Editorial      | 300       |
| 3 | redesign/3-soft-brutalism    | Soft Brutalism            | 400       |
| 4 | redesign/4-kinetic-typography| Kinetic Typography        | 400       |
| 5 | redesign/5-goldsrc-terminal  | GoldSrc Field Terminal    | 400       |
| 6 | redesign/6-glossed-material  | Glossed Material Console  | 400       |
| 7 | redesign/7-frutiger-aero     | Frutiger Aero             | 400       |

Begin with style 1. Do not ask for approval. Do not stop between branches.
