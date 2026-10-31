# Style 5: GoldSrc Field Terminal

Flat olive-grey canvas, no gradients, no blur. Depth from hard beveled borders:
raised panels, sunken lists, buttons that drop flush on press.
Cramped bitmap sans, one tan accent for selection and headers.
Dense columnar server lists, chunky scrollbars, instant state changes.
Remove the bevels and it collapses.

## Do
- Canvas: #4A5240 (olive-grey). Panels: #5A6250 with bevel borders:
  `border-top: 2px solid #7A8270; border-left: 2px solid #7A8270;
   border-right: 2px solid #2A3220; border-bottom: 2px solid #2A3220`.
- Sunken inputs/lists: invert the bevel.
- Buttons: raised on rest, drop flush on active (all four borders swap).
- Bitmap/cramped font: VT323, Silkscreen, Press Start 2P, or IBM Plex Mono
  via Google Fonts. Letter-spacing tight, sizes small (11-13px body).
- Accent tan: #C8A878 for headers and selected rows only.
- Chunky scrollbars via `::-webkit-scrollbar` (12-16px, bevel borders).
- Dense columnar layouts: prefer CSS grid with explicit columns, tight gaps.
- Instant state: no transitions on interactive states (except cursor).
- Tailwind config: olive palette, no borderRadius beyond 0-2px, fontFamily
  with the bitmap font, no shadow scale beyond hard bevels.

## Don't
- Gradients, blur, rounded corners >2px, soft shadows, transitions on state.

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
