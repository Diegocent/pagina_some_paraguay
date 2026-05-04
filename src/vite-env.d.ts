/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID_ORDER?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  /** Correo del negocio (copia del pedido; usar en plantilla como {{owner_email}} o {{to_email_list}}). */
  readonly VITE_EMAILJS_OWNER_EMAIL?: string;
  /** Solo dígitos, código país incluido (ej: 5491123456789). Sin + ni espacios. */
  readonly VITE_WHATSAPP_BUSINESS_PHONE?: string;
  /** Si existe, sustituye el enlace al mapa en «Sobre nosotros». */
  readonly VITE_BUSINESS_MAP_URL?: string;
  /** Si existe, sustituye la línea de dirección visible en «Sobre nosotros». */
  readonly VITE_BUSINESS_ADDRESS_LINE?: string;
  /** URL absoluta del logo si no usás archivo en public/assets con nombre estándar. */
  readonly VITE_SITE_LOGO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
