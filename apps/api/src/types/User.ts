import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  role: "provider" | "customer";
  location: string;
  allowMessages: boolean;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  verificationToken: String;
  verificationTokenExpires: Date;
  isVerified?: boolean;
}
