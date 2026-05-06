import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WaIcon } from "@/components/branding/WaIcon";

const HERO_BG =
  "https://image.slidesdocs.com/responsive-images/background/training-equipment-in-of-dark-concept-fitness-room-featuring-black-dumbbells-on-the-floor-in-3d-rendering-powerpoint-background_5dbb56997b__960_540.jpg";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[85vh] items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-28 lg:flex-row lg:items-end lg:justify-between lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl space-y-6 text-white"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">
            Rendimiento · Estilo · Constancia
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Equipamiento que empuja tus límites.
          </h1>
          <p className="text-base leading-relaxed text-neutral-200 sm:text-lg">
            Tobilleras, mochilas, chalecos y más — seleccionamos piezas robustas
            para tu rutina: del gym al día a día.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button size="lg" className="gap-2 rounded-xl px-8 text-base" asChild>
              <a href="#catalogo">
                Ver catálogo
                <ArrowRight className="h-5 w-5" aria-hidden />
              </a>
            </Button>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-white/40 bg-white/10 text-white hover:bg-white/15"
                asChild
              >
                <a href="#destacados">Destacados</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-xl border-green-400/50 bg-green-500/10 text-green-300 hover:bg-green-500/20 hover:text-green-200"
                asChild
              >
                <a
                  href={`https://wa.me/${(import.meta.env.VITE_WHATSAPP_BUSINESS_PHONE ?? "").replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <WaIcon className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="hidden max-w-xs rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-neutral-100 backdrop-blur-md lg:block"
        >
          <p className="font-semibold text-white">Envíos coordinados</p>
          <p className="mt-2 leading-relaxed text-neutral-200">
            Al cerrar tu compra podés confirmar por correo o mandarnos el pedido
            por WhatsApp en un clic.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
