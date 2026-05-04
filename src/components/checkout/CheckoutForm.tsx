import { type FormEvent, useState } from "react";
import type { ShippingDetails } from "@/context/cart-types";
import { useAppToast } from "@/components/providers/toast-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export interface CheckoutFormProps {
  onConfirmEmail: (data: ShippingDetails) => Promise<void>;
  onConfirmWhatsApp: (data: ShippingDetails) => void;
  isSubmitting?: boolean;
  defaultValues?: Partial<ShippingDetails>;
}

const emptyForm: ShippingDetails = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  wantsDelivery: false,
};

type ShippingFieldKey = Exclude<keyof ShippingDetails, "wantsDelivery">;

const LABELS: Record<ShippingFieldKey, string> = {
  fullName: "Nombre y apellido",
  email: "Correo electrónico",
  phone: "Teléfono",
  address: "Dirección de envío",
  city: "Ciudad",
};

function validateCheckout(data: ShippingDetails): string | null {
  const missing: string[] = [];
  const keys: ShippingFieldKey[] = [
    "fullName",
    "email",
    "phone",
    "address",
    "city",
  ];
  for (const key of keys) {
    if (!data[key]?.trim()) {
      missing.push(LABELS[key]);
    }
  }
  if (missing.length > 0) {
    return `Completá los siguientes datos obligatorios: ${missing.join(", ")}.`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "El correo electrónico no tiene un formato válido.";
  }
  return null;
}

function RequiredMark() {
  return (
    <>
      <span className="text-brand-red" aria-hidden>
        {" "}
        *
      </span>
      <span className="sr-only"> (obligatorio)</span>
    </>
  );
}

export function CheckoutForm({
  onConfirmEmail,
  onConfirmWhatsApp,
  isSubmitting = false,
  defaultValues,
}: CheckoutFormProps) {
  const { toast } = useAppToast();
  const [form, setForm] = useState<ShippingDetails>({
    ...emptyForm,
    ...defaultValues,
  });
  const [error, setError] = useState<string | null>(null);

  function patch(key: ShippingFieldKey, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function notifyValidationFailure(msg: string) {
    setError(msg);
    toast({
      variant: "destructive",
      title: "Formulario incompleto",
      description: msg,
    });
  }

  async function handleEmail(ev: FormEvent) {
    ev.preventDefault();
    const msg = validateCheckout(form);
    if (msg) {
      notifyValidationFailure(msg);
      return;
    }
    setError(null);
    await onConfirmEmail(form);
  }

  function handleWhatsApp() {
    const msg = validateCheckout(form);
    if (msg) {
      notifyValidationFailure(msg);
      return;
    }
    setError(null);
    onConfirmWhatsApp(form);
  }

  return (
    <form
      className="w-full min-w-0 max-w-full space-y-5"
      onSubmit={(e) => void handleEmail(e)}
      noValidate
    >
      <p className="text-xs text-neutral-500">
        Los campos marcados con asterisco (
        <span className="text-brand-red">*</span>) son obligatorios.
      </p>

      <div className="space-y-2">
        <Label htmlFor="ship-name">
          {LABELS.fullName}
          <RequiredMark />
        </Label>
        <Input
          id="ship-name"
          autoComplete="name"
          required
          aria-required="true"
          value={form.fullName}
          onChange={(e) => patch("fullName", e.target.value)}
        />
      </div>
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <Label htmlFor="ship-email">
            {LABELS.email}
            <RequiredMark />
          </Label>
          <Input
            id="ship-email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            value={form.email}
            onChange={(e) => patch("email", e.target.value)}
          />
        </div>
        <div className="min-w-0 space-y-2">
          <Label htmlFor="ship-phone">
            {LABELS.phone}
            <RequiredMark />
          </Label>
          <Input
            id="ship-phone"
            type="tel"
            autoComplete="tel"
            required
            aria-required="true"
            value={form.phone}
            onChange={(e) => patch("phone", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="ship-address">
          {LABELS.address}
          <RequiredMark />
        </Label>
        <Input
          id="ship-address"
          autoComplete="street-address"
          required
          aria-required="true"
          value={form.address}
          onChange={(e) => patch("address", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ship-city">
          {LABELS.city}
          <RequiredMark />
        </Label>
        <Input
          id="ship-city"
          autoComplete="address-level2"
          required
          aria-required="true"
          value={form.city}
          onChange={(e) => patch("city", e.target.value)}
        />
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50/80 px-4 py-3">
        <input
          id="ship-wants-delivery"
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-300 text-neutral-900 focus:ring-brand-red"
          checked={form.wantsDelivery}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, wantsDelivery: e.target.checked }))
          }
        />
        <Label
          htmlFor="ship-wants-delivery"
          className="cursor-pointer text-sm font-normal leading-snug text-neutral-700"
        >
          Solicitar delivery / envío a domicilio (el costo se coordina aparte;
          no está incluido en el total de productos).
        </Label>
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <Separator className="shrink-0" />

      <div className="flex w-full min-w-0 flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-auto min-h-11 w-full whitespace-normal px-4 py-3 text-center text-sm leading-snug sm:text-base"
          disabled={isSubmitting}
          onClick={handleWhatsApp}
        >
          Pedir directamente por WhatsApp
        </Button>
        <Button
          type="submit"
          className="h-auto min-h-11 w-full whitespace-normal px-4 py-3 text-center text-sm leading-snug sm:text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando…" : "Confirmar y enviar por correo"}
        </Button>
      </div>
    </form>
  );
}
