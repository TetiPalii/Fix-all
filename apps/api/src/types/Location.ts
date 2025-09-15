import mongoose, { Document } from "mongoose";

export interface ILocation extends Document {
  NAZWA: string; // "Częstochowa"
  WOJ: string; // "Śląskie"
  POW: string; // powiat (opcjonalnie)
  GMI: string; // gmina (opcjonalnie)
  NAZWA_DOD: string;
  RODZ: string;
}
