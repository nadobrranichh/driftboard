import { Router } from "express";
import {
  addColumn,
  deleteColumn,
  updateColumn,
} from "../controllers/column.controlller.js";
import authenticateToken from "../middleware/auth.middleware.js";

const router = Router();

router.post("/boards/:id/columns", authenticateToken, addColumn);

router.patch("/columns/:id", authenticateToken, updateColumn);

router.delete("/columns/:id", authenticateToken, deleteColumn);

export default router;
