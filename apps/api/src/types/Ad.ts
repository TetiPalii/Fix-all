import { Document } from "mongoose";

export interface IService extends Document {
  ownerId: string;
  title: { type: string; required: true };
  description: { type: string; required: true };
  cost: { type: string; required: true };
  deadline: { type: Date | ["ASAP", "FLEXIBLE", "NONE"]; default: "ASAP" };
  type: "job" | "service";
  category: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}
