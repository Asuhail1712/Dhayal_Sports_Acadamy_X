import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT || "4173";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || "/";

const apiProxyTarget =
  process.env.VITE_API_PROXY_TARGET?.trim() || "http://127.0.0.1:3001";

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "VITE_");
  const siteUrl = new URL(
    process.env.VITE_SITE_URL ||
      env.VITE_SITE_URL ||
      "https://dayalsportsacadamy.vercel.app",
  );
  if (siteUrl.protocol !== "https:") {
    throw new Error(
      "VITE_SITE_URL must be a public HTTPS URL for social previews.",
    );
  }
  const siteOrigin = siteUrl.origin;
  return {
    base: basePath,
    plugins: [
      {
        name: "public-social-metadata",
        transformIndexHtml(html) {
          return html.replaceAll("__SITE_ORIGIN__", siteOrigin);
        },
      },
      react(),
      tailwindcss(),
      runtimeErrorOverlay(),
      ...(process.env.NODE_ENV !== "production" &&
      process.env.REPL_ID !== undefined
        ? [
            await import("@replit/vite-plugin-cartographer").then((m) =>
              m.cartographer({
                root: path.resolve(import.meta.dirname, ".."),
              }),
            ),
            await import("@replit/vite-plugin-dev-banner").then((m) =>
              m.devBanner(),
            ),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
        "@assets": path.resolve(
          import.meta.dirname,
          "..",
          "..",
          "attached_assets",
        ),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
    },
    server: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
      proxy: {
        "/api": {
          target: apiProxyTarget,
          changeOrigin: true,
        },
      },
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
