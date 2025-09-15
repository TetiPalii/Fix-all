import { Types } from "mongoose";
import { IUser } from "./User";

export interface IMessage extends Document {
  sender: Types.ObjectId | IUser;
  recipient: Types.ObjectId | IUser;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
