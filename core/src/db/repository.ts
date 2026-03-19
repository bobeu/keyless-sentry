import { z } from "zod";
import { getPrismaClient } from "./client";
import { AppError, toAppError } from "../errors";
import { err, ok, type Result } from "../result";
import { parseWithSchema, safeAsync, safeSync } from "../validation";
import { Personality } from "../personality";
import { getEncryptionService, type EncryptionService } from "../encryption";
import type { Address, Hex } from "viem";

// Schema for creating a user
export const CreateUserSchema = z
  .object({
    hashedId: z.string().min(1), // keccak256 of platform:id
    eoaAddress: z.string().min(1),
    walletAddress: z.string().optional(),
    personality: z.enum([Personality.GUARDIAN, Personality.ACCOUNTANT, Personality.STRATEGIST]),
  })
  .strict();

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

// Schema for creating an authorization
export const CreateAuthorizationSchema = z
  .object({
    userHashedId: z.string().min(1),
    agentId: z.string().min(1).max(128),
    signature: z.string().min(1), // raw hex signature
    maxSpend: z.string().min(1),
    expiresAt: z.number().int().positive(), // Unix timestamp
    isActive: z.boolean().optional(),
  })
  .strict();

export type CreateAuthorizationInput = z.infer<typeof CreateAuthorizationSchema>;

// Schema for task escrow
export const CreateTaskEscrowSchema = z
  .object({
    taskId: z.string().min(1), // PK - taskIdHash
    userHashedId: z.string().min(1),
    amount: z.string().min(1),
    status: z.enum(["RESERVED", "RELEASED"]),
  })
  .strict();

export type CreateTaskEscrowInput = z.infer<typeof CreateTaskEscrowSchema>;

