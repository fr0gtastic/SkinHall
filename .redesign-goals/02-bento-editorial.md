# Style 2: Bento Grid + Editorial Minimalism

Warm monochrome field, asymmetric bento cells, hairline borders.
One serif display font, clean sans body, monospace metadata.
Pastel accents only as semantic tags — no gradients, no decorative color.

## Do
- Bento grid via CSS grid with explicit row/column spans. Asymmetric, not uniform.
- Hairline borders: 1px solid rgba(ink, 0.1-0.15).
- Typography triad: one serif display (e.g. Fraunces, Playfair Display, or
  system serif), one clean sans (Inter, system-ui), one monospace
  (JetBrains Mono, ui-monospace).
- Warm background: off-white cream (#FAF7F2-ish) or warm light grey.
- Semantic tag chips in pastel (mint, lavender, peach, butter).
- Tailwind config: warm neutral palette, 2+ fontFamily (serif + sans + mono), no radius above 4px.

## Don't
- Gradients, box-shadows, illustration, decorative color outside tags.
- Uniform grids — the asymmetry is the style.

## Completion
`./scripts/verify-redesign.sh 300 3` exits 0 with PASS.

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
