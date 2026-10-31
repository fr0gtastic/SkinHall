# Style 1: Refined Glassmorphism / "Liquid Glass"

Every surface is layered, translucent material over blurred content.
Depth comes from blur, light, and fine noise — not shadows.

## Internal consistency test
Include a `@supports not (backdrop-filter: blur())` fallback where hierarchy
still holds via layering, hairlines, and noise alone.

## Do
- Glass panels: `backdrop-filter: blur(20-30px)`, `background: rgba(255,255,255,0.3-0.6)`,
  hairline border 1px rgba-white, fine noise texture as SVG data-URI in CSS.
- Depth via stacked panels (parent + inset child), not box-shadow.
- Type hierarchy by weight and size, not color.
- Motion: subtle — hover lifts and entrance fades via framer-motion.
- Tailwind config: replace color palette with translucent-friendly tokens,
  add backdropBlur scale, add 2+ fontFamily entries.

## Don't
- Drop shadows, heavy blur on text, decorative gradient hero images.

## Completion
`./scripts/verify-redesign.sh 400 3` exits 0 with PASS.
