# Favicons and Sharing Previews

- Favicons are exported from the supplied blue/green double-swoosh artwork in `assets/brand-swoosh.png`. The website logo is unchanged.
- `public/social/hero-preview-v1.jpg` is the static 1200x630 sharing card, composed from the existing hero photograph, branding and headline.
- Open Graph and large-image Twitter Card tags are in the initial HTML, not inserted by client-side React.
- The public site origin defaults to the previously supplied `https://dayalsportsacadamy.vercel.app`. Set `VITE_SITE_URL` to the actual public HTTPS origin if a different domain is used. It is resolved at build time; localhost is not a publicly accessible sharing URL.
- Deploy the updated HTML and public assets together. The new thumbnail cannot appear on the live URL before deployment. Existing platform/browser previews may remain cached.
- If the sharing image changes later, increment its filename and update the metadata references to avoid reusing an old image URL.

## Verify

Run `pnpm --filter @workspace/badminton-club run build`, then `pnpm --filter @workspace/badminton-club run test:sharing`.

## Regenerate Assets

`scripts/generate-brand-assets.cjs` needs generation-only `sharp` and `@napi-rs/canvas` packages; these are not required by the deployed site. Set `WORKSPACE_NODE_MODULES` to a bundled node_modules directory when using the Codex runtime. Optional `SOCIAL_FONT_FILE` and `SOCIAL_FONT_REGULAR_FILE` select the display and body font files. Run the script from the repository root after changing the source artwork or hero image.
