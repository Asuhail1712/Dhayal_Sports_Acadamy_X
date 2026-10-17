import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import test from "node:test";

const dist = fileURLToPath(
  new URL("../artifacts/badminton-club/dist/", import.meta.url),
);
const html = readFileSync(join(dist, "index.html"), "utf8");
const metadata = new Map(
  [
    ...html.matchAll(
      /<meta\s+(?:property|name)="([^"]+)"\s+content="([^"]+)"\s*\/?>/g,
    ),
  ].map(([, key, value]) => [key, value]),
);

test("sharing metadata is in the initial HTML with resolved public HTTPS URLs", () => {
  assert.ok(!html.includes("__SITE_ORIGIN__"));
  assert.equal(metadata.get("og:type"), "website");
  assert.equal(metadata.get("og:site_name"), "Dayal Sports Academy");
  assert.ok(metadata.get("og:title").includes("Power plus Intelligence"));
  for (const key of [
    "og:url",
    "og:image",
    "og:image:secure_url",
    "twitter:image",
  ]) {
    const url = new URL(metadata.get(key));
    assert.equal(url.protocol, "https:");
    assert.ok(!["localhost", "127.0.0.1"].includes(url.hostname));
  }
  assert.equal(metadata.get("og:image"), metadata.get("twitter:image"));
  assert.equal(metadata.get("og:image"), metadata.get("og:image:secure_url"));
  assert.equal(metadata.get("twitter:card"), "summary_large_image");
  assert.ok(metadata.get("og:image:alt").includes("hero"));
});

test("the exported hero preview is a real 1200x630 JPEG under 300 KB", () => {
  const image = readFileSync(
    join(dist, new URL(metadata.get("og:image")).pathname),
  );
  assert.equal(image.readUInt16BE(0), 0xffd8);
  assert.ok(image.length < 300 * 1024);
  let width = 0,
    height = 0;
  for (let offset = 2; offset < image.length; ) {
    const marker = image.readUInt16BE(offset);
    const size = image.readUInt16BE(offset + 2);
    if ([0xffc0, 0xffc1, 0xffc2].includes(marker)) {
      height = image.readUInt16BE(offset + 5);
      width = image.readUInt16BE(offset + 7);
      break;
    }
    offset += size + 2;
  }
  assert.equal(width, 1200);
  assert.equal(height, 630);
  assert.equal(metadata.get("og:image:type"), "image/jpeg");
  assert.equal(Number(metadata.get("og:image:width")), width);
  assert.equal(Number(metadata.get("og:image:height")), height);
});

test("favicon and touch icons have the advertised PNG dimensions", () => {
  for (const [file, size] of [
    ["favicon-swoosh-32.png", 32],
    ["favicon-swoosh-96.png", 96],
    ["apple-touch-icon.png", 180],
  ]) {
    assert.ok(html.includes("/" + file));
    const image = readFileSync(join(dist, file));
    assert.equal(image.subarray(1, 4).toString(), "PNG");
    assert.equal(image.readUInt32BE(16), size);
    assert.equal(image.readUInt32BE(20), size);
  }
  assert.ok(!html.includes("favicon.svg"));
  assert.ok(!existsSync(join(dist, "favicon.svg")));
});

test("legacy favicon.ico contains 16, 32 and 48 pixel variants", () => {
  const icon = readFileSync(join(dist, "favicon.ico"));
  assert.equal(icon.readUInt16LE(2), 1);
  assert.equal(icon.readUInt16LE(4), 3);
  for (const [i, size] of [16, 32, 48].entries()) {
    assert.equal(icon[6 + i * 16], size);
    assert.equal(icon[7 + i * 16], size);
  }
});
