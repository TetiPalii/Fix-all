import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API działa 🚀");
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
