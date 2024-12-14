// src/routes/productRoutes.ts
import express from "express";
import {
  getAllProducts,
  createProduct,
} from "../controllers/productControllers";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);

export default router;

// src/routes/farmerRoutes.ts
import express from "express";
import { getAllFarmers, createFarmer } from "../controllers/farmerControllers";

const router = express.Router();

router.get("/", getAllFarmers);
router.post("/", createFarmer);

export default router;
