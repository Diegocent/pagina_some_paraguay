import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/products";
import type { CartContextValue, CartLine } from "@/context/cart-types";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addProduct = useCallback((product: Product, quantity = 1) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.product.id === product.id);
      if (idx === -1) {
        return [...prev, { product, quantity: Math.max(1, quantity) }];
      }
      const next = [...prev];
      next[idx] = {
        ...next[idx],
        quantity: next[idx].quantity + Math.max(1, quantity),
      };
      return next;
    });
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const q = Math.max(1, Math.floor(quantity));
    setLines((prev) =>
      prev.map((line) =>
        line.product.id === productId ? { ...line, quantity: q } : line,
      ),
    );
  }, []);

  const increment = useCallback((productId: string, delta = 1) => {
    setLines((prev) =>
      prev.flatMap((line) => {
        if (line.product.id !== productId) return [line];
        const nextQty = line.quantity + delta;
        if (nextQty <= 0) return [];
        return [{ ...line, quantity: nextQty }];
      }),
    );
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const itemCount = useMemo(
    () => lines.reduce((acc, l) => acc + l.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () =>
      lines.reduce((acc, l) => acc + l.product.price * l.quantity, 0),
    [lines],
  );

  const value = useMemo<CartContextValue>(() => {
    return {
      lines,
      itemCount,
      subtotal,
      addProduct,
      removeLine,
      setQuantity,
      increment,
      clearCart,
    };
  }, [
    lines,
    itemCount,
    subtotal,
    addProduct,
    removeLine,
    setQuantity,
    increment,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return ctx;
}
