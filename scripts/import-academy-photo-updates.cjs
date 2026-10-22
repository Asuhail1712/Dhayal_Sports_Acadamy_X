const { createRequire } = require("node:module");
const { createHash } = require("node:crypto");
const { mkdirSync, readFileSync, writeFileSync } = require("node:fs");
const path = require("node:path");

const assetRequire = process.env.WORKSPACE_NODE_MODULES
  ? createRequire(
      path.join(process.env.WORKSPACE_NODE_MODULES, "../package.json"),
    )
  : require;
const sharp = assetRequire("sharp");
const sourceDirectory = process.argv[2];
if (!sourceDirectory) throw new Error("Pass the New Update source directory.");

const app = path.resolve(__dirname, "../artifacts/badminton-club");
const output = path.join(app, "public/images/academy");
const files = {
  "training-yoga-update": "Yoga.png",
  "training-robo-update": "Robo.png",
  "training-functional-update": "Functional.png",
  "training-coordination-update": "Coordination.png",
  "about-newspaper-update": "About 2png.png",
  "about-medal-update": "About 3.png",
  "sports-psychology-update": "Discipline1.png",
  "sports-physician-update": "Discipline2.png",
  "sports-trainer-update": "Discipline3.png",
  "sports-nutritionist-update": "Discipline4.png",
  "sports-yoga-update": "Discipline5.png",
};

async function run() {
  const inputs = Object.entries(files).map(([id, filename]) => ({
    id,
    filename,
    input: readFileSync(path.join(sourceDirectory, filename)),
  }));
  mkdirSync(output, { recursive: true });
  const manifest = {};
  for (const { id, filename, input } of inputs) {
    const full = await sharp(input)
      .rotate()
      .resize({
        width: 1920,
        height: 1920,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 88, effort: 6 })
      .toBuffer({ resolveWithObject: true });
    const small = await sharp(full.data)
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 84, effort: 6 })
      .toBuffer({ resolveWithObject: true });
    writeFileSync(path.join(output, `${id}.webp`), full.data);
    writeFileSync(path.join(output, `${id}-small.webp`), small.data);
    manifest[id] = {
      source: `New Update/${filename}`,
      sourceSha256: createHash("sha256").update(input).digest("hex"),
      originalBytes: input.length,
      width: full.info.width,
      height: full.info.height,
      bytes: full.data.length,
      smallWidth: small.info.width,
      smallHeight: small.info.height,
      smallBytes: small.data.length,
    };
    console.log(
      `${id}: ${full.info.width}x${full.info.height}, ${full.data.length} bytes`,
    );
  }
  writeFileSync(
    path.join(app, "assets/academy-photo-updates.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
