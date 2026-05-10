import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller.js';
import { chatController, getChatHistory, streamChatController } from '../controllers/chat.controller.js';
import pdfRoutes from './pdf.routes.js';
import hospitalRoutes from './hospital.routes.js';
import ttsRoutes from './tts.routes.js';
import authRoutes from './auth.routes.js';
import sttRoutes from './stt.routes.js';
import { aiLimiter, uploadLimiter } from '../middleware/rateLimit.js';

const router = Router();

// Health
router.get('/health', healthCheck);

// Chat
// Chat
router.post('/chat', aiLimiter, chatController);
router.post('/chat/stream', aiLimiter, streamChatController);
router.get('/history/:conversationId', aiLimiter, getChatHistory);

// PDF Analysis
router.use('/', pdfRoutes);

// TTS
router.use('/', ttsRoutes);

// Hospital Explainer
router.use('/', hospitalRoutes);

// Auth
router.use('/auth', authRoutes);

// STT
router.use('/', sttRoutes);

// Uploads - protect upload endpoints with stricter limiter if routes defined
router.use('/uploads', uploadLimiter);

export default router;
