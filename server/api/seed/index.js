"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = __importDefault(require("../models/Product"));
const products_1 = require("./products");
dotenv_1.default.config();
const seedDatabase = async () => {
    try {
        const mongoURI = process.env.MONGO_URI ||
            "mongodb+srv://iamartykov_db_user:AgwpeQiDPiAomc5E@fasco.mpr3qez.mongodb.net/";
        console.log("🔌 Connecting to MongoDB...");
        await mongoose_1.default.connect(mongoURI);
        console.log("✅ Connected to MongoDB");
        console.log("🗑️  Clearing existing products...");
        await Product_1.default.deleteMany({});
        console.log("✅ Products cleared");
        console.log("📦 Adding fake products...");
        await Product_1.default.insertMany(products_1.fakeProducts);
        console.log(`✅ Added ${products_1.fakeProducts.length} products`);
        const stats = await Product_1.default.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                },
            },
        ]);
        console.log("\n📊 Products by category:");
        stats.forEach((stat) => {
            console.log(`  ${stat._id}: ${stat.count}`);
        });
        console.log("\n✨ Database seeded successfully!");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};
seedDatabase();
