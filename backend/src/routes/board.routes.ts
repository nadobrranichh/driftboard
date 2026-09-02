import { Router } from "express";
import authenticateToken from "../middleware/auth.middleware.js";
import {
  addMemberToBoard,
  createBoard,
  deleteBoard,
  getBoard,
  getBoards,
  updateBoard,
} from "../controllers/board.controller.js";

const router = Router();

router.get("/boards", authenticateToken, getBoards);

router.get("/boards/:id", authenticateToken, getBoard);

router.post("/boards", authenticateToken, createBoard);

router.patch("/boards/:id", authenticateToken, updateBoard);

router.delete("/boards/:id", authenticateToken, deleteBoard);

router.post("/boards/:id/members", authenticateToken, addMemberToBoard);

export default router;
