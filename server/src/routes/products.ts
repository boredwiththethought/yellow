import express from "express";
import type { Request, Response } from "express";
import Product from "../models/Product";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
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

    let query: any = {};


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

    const products = await Product.find(query).sort(sortOption);

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: (error as Error).message,
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: (error as Error).message,
    });
  }
});

router.get("/filters/options", async (_req: Request, res: Response) => {
  try {
    const brands = await Product.distinct("brand");
    const colors = await Product.distinct("colors");
    const tags = await Product.distinct("tags");

    const priceRange = await Product.aggregate([
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: (error as Error).message,
    });
  }
});

export default router;
