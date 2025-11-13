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
    { id: 1, label: "Red", colorCode: "#FF0000", checked: false },
    { id: 2, label: "Blue", colorCode: "#0000FF", checked: false },
    { id: 3, label: "Green", colorCode: "#00FF00", checked: false },
    { id: 4, label: "Black", colorCode: "#000000", checked: false },
    { id: 5, label: "White", colorCode: "#FFFFFF", checked: false },
    { id: 6, label: "Yellow", colorCode: "#FFFF00", checked: false },
    { id: 7, label: "Purple", colorCode: "#800080", checked: false },
    { id: 8, label: "Orange", colorCode: "#FFA500", checked: false },
    { id: 9, label: "Gray", colorCode: "#808080", checked: false },
    { id: 10, label: "Pink", colorCode: "#FFC0CB", checked: false },
    { id: 11, label: "Teal", colorCode: "#008080", checked: false },
    { id: 12, label: "Brown", colorCode: "#A52A2A", checked: false },
    { id: 13, label: "Navy", colorCode: "#000080", checked: false },
    { id: 14, label: "Beige", colorCode: "#F5F5DC", checked: false }
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
    { id: 2, label: "Rotorlife Brook", checked: false },
    { id: 3, label: "Lorats", checked: false },
    { id: 4, label: "Vagabond", checked: false },
    { id: 5, label: "Abby", checked: false }
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
    { id: 6, label: "Sneaker", checked: false },
    { id: 7, label: "Denim", checked: false },
    { id: 8, label: "Vagabond", checked: false },
    { id: 9, label: "Sunglasses", checked: false },
    { id: 10, label: "Beachwear", checked: false }
  ]
};
