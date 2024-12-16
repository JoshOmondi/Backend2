import { Router, Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} from "../services/farmerServices";

const userRouter = Router();

// Get all users
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

// Get user by ID
userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(Number(id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
});

// Create a new user
userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await createUser(name, email, password);
    res.status(201).json({ message: "User created successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
});

// Delete user
userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(Number(id));
    res.status(200).json({ message: "User deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
});

export default userRouter;
