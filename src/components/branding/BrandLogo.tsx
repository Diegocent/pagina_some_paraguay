import { useEffect, useMemo, useState } from "react";
import { getLogoSrcCandidates } from "@/lib/site-logo";
import { cn } from "@/lib/utils";

export interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
  variant?: "navbar" | "footer" | "hero";
  /** Si fallan todas las URLs, muestra MS */
  fallbackClassName?: string;
}

export function BrandLogo({
  className,
  imgClassName,
  variant = "navbar",
  fallbackClassName,
}: BrandLogoProps) {
  const candidates = useMemo(() => getLogoSrcCandidates(), []);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, []);

  useEffect(() => {
    if (
      import.meta.env.DEV &&
      idx >= candidates.length &&
      candidates.length > 0
    ) {
      console.warn(
        "[SOME Paraguay] No se pudo cargar el logo. Colocá `public/logo-some-paraguay.png` o `src/assets/logo-some-paraguay.png`.",
      );
    }
  }, [idx, candidates.length]);

  if (idx >= candidates.length) {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-sm font-bold text-white",
          variant === "navbar" && "h-9 w-9",
          variant === "footer" && "h-10 w-10 border border-white/20 bg-white text-neutral-950",
          variant === "hero" && "h-16 w-16 text-lg",
          fallbackClassName,
          className,
        )}
      >
        MS
      </span>
    );
  }

  const src = candidates[idx];

  return (
    <div className={cn("relative shrink-0", className)}>
      <img
        src={src}
        alt="SOME Paraguay"
        decoding="async"
        className={cn(
          "block h-12 w-auto max-h-14 max-w-[min(200px,48vw)] object-contain object-left",
          variant === "footer" &&
            "max-h-12 max-w-[200px] rounded-md bg-white px-2 py-1.5",
          variant === "hero" &&
            "h-auto max-h-[min(52vh,440px)] w-full max-w-md object-contain",
          imgClassName,
        )}
        onError={() => setIdx((i) => i + 1)}
      />
    </div>
  );
}
