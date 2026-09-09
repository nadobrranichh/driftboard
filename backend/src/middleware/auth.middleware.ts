import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../config/db.js";
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
    const userFromDb = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });
    if (!userFromDb) return res.status(404).json({ error: "User not found" });
    else req.user = userFromDb;
    next();
  });
}

export default authenticateToken;
