import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { LoginSchema } from "../schemas/auth.schema";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { generateCsrfToken } from "../middlewares/csrf.middleware";

export const loginRouter = async (req: Request, res: Response) => {
  try {
    const { error } = LoginSchema.safeParse(req.body);
    if (error) {
      return res.status(400).json({ message: "Invalid request data", errors: error.issues });
    }

    const parsedBody = LoginSchema.parse(req.body);

    const user = await User.findOne({ email: parsedBody.email });

    const isValidPassword = await bcrypt.compare(parsedBody.password, user?.password || "");
    console.log("Is valid password:", isValidPassword);

    if (!user || !isValidPassword || !user.isVerified) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    const csrfToken = generateCsrfToken();

    // Refresh token w cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // CSRF token w cookie (czytelny dla JS)
    res.cookie("csrfToken", csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({ accessToken });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
