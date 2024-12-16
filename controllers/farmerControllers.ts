import { Request, Response, NextFunction } from "express";
import Farmer from "../models/farmerModels";

/**
 * Get all farmers with their products.
 */
export const getAllFarmers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Retrieve all farmers and their associated products
    const farmers = await Farmer.getAllFarmers();
    const farmersWithProducts = await Promise.all(
      farmers.map(async (farmer) => {
        const products = await Farmer.getFarmerProducts(farmer.id);
        return { ...farmer, products };
      })
    );
    res.status(200).json(farmersWithProducts);
  } catch (error) {
    console.error("Error fetching all farmers:", error);
    next(error);
  }
};

/**
 * Create a new farmer.
 */
export const createFarmer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, location } = req.body;

    // Validate input
    if (!name || !email) {
      res.status(400).json({ message: "Name and email are required" });
      return;
    }

    // Create the farmer
    const result = await Farmer.createFarmer(name, email, location);
    const createdFarmer = await Farmer.getFarmerById(result.insertId);

    res.status(201).json(createdFarmer);
  } catch (error) {
    console.error("Error creating farmer:", error);
    next(error);
  }
};
