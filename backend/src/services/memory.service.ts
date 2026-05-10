import prisma from '../lib/prisma.js';

export const memoryService = {
  async getMemory(conversationId: string) {
    return prisma.conversationMemory.findFirst({ where: { conversationId } });
  },

  async upsertMemory(conversationId: string, summary: string) {
    const existing = await prisma.conversationMemory.findFirst({ where: { conversationId } });
    if (existing) {
      return prisma.conversationMemory.update({ where: { id: existing.id }, data: { summary } });
    }
    return prisma.conversationMemory.create({ data: { conversationId, summary } });
  },
};
