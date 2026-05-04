import { RAW_CATALOG } from "@/data/catalog-data";
import {
  PRODUCT_IMAGE_FALLBACK,
  resolveProductGalleryUrls,
} from "@/lib/product-media";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  /** Prefijo de archivos en `src/assets/products/` */
  imageCode: string;
  /** Primera imagen (portada). */
  imageUrl: string;
  /** Todas las vistas del mismo código (`codigo`, `codigo_1`, …). */
  imageUrls: string[];
  badge?: string;
  highlights?: string[];
}

function hydrate(row: (typeof RAW_CATALOG)[number]): Product {
  const urls = resolveProductGalleryUrls(row.imageCode);
  const imageUrls = urls.length > 0 ? urls : [PRODUCT_IMAGE_FALLBACK];
  return {
    ...row,
    imageUrl: imageUrls[0],
    imageUrls,
  };
}

export const PRODUCTS: Product[] = RAW_CATALOG.map(hydrate);

/** IDs para la sección destacados — reordená o cambiá según stock */
export const FEATURED_IDS = [
  "step_madera",
  "combo_bolsa_step",
  "tatami",
  "bolsa_boxeo_180cm",
  "pelota_medicinal_10kg",
  "chaleco_peso_12kg",
  "colchoneta",
  "rodillo_abdominal_premiun",
] as const;

export function getFeaturedProducts(): Product[] {
  return FEATURED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(
    (p): p is Product => p != null,
  );
}
