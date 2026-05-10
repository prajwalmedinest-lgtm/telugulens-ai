import crypto from 'crypto';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers['x-request-id']?.toString() || crypto.randomUUID();
  (req as any).requestId = requestId;
  res.setHeader('x-request-id', requestId);
  next();
};

export const jsonLogger = morgan((tokens, req: Request, res: Response) => {
  const payload = {
    requestId: (req as any).requestId,
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: Number(tokens.status(req, res)),
    durationMs: Number(tokens['response-time'](req, res) || 0),
    contentLength: tokens.res(req, res, 'content-length'),
    userAgent: tokens['user-agent'](req, res),
    remoteAddr: tokens['remote-addr'](req, res),
    time: tokens.date(req, res, 'iso'),
  };

  return JSON.stringify(payload);
});
