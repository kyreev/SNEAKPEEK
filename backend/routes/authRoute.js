import express from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Define routes
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
