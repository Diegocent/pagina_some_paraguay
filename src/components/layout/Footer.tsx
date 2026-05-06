import { useState } from "react";
import { IgIcon } from "@/components/branding/IgIcon";
import { PrivacyModal } from "@/components/legal/PrivacyModal";
import { SiteLogo } from "@/components/layout/SiteLogo";

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 py-14 text-neutral-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
        <div className="space-y-3">
          <SiteLogo variant="dark-bg" className="max-h-11 max-w-[200px]" />
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
            SOME Paraguay
          </p>
          <p className="text-sm leading-relaxed">
            Indumentaria deportiva y artículos de gimnasio seleccionados para entrenar con
            intención.
          </p>
          <a
            href="https://www.instagram.com/some.paraguay"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-pink-400"
          >
            <IgIcon className="h-4 w-4" />
            @some.paraguay
          </a>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">Enlaces rápidos</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-white" href="#destacados">
                Destacados
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="#catalogo">
                Catálogo
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="#nosotros">
                Sobre nosotros
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="#contacto">
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">Legal</p>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="text-neutral-400 underline-offset-4 transition hover:text-white hover:underline"
              >
                Política de privacidad y términos de uso
              </button>
            </li>
            <li className="text-neutral-400">
              © {new Date().getFullYear()} SOME Paraguay. Todos los derechos reservados.
            </li>
          </ul>
        </div>
      </div>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-6 pt-6 text-center text-xs text-neutral-500">
        Desarrollado por{" "}
        <a
          href="https://yvagacore.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-neutral-300 transition-colors hover:text-white"
        >
          Yvagacore
        </a>
      </div>
    </footer>
  );
}
