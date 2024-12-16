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
