import emailjs from "@emailjs/browser";
import type { CartLine, ShippingDetails } from "@/context/cart-types";
import { formatPyg } from "@/lib/format-currency";

export interface EmailOrderPayload {
  customer: ShippingDetails;
  lines: CartLine[];
  total: number;
}

/** Fila para plantillas EmailJS tipo Handlebars {{#orders}} … {{/orders}} */
export interface EmailOrderLineRow {
  image_url: string;
  name: string;
  units: number;
  /** Línea ya formateada en ₲ */
  price: string;
}

/**
 * Envío real con EmailJS (@emailjs/browser).
 *
 * Variables de entorno Vite (`.env`):
 * - `VITE_EMAILJS_SERVICE_ID`
 * - `VITE_EMAILJS_TEMPLATE_ID_ORDER`
 * - `VITE_EMAILJS_PUBLIC_KEY`
 * - `VITE_EMAILJS_OWNER_EMAIL` — correo del negocio (copia al dueño)
 *
 * Plantilla sugerida:
 * - `order_id`, `email`, `customer_name`, `customer_phone`, `shipping_address`, `shipping_city`
 * - `{{#orders}}` → `image_url`, `name`, `units`, `price`
 * - Total único: `order_total` (solo productos, sin delivery)
 * - Opcional: `wants_delivery` — «Sí» / «No»
 *
 * Destinatarios: En EmailJS → plantilla → campo **To Email** poné `{{to_email_list}}`
 * así llegan dueño + cliente (requiere `VITE_EMAILJS_OWNER_EMAIL`).
 * Alternativa: To = `{{email}}` y **Bcc** = `{{owner_email}}`.
 */
export async function processOrder(payload: EmailOrderPayload): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ORDER;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "EmailJS no configurado: revisá VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID_ORDER y VITE_EMAILJS_PUBLIC_KEY",
    );
  }

  const orderLines = payload.lines
    .map(
      (l) =>
        `${l.product.title} × ${l.quantity} — ${formatPyg(
          l.product.price * l.quantity,
        )}`,
    )
    .join("\n");

  const orders: EmailOrderLineRow[] = payload.lines.map((l) => ({
    image_url: l.product.imageUrl,
    name: l.product.title,
    units: l.quantity,
    price: formatPyg(l.product.price * l.quantity),
  }));

  const orderId = `WEB-${Date.now().toString(36).toUpperCase()}`;

  const ownerEmail = import.meta.env.VITE_EMAILJS_OWNER_EMAIL?.trim() ?? "";
  const customerEmail = payload.customer.email.trim();

  const toEmailList =
    ownerEmail.length > 0 ? `${ownerEmail}, ${customerEmail}` : customerEmail;

  await emailjs.send(
    serviceId,
    templateId,
    {
      order_id: orderId,
      email: payload.customer.email,
      owner_email: ownerEmail,
      to_email_list: toEmailList,
      customer_name: payload.customer.fullName,
      customer_phone: payload.customer.phone,
      shipping_address: payload.customer.address,
      shipping_city: payload.customer.city,
      wants_delivery: payload.customer.wantsDelivery ? "Sí" : "No",
      shipping_postal: "-",
      orders,
      order_lines: orderLines,
      order_total: formatPyg(payload.total),
      order_total_note: "Total productos (sin incluir envío/delivery)",
      reply_to: payload.customer.email,
    },
    { publicKey },
  );
}

/** Alias genérico para integrar después otro backend (REST propio, etc.). */
export async function submitOrder(payload: EmailOrderPayload): Promise<void> {
  return processOrder(payload);
}
