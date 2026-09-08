/**
 * Imágenes en `src/assets/products/` (empaquetadas por Vite) o en `public/products/`
 * servidas como `/products/{codigo}.png`.
 *
 * Galería: `nombre.ext` + `nombre_1.ext`, `nombre_2.ext`, … (el número es la vista).
 */
function resolveGlobUrl(mod: unknown): string {
  if (typeof mod === "string") return mod;
  if (
    mod &&
    typeof mod === "object" &&
    "default" in mod &&
    typeof (mod as { default: unknown }).default === "string"
  ) {
    return (mod as { default: string }).default;
  }
  return "";
}

const IMAGE_MODULES: Record<string, unknown> = {
  ...import.meta.glob("@/assets/products/*.png", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("@/assets/products/*.jpg", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("@/assets/products/*.jpeg", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("@/assets/products/*.jfif", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("@/assets/products/*.webp", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("@/assets/products/*.svg", {
    eager: true,
    import: "default",
  }),
};

export const PRODUCT_IMAGE_FALLBACK = "/favicon.svg";

/** Sufijos `_1`…`_20` son vistas; números más altos (500, 700) forman parte del nombre. */
const VARIANT_MAX = 20;

function stemFromPath(modulePath: string): string {
  const file = modulePath.split("/").pop() ?? "";
  return file.replace(/\.[^.]+$/, "");
}

export function normalizeImageStem(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

function applyStemAliases(base: string): string {
  if (base === "colchonetas") return "colchoneta";
  return base
    .replace(/^chaleco_con_peso_de_/, "chaleco_con_peso_")
    .replace(/tobillera_8k$/, "tobillera_8kg");
}

function parseVariant(rawStem: string): { base: string; index: number } {
  const normalized = normalizeImageStem(rawStem);
  const match = /^(.*)_(\d+)$/.exec(normalized);
  if (match) {
    const num = Number(match[2]);
    if (num >= 1 && num <= VARIANT_MAX) {
      return { base: applyStemAliases(match[1]), index: num };
    }
  }
  return { base: applyStemAliases(normalized), index: 0 };
}

/** Archivos en `src/assets/products/` detectados en build. */
export function galleryUrlsFromSrcAssets(imageCode: string): string[] {
  const wanted = applyStemAliases(normalizeImageStem(imageCode));
  const scored: { index: number; url: string }[] = [];

  for (const [path, mod] of Object.entries(IMAGE_MODULES)) {
    const url = resolveGlobUrl(mod);
    if (!url) continue;
    const { base, index } = parseVariant(stemFromPath(path));
    if (base === wanted) scored.push({ index, url });
  }

  scored.sort((a, b) => a.index - b.index);
  return [...new Set(scored.map((item) => item.url))];
}

function publicPrimaryPng(imageCode: string): string {
  const c = encodeURIComponent(imageCode.trim().toLowerCase());
  return `/products/${c}.png`;
}

/**
 * Lista para el carrusel/modal: variantes `_1`, `_2` solo salen de `src/assets/products`.
 * Si no hay ninguna, se asume una sola imagen en `public/products/{code}.png`.
 */
export function resolveProductGalleryUrls(imageCode: string): string[] {
  const fromSrc = galleryUrlsFromSrcAssets(imageCode);
  if (fromSrc.length > 0) return fromSrc;
  return [publicPrimaryPng(imageCode)];
}

export function primaryUrlForCode(imageCode: string): string {
  const g = resolveProductGalleryUrls(imageCode);
  return g[0] ?? PRODUCT_IMAGE_FALLBACK;
}

/** Para `public/products/`, prueba extensiones si el .png no existe. */
export function getProductDisplayCandidates(product: {
  imageUrls: string[];
  imageCode: string;
}): string[] {
  if (product.imageUrls.length > 1) {
    return [...product.imageUrls, PRODUCT_IMAGE_FALLBACK];
  }
  const only = product.imageUrls[0];
  if (only?.startsWith("/products/")) {
    const c = encodeURIComponent(product.imageCode.trim().toLowerCase());
    return [
      `/products/${c}.png`,
      `/products/${c}.jpg`,
      `/products/${c}.jpeg`,
      `/products/${c}.jfif`,
      `/products/${c}.webp`,
      PRODUCT_IMAGE_FALLBACK,
    ];
  }
  return [...product.imageUrls, PRODUCT_IMAGE_FALLBACK];
}
