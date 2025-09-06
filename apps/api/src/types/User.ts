import { Document } from "mongoose";

export interface IUser extends Document {
  email: { type: string; required: true };
  name: { type: string; required: true };
  password: { type: string; required: true };
  role: { type: "provider" | "customer"; required: true };
  location: { type: string; required: true };
  allowMessages: { type: boolean; default: false };
  avatarUrl?: { type: string; default: null };
  createdAt: Date;
  updatedAt: Date;
}
