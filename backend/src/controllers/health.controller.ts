import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'TeluguLens AI Backend is healthy',
    timestamp: new Date().toISOString(),
  });
};
