import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { RAW_CATALOG } from "./src/data/catalog-data";
import { applyProductSeoToHtml, buildSitemapXml } from "./src/lib/seo";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_SITE_URL = "https://www.someparaguay.com";

function normalizeSiteUrl(raw: string | undefined): string {
  return (raw ?? "").trim().replace(/\/+$/, "") || DEFAULT_SITE_URL;
}

/** Reescribe sitemap/robots en dist y opcionalmente inyecta verificación de Search Console. */
function seoPublicFiles(siteUrl: string, googleVerification: string): Plugin {
  const lastmod = new Date().toISOString().slice(0, 10);

  return {
    name: "seo-public-files",
    transformIndexHtml(html) {
      let next = html.replaceAll(
        "https://www.someparaguay.com",
        siteUrl,
      );
      const token = googleVerification.trim();
      if (token) {
        next = next.replace(
          "</head>",
          `    <meta name="google-site-verification" content="${token}" />\n  </head>`,
        );
      }
      return next;
    },
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      if (!fs.existsSync(outDir)) return;

      const sitemap = buildSitemapXml(RAW_CATALOG, siteUrl, lastmod);
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
      fs.writeFileSync(path.resolve(__dirname, "public/sitemap.xml"), sitemap);

      const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
      fs.writeFileSync(path.join(outDir, "robots.txt"), robots);

      const indexHtmlPath = path.join(outDir, "index.html");
      if (fs.existsSync(indexHtmlPath)) {
        const indexHtml = fs.readFileSync(indexHtmlPath, "utf8");
        for (const product of RAW_CATALOG) {
          const dir = path.join(outDir, "producto", product.id);
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(
            path.join(dir, "index.html"),
            applyProductSeoToHtml(indexHtml, product, siteUrl),
          );
        }
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL);
  const googleVerification = env.VITE_GOOGLE_SITE_VERIFICATION ?? "";

  return {
    plugins: [
      react(),
      tailwindcss(),
      seoPublicFiles(siteUrl, googleVerification),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5252,
      strictPort: true,
    },
  };
});
