function resolveGlobUrl(mod: unknown): string {
  if (typeof mod === "string") return mod;
  if (
    mod &&
    typeof mod === "object" &&
    "default" in mod &&
    typeof (mod as { default: unknown }).default === "string"
  ) {
    return (mod as { default: string }).default;
  }
  return "";
}

/** Imports explícitos por extensión (los patrones `{a,b}` suelen no matchear en import.meta.glob). */
const LOGO_MODULES: Record<string, unknown> = {
  ...import.meta.glob("@/assets/logo-some-paraguay.png", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("@/assets/logo-some-paraguay.jpg", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("@/assets/logo-some-paraguay.jpeg", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("@/assets/logo-some-paraguay.webp", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("@/assets/logo-some-paraguay.svg", {
    eager: true,
    import: "default",
  }),
};

export function getBundledLogoUrls(): string[] {
  const urls = Object.values(LOGO_MODULES)
    .map((m) => resolveGlobUrl(m))
    .filter((u) => u.length > 0);
  return [...new Set(urls)];
}

/** Orden: assets empaquetados → URL env → rutas públicas típicas */
export function getLogoSrcCandidates(): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const push = (u?: string | null) => {
    const t = u?.trim();
    if (!t || seen.has(t)) return;
    seen.add(t);
    out.push(t);
  };

  for (const u of getBundledLogoUrls()) push(u);

  push(import.meta.env.VITE_SITE_LOGO_URL);

  push("/logo-some-paraguay.png");
  push("/logo-some-paraguay.webp");
  push("/logo-some-paraguay.jpg");

  return out;
}

/** @deprecated Usá `getLogoSrcCandidates` + BrandLogo */
export function getSiteLogoUrl(): string | undefined {
  return getLogoSrcCandidates()[0];
}
