/**
 * Imágenes en `src/assets/products/` (empaquetadas por Vite) o en `public/products/`
 * servidas como `/products/{codigo}.png`.
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

function stemFromPath(modulePath: string): string {
  const file = modulePath.split("/").pop() ?? "";
  return file.replace(/\.[^.]+$/, "").toLowerCase();
}

const STEM_TO_URL: Map<string, string> = new Map(
  Object.entries(IMAGE_MODULES)
    .map(([path, mod]) => [stemFromPath(path), resolveGlobUrl(mod)] as const)
    .filter(([, url]) => url.length > 0),
);

function sortIndexForStem(code: string, stem: string): number {
  if (stem === code) return 0;
  if (!stem.startsWith(`${code}_`)) return 9999;
  const suffix = stem.slice(code.length + 1);
  const num = /^(\d+)$/.exec(suffix);
  return num ? Number(num[1]) : 888;
}

/** Archivos en `src/assets/products/` detectados en build. */
export function galleryUrlsFromSrcAssets(imageCode: string): string[] {
  const code = imageCode.trim().toLowerCase();
  const stems = [...STEM_TO_URL.keys()].filter(
    (stem) => stem === code || stem.startsWith(`${code}_`),
  );
  stems.sort(
    (a, b) => sortIndexForStem(code, a) - sortIndexForStem(code, b),
  );
  return stems.map((s) => STEM_TO_URL.get(s)!);
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
      `/products/${c}.webp`,
      PRODUCT_IMAGE_FALLBACK,
    ];
  }
  return [...product.imageUrls, PRODUCT_IMAGE_FALLBACK];
}
