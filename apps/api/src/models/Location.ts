import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ILocation } from "../types/Location";

export const LocationSchema = new Schema<ILocation>(
  {
    NAZWA: { type: String, index: true },
    WOJ: { type: String, index: true },
    POW: { type: String },
    GMI: { type: String },
    NAZWA_DOD: { type: String, index: true },
    RODZ: { type: String, index: true },
  },

  { timestamps: true }
);

export default mongoose.model<ILocation>("Location", LocationSchema);
