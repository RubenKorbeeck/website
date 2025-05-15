// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // Augment the globalThis type
  // (no `var` needed any more)
  interface GlobalThis {
    prisma?: PrismaClient | undefined
  }
}

// Use a globalThis cache instead of var
const _prisma = globalThis.prisma ?? new PrismaClient({ log: ['query'] })
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = _prisma
}

export const prisma = _prisma
