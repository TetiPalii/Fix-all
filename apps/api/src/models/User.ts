import { Schema } from "mongoose";
import { IUser } from "../types/User";

const UserSchema = new Schema<IUser>({
  id: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["provider", "customer"], required: true },
  city: { type: String, required: true },
  allowMessages: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, default: null },
});
export default UserSchema;
