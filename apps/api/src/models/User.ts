import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/User";

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["provider", "customer"], required: true },
  location: { type: String, required: true },
  allowMessages: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  avatarUrl: { type: String, default: null },
});
export default mongoose.model<IUser>("User", UserSchema);
