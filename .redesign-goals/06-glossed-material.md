# Style 6: Glossed Material Console

Every surface imitates a real material: stitched leather, felt, brushed metal,
glossy plastic, glass. Depth from bevels, highlights, reflections, cast shadows —
not flat borders. Embossed buttons and chrome tabs carry hierarchy.
Remove the textures and structure collapses.

## Do
- Material textures as pure CSS: linear/radial gradients for leather grain,
  noise SVG data-URI for felt, repeating-linear-gradient for brushed metal,
  radial-gradient highlights for glossy plastic.
- Every panel/button gets: base material + bevel (light top-left edge,
  dark bottom-right edge) + cast shadow + optional inner highlight.
- Chrome tabs: horizontal gradient (`linear-gradient(to bottom, #f0f0f0 0%, #c0c0c0 50%, #a0a0a0 100%)`)
  with 1px inset border for shine.
- Embossed text: `text-shadow: 0 1px 0 rgba(255,255,255,0.4), 0 -1px 0 rgba(0,0,0,0.3)`
  on headings and button labels.
- Typography: humanist sans (Inter, system) or Futura-esque. Weight 500-700
  on interactive elements.
- Tailwind config: material color tokens (leather browns, brushed greys,
  chrome silvers), shadow scale with layered inner+outer shadows,
  gradient stops as custom properties.

## Don't
- External image textures, flat solid-color panels without bevel or shadow,
  minimal/clean modern aesthetic.

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
