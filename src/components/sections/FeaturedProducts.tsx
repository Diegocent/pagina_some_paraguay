import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, type Product } from "@/data/products";
import { useAddToCartWithToast } from "@/hooks/useAddToCartWithToast";
import { cn } from "@/lib/utils";

export interface FeaturedProductsProps {
  onSelectProduct?: (product: Product) => void;
}

export function FeaturedProducts({ onSelectProduct }: FeaturedProductsProps) {
  const addToCart = useAddToCartWithToast();
  const featured = getFeaturedProducts();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section id="destacados" className="scroll-mt-24 bg-neutral-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
              Top ventas
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Productos destacados
            </h2>
            <p className="max-w-xl text-neutral-600">
              Los favoritos del equipo — pensados para sesiones intensas y uso
              diario.
            </p>
          </div>
          {/* Flechas: siempre visibles en el carrusel */}
          <div className="flex gap-2 lg:flex">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Anterior"
              className="lg:hidden"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Siguiente"
              className="lg:hidden"
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Anterior"
              className="hidden lg:flex"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Siguiente"
              className="hidden lg:flex"
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        {/* Carrusel en mobile/tablet */}
        <div className="lg:hidden">
          {/* Degradado derecho que insinúa más contenido */}
          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden pb-2">
              <div className="flex gap-5">
                {featured.map((p) => (
                  <div
                    className="min-w-0 shrink-0 basis-[82%] sm:basis-[46%]"
                    key={p.id}
                  >
                    <ProductCard
                      product={p}
                      onAddToCart={addToCart}
                      onViewDetails={onSelectProduct}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Degradado derecho */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-50 to-transparent" />
          </div>

          {/* Puntos indicadores */}
          {scrollSnaps.length > 1 && (
            <div className="mt-5 flex justify-center gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ir al producto ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === selectedIndex
                      ? "w-6 bg-brand-red"
                      : "w-2 bg-neutral-300 hover:bg-neutral-400",
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Grid en desktop */}
        <div className="hidden gap-8 lg:grid lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={addToCart}
              onViewDetails={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
