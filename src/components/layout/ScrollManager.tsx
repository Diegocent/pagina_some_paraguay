import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Al cambiar de ruta, sube al tope; si hay hash (#catalogo), desplaza a esa sección. */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      const scroll = () => document.getElementById(id)?.scrollIntoView();
      scroll();
      const t = window.setTimeout(scroll, 80);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
}
