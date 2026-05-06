import { type FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import { IgIcon } from "@/components/branding/IgIcon";
import { WaIcon } from "@/components/branding/WaIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppToast } from "@/components/providers/toast-provider";
import { openWhatsAppContact } from "@/utils/whatsapp";

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

export function Contact() {
  const { toast } = useAppToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [wantsDelivery, setWantsDelivery] = useState(false);

  const whatsappDigits = (
    import.meta.env.VITE_WHATSAPP_BUSINESS_PHONE ?? ""
  ).replace(/\D/g, "");

  function validate(): string | null {
    const missing: string[] = [];
    if (!name.trim()) missing.push("Nombre");
    if (!email.trim()) missing.push("Correo electrónico");
    if (!message.trim()) missing.push("Mensaje");
    if (missing.length > 0) {
      return `Completá los siguientes datos obligatorios: ${missing.join(", ")}.`;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "El correo electrónico no tiene un formato válido.";
    }
    return null;
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const msg = validate();
    if (msg) {
      toast({
        variant: "destructive",
        title: "No pudimos enviar la consulta",
        description: msg,
      });
      return;
    }
    toast({
      variant: "success",
      title: "¡Mensaje listo!",
      description: [
        "En producción esto dispararía el correo al negocio; por ahora solo mostramos esta confirmación.",
        wantsDelivery
          ? "Preferencia: solicitás delivery."
          : "Preferencia: sin delivery.",
      ].join(" "),
    });
    setName("");
    setEmail("");
    setMessage("");
    setWantsDelivery(false);
  }

  function handleWhatsApp() {
    const msg = validate();
    if (msg) {
      toast({
        variant: "destructive",
        title: "Completá los datos",
        description: msg,
      });
      return;
    }
    if (!whatsappDigits) {
      toast({
        variant: "destructive",
        title: "WhatsApp no configurado",
        description:
          "Definí VITE_WHATSAPP_BUSINESS_PHONE en tu archivo .env (solo dígitos, con código de país).",
      });
      return;
    }
    openWhatsAppContact(whatsappDigits, {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      wantsDelivery,
    });
    toast({
      variant: "success",
      title: "WhatsApp abierto",
      description:
        "Confirmá el mensaje en WhatsApp (incluye si solicitás delivery o no).",
    });
  }

  return (
    <section id="contacto" className="scroll-mt-24 bg-neutral-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            Contacto
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Coordinemos tu próximo pedido
          </h2>
          <p className="max-w-xl text-neutral-600">
            Contanos qué estás buscando — volumen, talla o envíos al interior — y te
            respondemos con opciones concretas.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            {whatsappDigits && (
              <a
                href={`https://wa.me/${whatsappDigits}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 shadow-sm transition hover:border-green-400 hover:text-green-700"
              >
                <WaIcon className="h-4 w-4 text-green-500" />
                Escribinos al WhatsApp
              </a>
            )}
            <a
              href="https://www.instagram.com/some.paraguay"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 shadow-sm transition hover:border-pink-300 hover:text-pink-600"
            >
              <IgIcon className="h-4 w-4 text-pink-500" />
              @some.paraguay
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-neutral-100 bg-white p-8 shadow-[var(--shadow-card)]"
          noValidate
        >
          <p className="mb-6 text-xs text-neutral-500">
            Los campos marcados con asterisco (
            <span className="text-brand-red">*</span>) son obligatorios.
          </p>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="contact-name">
                Nombre
                <RequiredMark />
              </Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">
                Correo electrónico
                <RequiredMark />
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-msg">
                Mensaje
                <RequiredMark />
              </Label>
              <Textarea
                id="contact-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
              <input
                id="contact-wants-delivery"
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-300 text-neutral-900 focus:ring-brand-red"
                checked={wantsDelivery}
                onChange={(e) => setWantsDelivery(e.target.checked)}
              />
              <Label
                htmlFor="contact-wants-delivery"
                className="cursor-pointer text-sm font-normal leading-snug text-neutral-700"
              >
                Solicitar delivery / envío (se cotiza aparte).
              </Label>
            </div>

            <div className="flex flex-col gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl py-6 text-base"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
                Consultar por WhatsApp
              </Button>
              <Button type="submit" className="w-full rounded-xl py-6 text-base">
                Enviar mensaje
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
