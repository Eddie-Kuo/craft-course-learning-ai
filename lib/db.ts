import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

const prisma = globalThis.cachedPrisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.cachedPrisma = prisma;

export default prisma;
