// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Augment the global type so we can store the client across reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Use existing client if present (dev only), else make a new one
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // optional: remove or adjust as you like
  })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma
