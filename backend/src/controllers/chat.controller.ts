import { Request, Response, NextFunction } from 'express';
import { runGemini } from '../services/gemini.service.js';
import { runGeminiStream } from '../services/gemini.service.js';
import { runGrok } from '../services/grok.service.js';
import prisma from '../lib/prisma.js';
import { contextService } from '../services/context.service.js';
import { summaryService } from '../services/summary.service.js';

export const chatController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { message, conversationId } = req.body;
    const normalizedConversationId = typeof conversationId === 'string' && conversationId.trim().length > 0
      ? conversationId
      : undefined;

    if (!message) {
      res.status(400).json({ status: 'error', message: 'Message is required' });
      return;
    }

    // 1. Get or Create Conversation
    let conversation;
    if (normalizedConversationId) {
      conversation = await prisma.conversation.findUnique({
        where: { id: normalizedConversationId },
      });
    }

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {},
      });
    }

    // 2. Save User Message
    await prisma.message.create({ data: { conversationId: conversation.id, role: 'user', content: message } });

    // 3. Build contextual prompt (memory + recent messages)
    const prompt = await contextService.buildPrompt(conversation.id, message);

    // 4. AI Reasoning (Gemini) using contextual prompt
    console.log(`[Chat] Reasoning with Gemini for conversation ${conversation.id}...`);
    const reasoning = await runGemini(prompt);

    // 5. Telugu Conversion (Grok)
    console.log(`[Chat] Converting to Telugu with Grok...`);
    const teluguResponse = await runGrok(reasoning);

    // 6. Save AI Response
    await prisma.message.create({ data: { conversationId: conversation.id, role: 'assistant', content: reasoning, teluguContent: teluguResponse } });

    // 7. Update memory asynchronously (summarize recent messages)
    (async () => {
      try {
        const recent = await contextService.loadRecentMessages(conversation.id, 50);
        await summaryService.summarizeAndPersist(conversation.id, recent);
      } catch (e) {
        console.warn('Failed to update memory:', e);
      }
    })();

    res.status(200).json({ status: 'success', response: teluguResponse, conversationId: conversation.id });
  } catch (error) {
    next(error);
  }
};

export const getChatHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { conversationId } = req.params;
    const normalizedConversationId = typeof conversationId === 'string' ? conversationId : conversationId?.[0];

    if (!normalizedConversationId) {
      res.status(400).json({ status: 'error', message: 'Conversation ID is required' });
      return;
    }

    const messages = await prisma.message.findMany({
      where: { conversationId: normalizedConversationId },
      orderBy: { createdAt: 'asc' },
    });

    res.status(200).json({
      status: 'success',
      messages,
    });
  } catch (error) {
    next(error);
  }
};

export const streamChatController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { message, conversationId } = req.body;
    const normalizedConversationId = typeof conversationId === 'string' && conversationId.trim().length > 0
      ? conversationId
      : undefined;

    if (!message) {
      res.status(400).json({ success: false, error: 'Message is required' });
      return;
    }

    let conversation;
    if (normalizedConversationId) {
      conversation = await prisma.conversation.findUnique({ where: { id: normalizedConversationId } });
    }

    if (!conversation) {
      conversation = await prisma.conversation.create({ data: {} });
    }

    await prisma.message.create({ data: { conversationId: conversation.id, role: 'user', content: message } });

    const prompt = `${await contextService.buildPrompt(conversation.id, message)}\n\nRespond in natural, conversational Telugu and keep the answer concise.`;

    res.status(200);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Conversation-Id', conversation.id);
    res.flushHeaders?.();

    let responseText = '';
    const streamedText = await runGeminiStream(prompt, (token) => {
      responseText += token;
      res.write(token);
    });

    const finalText = streamedText || responseText;
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'assistant',
        content: finalText,
        teluguContent: finalText,
      },
    });

    (async () => {
      try {
        const recent = await contextService.loadRecentMessages(conversation.id, 50);
        await summaryService.summarizeAndPersist(conversation.id, recent);
      } catch (e) {
        console.warn('Failed to update memory after stream:', e);
      }
    })();

    res.end();
  } catch (error) {
    next(error);
  }
};
