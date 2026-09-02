import type { Request, Response } from "express";
import prisma from "../config/db.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000; // 1 day

function setAuthCookie(res: Response, token: String) {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing email or password" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isValid = await argon2.verify(user.passwordHash, password);
  if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

  const accessToken = jwt.sign(user, JWT_SECRET, {
    expiresIn: "1d",
  });

  setAuthCookie(res, accessToken);

  res.json({
    message: "Logged in successfully",
    user: { id: user.id, name: user.name, email: user.email },
  });
}

export async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(403).json({ error: "Missing required data" });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return res.status(403).json({ message: "Email already in use" });

  const passwordHash = await argon2.hash(password);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });

  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1d" });

  setAuthCookie(res, accessToken);

  res.status(201).json({
    message: "Signed up successfully",
    user: { id: user.id, name: user.name, email: user.email },
  });
}
