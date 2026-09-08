/** Precios en guaraníes paraguayos (PYG). */
export function formatPyg(amount: number): string {
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const CONSULTAR_PRECIO = "Consultar precio";

export function formatProductPrice(price: number | null | undefined): string {
  if (price == null) return CONSULTAR_PRECIO;
  return formatPyg(price);
}

export function formatLinePrice(
  price: number | null | undefined,
  quantity: number,
): string {
  if (price == null) return CONSULTAR_PRECIO;
  return formatPyg(price * quantity);
}

/** Total del carrito cuando hay ítems sin precio publicado. */
export function formatCartTotal(
  pricedSubtotal: number,
  hasUnpriced: boolean,
): string {
  if (hasUnpriced && pricedSubtotal <= 0) return CONSULTAR_PRECIO;
  if (hasUnpriced) return `${formatPyg(pricedSubtotal)} + ítems a consultar`;
  return formatPyg(pricedSubtotal);
}
