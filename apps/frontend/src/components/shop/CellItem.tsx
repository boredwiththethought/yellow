export interface filterSize {
  id: number;
  label: string;
  checked: boolean;
}
export interface cellItem {
  id: number;
  productName: string;
  unitPrice: string;
  quantity: number;
  color: string[];

}

export interface filterColors {
  id: number;
  label: string;
  colorCode: string;
  checked: boolean;
}
export interface filterPrice {
  id: number;
  label: string;
  min: number;
  max: number;
  checked: boolean;
}
export interface filterBrands {
  id: number;
  label: string;
  checked: boolean;
}
export interface filterCollections {
  id: number;
  label: string;
  checked: boolean;
}
export interface filterTags {
  id: number;
  label: string;
  checked: boolean;
}
export interface sellerCartItem {
  id: number;
  productName: string;
  unitPrice: string;
  quantity: number;
}

export const initialFilters = {
  sizes: [
    { id: 1, label: "S", checked: false },
    { id: 2, label: "M", checked: false },
    { id: 3, label: "L", checked: false },
    { id: 4, label: "XL", checked: false }
  ],
  colors: [
    { id: 1, label: "Red", colorCode: "#FF6C6C", checked: false },
    { id: 2, label: "Orange", colorCode: "#FF7629", checked: false },
    { id: 3, label: "Yellow", colorCode: "#FFF06C", checked: false },
    { id: 4, label: "Light Green", colorCode: "#9BFF6C", checked: false },
    { id: 5, label: "Mint Green", colorCode: "#6CFF9E", checked: false },
    { id: 6, label: "Aqua Mint", colorCode: "#6CFFDC", checked: false },
    { id: 7, label: "Light Blue", colorCode: "#6CB9FF", checked: false },
    { id: 8, label: "Bright Aqua", colorCode: "#6CF6FF", checked: false },
    { id: 9, label: "Periwinkle Blue", colorCode: "#6CA7FF", checked: false },
    { id: 10, label: "Periwinkle", colorCode: "#6C7BFF", checked: false },
    { id: 11, label: "Lavender Purple", colorCode: "#8A6CFF", checked: false },
    { id: 12, label: "Lavender Violet", colorCode: "#B66CFF", checked: false },
    { id: 13, label: "Neon Magenta", colorCode: "#FC6CFF", checked: false },
    { id: 14, label: "Coral Red", colorCode: "#FF6C6C", checked: false }
  ],
  price: [
    { id: 1, label: "$0 - $50", min: 0, max: 50, checked: false },
    { id: 2, label: "$50 - $100", min: 50, max: 100, checked: false },
    { id: 3, label: "$100 - $150", min: 100, max: 150, checked: false },
    { id: 4, label: "$150 - $200", min: 150, max: 200, checked: false },
    { id: 5, label: "$300 - $400", min: 300, max: 400, checked: false }
  ],
  brands: [
    { id: 1, label: "Minimog", checked: false },
    { id: 2, label: "Retrolie", checked: false },
    { id: 3, label: "Brook", checked: false },
    { id: 4, label: "Learts", checked: false },
    { id: 5, label: "Vagabond", checked: false },
    { id: 6, label: "Abby", checked: false }
  ],
  collections: [
    { id: 1, label: "All products", checked: false },
    { id: 2, label: "Best Sellers", checked: false },
    { id: 3, label: "New arrivals", checked: false },
    { id: 4, label: "Accessories", checked: false }
  ],
  tags: [
    { id: 1, label: "Fashion", checked: false },
    { id: 2, label: "Hats", checked: false },
    { id: 3, label: "Sandal", checked: false },
    { id: 4, label: "Belt", checked: false },
    { id: 5, label: "Bags", checked: false },
    { id: 6, label: "Snacker", checked: false },
    { id: 7, label: "Denim", checked: false },
    { id: 8, label: "Minimog", checked: false },
    { id: 9, label: "Vagabond", checked: false },
    { id: 10, label: "Sunglasses", checked: false },
    { id: 11, label: "Beachwear", checked: false }
  ]
};

