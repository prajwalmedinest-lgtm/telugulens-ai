import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub?: string };
    if (!payload || !payload.sub) return res.status(401).json({ message: 'Unauthorized' });

    (req as any).userId = payload.sub;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
