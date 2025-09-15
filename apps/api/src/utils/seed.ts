import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import csv from "csvtojson";
import * as dotenv from "dotenv";
import { connectDB } from "../db";
import Location from "../models/Location";
dotenv.config();

type RawRec = Record<string, any>;

function normalizeKey(k: string) {
  return k
    .replace(/\uFEFF/g, "") // deletes BOM
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_") // spaces -> _
    .replace(/[^A-Z0-9_]/g, ""); // remove non-alphanumeric characters
}

function mapRecord(raw: RawRec) {
  const norm: Record<string, any> = {};

  for (const [key, value] of Object.entries(raw)) {
    const nk = normalizeKey(String(key));
    norm[nk] = value;
  }

  const mapped = {
    WOJ: norm["WOJ"] ?? undefined,
    POWIAT: norm["POW"] ?? norm["POWIAT"] ?? undefined,
    GMINA: norm["GMI"] ?? norm["GMINA"] ?? undefined,
    RODZ: (() => {
      const r = norm["RODZ"];
      if (r === "" || r == null) return undefined;
      return !isNaN(Number(r)) ? Number(r) : r;
    })(),
    NAZWA: norm["NAZWA"] ?? undefined,
    NAZWA_DOD: norm["NAZWA_DOD"] ?? norm["NAZWADOD"] ?? undefined,
    STAN_NA: norm["STAN_NA"] ?? undefined,
  };

  return mapped;
}

async function seedLocations() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI nie ustawione w .env");
    await connectDB(uri);

    await Location.deleteMany({});

    const filePath = path.resolve(process.cwd(), "data", "csvjson.json");
    if (!fs.existsSync(filePath)) throw new Error(`Plik nie istnieje: ${filePath}`);

    let raw: RawRec[] = [];

    const txt = fs.readFileSync(filePath, "utf8");
    raw = JSON.parse(txt);

    console.log("raw records:", raw.length);
    if (!Array.isArray(raw) || raw.length === 0)
      throw new Error("Brak rekordów w pliku źródłowym.");

    const mapped = raw.map(mapRecord);

    console.log("Przykładowe zmapowane rekordy (pierwsze 3):", mapped.slice(0, 3));

    const toInsert = mapped.map((m) => {
      const out: Record<string, any> = {};
      if (m.WOJ !== undefined) out.WOJ = m.WOJ;
      if (m.POWIAT !== undefined) out.POWIAT = m.POWIAT;
      if (m.GMINA !== undefined) out.GMINA = m.GMINA;
      if (m.RODZ !== undefined) out.RODZ = m.RODZ;
      if (m.NAZWA !== undefined) out.NAZWA = m.NAZWA;
      if (m.NAZWA_DOD !== undefined) out.NAZWA_DOD = m.NAZWA_DOD;
      if (m.STAN_NA !== undefined) out.STAN_NA = m.STAN_NA;
      return out;
    });

    const nonEmptyCount = toInsert.filter((o) => Object.keys(o).length > 0).length;
    console.log("Liczba dokumentów do wstawienia (nie-pustych):", nonEmptyCount);
    if (nonEmptyCount === 0)
      throw new Error("Po mapowaniu nie ma nic do wstawienia — sprawdź nazwy nagłówków w pliku.");

    const res = await Location.insertMany(toInsert, { ordered: false });
    console.log("Inserted documents:", res.length);
  } catch (err) {
    console.error("Error seeding locations:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedLocations();
