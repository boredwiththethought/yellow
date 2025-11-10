import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: { label: string; colorCode: string }[];
  brand: string;
  tags: string[];
  inStock: boolean;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: String, required: true },
  sizes: [{ type: String }],
  colors: [
    {
      label: String,
      colorCode: String,
    },
  ],
  brand: { type: String, required: true },
  tags: [{ type: String }],
  inStock: { type: Boolean, default: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
