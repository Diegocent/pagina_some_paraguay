import type { CatalogSourceRow } from "../data/catalog-data";
import { SITE_ORIGIN } from "../data/site";
import { productUrl } from "./product-url";

export const HOME_TITLE =
  "SOME Paraguay — Indumentaria & Equipamiento Deportivo";

export const HOME_DESCRIPTION =
  "SOME Paraguay: indumentaria deportiva, artículos de gimnasio y equipamiento en Asunción. Tobilleras, chalecos, bolsas, steps y más — pensado para rendir.";

export function productDocumentTitle(title: string): string {
  return `${title} | SOME Paraguay`;
}

export function productMetaDescription(product: {
  title: string;
  description: string;
}): string {
  const base = product.description.replace(/\s+/g, " ").trim();
  const suffix = ` Comprá ${product.title} en SOME Paraguay, Asunción.`;
  const combined = `${base}${suffix}`;
  return combined.length <= 160 ? combined : `${combined.slice(0, 157)}…`;
}

export function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildProductJsonLd(
  product: CatalogSourceRow,
  origin: string = SITE_ORIGIN,
): Record<string, unknown> {
  const url = productUrl(product.id, origin);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    url,
    image: `${origin}/og-image.png`,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "SOME Paraguay",
    },
  };

  if (product.price != null) {
    data.offers = {
      "@type": "Offer",
      url,
      priceCurrency: "PYG",
      price: String(product.price),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "SOME Paraguay",
      },
    };
  }

  return data;
}

export function buildItemListJsonLd(
  products: CatalogSourceRow[],
  origin: string = SITE_ORIGIN,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo SOME Paraguay",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: productUrl(product.id, origin),
      name: product.title,
    })),
  };
}

export function buildSitemapXml(
  products: CatalogSourceRow[],
  origin: string,
  lastmod: string,
): string {
  const home = `${origin}/`;
  const urls = [
    `  <url>
    <loc>${xmlEscape(home)}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`,
    ...products.map(
      (product) => `  <url>
    <loc>${xmlEscape(productUrl(product.id, origin))}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`,
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

export function applyProductSeoToHtml(
  html: string,
  product: CatalogSourceRow,
  origin: string,
): string {
  const url = productUrl(product.id, origin);
  const title = productDocumentTitle(product.title);
  const description = productMetaDescription(product);
  const jsonLd = JSON.stringify(buildProductJsonLd(product, origin));
  const safeTitle = xmlEscape(title);
  const safeDesc = xmlEscape(description);
  const safeUrl = xmlEscape(url);

  let next = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(
      /name="description"(\s+)content="[^"]*"/,
      `name="description"$1content="${safeDesc}"`,
    )
    .replace(/(rel="canonical" href=")[^"]*(")/, `$1${safeUrl}$2`)
    .replace(/(property="og:type" content=")[^"]*(")/, `$1product$2`)
    .replace(/(property="og:title" content=")[^"]*(")/, `$1${safeTitle}$2`)
    .replace(
      /property="og:description"(\s+)content="[^"]*"/,
      `property="og:description"$1content="${safeDesc}"`,
    )
    .replace(/(property="og:url" content=")[^"]*(")/, `$1${safeUrl}$2`)
    .replace(/(name="twitter:title" content=")[^"]*(")/, `$1${safeTitle}$2`)
    .replace(
      /name="twitter:description"(\s+)content="[^"]*"/,
      `name="twitter:description"$1content="${safeDesc}"`,
    );

  if (!next.includes('"@type":"Product"') && !next.includes('"@type": "Product"')) {
    next = next.replace(
      "</head>",
      `    <script type="application/ld+json">${jsonLd}</script>\n  </head>`,
    );
  }

  const noscriptPrice =
    product.price != null
      ? `<p>Precio: ${product.price} PYG</p>`
      : "<p>Consultar precio</p>";
  next = next.replace(
    '<div id="root"></div>',
    `<div id="root"></div>
    <noscript>
      <article>
        <h1>${xmlEscape(product.title)}</h1>
        <p>${safeDesc}</p>
        ${noscriptPrice}
        <p><a href="${safeUrl}">Ver ${xmlEscape(product.title)} en SOME Paraguay</a></p>
      </article>
    </noscript>`,
  );

  return next;
}
