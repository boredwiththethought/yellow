import mongoose, { Schema } from "mongoose";
const ProductSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
    category: {
        type: String,
        enum: [
            "mens-fashion",
            "womens-fashion",
            "mens-accessories",
            "womens-accessories",
        ],
        required: true,
    },
    collections: [
        {
            type: String,
            enum: [
                "all-products",
                "best-sellers",
                "new-arrivals",
                "accessories",
                "discount-deals",
            ],
        },
    ],
    sizes: [
        {
            type: String,
            enum: ["S", "M", "L", "XL"],
        },
    ],
    colors: [{ type: String }],
    tags: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
}, { timestamps: true });
ProductSchema.index({ category: 1, collections: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ rating: -1 });
export default mongoose.model("Product", ProductSchema);
