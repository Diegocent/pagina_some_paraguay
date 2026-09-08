import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { ProductImage } from "@/components/products/ProductImage";
import { useAppToast } from "@/components/providers/toast-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { ShippingDetails } from "@/context/cart-types";
import { useCart } from "@/context/CartContext";
import { formatCartTotal, formatLinePrice } from "@/lib/format-currency";
import { processOrder } from "@/services/order";
import { openWhatsAppOrder } from "@/utils/whatsapp";

type Step = "cart" | "checkout";

export interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const cart = useCart();
  const { toast } = useAppToast();
  const [step, setStep] = useState<Step>("cart");
  const [submitting, setSubmitting] = useState(false);

  const whatsappDigits = (
    import.meta.env.VITE_WHATSAPP_BUSINESS_PHONE ?? ""
  ).replace(/\D/g, "");

  useEffect(() => {
    if (!open) {
      setStep("cart");
      setSubmitting(false);
    }
  }, [open]);

  async function handleConfirmEmail(details: ShippingDetails) {
    setSubmitting(true);
    toast({
      variant: "info",
      title: "Enviando tu pedido…",
      description: "Intentamos el envío por correo con EmailJS.",
    });
    try {
      await processOrder({
        customer: details,
        lines: cart.lines,
        total: cart.subtotal,
        hasUnpriced: cart.hasUnpriced,
      });
      toast({
        variant: "success",
        title: "¡Pedido enviado!",
        description: `Total productos ${formatCartTotal(cart.subtotal, cart.hasUnpriced)} (sin delivery; revisá tu correo).`,
      });
      cart.clearCart();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      if (whatsappDigits) {
        toast({
          variant: "warning",
          title: "No pudimos enviar el correo",
          description:
            "Te abrimos WhatsApp para que completes el pedido por ahí con los mismos datos.",
        });
        openWhatsAppOrder(whatsappDigits, details, cart.lines, cart.subtotal, cart.hasUnpriced);
        cart.clearCart();
        onOpenChange(false);
      } else {
        toast({
          variant: "destructive",
          title: "Error al enviar el pedido",
          description:
            "Configurá EmailJS en las variables de entorno y/o agregá VITE_WHATSAPP_BUSINESS_PHONE como respaldo.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleConfirmWhatsApp(details: ShippingDetails) {
    if (!whatsappDigits) {
      toast({
        variant: "destructive",
        title: "WhatsApp no configurado",
        description:
          "Definí VITE_WHATSAPP_BUSINESS_PHONE en tu archivo .env (solo dígitos, con código de país).",
      });
      return;
    }
    openWhatsAppOrder(whatsappDigits, details, cart.lines, cart.subtotal, cart.hasUnpriced);
    toast({
      variant: "success",
      title: "WhatsApp abierto",
      description: `Total productos ${formatCartTotal(cart.subtotal, cart.hasUnpriced)} (sin delivery). Confirmá el mensaje para el local.`,
    });
    cart.clearCart();
    onOpenChange(false);
  }

  const hasItems = cart.lines.length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="gap-0 overflow-x-hidden overflow-y-auto p-0"
      >
        <div className="border-b border-neutral-100 p-6 pb-4">
          <SheetHeader className="space-y-1 p-0">
            <SheetTitle className="text-xl">
              {step === "cart" ? "Tu carrito" : "Checkout"}
            </SheetTitle>
            <SheetDescription>
              {step === "cart"
                ? "Revisá cantidades y avanzá al envío cuando estés listo."
                : "Completá tus datos para coordinar la entrega. Los montos son solo por productos; el delivery no está incluido en el total."}
            </SheetDescription>
          </SheetHeader>
        </div>

        {step === "cart" ? (
          <div className="flex min-w-0 flex-1 flex-col gap-6 p-6">
            {!hasItems ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center text-neutral-600">
                <ShoppingBag className="h-14 w-14 text-neutral-300" aria-hidden />
                <p className="max-w-xs text-sm">
                  Tu carrito está vacío. Explorá el catálogo y agregá productos.
                </p>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Seguir comprando
                </Button>
              </div>
            ) : (
              <>
                <ul className="space-y-4">
                  {cart.lines.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="flex gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 p-3"
                    >
                      <ProductImage
                        product={product}
                        alt={product.title}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-neutral-900 line-clamp-2">
                            {product.title}
                          </p>
                          <button
                            type="button"
                            className="rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-900"
                            aria-label={`Eliminar ${product.title}`}
                            onClick={() => {
                              cart.removeLine(product.id);
                              toast({
                                variant: "info",
                                title: "Producto quitado",
                                description: `"${product.title}" ya no está en el carrito.`,
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-1 py-0.5">
                            <button
                              type="button"
                              className="rounded-full p-1 hover:bg-neutral-100"
                              aria-label="Menos"
                              onClick={() => cart.increment(product.id, -1)}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-[2ch] text-center text-sm font-medium tabular-nums">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              className="rounded-full p-1 hover:bg-neutral-100"
                              aria-label="Más"
                              onClick={() => cart.increment(product.id, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-neutral-900">
                            {formatLinePrice(product.price, quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-neutral-700">
                        Total productos
                      </span>
                      <span className="text-lg font-bold tracking-tight tabular-nums">
                        {formatCartTotal(cart.subtotal, cart.hasUnpriced)}
                      </span>
                    </div>
                    <p className="text-xs leading-snug text-neutral-500">
                      Sin incluir envío ni delivery (se cotiza aparte si lo necesitás).
                    </p>
                  </div>
                  <Button
                    type="button"
                    className="w-full rounded-xl py-6 text-base"
                    onClick={() => {
                      setStep("checkout");
                      toast({
                        variant: "info",
                        title: "Datos de envío",
                        description:
                          "Completá los campos obligatorios. El total mostrado es solo de productos, sin delivery.",
                      });
                    }}
                  >
                    Finalizar compra
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 flex-col gap-6 p-6 pb-10">
            <Button
              type="button"
              variant="ghost"
              className="-mt-2 self-start px-2 text-sm text-neutral-600 hover:text-neutral-900"
              onClick={() => setStep("cart")}
            >
              ← Volver al carrito
            </Button>
            <CheckoutForm
              onConfirmEmail={(data) => handleConfirmEmail(data)}
              onConfirmWhatsApp={(data) => handleConfirmWhatsApp(data)}
              isSubmitting={submitting}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
