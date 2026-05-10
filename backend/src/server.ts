import express, { Request, Response } from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { applySecurity } from './middleware/security.js';
import { globalLimiter } from './middleware/rateLimit.js';
import { responseFormat } from './middleware/responseFormat.js';
import * as Sentry from '@sentry/node';
import { jsonLogger, requestIdMiddleware } from './middleware/requestLogger.js';

const app = express();
const PORT = env.PORT || 5000;

// Initialize Sentry if configured
if (env.SENTRY_DSN) {
  Sentry.init({ dsn: env.SENTRY_DSN, environment: env.NODE_ENV });
  app.use(Sentry.Handlers.requestHandler());
}

// Security middlewares (helmet, compression, xss, hpp)
applySecurity(app);

// Request correlation
app.use(requestIdMiddleware);

// Logging
app.use(jsonLogger);

// Rate limiting
app.use(globalLimiter);

// Standardized response format
app.use(responseFormat);

// Cors and parsers
app.use(cors({
  origin: env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.send('TeluguLens AI Backend Running');
});

// Routes
import mainRouter from './routes/index.js';
app.use('/api/v1', mainRouter);
app.use('/api', mainRouter);

// Global Error Handling Middleware
if (env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`👉 Environment: ${env.NODE_ENV}`);
});
