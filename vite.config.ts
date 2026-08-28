import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

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

      const loc = `${siteUrl}/`;
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`;
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);

      const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
      fs.writeFileSync(path.join(outDir, "robots.txt"), robots);
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
  };
});
