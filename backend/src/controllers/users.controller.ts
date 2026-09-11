import type { Request, Response } from "express";
import prisma from "../config/db.js";

export async function getUserByEmail(req: Request, res: Response) {
  const { email } = req.query;

  if (typeof email !== "string" || !email.trim()) {
    return res.status(400).json({ error: "Email query param is required" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true },
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  return res.json({ user });
}
