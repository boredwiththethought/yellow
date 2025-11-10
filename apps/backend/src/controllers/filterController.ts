import Category from "../models/Category";
import Size from "../models/Size";
import Color from "../models/Color";
import Brand from "../models/Brand";
import Tag from "../models/Tag";
import { Request, Response } from "express";

export const getFilters = async (req: Request, res: Response) => {
  try {
    const collections = await Category.find();
    const sizes = await Size.find();
    const colors = await Color.find();
    const brands = await Brand.find();
    const tags = await Tag.find();
    res.json({ collections, sizes, colors, brands, tags });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch filters" });
  }
};
