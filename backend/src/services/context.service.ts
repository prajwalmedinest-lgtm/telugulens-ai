import prisma from '../lib/prisma.js';

export const contextService = {
  async loadRecentMessages(conversationId: string, limit = 20) {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    // return in chronological order
    return messages.reverse().map((m) => ({ role: m.role, content: m.content }));
  },

  async buildPrompt(conversationId: string, userMessage: string) {
    const memory = await prisma.conversationMemory.findFirst({ where: { conversationId } });
    const recent = await this.loadRecentMessages(conversationId, 20);

    const memoryText = memory ? `Memory summary:\n${memory.summary}\n\n` : '';
    const recentText = recent.map((m) => `${m.role}: ${m.content}`).join('\n');
    const prompt = `${memoryText}Recent conversation:\n${recentText}\nuser: ${userMessage}\n\nProvide a helpful assistant response, staying concise and using the memory for context.`;
    return prompt;
  },
};
