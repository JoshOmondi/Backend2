import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface ExtendedRequest extends Request {
  user?: JwtPayload; // Add a custom `user` field to the Request object
}

// Middleware to verify token
export const verifyToken = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from `Authorization: Bearer <token>`

  if (!token) {
    res.status(401).json({ message: "Access Denied. No token provided." });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY as string;
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = decoded; // Attach decoded token payload to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(403).json({ message: "Forbidden. User details not found." });
    return;
  }

  if (req.user.role !== "admin") {
    res
      .status(403)
      .json({ message: "Access Denied. Admin privileges required." });
    return;
  }

  next();
};
