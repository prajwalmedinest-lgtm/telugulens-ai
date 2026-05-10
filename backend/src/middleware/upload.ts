import multer from 'multer';
import { Request } from 'express';

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  const allowedExt = ['.pdf', '.jpg', '.jpeg', '.png', '.webp'];

  const name = file.originalname || '';
  const ext = name.slice(name.lastIndexOf('.')).toLowerCase();

  if (!allowedMimes.includes(file.mimetype) || !allowedExt.includes(ext)) {
    return cb(new Error('Only PDF and Image files (JPEG, PNG, WEBP) are allowed!'));
  }

  // reject potentially dangerous mime types
  if (file.mimetype === 'application/x-msdownload' || file.mimetype === 'application/x-sh') {
    return cb(new Error('Disallowed file type'));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});
