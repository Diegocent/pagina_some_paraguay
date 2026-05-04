import { useState } from "react";
import type { Product } from "@/data/products";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProductDetailDialog } from "@/components/products/ProductDetailDialog";
import { ToastProvider } from "@/components/providers/toast-provider";
import { About } from "@/components/sections/About";
import { Catalog } from "@/components/sections/Catalog";
import { Contact } from "@/components/sections/Contact";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Hero } from "@/components/sections/Hero";
import { CartProvider } from "@/context/CartContext";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  return (
    <ToastProvider>
      <CartProvider>
        <Navbar onOpenCart={() => setCartOpen(true)} />
        <main className="bg-brand-white">
          <Hero />
          <FeaturedProducts onSelectProduct={setDetailProduct} />
          <Catalog onSelectProduct={setDetailProduct} />
          <About />
          <Contact />
        </main>
        <Footer />
        <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
        <ProductDetailDialog
          product={detailProduct}
          open={detailProduct !== null}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) setDetailProduct(null);
          }}
        />
      </CartProvider>
    </ToastProvider>
  );
}
