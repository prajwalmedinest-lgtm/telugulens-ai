import { Request, Response } from 'express';
import { z } from 'zod';
import * as authService from '../services/auth.service.js';

const signupSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signup = async (req: Request, res: Response) => {
  try {
    const parsed = signupSchema.parse(req.body);

    const existing = await authService.findUserByEmail(parsed.email);
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const user = await authService.createUser(parsed.fullName, parsed.email, parsed.password);
    const token = authService.generateToken(user.id);

    return res.status(201).json({
      user: { id: user.id, fullName: user.fullName, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt },
      token,
    });
  } catch (err: any) {
    if (err?.name === 'ZodError') return res.status(400).json({ message: 'Invalid input', details: err.errors });
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.parse(req.body);
    const user = await authService.findUserByEmail(parsed.email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await authService.comparePasswords(parsed.password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = authService.generateToken(user.id);
    return res.json({ user: { id: user.id, fullName: user.fullName, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt }, token });
  } catch (err: any) {
    if (err?.name === 'ZodError') return res.status(400).json({ message: 'Invalid input', details: err.errors });
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    // auth middleware sets req.userId
    const uid = (req as any).userId as string | undefined;
    if (!uid) return res.status(401).json({ message: 'Unauthorized' });

    const user = await authService.findUserById(uid);
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({ id: user.id, fullName: user.fullName, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
