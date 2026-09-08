import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/data/products";
import { useAddToCartWithToast } from "@/hooks/useAddToCartWithToast";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const SORT_LABELS: Record<SortOption, string> = {
  default: "Relevancia",
  "price-asc": "Precio: menor a mayor",
  "price-desc": "Precio: mayor a menor",
  "name-asc": "Nombre: A → Z",
  "name-desc": "Nombre: Z → A",
};

export function Catalog() {
  const addToCart = useAddToCartWithToast();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = q
      ? PRODUCTS.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q),
        )
      : [...PRODUCTS];

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));
        break;
      case "price-desc":
        list.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
        break;
      case "name-asc":
        list.sort((a, b) => a.title.localeCompare(b.title, "es"));
        break;
      case "name-desc":
        list.sort((a, b) => b.title.localeCompare(a.title, "es"));
        break;
    }

    return list;
  }, [query, sort]);

  return (
    <section id="catalogo" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-10 space-y-3"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            Catálogo completo
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Todo para tu entrenamiento
          </h2>
          <p className="max-w-2xl text-neutral-600">
            Explorá la línea completa: desde accesorios compactos hasta equipamiento
            para cargar tu rutina al siguiente nivel.
          </p>
        </motion.div>

        {/* Barra de búsqueda y ordenamiento */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Buscar producto…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-9 pr-4 text-sm text-neutral-800 outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 placeholder:text-neutral-400"
            />
          </div>

          <div className="relative flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 shrink-0 text-neutral-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-3 pr-8 text-sm text-neutral-800 outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 appearance-none cursor-pointer"
            >
              {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                <option key={key} value={key}>
                  {SORT_LABELS[key]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-neutral-400"
          >
            No se encontraron productos para{" "}
            <span className="font-semibold text-neutral-700">"{query}"</span>.
          </motion.p>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            <AnimatePresence>
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
