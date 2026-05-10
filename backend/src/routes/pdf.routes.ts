import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { analyzePDF } from '../controllers/pdf.controller.js';
import { uploadLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/upload', uploadLimiter, upload.single('file'), analyzePDF);

export default router;
