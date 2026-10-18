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
