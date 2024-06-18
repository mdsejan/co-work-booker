import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

interface JwtPayload {
  id: string;
  role: string;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret || "") as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(403).json({ message: "JWT token expired" });
  }
};
