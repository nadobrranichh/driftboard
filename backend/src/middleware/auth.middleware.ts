import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1] || null;
  if (!token) return res.status(401).json({ error: "No token found" });

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    if (user) req.user = user;
    next();
  });
}

export default authenticateToken;
