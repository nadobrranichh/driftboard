import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.token || null;
  if (!token) return res.status(401).json({ error: "No token found" });

  jwt.verify(token, process.env.JWT_SECRET!, async (err, decoded) => {
    if (err || !decoded?.id)
      return res.status(401).json({ error: "Invalid token" });
    req.user = { id: decoded.id };
    next();
  });
}

export default authenticateToken;
