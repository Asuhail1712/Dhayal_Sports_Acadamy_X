# Card Artwork and Frosted Surfaces

The artwork was created with the built-in image generation tool, using the client's card reference as stylistic direction. It is decorative: it does not replace actual coach portraits, academy photos or website copy.

- Source atlas: `assets/card-artwork-source.png`.
- Optimized, alpha-preserving runtime atlas: `public/images/card-artwork.webp`.
- Each cell occupies one quarter of the image width and height. `CardArtwork.tsx` selects a cell with CSS background positioning. All cards share the same network resource.
- Existing images, links and content remain unchanged. The small photo badge, program cards, coach cards and Unique Training cards opt out of decorative artwork. Decorations are hidden from assistive technology and cannot capture pointer input.
- Desktop hover movement is limited to fine pointers without reduced-motion enabled.
- Illustrated cards use an editorial composition matching the reference: a small icon and headline on the left, a larger faded object on the right, and full-width description and links beneath both. The right-hand artwork stage spans both header rows, with no absolute positioning over copy. Objects scale with their available column up to 200px (220px for the ProShop), rather than shrinking into uniform icon-sized badges.
- Frosted white surfaces alternate subtle blue and mint tints, with a curved accent along the lower edge. Art saturation and opacity are reduced to keep the content dominant. Fine-pointer hover movement is limited to 3px vertically inside a padded stage.
- Statistics switch to two columns on narrower desktop/tablet widths and one column on phones, preserving the same artwork-to-copy proportions without collisions. Journal cards use a padded content area and a wider headline column.

## Production Blur Regression

The production optimizer collapsed declarations written as `backdrop-filter` followed by `-webkit-backdrop-filter`, leaving only the prefixed property. All paired properties now put WebKit first and the standard property last. This preserves both in the actual minified CSS.

Completed reveal animations reset `filter` to `none` and `will-change` to `auto`, instead of retaining a filter-created backdrop root. The unnecessary route wrapper's `will-change: opacity` is removed.

After building, run `pnpm --filter @workspace/badminton-club run test:glass` to validate compiled CSS, editorial grid placement, responsive sizing, asset transparency and non-interactive decorative layers. Browser visual QA is still needed before release.

## Generation Prompt

Create one production-ready transparent PNG sprite atlas of sixteen separate premium 3D decorative objects for a modern sports academy website. This is an ASSET SHEET, not a website mockup, not cards. EXACT square canvas, EXACT 4 equal columns by 4 equal rows; each cell contains ONE centered object with generous empty transparent padding (objects occupy about 65-70% of each cell). No object may cross its cell boundary. No text, letters, numbers, frames, labels, logos, background, or typography anywhere. Row 1 left to right: (1) a silver trophy cup with delicate laurel branches, (2) a round star medal hanging from two ribbon straps, (3) an elegant globe with visible continents and a tilted orbital ring, (4) three elegant location pins connected by a dotted path. Row 2 left to right: (5) a badminton shuttlecock with sculpted white feathers, (6) a badminton racket with realistic woven strings and a short handle, (7) a compact badminton robot shuttle launcher, (8) two compact athletic dumbbells. Row 3 left to right: (9) a serene lotus flower representing yoga, (10) a small elegant airplane angled upward, (11) a graduation cap with tassel on a closed book, (12) three abstract human busts as a team. Row 4 left to right: (13) a premium sports shopping bag, (14) an anatomical-style smooth heart with a small medical plus mark, (15) a softly sculpted brain, (16) three ascending rounded bars with an upward curved arrow. Art direction: sophisticated soft sculptural 3D product rendering, refined frosted glass and ceramic materials, pearlescent white bodies, ice-blue reflective edge highlights and mint-green secondary accents, VERY light pastel shading, gentle ambient occlusion, subtle small soft contact shadows that fade to transparency. Use only white, silver, pale blue derived from #2151A3, and pale mint derived from #00B050. Keep all sixteen objects stylistically consistent. Three-quarter view, soft studio light from upper left, high detail and crisp silhouettes, not cartoonish, not flat outline icons. These will appear as subtle large watermark artworks in white frosted glass cards. The result must have true transparent alpha outside each isolated object.
