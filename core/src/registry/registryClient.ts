import { z } from "zod";
import {
  isAddress,
  keccak256,
  stringToHex,
  type Address,
  type Hex,
} from "viem";
import { AppError, toAppError } from "../errors";
import { err, ok, type Result } from "../result";
import { parseWithSchema, safeAsync, safeSync } from "../validation";
import { Personality, type Personality as PersonalityValue } from "../personality";
import {
  getUserRepository,
  getAuthorizationRepository,
  getTaskEscrowRepository,
  getAuditLogRepository,
  type CreateUserInput,
  type CreateAuthorizationInput,
  type CreateTaskEscrowInput,
} from "../db/repository";

export const RegistryEnvSchema = z
  .object({
    DATABASE_URL: z.string().url(),
  })
  .strict();

export type RegistryEnv = z.infer<typeof RegistryEnvSchema>;

export type UserIdHash = Hex; // bytes32
export type TaskIdHash = Hex; // bytes32

export const ExternalUserIdTextSchema = z
  .object({
    platform: z.enum(["telegram", "whatsapp"]),
    id: z.string().min(1).max(128),
  })
  .strict();

export type ExternalUserIdText = z.infer<typeof ExternalUserIdTextSchema>;

export function hashExternalUserId(inputUnknown: unknown): Result<UserIdHash> {
  return safeSync("core.registry.hashExternalUserId", () => {
    const parsed = parseWithSchema(ExternalUserIdTextSchema, inputUnknown, "core.registry.userId");
    if (!parsed.ok) return parsed;
    const canonical = `${parsed.value.platform}:${parsed.value.id}`;
    const bytes = stringToHex(canonical);
    return ok(keccak256(bytes));
  });
}

export function hashTaskId(taskId: string): Result<TaskIdHash> {
  return safeSync("core.registry.hashTaskId", () => {
    if (taskId.trim().length === 0) {
      return err(
        new AppError({
          code: "INVALID_INPUT",
          message: "taskId is required",
          context: "core.registry.hashTaskId",
        }),
      );
    }
    return ok(keccak256(stringToHex(`task:${taskId}`)));
  });
}

function personalityToDb(p: PersonalityValue): Result<string> {
  return safeSync("core.registry.personalityToDb", () => {
    switch (p) {
      case Personality.GUARDIAN:
        return ok("GUARDIAN");
      case Personality.ACCOUNTANT:
        return ok("ACCOUNTANT");
      case Personality.STRATEGIST:
        return ok("STRATEGIST");
      default:
        return err(
          new AppError({
            code: "INVALID_INPUT",
            message: "Unknown personality",
            context: "core.registry.personalityToDb",
            details: { p },
          }),
        );
    }
  });
}

function personalityFromDb(p: string): Result<PersonalityValue> {
  return safeSync("core.registry.personalityFromDb", () => {
    switch (p) {
      case "GUARDIAN":
        return ok(Personality.GUARDIAN);
      case "ACCOUNTANT":
        return ok(Personality.ACCOUNTANT);
      case "STRATEGIST":
        return ok(Personality.STRATEGIST);
      default:
        return err(
          new AppError({
            code: "INVALID_INPUT",
            message: "Unknown personality from database",
            context: "core.registry.personalityFromDb",
            details: { p },
          }),
        );
    }
  });
}

/**
 * SentryRegistryClient - Database-based implementation
 * 
 * This client uses PostgreSQL (via Prisma) instead of on-chain contract calls.
 * This enables:
 * - Instant, gasless revocation of signatures
 * - Faster reads for authorization checks
 * - Better auditability of all operations
 */
export class SentryRegistryClient {
  private readonly userRepo = getUserRepository();
  private readonly authRepo = getAuthorizationRepository();
  private readonly escrowRepo = getTaskEscrowRepository();
  private readonly auditLogRepo = getAuditLogRepository();

  constructor() {
    // Database client is initialized lazily via the repository
  }

