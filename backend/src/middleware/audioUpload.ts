import multer from 'multer';
import { Request } from 'express';

const storage = multer.memoryStorage();

const allowedMimes = new Set([
  'audio/webm',
  'audio/ogg',
  'audio/wav',
  'audio/x-wav',
  'audio/mpeg',
  'audio/mp4',
  'video/webm',
]);

export const audioUpload = multer({
  storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (allowedMimes.has(file.mimetype)) return cb(null, true);
    return cb(new Error('Only audio recordings are allowed'));
  },
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});
