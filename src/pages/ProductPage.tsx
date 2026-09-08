import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { useAddToCartWithToast } from "@/hooks/useAddToCartWithToast";
import { usePageMeta } from "@/hooks/usePageMeta";
import { formatProductPrice } from "@/lib/format-currency";
import { productUrl } from "@/lib/product-url";
import {
  buildProductJsonLd,
  productDocumentTitle,
  productMetaDescription,
} from "@/lib/seo";

export function ProductPage() {
  const { id = "" } = useParams<{ id: string }>();
  const product = getProductById(id);
  const addToCart = useAddToCartWithToast();

  const title = product
    ? productDocumentTitle(product.title)
    : "Producto no encontrado | SOME Paraguay";
  const description = product
    ? productMetaDescription(product)
    : "El producto no está disponible en SOME Paraguay.";
  const url = productUrl(id);

  usePageMeta({
    title,
    description,
    url,
    type: product ? "product" : "website",
  });

  if (!product) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Producto no encontrado
        </h1>
        <p className="mt-3 text-neutral-600">
          Ese artículo no está en el catálogo o el enlace cambió.
        </p>
        <Button className="mt-8" asChild>
          <Link to="/#catalogo">Volver al catálogo</Link>
        </Button>
      </section>
    );
  }

  const gallery =
    product.imageUrls.length > 0 ? product.imageUrls : [product.imageUrl];

  return (
    <article key={product.id} className="bg-brand-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProductJsonLd(product)),
        }}
      />
      <div className="mx-auto max-w-6xl px-6 py-10 lg:py-16">
        <Link
          to="/#catalogo"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-brand-red"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Volver al catálogo
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <ProductGallery product={product} gallery={gallery} />

          <div className="space-y-6">
            {product.badge ? (
              <span className="inline-flex rounded-full bg-brand-red px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {product.badge}
              </span>
            ) : null}
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              {product.title}
            </h1>
            <p className="text-2xl font-bold tabular-nums text-neutral-900">
              {formatProductPrice(product.price)}
            </p>
            <p className="text-base leading-relaxed text-neutral-700">
              {product.description}
            </p>
            {product.highlights && product.highlights.length > 0 ? (
              <ul className="list-inside list-disc space-y-2 text-sm text-neutral-600">
                {product.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}
            <Button
              type="button"
              className="w-full gap-2 py-6 text-base sm:w-auto sm:px-10"
              onClick={() => addToCart(product)}
            >
              <ShoppingBag className="h-5 w-5" aria-hidden />
              Agregar al carrito · {formatProductPrice(product.price)}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
