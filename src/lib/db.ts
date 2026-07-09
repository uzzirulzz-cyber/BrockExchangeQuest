// Import env defaults FIRST — must run before PrismaClient is instantiated
// so that env("DATABASE_URL") in prisma/schema.prisma can resolve.
import "@/lib/env";

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
