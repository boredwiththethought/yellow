import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { connectToDatabase, getDb } from "./db.js";
import { ObjectId } from "mongodb";

const app = express();

app.use(cors({ origin: ["http://localhost:5173"], credentials: false }));
app.use(express.json());
app.use(morgan("dev"));

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
