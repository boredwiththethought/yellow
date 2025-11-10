import express from "express";
import filterRoutes from "./filterRoutes";

const router = express.Router();

router.use("/filters", filterRoutes);

export default router;
