# Style 7: Frutiger Aero

Optimistic tech-nature futurism: glossy glass, chrome, and water over bright
sky gradients and grass-green fields. Translucent panels with specular highlights,
aqua bubbles, aurora ribbons, lens-flare light. Skeuomorphic depth from shine
and reflection, not flat borders. Humanist sans with soft rounded geometry,
white glow on hero type, playful glossy icons. Color is decorative and abundant —
cyan, lime, sky blue. Windows-era desktop optimism via light, gloss, nature motifs.

## Do
- Background: bright sky gradient (`linear-gradient(to bottom, #87CEEB 0%, #B8E6F5 40%, #E8F7FF 100%)`)
  with grass-green base or floating bubble layers.
- Glossy panels: radial highlight at top-left, base translucent blue-green,
  inset specular line at top: `inset 0 1px 0 rgba(255,255,255,0.9)`.
- Buttons: pill-shaped, gradient from light to saturated, gloss overlay via
  `::after` pseudo-element (white gradient fading to transparent).
- Bubbles / aurora as CSS only: radial-gradient circles with blur, animated
  via `@keyframes` (float, drift). Place multiple via absolute positioning.
- Humanist sans: Nunito, Quicksand, or Poppins via Google Fonts. Weight 400-800.
- Hero text: white with `text-shadow: 0 0 20px rgba(255,255,255,0.8)` glow.
- Icons: lucide-react with `stroke-width: 1.5`, wrapped in glossy circular
  containers (blue gradient + gloss overlay).
- Tailwind config: aqua/cyan/lime palette, large borderRadius scale (12-24px),
  multiple glow shadows, gradient custom properties, 2+ fontFamily.

## Don't
- Flat colors, brutalist borders, muted palettes, minimal whitespace.

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
