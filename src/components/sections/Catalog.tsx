import { motion } from "framer-motion";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS, type Product } from "@/data/products";
import { useAddToCartWithToast } from "@/hooks/useAddToCartWithToast";

export interface CatalogProps {
  onSelectProduct?: (product: Product) => void;
}

export function Catalog({ onSelectProduct }: CatalogProps) {
  const addToCart = useAddToCartWithToast();

  return (
    <section id="catalogo" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12 space-y-3"
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewDetails={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
