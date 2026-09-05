import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton. The site must keep working with no database
 * (Phases 1–5 behaviour), so callers check `hasDatabase()` and fall back
 * gracefully instead of throwing.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb(): PrismaClient | null {
  if (!hasDatabase()) return null;
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}