  static fromProcessEnv(): Result<SentryRegistryClient> {
    return safeSync("core.registry.fromProcessEnv", () => {
      // Validate that DATABASE_URL is set
      const databaseUrl = process.env.DATABASE_URL;
      if (!databaseUrl) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "DATABASE_URL is not set in environment",
            context: "core.registry.fromProcessEnv",
          }),
        );
      }
      return ok(new SentryRegistryClient());
    });
  }

  /**
   * Check if a user is registered in the database
   */
  async isRegistered(userIdHash: UserIdHash): Promise<Result<boolean>> {
    return safeAsync("core.registry.isRegistered", async () => {
      const result = await this.userRepo.findByHashedId(userIdHash);
      if (!result.ok) return result as any;
      return ok(result.value !== null);
    });
  }

  /**
   * Register a new user in the database
   * (Replaces on-chain registerUser)
   */
  async registerUser(inputUnknown: unknown): Promise<Result<CreateUserInput>> {
    return safeAsync("core.registry.registerUser", async () => {
      const schema = z
        .object({
          userIdHash: z.string().min(1),
          owner: z
            .string()
            .refine((v) => isAddress(v), { message: "owner must be address" })
            .transform((v) => v as Address),
          personality: z.enum([Personality.GUARDIAN, Personality.ACCOUNTANT, Personality.STRATEGIST]),
        })
        .strict();

      const parsed = parseWithSchema(schema, inputUnknown, "core.registry.registerUser.input");
      if (!parsed.ok) return parsed as any;

      // Convert personality enum to string for database
      const personalityRes = personalityToDb(parsed.value.personality);
      if (!personalityRes.ok) return personalityRes as any;

      // Check if user already exists
      const existingUser = await this.userRepo.findByHashedId(parsed.value.userIdHash);
      if (!existingUser.ok) return existingUser as any;
      
      if (existingUser.value) {
        return err(
          new AppError({
            code: "ALREADY_EXISTS",
            message: "User already registered",
            context: "core.registry.registerUser",
            details: { userIdHash: parsed.value.userIdHash },
          }),
        );
      }

      // Create the user
      const createResult = await this.userRepo.create({
        hashedId: parsed.value.userIdHash,
        eoaAddress: parsed.value.owner.toLowerCase(),
        personality: personalityRes.value as any,
      });

      if (!createResult.ok) return createResult as any;

      // Log the registration
      await this.auditLogRepo.create({
        userHashedId: parsed.value.userIdHash,
        action: "USER_REGISTERED",
        details: { personality: personalityRes.value },
      });

      return ok(createResult.value);
    });
  }

  /**
   * Link a wallet to an existing user
   * (Replaces on-chain linkWallet)
   */
  async linkWallet(inputUnknown: unknown): Promise<Result<CreateUserInput>> {
    return safeAsync("core.registry.linkWallet", async () => {
      const schema = z
        .object({
          userIdHash: z.string().min(1),
          wallet: z
            .string()
            .refine((v) => isAddress(v), { message: "wallet must be address" })
            .transform((v) => v as Address),
        })
        .strict();

      const parsed = parseWithSchema(schema, inputUnknown, "core.registry.linkWallet.input");
      if (!parsed.ok) return parsed as any;

      // Update the user's wallet address
      const updateResult = await this.userRepo.updateWalletAddress(
        parsed.value.userIdHash,
        parsed.value.wallet,
      );

      if (!updateResult.ok) return updateResult as any;

      // Log the wallet link
      await this.auditLogRepo.create({
        userHashedId: parsed.value.userIdHash,
        action: "WALLET_LINKED",
        details: { wallet: parsed.value.wallet },
      });

      return ok(updateResult.value);
    });
  }

  /**
   * Reserve funds for a task (create escrow)
   * (Replaces on-chain reserveFunds)
   */
  async reserveFunds(inputUnknown: unknown): Promise<Result<CreateTaskEscrowInput>> {
    return safeAsync("core.registry.reserveFunds", async () => {
      const schema = z
        .object({
          userIdHash: z.string().min(1),
          taskIdHash: z.string().min(1),
          token: z
            .string()
            .refine((v) => isAddress(v), { message: "token must be address" })
            .transform((v) => v as Address),
          amount: z.coerce.bigint().positive(),
        })
        .strict();

      const parsed = parseWithSchema(schema, inputUnknown, "core.registry.reserveFunds.input");
      if (!parsed.ok) return parsed as any;

      // Check if task escrow already exists
      const existingEscrow = await this.escrowRepo.findByTaskId(parsed.value.taskIdHash);
      if (!existingEscrow.ok) return existingEscrow as any;

      if (existingEscrow.value) {
        return err(
          new AppError({
            code: "ALREADY_EXISTS",
            message: "Task escrow already exists",
            context: "core.registry.reserveFunds",
            details: { taskIdHash: parsed.value.taskIdHash },
          }),
        );
      }

      // Create the escrow
      const createResult = await this.escrowRepo.create({
        taskId: parsed.value.taskIdHash,
        userHashedId: parsed.value.userIdHash,
        amount: parsed.value.amount.toString(),
        status: "RESERVED",
      });

      if (!createResult.ok) return createResult as any;

      // Log the reservation
      await this.auditLogRepo.create({
        userHashedId: parsed.value.userIdHash,
        action: "FUNDS_RESERVED",
        details: { 
          taskIdHash: parsed.value.taskIdHash,
          token: parsed.value.token,
          amount: parsed.value.amount.toString(),
        },
      });

      return ok(createResult.value);
    });
  }

  /**
   * Release reserved funds for a task
   * (Replaces on-chain releaseReservation)
   */
  async releaseReservation(inputUnknown: unknown): Promise<Result<void>> {
    return safeAsync("core.registry.releaseReservation", async () => {
      const schema = z
        .object({
          userIdHash: z.string().min(1),
          taskIdHash: z.string().min(1),
        })
        .strict();

      const parsed = parseWithSchema(schema, inputUnknown, "core.registry.releaseReservation.input");
      if (!parsed.ok) return parsed as any;

      // Check if escrow exists
      const existingEscrow = await this.escrowRepo.findByTaskId(parsed.value.taskIdHash);
      if (!existingEscrow.ok) return existingEscrow as any;

      if (!existingEscrow.value) {
        return err(
          new AppError({
            code: "NOT_FOUND",
            message: "Task escrow not found",
            context: "core.registry.releaseReservation",
            details: { taskIdHash: parsed.value.taskIdHash },
          }),
        );
      }

      // Update the escrow status
      const updateResult = await this.escrowRepo.updateStatus(parsed.value.taskIdHash, "RELEASED");
      if (!updateResult.ok) return updateResult as any;

      // Log the release
      await this.auditLogRepo.create({
        userHashedId: parsed.value.userIdHash,
        action: "FUNDS_RELEASED",
        details: { taskIdHash: parsed.value.taskIdHash },
      });

      return ok(undefined);
    });
  }

  /**
   * Get signature for a specific wallet (for KeylessClient)
   * This is the secure method to retrieve signatures for agent operations
   */
  async getSignatureForWallet(walletAddress: string, agentId?: string): Promise<Result<CreateAuthorizationInput | null>> {
    return safeAsync("core.registry.getSignatureForWallet", async () => {
      const result = await this.authRepo.getSignatureForWallet(walletAddress, agentId);
      return result;
    });
  }

  /**
   * Create an authorization (store signature)
   * This is called when a signature is collected via the deep-link
   */
  async createAuthorization(inputUnknown: unknown): Promise<Result<CreateAuthorizationInput>> {
    return safeAsync("core.registry.createAuthorization", async () => {
      const schema = z
        .object({
          userHashedId: z.string().min(1),
          agentId: z.string().min(1).max(128),
          signature: z.string().min(1), // raw hex signature
          maxSpend: z.string().min(1),
          expiresAt: z.number().int().positive(), // Unix timestamp
        })
        .strict();

      const parsed = parseWithSchema(schema, inputUnknown, "core.registry.createAuthorization.input");
      if (!parsed.ok) return parsed as any;

      // Verify user exists
      const userResult = await this.userRepo.findByHashedId(parsed.value.userHashedId);
      if (!userResult.ok) return userResult as any;

      if (!userResult.value) {
        return err(
          new AppError({
            code: "NOT_FOUND",
            message: "User not found",
            context: "core.registry.createAuthorization",
          }),
        );
      }

      // Deactivate any existing active authorizations for this agent
      await this.authRepo.revoke(parsed.value.userHashedId, parsed.value.agentId);

      // Create the new authorization
      const createResult = await this.authRepo.create({
        userHashedId: parsed.value.userHashedId,
        agentId: parsed.value.agentId,
        signature: parsed.value.signature,
        maxSpend: parsed.value.maxSpend,
        expiresAt: parsed.value.expiresAt,
      });

      if (!createResult.ok) return createResult as any;

      // Log the authorization
      await this.auditLogRepo.create({
        userHashedId: parsed.value.userHashedId,
        action: "AUTHORIZATION_CREATED",
        details: { 
          agentId: parsed.value.agentId,
          maxSpend: parsed.value.maxSpend,
          expiresAt: parsed.value.expiresAt,
        },
      });

      return ok(createResult.value);
    });
  }

  /**
   * Revoke an authorization (instant, gasless)
   */
  async revokeAuthorization(inputUnknown: unknown): Promise<Result<void>> {
    return safeAsync("core.registry.revokeAuthorization", async () => {
      const schema = z
        .object({
          userHashedId: z.string().min(1),
          agentId: z.string().min(1).max(128),
        })
        .strict();

      const parsed = parseWithSchema(schema, inputUnknown, "core.registry.revokeAuthorization.input");
      if (!parsed.ok) return parsed as any;

      // Revoke the authorization
      const revokeResult = await this.authRepo.revoke(parsed.value.userHashedId, parsed.value.agentId);
      if (!revokeResult.ok) return revokeResult as any;

      // Log the revocation
      await this.auditLogRepo.create({
        userHashedId: parsed.value.userHashedId,
        action: "AUTHORIZATION_REVOKED",
        details: { agentId: parsed.value.agentId },
      });

      return ok(undefined);
    });
  }

  /**
   * Get user by hashed ID
   */
  async getUser(userIdHash: string): Promise<Result<CreateUserInput | null>> {
    return safeAsync("core.registry.getUser", async () => {
      const result = await this.userRepo.findByHashedId(userIdHash);
      return result;
    });
  }

  /**
   * Get user by EOA address
   */
  async getUserByEoa(eoaAddress: string): Promise<Result<CreateUserInput | null>> {
    return safeAsync("core.registry.getUserByEoa", async () => {
      const result = await this.userRepo.findByEoaAddress(eoaAddress);
      return result;
    });
  }
}

// Legacy type aliases for backward compatibility
export type { CreateUserInput, CreateAuthorizationInput, CreateTaskEscrowInput };
