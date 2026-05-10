Production readiness checklist and deployment notes for TeluguLens AI

1. Environment variables (backend/.env)
- DATABASE_URL=postgresql://user:pass@host:5432/dbname
- PORT=5000
- NODE_ENV=production
- FRONTEND_URL=https://your-frontend-url
- GEMINI_API_KEY=...
- GROK_API_KEY=...
- ELEVENLABS_API_KEY=...
- JWT_SECRET=strong-secret
- JWT_EXPIRES_IN=7d
- BCRYPT_SALT_ROUNDS=10
- SENTRY_DSN=optional

2. Database
- Use a managed Postgres provider (Neon or Supabase) with connection pooling (prefer PgBouncer or Neon recommended pooling).
- Ensure `DATABASE_URL` uses a connection pooler URL when scaling (Neon/pgbouncer).
- Create indexes for heavy queries (conversationId, userId, createdAt).

3. Prisma
- Run `npx prisma generate` and `npx prisma migrate deploy` in CI.
- Use `connection_limit` or pooler for high concurrency; consider setting `pgbouncer`.

4. Caching and AI cost optimizations
- TTS audio caching implemented (in-memory). For production, replace with Redis or object storage (S3/Supabase Storage) to persist cached audio and share across instances.
- Add response caching for repeated AI answers (Redis) with hashed prompt keys.
- Use summarization and prompt trimming on long conversations to reduce tokens.

5. File storage
- Use Supabase Storage or Cloudinary for uploaded PDFs and generated audio. Store only signed URLs in DB, not raw buffers.
- Implement lifecycle / retention policies in provider (expire audio after X days).

6. Security
- Helmet, compression, hpp, xss-clean, express-rate-limit, and morgan enabled.
- Keep `JWT_SECRET` secret; use HTTPS in production.
- Consider rotating secrets and using a secret manager.

7. Logging & Monitoring
- Sentry integration available (set `SENTRY_DSN`).
- morgan logs in combined format. Route logs to Logtail/Datadog via adapters in production.

8. Deployment
- Frontend: Vercel (recommended). Set `VITE_API_BASE_URL` to backend production URL.
- Backend: Render or Railway. Use Docker-based deployment or Node build.
- Database: Neon or Supabase.
- CI: build, run prisma migrate, and deploy. See `.github/workflows/ci.yml`.

9. Scaling
- Use horizontal scaling for API servers behind LB.
- Use Redis for shared cache and job queues (BullMQ) for heavy OCR/TTS processing.
- Offload heavy processing to background workers.

10. Next steps (recommended)
- Move in-memory cache to Redis and persist TTS to storage.
- Add refresh tokens + short-lived access tokens with httpOnly cookies.
- Add API key / quota system per user for AI usage tracking.
- Instrument request tracing (OpenTelemetry).

Additional system dependencies for OCR/PDF processing:
- Install Poppler utilities (pdftoppm) on the server to enable scanned PDF -> image rasterization: `sudo apt install poppler-utils`.
- Install Tesseract and Telugu traineddata on the server for OCR: `sudo apt install tesseract-ocr tesseract-ocr-tel` (or configure language training files).


---
This file summarizes initial production hardening implemented in the repo and recommended follow-ups.
