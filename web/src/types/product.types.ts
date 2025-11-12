
export interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  collections: string[];
  sizes: string[];
  colors: string[];
  tags: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  createdAt: string;
}
