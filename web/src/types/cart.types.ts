export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
  sku?: string;
}

export interface CartSummaryData {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export interface GiftWrapOption {
  enabled: boolean;
  price: number;
  message?: string;
}
