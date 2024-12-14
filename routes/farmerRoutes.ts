// src/routes/farmerRoutes.ts
import express from "express";
import { getAllFarmers, createFarmer } from "../controllers/farmerControllers";

const router = express.Router();

router.get("/", getAllFarmers);
router.post("/", createFarmer);

export default router;

// src/utils/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .json({ message: err.message || "Internal Server Error" });
};
