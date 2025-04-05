// /lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Prevent multiple PrismaClient instances in development
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // optional: shows all DB queries in console
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;