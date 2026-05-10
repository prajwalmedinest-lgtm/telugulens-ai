import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { analyzeMedicalDocument } from '../controllers/hospital.controller.js';
import { uploadLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/hospital', uploadLimiter, upload.single('file'), analyzeMedicalDocument);

export default router;
