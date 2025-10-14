import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const loginRouter = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log("User found:", user);

  const isValidPassword = await bcrypt.compare(password, user?.password || "");
  console.log("Is valid password:", isValidPassword);

  if (!user || !isValidPassword || !user.isVerified) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  return res.status(200).json({ message: "Login successful" });
};
