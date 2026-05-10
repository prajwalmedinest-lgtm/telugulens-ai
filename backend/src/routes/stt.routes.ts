import { Router } from 'express';
import { transcribeSpeech } from '../controllers/stt.controller.js';
import { audioUpload } from '../middleware/audioUpload.js';
import { aiLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/stt', aiLimiter, audioUpload.single('audio'), transcribeSpeech);

export default router;
