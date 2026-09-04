import { Router } from "express";
import authenticateToken from "../middleware/auth.middleware.js";
import { login, signup } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

export default router;
