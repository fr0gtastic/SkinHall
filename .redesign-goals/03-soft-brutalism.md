# Style 3: Soft Brutalism

Thick visible borders, hard offset shadows, pressed states, raw structure.
Limited off-palette: paper cream, ink black, one accent color.
Softly rounded corners allowed. No blur, no translucency, no premium polish.

## Do
- All interactive elements: 2-3px solid ink border, hard offset box-shadow
  (e.g. `box-shadow: 4px 4px 0 #000`).
- Pressed state: translate(2px, 2px) + collapse shadow. Every button, chip, link.
- Paper-cream background (#F2EEE3-ish), ink text (#111).
- One accent — something saturated like #FF4D00 or #1A55FF. Use sparingly.
- Monospace or chunky sans headings; system sans body.
- Tailwind config: default palette replaced with 3-color system + accent,
  borderRadius scale (4-8px), shadow scale with hard offsets.

## Don't
- Gradients, blur, transparency, luxury fonts.

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
