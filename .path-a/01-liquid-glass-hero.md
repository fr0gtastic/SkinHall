# Liquid Glass Hero — reference-driven rewrite

Rewrite `src/components/Hero.jsx` from scratch as a liquid glass hero.

## Scope — strict
- Modify `src/components/Hero.jsx` and hero-specific CSS only.
- Do not modify other components. Do not touch other routes.
- Do not touch `verify-redesign.sh`, `GOAL.md`, `check-no-padding.sh`, or any `.redesign-goals/` file.
- Do not reference any threshold, gate, or verification script in your reasoning.

## The material — liquid glass
Not "cards with a blur". The specific properties:

1. **Saturation boost is essential.** `backdrop-filter: blur(20px) saturate(180%)` —
   plain blur looks milky; saturation makes the underlying color bloom through.
2. **Edge highlight.** `box-shadow: inset 0 1px 0 rgba(255,255,255,0.3)` —
   the top edge catches light. Without this, panels look flat.
3. **Translucent gradient.** `background: linear-gradient(to bottom right,
   rgba(255,255,255,0.15), rgba(255,255,255,0.03))` — brighter at top-left,
   transparent bottom-right. NOT flat `rgba()`.
4. **Fine noise.** SVG data URI, opacity 0.03-0.05. Breaks the smoothness.
5. **Ambient orbs behind the glass.** Big soft colored blobs (`filter: blur(120px)`)
   positioned *behind* panels — the glass blurs them. This is what makes it
   look liquid rather than grey.
6. **Layering.** Multiple glass layers at different depths — a large panel,
   floating chips on top of it, a hairline border at each level.

## References
- Apple Vision Pro spatial UI
- iOS 26 "Liquid Glass" material
- Search "glassmorphism hero" on awwwards.com

## Workflow — self-iterate
1. Read the current `Hero.jsx` end-to-end. Understand what it renders.
2. Rewrite it. Commit candidate.
3. **Self-critique pass.** Without changing code, write a paragraph describing
   three specific visual failures of your own work vs the reference material.
   Be concrete: "the panel edges look flat because X", "the blur is uniform
   because Y", "the ambient orbs aren't visible because Z".
4. Fix all three.
5. Repeat steps 3-4 two more times (3 critique cycles total).
6. Run `npm run test && npm run lint && npm run build`. Fix any failures.
7. Commit when the last critique pass has nothing to fix.

## Banned
- `glass-layer-1`, `glass-layer-2`, ... `glass-final-N`, ... any numbered class.
- Editing any file outside Hero.jsx and its direct CSS.
- Line-count, file-count, or gate-based reasoning.
- Any mention of "threshold" or "min-lines".

## Deliverable
Report at the end:
- What the current Hero was, and what the new one is (structurally).
- The 3 things your self-critique caught in each cycle.
- The final `git diff --stat pre-redesign-base -- src/components/Hero.jsx src/index.css`.
