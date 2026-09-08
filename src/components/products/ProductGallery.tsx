import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductImage } from "@/components/products/ProductImage";
import { cn } from "@/lib/utils";

export interface ProductGalleryProps {
  product: Product;
  gallery: string[];
}

export function ProductGallery({ product, gallery }: ProductGalleryProps) {
  const canNav = gallery.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: canNav,
    align: "center",
    duration: 22,
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80">
        <div
          ref={emblaRef}
          className="overflow-hidden rounded-2xl"
        >
          <div className="flex h-[min(42vh,300px)] cursor-grab touch-pan-y active:cursor-grabbing sm:h-[340px] lg:h-[380px]">
            {gallery.map((src, i) => (
              <div
                className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center"
                key={`${product.id}-${src}-${i}`}
              >
                <ProductImage
                  product={product}
                  preferUrl={src}
                  alt={
                    gallery.length > 1
                      ? `${product.title}, imagen ${i + 1} de ${gallery.length}`
                      : product.title
                  }
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {canNav ? (
          <>
            <button
              type="button"
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md ring-1 ring-black/5 backdrop-blur-sm transition hover:bg-white sm:left-3"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md ring-1 ring-black/5 backdrop-blur-sm transition hover:bg-white sm:right-3"
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {canNav ? (
        <div className="flex gap-3 overflow-x-auto px-1 py-2">
          {gallery.map((src, i) => (
            <button
              key={`${product.id}-thumb-${src}-${i}`}
              type="button"
              aria-label={`Vista ${i + 1} de ${gallery.length}`}
              aria-current={i === selected}
              className={cn(
                "relative h-16 w-16 shrink-0 rounded-lg ring-2 ring-offset-2 ring-offset-white transition hover:opacity-95",
                i === selected
                  ? "ring-brand-red"
                  : "ring-transparent opacity-80 hover:ring-neutral-300",
              )}
              onClick={() => emblaApi?.scrollTo(i)}
            >
              <span className="absolute inset-0 overflow-hidden rounded-[7px]">
                <ProductImage
                  product={product}
                  preferUrl={src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
