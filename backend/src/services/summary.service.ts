import { runGemini } from './gemini.service.js';
import { prisma } from '../lib/prisma.js';

export const summaryService = {
  // Summarize recent conversation messages into a concise memory summary
  async summarizeMessages(conversationId: string, recentMessages: Array<{ role: string; content: string }>) {
    const text = recentMessages.map((m) => `${m.role}: ${m.content}`).join('\n').slice(0, 15000);
    const prompt = `Summarize the important recurring facts, user preferences, and topics from the following conversation. Keep it short (~3-6 sentences) and suitable for later inclusion into AI prompts as "memory":\n\n${text}`;
    const summary = await runGemini(prompt);
    return summary;
  },

  async summarizeAndPersist(conversationId: string, recentMessages: Array<{ role: string; content: string }>) {
    const summary = await this.summarizeMessages(conversationId, recentMessages);
    const existing = await prisma.conversationMemory.findFirst({ where: { conversationId } });
    if (existing) {
      await prisma.conversationMemory.update({ where: { id: existing.id }, data: { summary } });
    } else {
      await prisma.conversationMemory.create({ data: { conversationId, summary } });
    }
    return summary;
  },
};
