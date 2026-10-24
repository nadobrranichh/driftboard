import { Router } from "express";
import authenticateToken from "../middleware/auth.middleware.js";
import { getUserByEmail } from "../controllers/users.controller.js";

const router = Router();

router.get("/users", authenticateToken, getUserByEmail);

export default router;
