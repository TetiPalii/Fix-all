import { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  email: string;
  name: string;
  password: string;
  role: "provider" | "customer";
  city: string;
  allowMessages: boolean;
  createdAt: Date;
  image?: string;
}
