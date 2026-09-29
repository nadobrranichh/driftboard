import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import type { ExtendedError, Socket } from "socket.io";
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

export function authenticateSocketConnection(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void,
) {
  cookieParser()(socket.handshake as any, {} as any, () => {
    try {
      const token = (socket.handshake as any).cookies?.token;
      if (!token) return next(new Error("Error: no token found"));

      const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      socket.data.user = { id: payload.id };
      next();
    } catch (error) {
      next(new Error("Error: authentication token invalid"));
    }
  });
}
