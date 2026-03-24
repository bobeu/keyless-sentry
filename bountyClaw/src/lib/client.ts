import { AppError } from "./errors";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/client";

/**
 * Get the Prisma client instance.
 * This singleton pattern ensures we don't create multiple connections.
 */
export function getPrismaClient(): PrismaClient {
  const connectionString = `${process.env.DATABASE_URL}`;
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  return prisma;
}

/**
 * Close the Prisma client connection.
 * Call this when shutting down the application.
 */
export async function closePrismaClient(): Promise<void> {
  const client = getPrismaClient();
  await client.$disconnect();
}

/**
 * Database client wrapper with error handling.
 * Provides a safe interface for database operations.
 */
export class DatabaseClient {
  private readonly client: PrismaClient;

  constructor() {
    this.client = getPrismaClient();
  }

  /**
   * Execute a database transaction with automatic error handling.
   */
  async withTransaction<T>(
    fn: (tx: any) => Promise<T>,
  ): Promise<T> {
    try {
      return await this.client.$transaction(async (tx) => {
        return fn(tx);
      });
    } catch (causeUnknown) {
      throw new AppError({
        code: "DB_ERROR",
        message: "Database transaction failed",
        context: "core.db.withTransaction",
        causeUnknown,
      });
    }
  }

  /**
   * Health check for database connection.
   */
  async ping(): Promise<boolean> {
    try {
      await this.client.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}

// Singleton instance
let dbClient: DatabaseClient | null = null;

export function getDatabaseClient(): DatabaseClient {
  if (!dbClient) {
    dbClient = new DatabaseClient();
  }
  return dbClient;
}
