import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import { BrandLogo } from "@/components/branding/BrandLogo";
import { SITE_LOCATION } from "@/data/site";

export function About() {
  const addressLine =
    import.meta.env.VITE_BUSINESS_ADDRESS_LINE?.trim() ||
    SITE_LOCATION.addressLine;
  const mapsUrl =
    import.meta.env.VITE_BUSINESS_MAP_URL?.trim() || SITE_LOCATION.mapsUrl;

  return (
    <section id="nosotros" className="scroll-mt-24 bg-neutral-950 py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative flex min-h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[var(--shadow-card)] lg:min-h-[360px]"
        >
          <div className="flex w-full flex-col items-center justify-center gap-6 p-8 lg:p-14">
            <BrandLogo
              variant="hero"
              className="flex w-full max-w-md justify-center"
              imgClassName="mx-auto object-center"
            />
            <p className="max-w-sm text-center text-sm leading-relaxed text-neutral-600">
              Marcas seleccionadas y materiales pensados para resistir repetición,
              transpiración y el uso real del día a día.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">
            Sobre nosotros
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Tu próximo PB empieza con el equipo correcto.
          </h2>
          <p className="text-neutral-300">
            Somos un equipo obsesionado con la calidad útil: stock especializado de
            indumentaria deportiva y artículos de gimnasio para quienes entrenan
            en serio — desde el primer calentamiento hasta la última serie.
          </p>
          <p className="text-neutral-300">
            Seleccionamos piezas por ergonomía, durabilidad y versatilidad,
            porque cada repetición cuenta y cada compra debe rendir en la vida
            real, no solo en el catálogo.
          </p>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
              Ubicación
            </p>
            <div className="mt-3 flex flex-wrap items-start gap-3">
              <MapPin
                className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
                aria-hidden
              />
              <div className="min-w-0 flex-1 space-y-3">
                <p className="text-sm leading-relaxed text-neutral-200">
                  {addressLine}
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:text-red-300 hover:underline"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                  Ver ubicación en el mapa
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Envíos coordinados", value: "Según zona" },
              { label: "Asesoramiento", value: "WhatsApp / correo" },
              { label: "Pagos", value: "A coordinar" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
              >
                <p className="text-xs uppercase tracking-wide text-neutral-400">
                  {item.label}
                </p>
                <p className="mt-2 font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
