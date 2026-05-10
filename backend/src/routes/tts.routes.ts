import { Router } from 'express';
import { ttsController } from '../controllers/tts.controller.js';

const router = Router();

router.post('/tts', ttsController);

export default router;
