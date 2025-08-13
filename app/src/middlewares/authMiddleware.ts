import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Teacher } from "../models/teacher";
import { Librarian } from "../models/librarian";

export interface AuthRequest extends Request {
  user?: any;
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Token not provided." });
    return;
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ message: "Invalid token." });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || "defaultSecret";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Expired or invalid token." });
    return;
  }
}

export function authorizeTeacher(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized." });
    return;
  }

  const userInstance = Object.setPrototypeOf(req.user, Teacher.prototype);
  if (!(userInstance instanceof Teacher)) {
    res.status(403).json({ message: "Access denied. Teacher role required." });
    return;
  }

  next();
}

export function authorizeLibrarian(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized." });
    return;
  }

  const userInstance = Object.setPrototypeOf(req.user, Librarian.prototype);
  if (!(userInstance instanceof Librarian)) {
    res.status(403).json({ message: "Access denied. Librarian role required." });
    return;
  }

  next();
}
