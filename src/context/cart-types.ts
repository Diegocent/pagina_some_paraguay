import type { Product } from "@/data/products";

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  /** Si el cliente solicita envío/delivery a domicilio */
  wantsDelivery: boolean;
}

export interface CartState {
  lines: CartLine[];
}

export interface CartContextValue extends CartState {
  itemCount: number;
  subtotal: number;
  addProduct: (product: Product, quantity?: number) => void;
  removeLine: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  increment: (productId: string, delta?: number) => void;
  clearCart: () => void;
}
