import { SITE_ORIGIN } from "../data/site";

export function productPath(productId: string): string {
  return `/producto/${productId}`;
}

export function productUrl(
  productId: string,
  origin: string = SITE_ORIGIN,
): string {
  return `${origin}${productPath(productId)}`;
}
