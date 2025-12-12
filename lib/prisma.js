import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL is missing!");
}

// Create Neon serverless pool
const pool = new Pool({ connectionString });

// Create Neon adapter
const adapter = new PrismaNeon(pool);

const globalForPrisma = globalThis;

// Prisma client with adapter
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter, // 💯 correct usage
    log: ["query", "error", "info", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
