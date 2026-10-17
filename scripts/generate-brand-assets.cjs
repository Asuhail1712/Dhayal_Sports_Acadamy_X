const { createRequire } = require("node:module");
const { writeFileSync, mkdirSync } = require("node:fs");
const path = require("node:path");

// Generation-only dependencies; the website serves the exported static files.
const assetRequire = process.env.WORKSPACE_NODE_MODULES
  ? createRequire(
      path.join(process.env.WORKSPACE_NODE_MODULES, "../package.json"),
    )
  : require;
const sharp = assetRequire("sharp");
const { createCanvas, loadImage, GlobalFonts } =
  assetRequire("@napi-rs/canvas");
const root = path.resolve(__dirname, "../artifacts/badminton-club");
const output = path.join(root, "public");

async function generate() {
  const logo = await sharp(path.join(root, "assets/brand-swoosh.png"))
    .trim()
    .png()
    .toBuffer();
  const icon = (size, background = "#00000000") =>
    sharp(logo)
      .resize(size, size, {
        fit: "contain",
        background,
      })
      .png()
      .toBuffer();
  for (const size of [32, 96]) {
    writeFileSync(
      path.join(output, "favicon-swoosh-" + size + ".png"),
      await icon(size),
    );
  }
  writeFileSync(
    path.join(output, "apple-touch-icon.png"),
    await icon(180, "#ffffff"),
  );

  const images = await Promise.all([16, 32, 48].map((size) => icon(size)));
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach((image, i) => {
    const size = [16, 32, 48][i],
      entry = 6 + i * 16;
    header[entry] = size;
    header[entry + 1] = size;
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(image.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += image.length;
  });
  writeFileSync(
    path.join(output, "favicon.ico"),
    Buffer.concat([header, ...images]),
  );

  if (process.env.SOCIAL_FONT_FILE)
    GlobalFonts.registerFromPath(process.env.SOCIAL_FONT_FILE, "Brand Display");
  if (process.env.SOCIAL_FONT_REGULAR_FILE)
    GlobalFonts.registerFromPath(
      process.env.SOCIAL_FONT_REGULAR_FILE,
      "Brand Display",
    );
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");
  const photo = await loadImage(path.join(output, "images/hero.jpeg"));
  ctx.drawImage(photo, 0, -22.5, 1200, 675);
  const shade = ctx.createLinearGradient(0, 0, 900, 0);
  shade.addColorStop(0, "rgba(2,8,19,0.96)");
  shade.addColorStop(0.5, "rgba(2,8,19,0.7)");
  shade.addColorStop(1, "rgba(2,8,19,0.02)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, 1200, 630);

  const wordmark = await loadImage(path.join(output, "images/dayal-logo.png"));
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(52, 34, 162, 58, 10);
  ctx.fill();
  ctx.drawImage(wordmark, 64, 40, 138, 46);

  ctx.font = '700 12px "Brand Display", sans-serif';
  ctx.letterSpacing = "1.4px";
  ctx.fillStyle = "#c6d8ed";
  ctx.fillText("HIGH PERFORMANCE BADMINTON", 52, 153);
  ctx.fillText("AND YOGA ACADEMY", 52, 175);
  ctx.letterSpacing = "0px";
  ctx.font = '700 86px "Brand Display", sans-serif';
  ctx.fillStyle = "#ffffff";
  ctx.fillText("POWER", 48, 272);
  ctx.fillText("PLUS", 48, 358);
  const highlight = ctx.createLinearGradient(52, 0, 450, 0);
  highlight.addColorStop(0, "#8cb9ff");
  highlight.addColorStop(1, "#7be0ab");
  ctx.fillStyle = highlight;
  ctx.font = '700 48px "Brand Display", sans-serif';
  ctx.fillText("INTELLIGENCE", 50, 420);
  ctx.font = '500 15px "Brand Display", sans-serif';
  ctx.fillStyle = "#d1dce9";
  ctx.fillText("Train under world champions. Learn through science.", 52, 462);
  ctx.fillText("Compete across the globe.", 52, 486);

  ctx.fillStyle = "#00b050";
  ctx.beginPath();
  ctx.roundRect(52, 518, 180, 44, 22);
  ctx.fill();
  ctx.fillStyle = "#062a15";
  ctx.font = '700 15px "Brand Display", sans-serif';
  ctx.fillText("Book a Trial", 83, 546);
  ctx.strokeStyle = "#ffffff66";
  ctx.beginPath();
  ctx.roundRect(244, 518, 188, 44, 22);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Explore Programs", 272, 546);
  mkdirSync(path.join(output, "social"), { recursive: true });
  writeFileSync(
    path.join(output, "social/hero-preview-v1.jpg"),
    await canvas.encode("jpeg", 88),
  );
  console.log("Exported swoosh favicons and 1200x630 hero sharing image.");
}

generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
