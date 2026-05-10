import { Request, Response, NextFunction } from 'express';

export const responseFormat = (req: Request, res: Response, next: NextFunction) => {
  const oldJson = res.json.bind(res);

  res.json = (body: any) => {
    // If already standardized, pass through
    if (body && typeof body === 'object' && ('success' in body)) {
      return oldJson(body);
    }

    const payload = {
      success: true,
      data: body,
    };
    return oldJson(payload);
  };

  // error helper
  res.sendError = (message: string, status = 400): void => {
    res.status(status).json({ success: false, error: message });
  };

  next();
};

declare module 'express-serve-static-core' {
  interface Response {
    sendError?: (message: string, status?: number) => void;
  }
}
