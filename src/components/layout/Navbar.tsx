import { Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#inicio", label: "Inicio" },
  { href: "#destacados", label: "Destacados" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#nosotros", label: "Sobre nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export interface NavbarProps {
  onOpenCart: () => void;
}

export function Navbar({ onOpenCart }: NavbarProps) {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href="#inicio" className="flex items-center gap-2 font-semibold tracking-tight">
          <SiteLogo variant="light-bg" />
          <span className="hidden text-lg text-neutral-900 sm:inline">
            SOME Paraguay
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-700 transition-colors hover:text-brand-red"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="relative border-neutral-200"
            aria-label={`Abrir carrito${itemCount ? `, ${itemCount} productos` : ""}`}
            onClick={onOpenCart}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            ) : null}
          </Button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-neutral-100 lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4" aria-label="Móvil">
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <Separator className="opacity-60" />
    </header>
  );
}
