import { createRequire } from "node:module";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(
  new URL("../artifacts/api-server/package.json", import.meta.url),
);
const { build } = require("esbuild");
const directory = await mkdtemp(join(tmpdir(), "dayal-copy-tests-"));
try {
  const output = join(directory, "tests.cjs");
  await build({
    absWorkingDir: root,
    entryPoints: ["artifacts/badminton-club/tests/final-copy.test.tsx"],
    outfile: output,
    tsconfig: resolve(root, "artifacts/badminton-club/tsconfig.json"),
    bundle: true,
    platform: "node",
    format: "cjs",
    jsx: "automatic",
    define: {
      "import.meta.env": JSON.stringify({ BASE_URL: "/", DEV: false }),
      "process.env.NODE_ENV": '"production"',
    },
    logLevel: "warning",
  });
  const result = spawnSync(process.execPath, ["--test", output], {
    stdio: "inherit",
    cwd: root,
  });
  process.exitCode = result.status ?? 1;
} finally {
  await rm(directory, { recursive: true, force: true });
}
