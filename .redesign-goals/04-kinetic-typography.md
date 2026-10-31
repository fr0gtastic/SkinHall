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
