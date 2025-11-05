import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export const generateCsrfToken = () => crypto.randomBytes(32).toString("hex");

export const csrfMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const csrfHeader = req.headers["x-csrf-token"];
  const csrfCookie = req.cookies["csrfToken"];

  // Zezwól tylko, jeśli tokeny się zgadzają
  if (req.method !== "GET" && csrfHeader !== csrfCookie) {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }

  next();
};
