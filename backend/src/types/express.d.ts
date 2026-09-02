import { JwtPayload } from "jsonwebtoken";

interface AuthPayload {
  id: number;
  email: string;
  name?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export {};
