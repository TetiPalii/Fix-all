import express, { Request, Response } from "express";
import { RegisterSchema } from "../schemas/auth.schema";
import { ZodError } from "zod";
import User from "../models/User";

const registerRouter = express.Router();
registerRouter.post("/register", async (req: Request, res: Response) => {
  try {
    console.log("Register endpoint was called");
    console.log("REQ BODY:", req.body);
    const parsedBody = RegisterSchema.parse(req.body);

    console.log("Parsed body:", parsedBody);

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Invalid request data", errors: error.issues });
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default registerRouter;
