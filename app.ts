import express from "express";
import productRoutes from "./routes/productRoutes";
import farmerRoutes from "./routes/farmerRoutes";
import { connectToDatabase } from "./config/dbConfig";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/farmers", farmerRoutes);

// Error Handler Middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Server Error" });
  }
);

// Connect to database
connectToDatabase();

export default app;
