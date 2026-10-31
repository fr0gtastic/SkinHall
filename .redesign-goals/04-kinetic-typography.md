# Style 4: Kinetic Typography / Motion Narrative

Type is the primary visual: scales, masks, reveals, tickers with scroll.
No photography, illustration, gradient blobs, or bento cards.
Motion carries the story; remove type and nothing remains.

## Do
- Hero: oversized display type (clamp min 4rem to max 12rem+), scroll-driven
  scale transforms, text masks (clip-path or overflow hidden with sliding content).
- Ticker/marquee elements with continuous CSS animation or framer-motion loop.
- Staggered reveal on scroll (framer-motion `useInView` + stagger children).
- Typography: 1-2 display fonts at extreme scales, bold weight. Variable fonts
  welcome via Google Fonts `<link>`.
- Tailwind config: display fontSize additions (huge scales), letterSpacing
  tight/loose tokens, animation keyframes for marquee + reveal.

## Don't
- Photos, illustrations, decorative shapes, bento grids.
- Static-only pages — motion is the design.

## Completion
`./scripts/verify-redesign.sh 400 3` exits 0 with PASS.

## Anti-padding (gate enforces this)

Every CSS rule you add must be referenced from at least one component.
Do not generate `class-1`, `class-2`, ... to inflate line count.
If the gate fails on lines, add **more component usage**, not more
unused CSS. `./scripts/check-no-padding.sh` fails if >5 CSS classes
are unreferenced.

If your reasoning includes "I need more lines" or "let me add more CSS",
stop — that is padding, not redesign. Redesign the components themselves:
change structure, layout, hierarchy, typography. The CSS is a consequence
of the design, not a substitute for it.
