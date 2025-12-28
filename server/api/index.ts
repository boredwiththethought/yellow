import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { MongoClient, Db, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const app = express();

// CORS configuration for Vercel
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
  /\.vercel\.app$/,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowed = allowedOrigins.some((o) =>
        o instanceof RegExp ? o.test(origin) : o === origin
      );
      callback(null, allowed);
    },
    credentials: true,
  })
);

app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB || "fascodb";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connectToDatabase() {
  if (db && client) return { client, db };
  const mongo = new MongoClient(uri);
  await mongo.connect();
  client = mongo;
  db = mongo.db(dbName);
  return { client, db };
}

function getDb(): Db {
  if (!db) throw new Error("Database not initialized");
  return db;
}

// JWT Configuration
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

// Validation schemas
const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Health check
app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    await connectToDatabase();
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ status: "error", error: (e as Error).message });
  }
});

// Get all products with filters
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

// Get single product
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

// Get filter options
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

// Create order
app.post("/api/orders", async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const db = getDb();
    const orderData = req.body;

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

// Auth: Register
app.post("/api/auth/register", async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.issues.map((i) => ({
          field: i.path[0],
          message: i.message,
        })),
      });
    }

    const { email, password, firstName, lastName } = validation.data;
    const db = getDb();

    const existingUser = await db
      .collection("users")
      .findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: true,
    };

    const result = await db.collection("users").insertOne(newUser);

    const token = jwt.sign(
      { userId: result.insertedId.toString(), email: newUser.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: result.insertedId,
        email: newUser.email,
        firstName,
        lastName,
      },
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: (e as Error).message,
    });
  }
});

// Auth: Login
app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.issues.map((i) => ({
          field: i.path[0],
          message: i.message,
        })),
      });
    }

    const { email, password } = validation.data;
    const db = getDb();

    const user = await db
      .collection("users")
      .findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: (e as Error).message,
    });
  }
});

// Auth: Forgot Password
app.post("/api/auth/forgot-password", async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const db = getDb();
    // Check if user exists (for future email sending functionality)
    await db.collection("users").findOne({ email: email.toLowerCase() });

    // Always return success to prevent email enumeration
    res.json({
      success: true,
      message: "If this email exists, a reset code has been sent",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: (e as Error).message,
    });
  }
});

// Export for Vercel
export default app;
