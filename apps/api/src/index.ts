import express from "express";
import cors from "cors";
import healthRouter from "./routeHandlers/health";
import { connectDB } from "./db";
import * as dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API działa 🚀");
});

app.use("/api", healthRouter);
app.use("/auth", authRoutes);

async function startServer() {
  await connectDB(process.env.MONGODB_URI as string);

  app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
  });
}

startServer();
