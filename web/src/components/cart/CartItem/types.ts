export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  color?: string;
  size?: string;
  quantity: number;
  onRemove?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}
