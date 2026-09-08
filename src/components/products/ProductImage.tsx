import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { getProductDisplayCandidates } from "@/lib/product-media";

export interface ProductImageProps {
  product: Pick<Product, "id" | "imageUrls" | "imageCode">;
  alt: string;
  className?: string;
  /** Solo usa esta URL como base de candidatos (p. ej. miniatura seleccionada) */
  preferUrl?: string;
}

export function ProductImage({
  product,
  alt,
  className,
  preferUrl,
}: ProductImageProps) {
  const candidates = useMemo(() => {
    if (preferUrl) {
      return [preferUrl, ...getProductDisplayCandidates(product)].filter(
        (u, i, a) => a.indexOf(u) === i,
      );
    }
    return getProductDisplayCandidates(product);
  }, [preferUrl, product.imageCode, product.imageUrls.join("|")]);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [product.id, preferUrl, candidates.join("|")]);

  const safeIdx = Math.min(idx, Math.max(candidates.length - 1, 0));

  return (
    <img
      src={candidates[safeIdx]}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={className}
      onError={() =>
        setIdx((i) => {
          const next = i + 1;
          return next < candidates.length ? next : i;
        })
      }
    />
  );
}