// Schema for audit log
export const CreateAuditLogSchema = z
  .object({
    userHashedId: z.string().min(1),
    action: z.string().min(1),
    txHash: z.string().optional(),
    nonce: z.string().optional(), // Transaction nonce for double-spend prevention
    status: z.enum(["PENDING", "SUCCESS", "FAILED"]).optional(),
    gasUsed: z.string().optional(), // Gas used in hex
    details: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export type CreateAuditLogInput = z.infer<typeof CreateAuditLogSchema>;

/**
 * User Repository - handles all User-related database operations
 */
export class UserRepository {
  async create(inputUnknown: unknown): Promise<Result<CreateUserInput>> {
    return safeAsync("core.db.user.create", async () => {
      const parsed = parseWithSchema(CreateUserSchema, inputUnknown, "core.db.user.create.input");
      if (!parsed.ok) return parsed as any;

      const prisma = getPrismaClient();
      const user = await prisma.user.create({
        data: parsed.value,
      });
      return ok(user as CreateUserInput);
    });
  }

  async findByHashedId(hashedId: string): Promise<Result<CreateUserInput | null>> {
    return safeAsync("core.db.user.findByHashedId", async () => {
      const prisma = getPrismaClient();
      const user = await prisma.user.findUnique({
        where: { hashedId },
      });
      return ok(user as CreateUserInput | null);
    });
  }

  async findByEoaAddress(eoaAddress: string): Promise<Result<CreateUserInput | null>> {
    return safeAsync("core.db.user.findByEoaAddress", async () => {
      const prisma = getPrismaClient();
      const user = await prisma.user.findFirst({
        where: { eoaAddress: eoaAddress.toLowerCase() },
      });
      return ok(user as CreateUserInput | null);
    });
  }

  async updateWalletAddress(
    hashedId: string,
    walletAddress: string,
  ): Promise<Result<CreateUserInput>> {
    return safeAsync("core.db.user.updateWalletAddress", async () => {
      const prisma = getPrismaClient();
      const user = await prisma.user.update({
        where: { hashedId },
        data: { walletAddress: walletAddress.toLowerCase() },
      });
      return ok(user as CreateUserInput);
    });
  }

  async exists(hashedId: string): Promise<Result<boolean>> {
    return safeAsync("core.db.user.exists", async () => {
      const prisma = getPrismaClient();
      const count = await prisma.user.count({
        where: { hashedId },
      });
      return ok(count > 0);
    });
  }
}

/**
 * Authorization Repository - handles all Authorization-related database operations
 * Signatures are encrypted at rest in the database
 */
export class AuthorizationRepository {
  private encryptionService: EncryptionService | null = null;

  private getEncryption(): EncryptionService {
    if (!this.encryptionService) {
      const res = getEncryptionService();
      if (!res.ok) {
        throw new Error("Failed to initialize encryption service");
      }
      this.encryptionService = res.value;
    }
    return this.encryptionService;
  }

  async create(inputUnknown: unknown): Promise<Result<CreateAuthorizationInput>> {
    return safeAsync("core.db.authorization.create", async () => {
      const parsed = parseWithSchema(
        CreateAuthorizationSchema,
        inputUnknown,
        "core.db.authorization.create.input",
      );
      if (!parsed.ok) return parsed as any;

      // Encrypt the signature before storing
      const encryption = this.getEncryption();
      const encryptedSigRes = encryption.encrypt(parsed.value.signature);
      if (!encryptedSigRes.ok) return encryptedSigRes as any;

      const prisma = getPrismaClient();
      const auth = await prisma.authorization.create({
        data: {
          ...parsed.value,
          signature: encryptedSigRes.value, // Store encrypted signature
          isActive: true,
        },
      });
      return ok(auth as CreateAuthorizationInput);
    });
  }

  async findByUserAndAgent(
    userHashedId: string,
    agentId: string,
    activeOnly: boolean = true,
  ): Promise<Result<CreateAuthorizationInput | null>> {
    return safeAsync("core.db.authorization.findByUserAndAgent", async () => {
      const prisma = getPrismaClient();
      const where: any = { userHashedId, agentId };
      if (activeOnly) {
        where.isActive = true;
      }
      const auth = await prisma.authorization.findFirst({
        where,
        orderBy: { createdAt: "desc" },
      });
      
      if (!auth) return ok(null);

      // Decrypt the signature for return
      const encryption = this.getEncryption();
      const decryptedSigRes = encryption.decrypt(auth.signature);
      if (!decryptedSigRes.ok) return decryptedSigRes as any;

      return ok({ ...auth, signature: decryptedSigRes.value } as CreateAuthorizationInput);
    });
  }

  async findActiveByUserHashedId(userHashedId: string): Promise<Result<CreateAuthorizationInput[]>> {
    return safeAsync("core.db.authorization.findActiveByUserHashedId", async () => {
      const prisma = getPrismaClient();
      const auths = await prisma.authorization.findMany({
        where: { userHashedId, isActive: true },
        orderBy: { createdAt: "desc" },
      });

      // Decrypt all signatures
      const encryption = this.getEncryption();
      const decryptedAuths = await Promise.all(
        auths.map(async (auth: any) => {
          const decryptedSigRes = encryption.decrypt(auth.signature);
          if (!decryptedSigRes.ok) return auth;
          return { ...auth, signature: decryptedSigRes.value };
        })
      );

      return ok(decryptedAuths as CreateAuthorizationInput[]);
    });
  }

  /**
   * Get the active signature for a specific wallet (by EOA address).
   * This retrieves the authorization linked to the user's EOA address.
   * Returns decrypted signature for use with KeylessClient.
   */
  async getSignatureForWallet(eoaAddress: string, agentId?: string): Promise<Result<CreateAuthorizationInput | null>> {
    return safeAsync("core.db.authorization.getSignatureForWallet", async () => {
      const prisma = getPrismaClient();
      const now = Math.floor(Date.now() / 1000); // Current Unix timestamp

      // First, find the user by EOA address
      const user = await prisma.user.findFirst({
        where: { eoaAddress: eoaAddress.toLowerCase() },
      });

      if (!user) {
        return ok(null);
      }

      // Build the query to find active authorization
      const where: any = {
        userHashedId: user.hashedId,
        isActive: true,
        expiresAt: { gt: now }, // Not expired
      };

      if (agentId) {
        where.agentId = agentId;
      }

      const auth = await prisma.authorization.findFirst({
        where,
        orderBy: { createdAt: "desc" },
      });

      if (!auth) return ok(null);

      // Decrypt the signature for use with KeylessClient
      const encryption = this.getEncryption();
      const decryptedSigRes = encryption.decrypt(auth.signature);
      if (!decryptedSigRes.ok) return decryptedSigRes as any;

      return ok({ ...auth, signature: decryptedSigRes.value } as CreateAuthorizationInput);
    });
  }

  async revoke(userHashedId: string, agentId: string): Promise<Result<void>> {
    return safeAsync("core.db.authorization.revoke", async () => {
      const prisma = getPrismaClient();
      await prisma.authorization.updateMany({
        where: { userHashedId, agentId },
        data: { isActive: false },
      });
      return ok(undefined);
    });
  }

  async revokeAll(userHashedId: string): Promise<Result<void>> {
    return safeAsync("core.db.authorization.revokeAll", async () => {
      const prisma = getPrismaClient();
      await prisma.authorization.updateMany({
        where: { userHashedId, isActive: true },
        data: { isActive: false },
      });
      return ok(undefined);
    });
  }
}

/**
 * TaskEscrow Repository - handles all TaskEscrow-related database operations
 */
export class TaskEscrowRepository {
  async create(inputUnknown: unknown): Promise<Result<CreateTaskEscrowInput>> {
    return safeAsync("core.db.taskEscrow.create", async () => {
      const parsed = parseWithSchema(
        CreateTaskEscrowSchema,
        inputUnknown,
        "core.db.taskEscrow.create.input",
      );
      if (!parsed.ok) return parsed as any;

      const prisma = getPrismaClient();
      const escrow = await prisma.taskEscrow.create({
        data: parsed.value,
      });
      return ok(escrow as CreateTaskEscrowInput);
    });
  }

  async findByTaskId(taskId: string): Promise<Result<CreateTaskEscrowInput | null>> {
    return safeAsync("core.db.taskEscrow.findByTaskId", async () => {
      const prisma = getPrismaClient();
      const escrow = await prisma.taskEscrow.findUnique({
        where: { taskId },
      });
      return ok(escrow as CreateTaskEscrowInput | null);
    });
  }

  async updateStatus(taskId: string, status: "RESERVED" | "RELEASED"): Promise<Result<void>> {
    return safeAsync("core.db.taskEscrow.updateStatus", async () => {
      const prisma = getPrismaClient();
      await prisma.taskEscrow.update({
        where: { taskId },
        data: { status },
      });
      return ok(undefined);
    });
  }
}

/**
 * AuditLog Repository - handles all AuditLog-related database operations
 */
export class AuditLogRepository {
  async create(inputUnknown: unknown): Promise<Result<CreateAuditLogInput>> {
    return safeAsync("core.db.auditLog.create", async () => {
      const parsed = parseWithSchema(
        CreateAuditLogSchema,
        inputUnknown,
        "core.db.auditLog.create.input",
      );
      if (!parsed.ok) return parsed as any;

      const prisma = getPrismaClient();
      const log = await prisma.auditLog.create({
        data: parsed.value as any,
      });
      return ok(log as CreateAuditLogInput);
    });
  }

  async findByUserHashedId(userHashedId: string, limit: number = 100): Promise<Result<CreateAuditLogInput[]>> {
    return safeAsync("core.db.auditLog.findByUserHashedId", async () => {
      const prisma = getPrismaClient();
      const logs = await prisma.auditLog.findMany({
        where: { userHashedId },
        orderBy: { timestamp: "desc" },
        take: limit,
      });
      return ok(logs as CreateAuditLogInput[]);
    });
  }

  /**
   * Update the status of an audit log entry by txHash
   */
  async updateStatusByTxHash(
    txHash: string,
    status: "PENDING" | "SUCCESS" | "FAILED",
    gasUsed?: string,
    errorMessage?: string,
  ): Promise<Result<void>> {
    return safeAsync("core.db.auditLog.updateStatusByTxHash", async () => {
      const prisma = getPrismaClient();
      await prisma.auditLog.updateMany({
        where: { txHash },
        data: {
          status,
          gasUsed,
          details: errorMessage ? { error: errorMessage } : undefined,
        },
      });
      return ok(undefined);
    });
  }

  /**
   * Find audit log by txHash
   */
  async findByTxHash(txHash: string): Promise<Result<CreateAuditLogInput | null>> {
    return safeAsync("core.db.auditLog.findByTxHash", async () => {
      const prisma = getPrismaClient();
      const log = await prisma.auditLog.findFirst({
        where: { txHash },
      });
      return ok(log as CreateAuditLogInput | null);
    });
  }
}

/**
 * Sentry Identity Repository - stores the agent's ERC-8004 identity
 */
export class SentryIdentityRepository {
  async create(inputUnknown: unknown): Promise<Result<{
    id: string;
    agentName: string;
    identityAddress: string;
    metadataURI: string;
    a2aEndpoint: string;
    chainId: number;
    registryAddress: string;
    txHash?: string;
    registeredAt: Date;
    lastVerifiedAt: Date;
    isActive: boolean;
  }>> {
    return safeAsync("core.db.sentryIdentity.create", async () => {
      const prisma = getPrismaClient();
      const data = inputUnknown as any;
      const identity = await prisma.sentryIdentity.create({
        data: {
          agentName: data.agentName,
          identityAddress: data.identityAddress,
          metadataURI: data.metadataURI,
          a2aEndpoint: data.a2aEndpoint,
          chainId: data.chainId,
          registryAddress: data.registryAddress,
          txHash: data.txHash,
          isActive: true,
        },
      });
      return ok(identity as any);
    });
  }

  async findFirst(): Promise<Result<{
    id: string;
    agentName: string;
    identityAddress: string;
    metadataURI: string;
    a2aEndpoint: string;
    chainId: number;
    registryAddress: string;
    txHash?: string;
    registeredAt: Date;
    lastVerifiedAt: Date;
    isActive: boolean;
  } | null>> {
    return safeAsync("core.db.sentryIdentity.findFirst", async () => {
      const prisma = getPrismaClient();
      const identity = await prisma.sentryIdentity.findFirst({
        orderBy: { registeredAt: "desc" },
      });
      return ok(identity as any);
    });
  }

  async updateLastVerified(): Promise<Result<void>> {
    return safeAsync("core.db.sentryIdentity.updateLastVerified", async () => {
      const prisma = getPrismaClient();
      const identity = await prisma.sentryIdentity.findFirst({
        orderBy: { registeredAt: "desc" },
      });
      if (identity) {
        await prisma.sentryIdentity.update({
          where: { id: identity.id },
          data: { lastVerifiedAt: new Date() },
        });
      }
      return ok(undefined);
    });
  }

  async updateIdentity(inputUnknown: unknown): Promise<Result<{
    id: string;
    agentName: string;
    identityAddress: string;
    metadataURI: string;
    a2aEndpoint: string;
    chainId: number;
    registryAddress: string;
    txHash?: string;
    registeredAt: Date;
    lastVerifiedAt: Date;
    isActive: boolean;
  }>> {
    return safeAsync("core.db.sentryIdentity.updateIdentity", async () => {
      const prisma = getPrismaClient();
      const data = inputUnknown as any;
      
      // Find existing identity
      const existing = await prisma.sentryIdentity.findFirst({
        orderBy: { registeredAt: "desc" },
      });
      
      if (!existing) {
        return err(
          new AppError({
            code: "NOT_FOUND",
            message: "No identity found to update",
            context: "core.db.sentryIdentity.updateIdentity",
          }),
        );
      }

      const updated = await prisma.sentryIdentity.update({
        where: { id: existing.id },
        data: {
          agentName: data.agentName ?? existing.agentName,
          identityAddress: data.identityAddress ?? existing.identityAddress,
          metadataURI: data.metadataURI ?? existing.metadataURI,
          a2aEndpoint: data.a2aEndpoint ?? existing.a2aEndpoint,
          chainId: data.chainId ?? existing.chainId,
          registryAddress: data.registryAddress ?? existing.registryAddress,
          txHash: data.txHash ?? existing.txHash,
          lastVerifiedAt: new Date(),
        },
      });
      return ok(updated as any);
    });
  }
}

// Singleton instances for repositories
let userRepo: UserRepository | null = null;
let authRepo: AuthorizationRepository | null = null;
let escrowRepo: TaskEscrowRepository | null = null;
let auditLogRepo: AuditLogRepository | null = null;
let sentryIdentityRepo: SentryIdentityRepository | null = null;

export function getUserRepository(): UserRepository {
  if (!userRepo) userRepo = new UserRepository();
  return userRepo;
}

export function getAuthorizationRepository(): AuthorizationRepository {
  if (!authRepo) authRepo = new AuthorizationRepository();
  return authRepo;
}

export function getTaskEscrowRepository(): TaskEscrowRepository {
  if (!escrowRepo) escrowRepo = new TaskEscrowRepository();
  return escrowRepo;
}

export function getAuditLogRepository(): AuditLogRepository {
  if (!auditLogRepo) auditLogRepo = new AuditLogRepository();
  return auditLogRepo;
}

export function getSentryIdentityRepository(): SentryIdentityRepository {
  if (!sentryIdentityRepo) sentryIdentityRepo = new SentryIdentityRepository();
  return sentryIdentityRepo;
}
