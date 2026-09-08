import { Link } from "react-router-dom";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  buildItemListJsonLd,
} from "@/lib/seo";
import { SITE_ORIGIN } from "@/data/site";
import { RAW_CATALOG } from "@/data/catalog-data";
import { productPath } from "@/lib/product-url";
import { About } from "@/components/sections/About";
import { Catalog } from "@/components/sections/Catalog";
import { Contact } from "@/components/sections/Contact";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Hero } from "@/components/sections/Hero";
import { usePageMeta } from "@/hooks/usePageMeta";

export function HomePage() {
  usePageMeta({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: `${SITE_ORIGIN}/`,
    type: "website",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildItemListJsonLd(RAW_CATALOG)),
        }}
      />
      <Hero />
      <FeaturedProducts />
      <Catalog />
      <About />
      <Contact />
      <nav className="sr-only" aria-label="Índice de productos">
        <ul>
          {RAW_CATALOG.map((product) => (
            <li key={product.id}>
              <Link to={productPath(product.id)}>{product.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
