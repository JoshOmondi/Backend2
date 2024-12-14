// src/controllers/farmerController.ts
import { Request, Response, NextFunction } from "express";
import Farmer from "../models/farmerModels";

export const getAllFarmers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const farmers = await Farmer.findAll({ include: "Products" });
    res.status(200).json(farmers);
  } catch (error) {
    next(error);
  }
};
export const createFarmer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const farmer = await Farmer.create(req.body);
    res.status(201).json(farmer);
  } catch (error) {
    next(error);
  }
};
