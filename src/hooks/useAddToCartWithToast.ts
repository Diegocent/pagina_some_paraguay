import { useCallback } from "react";
import type { Product } from "@/data/products";
import { useAppToast } from "@/components/providers/toast-provider";
import { useCart } from "@/context/CartContext";
import { formatProductPrice } from "@/lib/format-currency";

export function useAddToCartWithToast() {
  const { addProduct } = useCart();
  const { toast } = useAppToast();

  return useCallback(
    (product: Product) => {
      addProduct(product);
      toast({
        variant: "success",
        title: "Agregado al carrito",
        description: `${product.title} · ${formatProductPrice(product.price)}`,
      });
    },
    [addProduct, toast],
  );
}
