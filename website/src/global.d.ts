// src/global.d.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // tell TS that `globalThis.prisma` exists
  var prisma: PrismaClient | undefined
}
