// middlewares/auth.middleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const SECRET = "000765776474";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: 'Chưa đăng nhập' });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET || 'secret');
    req.user = decoded; // Gắn user vào req
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ' });
    return;
  }
};