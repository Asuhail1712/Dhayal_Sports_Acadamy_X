import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const app = fileURLToPath(
  new URL("../artifacts/badminton-club/", import.meta.url),
);
const assets = join(app, "dist/assets");
const css = readdirSync(assets)
  .filter((file) => file.endsWith(".css"))
  .map((file) => readFileSync(join(assets, file), "utf8"))
  .join("\n");
const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(
  ([, selector, declarations]) => ({ selector: selector.trim(), declarations }),
);
const forSelector = (selector) =>
  rules
    .filter((rule) =>
      rule.selector
        .split(",")
        .map((value) => value.trim())
        .includes(selector),
    )
    .map((rule) => rule.declarations)
    .join(";");
const property = (block, name) =>
  new RegExp("(?:^|;)\\s*" + name + ":([^;]+)").exec(block)?.[1];

test("every production glass rule preserves the standard and WebKit blur properties", () => {
  const glassRules = rules.filter((rule) =>
    property(rule.declarations, "-webkit-backdrop-filter"),
  );
  assert.ok(glassRules.length >= 16);
  for (const rule of glassRules) {
    assert.ok(
      property(rule.declarations, "backdrop-filter"),
      "Missing standard backdrop-filter: " + rule.selector,
    );
  }
  for (const selector of [
    ".premium-card",
    ".glass-panel",
    ".nav-shell--glass",
    ".mobile-nav",
    ".about-photo-tag",
    ".hero-secondary",
    ".hero-photo-note",
    ".program-filters",
    ".detail-surface",
    ".support-glass-surface",
  ]) {
    const declarations = forSelector(selector);
    assert.ok(property(declarations, "-webkit-backdrop-filter"), selector);
    assert.ok(
      property(declarations, "backdrop-filter")?.includes("blur("),
      selector,
    );
  }
});

