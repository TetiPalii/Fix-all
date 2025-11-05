import express from "express";
import registerRouter from "../routeHandlers/register";
import verifyRouter from "../routeHandlers/verify";
import { loginRouter } from "../routeHandlers/login";
import { refreshRouter } from "../routeHandlers/refresh";

export const authRoutes = express.Router();

authRoutes.post("/register", registerRouter);
authRoutes.get("/verify", verifyRouter);
authRoutes.post("/login", loginRouter);
authRoutes.post("/refresh", refreshRouter);

export default authRoutes;
