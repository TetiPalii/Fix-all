import express from "express";
import registerRouter from "../routeHandlers/register";
import verifyRouter from "../routeHandlers/verify";
import { loginRouter } from "../routeHandlers/login";

export const authRoutes = express.Router();

authRoutes.post("/register", registerRouter);
authRoutes.get("/verify", verifyRouter);
authRoutes.post("/login", loginRouter);

export default authRoutes;
