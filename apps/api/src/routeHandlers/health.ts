import express, { Request, Response } from "express";

const healthRouter = express.Router();
healthRouter.get("/health", async (req: Request, res: Response) => {
  console.log("Health check endpoint was called");
  return res.status(200).json({ status: "ok  123" });
});

export default healthRouter;
