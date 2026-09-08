import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";
import { SITE_ORIGIN } from "@/data/site";

export function NotFoundPage() {
  usePageMeta({
    title: "Página no encontrada | SOME Paraguay",
    description: "Esa página no existe en SOME Paraguay.",
    url: `${SITE_ORIGIN}/`,
    type: "website",
  });

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
        Página no encontrada
      </h1>
      <p className="mt-3 text-neutral-600">
        El enlace no coincide con ninguna sección ni producto del catálogo.
      </p>
      <Button className="mt-8" asChild>
        <Link to="/">Volver al inicio</Link>
      </Button>
    </section>
  );
}
