import { Router } from "express";
import authenticateToken from "../middleware/auth.middleware.js";

const router = Router();

router.get("/boards", authenticateToken, () => {});

router.get("/boards/:id", authenticateToken, () => {});

router.post("/boards", authenticateToken, () => {});

router.patch("/boards/:id", authenticateToken, () => {});

router.delete("/boards/:id", authenticateToken, () => {});

router.post("/boards/:id/members", authenticateToken, () => {});

export default router;
