import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function getPrismaClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  try {
    if (!global.prisma) {
      global.prisma = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      });
    }
    return global.prisma;
  } catch (err) {
    console.warn("Prisma Client failed to initialize:", err);
    return null;
  }
}

export const prisma = getPrismaClient();

if (process.env.NODE_ENV !== "production" && prisma) {
  global.prisma = prisma;
}
