import type { CartLine, ShippingDetails } from "@/context/cart-types";
import { formatPyg } from "@/lib/format-currency";

export function formatOrderPlainText(
  customer: ShippingDetails,
  lines: CartLine[],
  total: number,
): string {
  const linesBlock = lines
    .map(
      (l, i) =>
        `${i + 1}. ${l.product.title} x${l.quantity} — ${formatPyg(
          l.product.price * l.quantity,
        )}`,
    )
    .join("\n");

  const deliveryLine = customer.wantsDelivery
    ? "Delivery / envío a domicilio: SÍ (costo por coordinar)"
    : "Delivery / envío a domicilio: NO (retiro u otro acuerdo)";

  return [
    `¡Hola! Pedido desde la web.`,
    "",
    `Cliente: ${customer.fullName}`,
    `Email: ${customer.email}`,
    `Teléfono: ${customer.phone}`,
    `Envío / referencia: ${customer.address}, ${customer.city}`,
    deliveryLine,
    "",
    `Productos:`,
    linesBlock,
    "",
    `Total productos (sin incluir costo de envío/delivery): ${formatPyg(total)}`,
    `(Los montos son solo por ítems; el envío se cotiza aparte si aplica.)`,
    "",
    "Gracias.",
  ].join("\n");
}

/** Abre WhatsApp Web / app con el pedido ya formateado */
export function openWhatsAppOrder(
  phoneDigits: string,
  customer: ShippingDetails,
  lines: CartLine[],
  total: number,
): void {
  const text = formatOrderPlainText(customer, lines, total);
  const encoded = encodeURIComponent(text);
  const url = `https://api.whatsapp.com/send?phone=${phoneDigits}&text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export interface ContactWhatsAppPayload {
  name: string;
  email: string;
  message: string;
  wantsDelivery: boolean;
}

/** Consulta desde el formulario de contacto (sin carrito). */
export function openWhatsAppContact(
  phoneDigits: string,
  payload: ContactWhatsAppPayload,
): void {
  const deliveryLine = payload.wantsDelivery
    ? "¿Solicito delivery?: SÍ"
    : "¿Solicito delivery?: NO";

  const text = [
    "Consulta desde la web — SOME Paraguay",
    "",
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    deliveryLine,
    "",
    "Mensaje:",
    payload.message,
  ].join("\n");

  const encoded = encodeURIComponent(text);
  const url = `https://api.whatsapp.com/send?phone=${phoneDigits}&text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
