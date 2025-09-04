import express from "express";
import cors from "cors";

const healthRouter = express.Router();
healthRouter.get("/health", async (req, res) => {
  console.log("Health check endpoint was called");
  return res.status(200).json({ status: "ok" });
});

export default healthRouter;
