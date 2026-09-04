import { Router } from "express";
import authenticateToken from "../middleware/auth.middleware.js";
import {
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = Router();

router.post("/tasks", authenticateToken, addTask);

router.patch("/tasks/:id", authenticateToken, updateTask);

router.delete("/tasks/:id", authenticateToken, deleteTask);

export default router;