test("route wrappers do not retain an opacity backdrop root after navigation", () => {
  assert.ok(
    !property(forSelector(".route-transition-app"), "will-change")?.includes(
      "opacity",
    ),
  );
  const design = readFileSync(join(app, "src/components/Design.tsx"), "utf8");
  assert.match(
    design,
    /transitionEnd:\s*\{\s*filter:\s*"none",\s*willChange:\s*"auto"/,
  );
});

test("carousel controls and photo labels share the navbar glass without dark surfaces or white text", () => {
  const root = forSelector(":root");
  assert.match(
    property(root, "--chrome-glass-background"),
    /(?:#ffffffd6|rgba\(255,\s*255,\s*255,\s*(?:0)?\.84\))/,
  );
  assert.equal(property(root, "--chrome-glass-blur"), "26px");
  assert.equal(property(root, "--chrome-glass-saturation"), "1.4");
  assert.ok(root.includes("--chrome-glass-background:#f4f8fd"));
  const header = forSelector(".nav-shell--glass");
  for (const selector of [
    ".academy-photo-controls",
    ".support-image-label",
    ".hero-photo-note",
  ]) {
    const surface = forSelector(selector);
    for (const name of [
      "background",
      "backdrop-filter",
      "-webkit-backdrop-filter",
      "box-shadow",
    ]) {
      assert.equal(
        property(surface, name),
        property(header, name),
        `${selector}: ${name}`,
      );
    }
    assert.equal(property(surface, "color"), "var(--ink)", selector);
    assert.equal(
      property(surface, "border"),
      "1px solid var(--chrome-glass-border)",
      selector,
    );
  }
  assert.equal(
    property(header, "background"),
    "var(--chrome-glass-background)",
  );
  assert.match(
    property(header, "backdrop-filter"),
    /blur\(var\(--chrome-glass-blur\)\).*saturate\(var\(--chrome-glass-saturation\)\)/,
  );
  assert.equal(
    property(forSelector(".hero-photo-note small"), "color"),
    "var(--ink-soft)",
  );
  assert.equal(
    property(forSelector(".hero-photo-note .icon-tile"), "color"),
    "var(--brand-green-ink)",
  );
  assert.equal(
    property(forSelector(".academy-photo-controls button:hover"), "color"),
    "var(--brand-blue)",
  );
});

test("the optimized atlas retains alpha transparency and is shared as one compact asset", () => {
  const image = readFileSync(join(app, "dist/images/card-artwork.webp"));
  assert.equal(image.toString("ascii", 0, 4), "RIFF");
  assert.equal(image.toString("ascii", 8, 12), "WEBP");
  assert.equal(image.toString("ascii", 12, 16), "VP8X");
  assert.ok(image[20] & 0x10, "WebP alpha flag must be retained");
  assert.ok(
    statSync(join(app, "dist/images/card-artwork.webp")).size < 600 * 1024,
  );
});

test("decorations cannot cover pointer targets and unsupported browsers retain a surface fallback", () => {
  assert.equal(
    property(forSelector(".card-decoration"), "pointer-events"),
    "none",
  );
  assert.equal(property(forSelector(".card-decoration"), "z-index"), "-1");
  assert.match(css, /@supports not/);
  assert.ok(forSelector(".premium-card").includes("background-color:#f4f8fd"));
});

test("editorial illustrations span the heading rows in a separate right-hand area", () => {
  const illustration = forSelector(".card-illustration");
  assert.equal(property(illustration, "position"), "static");
  assert.equal(property(illustration, "pointer-events"), "none");
  assert.equal(property(illustration, "width"), "100%");
  assert.equal(
    property(illustration, "max-width"),
    "var(--card-art-max,200px)",
  );
  const row = forSelector(".card-visual-row");
  assert.equal(property(row, "display"), "grid");
  assert.match(
    property(row, "grid-template-columns"),
    /minmax\(0,1\.2fr\) minmax\(0,0?\.8fr\)/,
  );
  assert.equal(property(row, "grid-template-rows"), "auto 1fr");
  const stage = forSelector(".card-art-stage");
  assert.equal(property(stage, "grid-area"), "1/2/span 2");
  assert.equal(property(stage, "overflow"), "clip");
  assert.equal(property(stage, "pointer-events"), "none");
  assert.equal(property(forSelector(".card-visual-title"), "grid-area"), "2/1");
  assert.doesNotMatch(css, /--card-art-size/);
  const hover = forSelector(".premium-card:hover .card-illustration");
  assert.equal(property(hover, "transform"), "translateY(-3px)");
  assert.doesNotMatch(hover, /scale\(/);
});

test("statistics retain substantial artwork with readable two-column and phone layouts", () => {
  const metricRows = forSelector(".metric-card .card-visual-row");
  assert.equal(
    property(metricRows, "grid-template-columns"),
    "minmax(110px,.9fr) minmax(0,1.1fr)",
  );
  const metricLayouts = rules.filter(
    (rule) => rule.selector === ".metric-grid",
  );
  assert.ok(
    metricLayouts.some(
      (rule) =>
        property(rule.declarations, "grid-template-columns") ===
        "repeat(2,minmax(0,1fr))",
    ),
  );
  assert.ok(
    metricLayouts.some(
      (rule) =>
        property(rule.declarations, "grid-template-columns") ===
        "minmax(0,1fr)",
    ),
  );
  assert.match(
    property(forSelector(".card-illustration"), "opacity"),
    /^(?:0)?\.48$/,
  );
});

test("enquiry intro uses content-driven spacing with an independent illustration", () => {
  const intro = forSelector(".contact-enquiry-intro");
  assert.equal(property(intro, "display"), "grid");
  assert.equal(property(intro, "grid-template-columns"), "minmax(0,1fr) 128px");
  assert.equal(property(intro, "min-height"), undefined);
  assert.equal(property(intro, "height"), undefined);
  const heading = forSelector(".contact-enquiry-copy h3");
  assert.equal(property(heading, "margin"), "14px 0 8px");
  assert.ok(
    rules.some(
      (rule) =>
        rule.selector === ".contact-enquiry-intro" &&
        property(rule.declarations, "grid-template-columns") ===
          "minmax(0,1fr) 88px",
    ),
  );
});

test("photo frames and gallery previews fill edge to edge without fitted backdrops", () => {
  const foreground = forSelector(".academy-photo-frame>.academy-photo-image");
  assert.ok(foreground);
  assert.equal(property(foreground, "width"), "100%");
  assert.equal(property(foreground, "height"), "100%");
  assert.equal(property(foreground, "padding"), "0");
  assert.equal(property(foreground, "object-fit"), "cover");
  assert.equal(
    property(forSelector(".gallery-modal-image"), "object-fit"),
    "cover",
  );
  assert.doesNotMatch(css, /academy-photo-backdrop/);
  assert.ok(
    !rules.some(
      (rule) =>
        rule.selector.includes("academy-photo-frame") &&
        rule.selector.includes("contain"),
    ),
  );
});

test("static training photo frames use their image aspect ratio instead of a cropped fixed height", () => {
  const frame = forSelector(".training-card-photo");
  assert.equal(property(frame, "height"), "auto");
  assert.equal(property(frame, "overflow"), undefined);
  assert.equal(property(frame, "margin-bottom"), "24px");
  assert.equal(property(frame, "border-radius"), "18px");
});

test("support uses native sticky cards without snap switching or artificial scroll spacers", () => {
  const stack = forSelector(".support-stack");
  const card = forSelector(".support-stack-card");
  assert.equal(property(stack, "overflow-y"), undefined);
  assert.equal(property(stack, "scroll-snap-type"), undefined);
  assert.equal(property(card, "height"), "var(--support-card-height)");
  assert.equal(property(card, "top"), "var(--support-sticky-top)");
  assert.equal(property(card, "flex-shrink"), "0");
  assert.equal(
    property(forSelector(".support-card-copy"), "opacity"),
    undefined,
  );
  assert.equal(
    property(forSelector(".support-card-copy"), "transform"),
    undefined,
  );
  assert.equal(
    property(forSelector(".support-card-copy"), "background"),
    undefined,
  );
  assert.equal(
    property(forSelector(".support-card-copy"), "background-color"),
    undefined,
  );
  assert.ok(
    rules.some(
      (rule) =>
        rule.selector === ".support-stack-card" &&
        property(rule.declarations, "position") === "sticky",
    ),
  );
  const trackRules = rules.filter((rule) => rule.selector === ".support-stack");
  assert.ok(
    trackRules.some((rule) =>
      property(rule.declarations, "--support-card-height")?.includes(
        "100svh - 164px",
      ),
    ),
  );
  assert.ok(
    trackRules.some(
      (rule) => property(rule.declarations, "--support-sticky-top") === "124px",
    ),
  );
  const layouts = rules.filter(
    (rule) => rule.selector === ".support-glass-surface",
  );
  assert.ok(
    layouts.some(
      (rule) =>
        property(rule.declarations, "grid-template-columns") ===
        "minmax(0,1.05fr) minmax(0,1fr)",
    ),
  );
  assert.ok(
    layouts.some(
      (rule) =>
        property(rule.declarations, "grid-template-rows") ===
        "clamp(160px,26svh,240px) auto",
    ),
  );
  assert.ok(
    rules.some(
      (rule) =>
        rule.selector === ".support-stack-card" &&
        property(rule.declarations, "position") === "relative",
    ),
  );
  assert.doesNotMatch(
    css,
    /\.support-story|\.support-stage|\.support-experience|\.support-stack:after/,
  );
});

test("support cards inherit their blue-green tint into the shared background gradient and bottom ribbon", () => {
  const surface = forSelector(".support-glass-surface");
  const decoration = forSelector(".card-decoration");
  const ribbon = forSelector(".card-swoosh");
  assert.equal(property(surface, "--card-tint"), "var(--support-glass-tint)");
  assert.match(property(decoration, "background"), /radial-gradient\(/);
  assert.match(property(decoration, "background"), /linear-gradient\(/);
  assert.match(property(decoration, "background"), /var\(--card-tint/);
  assert.equal(property(decoration, "z-index"), "-1");
  assert.equal(property(decoration, "pointer-events"), "none");
  assert.equal(property(ribbon, "position"), "absolute");
  assert.equal(property(ribbon, "bottom"), "-1px");
  assert.equal(property(ribbon, "height"), "110px");
  assert.equal(property(ribbon, "width"), "100%");
  assert.match(property(ribbon, "color"), /var\(--card-tint/);
});

test("support icons, content and scroll prompts follow each card's own accent instead of the section green", () => {
  assert.equal(
    property(forSelector(".support-stack-card"), "--support-accent"),
    "var(--brand-blue)",
  );
  assert.equal(
    property(
      forSelector(".support-stack-card[data-support-tone=green]"),
      "--support-accent",
    ),
    "var(--brand-green-ink)",
  );
  const icon = forSelector(
    ".support-stack-card .support-card-kicker .icon-tile",
  );
  for (const selector of [
    ".support-stack-card .support-card-kicker .icon-tile",
    ".support-card-kicker>span",
    ".support-card-copy h3",
    ".support-card-copy p",
    ".support-scroll-hint",
  ]) {
    assert.equal(
      property(forSelector(selector), "color"),
      "var(--support-accent)",
      selector,
    );
  }
  assert.match(property(icon, "background"), /var\(--support-glass-tint\)/);
  assert.match(property(icon, "border-color"), /var\(--support-glass-tint\)/);
  assert.match(property(icon, "box-shadow"), /var\(--support-glass-tint\)/);
});

test("support glass is translucent, production-safe and interactive without transforming sticky geometry", () => {
  const wrapper = forSelector(".support-stack-card");
  const surface = forSelector(".support-glass-surface");
  const light = forSelector(".support-pointer-light");
  assert.equal(property(wrapper, "transform"), undefined);
  assert.equal(property(wrapper, "backdrop-filter"), undefined);
  assert.equal(property(surface, "height"), "100%");
  assert.match(
    property(surface, "backdrop-filter"),
    /^blur\(32px\)\s*saturate\(1\.35\)$/,
  );
  assert.match(
    property(surface, "-webkit-backdrop-filter"),
    /^blur\(32px\)\s*saturate\(1\.35\)$/,
  );
  assert.ok(property(surface, "background")?.includes("gradient("));
  assert.equal(property(light, "pointer-events"), "none");
  assert.equal(property(surface, "isolation"), "isolate");
  assert.equal(property(light, "z-index"), "-1");
  assert.equal(
    property(
      forSelector(".support-glass-surface>.support-card-visual"),
      "z-index",
    ),
    "0",
  );
  assert.equal(
    property(
      forSelector(".support-glass-surface>.support-card-copy"),
      "z-index",
    ),
    "0",
  );
  assert.equal(
    property(forSelector(".premium-card>.card-light"), "z-index"),
    property(light, "z-index"),
  );
  assert.equal(property(light, "opacity"), "0");
  assert.equal(
    property(
      forSelector(".support-glass-surface:hover .support-pointer-light"),
      "opacity",
    ),
    "1",
  );
  assert.equal(
    property(forSelector(".support-card-copy p"), "color"),
    "var(--support-accent)",
  );
  assert.ok(surface.includes("background:#f4f8fd"));
  assert.ok(
    rules.some(
      (rule) =>
        rule.selector === ".support-glass-surface" &&
        property(rule.declarations, "transform") === "none!important",
    ),
  );
});
