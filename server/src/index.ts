import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { connectToDatabase, getDb } from "./db.js";
import { ObjectId } from "mongodb";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/auth", authRoutes);

app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    await connectToDatabase();
    res.json({ status: "ok" });
  } catch (e) {
    res.status(500).json({ status: "error", error: (e as Error).message });
  }
});

app.get("/api/items", async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const db = getDb();
    const query: any = {};

    const { category, brand, color, priceMin, priceMax } = req.query;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (color) query.color = color;
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }
    const items = await db
      .collection("fascocollection")
      .find(query)
      .limit(100)
      .toArray();
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
});

app.post("/api/items", async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const db = getDb();
    const doc = req.body ?? {};
    if (typeof doc !== "object" || Array.isArray(doc)) {
      return res.status(400).json({ error: "Body must be an object" });
    }
    const result = await db.collection("fascocollection").insertOne(doc);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
});

app.delete("/api/items/:id", async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const db = getDb();
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid id" });
    const result = await db
      .collection("fascocollection")
      .deleteOne({ _id: new ObjectId(id) });
    res.json({ deletedCount: result.deletedCount });
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
});

app.get("/api/filters", async (_req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const db = getDb();
    const categories = await db
      .collection("fascocollection")
      .distinct("category");
    const brands = await db.collection("fascocollection").distinct("brand");
    const colors = await db.collection("fascocollection").distinct("color");
    res.json({ categories, brands, colors });
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
});


app.get("/api/products", async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const db = getDb();
    const query: any = {};

    const {
      collection,
      category,
      sizes,
      colors,
      brands,
      minPrice,
      maxPrice,
      tags,
      sort,
      search,
    } = req.query;


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
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }


    if (tags && typeof tags === "string" && tags.length > 0) {
      const tagArray = tags.split(",");
      query.tags = { $in: tagArray };
    }


    if (search && typeof search === "string") {
      query.name = { $regex: search, $options: "i" };
    }


    let sortOption: any = {};
    if (sort === "price-asc") {
      sortOption.price = 1;
    } else if (sort === "price-desc") {
      sortOption.price = -1;
    } else if (sort === "rating") {
      sortOption.rating = -1;
    } else if (sort === "name") {
      sortOption.name = 1;
    } else {
      sortOption.createdAt = -1;
    }

 
    const pageParam = req.query.page ? parseInt(String(req.query.page), 10) : 1;
    const limitParam = req.query.limit
      ? parseInt(String(req.query.limit), 10)
      : 24;
    const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
    const limit =
      Number.isFinite(limitParam) && limitParam > 0 && limitParam <= 100
        ? limitParam
        : 24;
    const skip = (page - 1) * limit;

    const total = await db.collection("products").countDocuments(query);
    const products = await db
      .collection("products")
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .toArray();

    const pages = Math.max(1, Math.ceil(total / limit));

    res.json({
      success: true,
      count: products.length,
      total,
      page,
      pages,
      limit,
      data: products,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: (e as Error).message,
    });
  }
});




app.get("/api/products/:id", async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const db = getDb();
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product id" });
    }
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: (e as Error).message,
    });
  }
});


app.post("/api/orders", async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const db = getDb();
    const orderData = req.body;

 
    console.log("\n=== NEW ORDER RECEIVED ===");
    console.log("Customer:", orderData.customer);
    console.log("Items:", orderData.items);
    console.log("Payment:", orderData.payment);
    console.log("Delivery:", orderData.delivery);
    console.log("Total:", orderData.total);
    console.log("Created At:", orderData.createdAt);
    console.log("========================\n");

    const result = await db.collection("orders").insertOne({
      ...orderData,
      status: "pending",
      createdAt: new Date(orderData.createdAt),
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: result.insertedId,
    });
  } catch (e) {
    console.error("Order creation error:", e);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: (e as Error).message,
    });
  }
});

app.get(
  "/api/products/filters/options",
  async (_req: Request, res: Response) => {
    try {
      await connectToDatabase();
      const db = getDb();

      const brands = await db.collection("products").distinct("brand");
      const colors = await db.collection("products").distinct("colors");
      const tags = await db.collection("products").distinct("tags");

      const priceRange = await db
        .collection("products")
        .aggregate([
          {
            $group: {
              _id: null,
              minPrice: { $min: "$price" },
              maxPrice: { $max: "$price" },
            },
          },
        ])
        .toArray();

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
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: (e as Error).message,
      });
    }
  }
);

const PORT = Number(process.env.PORT || 5000);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  });
