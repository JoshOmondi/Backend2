import { Router } from "express";

const router = Router();

// Define your routes here
router.get("/products", (req, res) => {
  res.send("List of products");
});

export default router;
