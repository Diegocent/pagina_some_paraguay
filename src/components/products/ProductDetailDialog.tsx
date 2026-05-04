import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductImage } from "@/components/products/ProductImage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPyg } from "@/lib/format-currency";
import { useAddToCartWithToast } from "@/hooks/useAddToCartWithToast";
import { cn } from "@/lib/utils";

export interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
}: ProductDetailDialogProps) {
  const addToCart = useAddToCartWithToast();
  const [thumbIdx, setThumbIdx] = useState(0);

  const gallery =
    product && product.imageUrls.length > 0
      ? product.imageUrls
      : product
        ? [product.imageUrl]
        : [];

  useEffect(() => {
    setThumbIdx(0);
  }, [product?.id]);

  if (!product) return null;

  const showThumbs = gallery.length > 1;
  const activeSrc =
    gallery[Math.min(thumbIdx, Math.max(gallery.length - 1, 0))] ?? "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92vh] flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="shrink-0 border-b border-neutral-100 px-6 pb-4 pt-6 pr-14">
          <DialogTitle className="pr-2">{product.title}</DialogTitle>
          <DialogDescription className="text-base font-semibold tabular-nums text-neutral-900">
            {formatPyg(product.price)}
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80">
              <div className="aspect-[4/5] max-h-[min(46vh,400px)] w-full sm:max-h-[420px]">
                <ProductImage
                  product={product}
                  preferUrl={activeSrc}
                  alt={product.title}
                  className="h-full w-full object-cover sm:object-contain"
                />
              </div>
            </div>

            {showThumbs ? (
              <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {gallery.map((src, i) => (
                  <button
                    key={`${product.id}-${src}-${i}`}
                    type="button"
                    aria-label={`Vista ${i + 1} de ${gallery.length}`}
                    aria-current={i === thumbIdx}
                    className={cn(
                      "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-2 ring-offset-2 ring-offset-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-brand-red",
                      i === thumbIdx
                        ? "ring-brand-red"
                        : "ring-transparent opacity-80 hover:ring-neutral-300",
                    )}
                    onClick={() => setThumbIdx(i)}
                  >
                    <ProductImage
                      product={product}
                      preferUrl={src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}

            <div className="space-y-3 pb-2 text-sm leading-relaxed text-neutral-700">
              <p>{product.description}</p>
              {product.highlights && product.highlights.length > 0 ? (
                <ul className="list-inside list-disc space-y-1.5 text-neutral-600">
                  {product.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-neutral-100 bg-white px-6 py-4 shadow-[0_-10px_30px_-12px_rgba(0,0,0,0.12)]">
          <Button
            type="button"
            className="w-full gap-2 py-6 text-base shadow-sm"
            onClick={() => {
              addToCart(product);
              onOpenChange(false);
            }}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            Agregar al carrito · {formatPyg(product.price)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
