import { Request, Response } from "express";
import { RegisterSchema } from "../schemas/auth.schema";
import { ZodError } from "zod";
import User from "../models/User";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendEmail } from "../utils/sendMail";

const registerRouter = async (req: Request, res: Response) => {
  try {
    console.log("Register endpoint was called");

    const parsedBody = RegisterSchema.parse(req.body);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(parsedBody.password, 10);
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    const newUser = new User({
      ...parsedBody,
      password: passwordHash,
      verificationToken: hashedToken,
      verificationTokenExpires: Date.now() + 1000 * 60 * 60,
      isVerified: false,
    });

    await sendEmail(newUser.email, rawToken);
    await newUser.save();

    return res
      .status(201)
      .json({ message: "Użytkownik utworzony. Sprawdź e-mail, aby aktywować konto." });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Invalid request data", errors: error.issues });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default registerRouter;
