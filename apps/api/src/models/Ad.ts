import mongoose, { Schema } from "mongoose";
import { IService } from "../types/Ad";
import { Categories } from "../types/Categories";

const adSchema = new Schema<IService>({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: String, required: true },
  deadline: {
    type: mongoose.Schema.Types.Mixed,
    default: "ASAP",
    validate: {
      validator: (value: any) => {
        if (value instanceof Date) return true;
        const deadlineOptions = ["ASAP", "FLEXIBLE", "NONE"];
        return deadlineOptions.includes(value);
      },
      message: (props) => `${props.value} is not a valid deadline option!`,
    },
  },
  adType: { type: String, enum: ["job", "service"], required: true },
  category: {
    type: Categories,
    required: true,
    default: Categories.OTHER,
  },
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IService>("Ad", adSchema);
