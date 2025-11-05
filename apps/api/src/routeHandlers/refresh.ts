import { Response, Request } from "express";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt";

interface RequestWithCookies extends Request {
  cookies: { [key: string]: string };
}

export const refreshRouter = async (req: RequestWithCookies, res: Response) => {
  const token = req.cookies["refreshToken"];
  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const payload = verifyRefreshToken(token) as any;
    const newAccessToken = generateAccessToken(payload.userId);
    return res.json({ accessToken: newAccessToken });
  } catch {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};
