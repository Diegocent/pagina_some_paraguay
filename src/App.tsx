import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { ToastProvider } from "@/components/providers/toast-provider";
import { CartProvider } from "@/context/CartContext";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProductPage } from "@/pages/ProductPage";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <ToastProvider>
      <CartProvider>
        <ScrollManager />
        <Navbar onOpenCart={() => setCartOpen(true)} />
        <main className="bg-brand-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/producto/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      </CartProvider>
    </ToastProvider>
  );
}
