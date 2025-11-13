import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product";
import { fakeProducts } from "./products";

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI ||
      "mongodb+srv://iamartykov_db_user:AgwpeQiDPiAomc5E@fasco.mpr3qez.mongodb.net/";

    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");


    console.log("🗑️  Clearing existing products...");
    await Product.deleteMany({});
    console.log("✅ Products cleared");

    console.log("📦 Adding fake products...");
    await Product.insertMany(fakeProducts);
    console.log(`✅ Added ${fakeProducts.length} products`);


    const stats = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    console.log("\n📊 Products by category:");
    stats.forEach((stat: any) => {
      console.log(`  ${stat._id}: ${stat.count}`);
    });

    console.log("\n✨ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
