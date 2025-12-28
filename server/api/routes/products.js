"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const { collection, category, sizes, colors, brands, minPrice, maxPrice, tags, sort, search, } = req.query;
        let query = {};
        if (collection && collection !== "all-products") {
            query.collections = collection;
        }
        if (category) {
            query.category = category;
        }
        if (sizes && typeof sizes === "string" && sizes.length > 0) {
            const sizeArray = sizes.split(",");
            query.sizes = { $in: sizeArray };
        }
        if (colors && typeof colors === "string" && colors.length > 0) {
            const colorArray = colors.split(",");
            query.colors = { $in: colorArray };
        }
        if (brands && typeof brands === "string" && brands.length > 0) {
            const brandArray = brands.split(",");
            query.brand = { $in: brandArray };
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice)
                query.price.$gte = Number(minPrice);
            if (maxPrice)
                query.price.$lte = Number(maxPrice);
        }
        if (tags && typeof tags === "string" && tags.length > 0) {
            const tagArray = tags.split(",");
            query.tags = { $in: tagArray };
        }
        if (search && typeof search === "string") {
            query.name = { $regex: search, $options: "i" };
        }
        let sortOption = {};
        if (sort === "price-asc") {
            sortOption.price = 1;
        }
        else if (sort === "price-desc") {
            sortOption.price = -1;
        }
        else if (sort === "rating") {
            sortOption.rating = -1;
        }
        else if (sort === "name") {
            sortOption.name = 1;
        }
        else {
            sortOption.createdAt = -1;
        }
        const products = await Product_1.default.find(query).sort(sortOption);
        res.json({
            success: true,
            count: products.length,
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.json({
            success: true,
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
});
router.get("/filters/options", async (_req, res) => {
    try {
        const brands = await Product_1.default.distinct("brand");
        const colors = await Product_1.default.distinct("colors");
        const tags = await Product_1.default.distinct("tags");
        const priceRange = await Product_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" },
                },
            },
        ]);
        res.json({
            success: true,
            data: {
                brands: brands.sort(),
                colors: colors.sort(),
                sizes: ["S", "M", "L", "XL"],
                tags: tags.sort(),
                priceRange: priceRange[0] || { minPrice: 0, maxPrice: 500 },
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
});
exports.default = router;
