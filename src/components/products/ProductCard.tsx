import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductImage } from "@/components/products/ProductImage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatProductPrice } from "@/lib/format-currency";
import { productPath } from "@/lib/product-url";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  className?: string;
}

export function ProductCard({
  product,
  onAddToCart,
  className,
}: ProductCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={cn("h-full", className)}
    >
      <Card className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-xl">
        <Link
          to={productPath(product.id)}
          className="flex flex-1 flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
            <ProductImage
              product={product}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {product.badge ? (
              <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-brand-red px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
                {product.badge}
              </span>
            ) : null}
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-base md:text-lg">{product.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-3 pb-4">
            <p className="text-sm leading-relaxed text-neutral-600 line-clamp-3">
              {product.description}
            </p>
            <p className="mt-auto text-xl font-bold tracking-tight text-neutral-900">
              {formatProductPrice(product.price)}
            </p>
          </CardContent>
        </Link>
        <CardFooter className="pb-6 pt-0">
          <Button
            type="button"
            className="w-full gap-2"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden />
            Agregar al carrito
          </Button>
        </CardFooter>
      </Card>
    </motion.article>
  );
}
