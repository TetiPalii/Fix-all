import mongoose, { Document } from "mongoose";
import { Types } from "mongoose";
import { IUser } from "./User";
import { Categories } from "./Categories";
import { ILocation } from "./Location";

export type DeadlineOption = "ASAP" | "FLEXIBLE" | "NONE";

export interface IService extends Document {
  ownerId: Types.ObjectId | IUser;
  title: { type: string; required: true };
  description: { type: string; required: true };
  cost: { type: string; required: true };
  deadline: { type: Date | DeadlineOption; default: "ASAP" };
  adType: { type: "job" | "service"; required: true };
  category: {
    type: Categories;
    required: true;
    default: Categories.OTHER;
  };
  location: {
    type: Types.ObjectId | ILocation;
  };
  createdAt: Date;
  updatedAt: Date;
}
