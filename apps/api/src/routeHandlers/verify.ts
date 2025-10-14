import { Request, Response } from "express";
import User from "../models/User";
import crypto from "crypto";

const verifyRouter = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;

    if (!token) return res.status(400).json({ message: "Missing token" });
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({ verificationToken: hashedToken });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    if (user.verificationTokenExpires.getTime() < Date.now()) {
      return res.status(400).json({ message: "Token wygasł. Zarejestruj się ponownie." });
    }

    user.isVerified = true;
    user.verificationToken = "";
    user.verificationTokenExpires = new Date(0);
    await user.save();
    return res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyRouter;
