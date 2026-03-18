import { z } from "zod";
import type { HealthCheckResponse, SignatureRequest } from "@keyless-sentry/core";
import {
  AppError,
  err,
  generateInvoice,
  ok,
  parseWithSchema,
  releaseFunds,
  reserveFunds,
  safeAsync,
  safeSync,
  signSentrySeal,
  type Result,
  getAuditLogRepository,
  getUserRepository,
  getAuthorizationRepository,
} from "@keyless-sentry/core";
import {
  hashExternalUserId,
  Personality,
  type Personality as PersonalityValue,
} from "@keyless-sentry/core";
import type { CreateUserInput } from "@keyless-sentry/core";
import type { Command, CommandContext, CommandMap } from "./command";
import { isAddress, type Address } from "viem";

// Re-export CreateUserInput for use in the module
type CreateUser = CreateUserInput;

type TextResponse = string;

const EmptySchema = z.object({}).strict();

/**
 * OpenClaw Interactive Components response format
 */
export interface InteractiveComponents {
  components: {
    type: "button";
    label: string;
    action: string;
  }[];
  message: string;
}

/**
 * Helper to verify user identity against the database
 * Returns the user record if registered, otherwise returns an error
 */
async function verifyUserIdentity(
  ctx: CommandContext,
  sender?: { platform: string; id: string }
): Promise<Result<CreateUserInput>> {
  return safeAsync("gateway.commands.verifyUserIdentity", async () => {
    if (!sender) {
      return err(
        new AppError({
          code: "COMMAND_ERROR",
          message: "Missing sender identity. Please run /start to onboard your Sentry sentinel.",
          context: "gateway.commands.verifyUserIdentity",
        }),
      );
    }

    const hashRes = hashExternalUserId({
      platform: sender.platform as "telegram" | "whatsapp",
      id: sender.id,
    });
    if (!hashRes.ok) return hashRes as Result<CreateUserInput>;

    const userRepo = getUserRepository();
    const userRes = await userRepo.findByHashedId(hashRes.value);
    if (!userRes.ok) return userRes as Result<CreateUserInput>;

    if (!userRes.value) {
      return err(
        new AppError({
          code: "COMMAND_ERROR",
          message: "You are not registered. Please run /start to onboard your Sentry sentinel.",
          context: "gateway.commands.verifyUserIdentity",
        }),
      );
    }

    return ok(userRes.value);
  });
}

const HealthCommand: Command<{}, any> = {
  name: "/health",
  description: "Check coordinator health, DB status, and Sentry Integrity Score",
  inputSchema: EmptySchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.health.execute", async () => {
      const validated = parseWithSchema(EmptySchema, input, "gateway.commands.health.input");
      if (!validated.ok) return validated;

      // Get orchestrator health
      const orchHealth = await ctx.orchestrator.healthCheck();

      // Check DB connectivity
      let dbStatus = "unknown";
      try {
        const userRepo = getUserRepository();
        await userRepo.exists("test-health-check");
        dbStatus = "connected";
      } catch {
        dbStatus = "disconnected";
      }

      // Calculate Integrity Score from AuditLogs
      let integrityScore = { successRate: 0, total: 0, successful: 0, failed: 0 };
      try {
        const auditRepo = getAuditLogRepository();
        // Get all audit logs with status
        const logsRes = await auditRepo.findByUserHashedId("", 1000);
        if (logsRes.ok && logsRes.value) {
          const logs = logsRes.value;
          const total = logs.length;
          const successful = logs.filter((l: any) => l.status === "SUCCESS").length;
          const failed = logs.filter((l: any) => l.status === "FAILED").length;
          const successRate = total > 0 ? (successful / total) * 100 : 0;
          integrityScore = { successRate: Math.round(successRate), total, successful, failed };
        }
      } catch {
        // Integrity score calculation failed
      }

      return ok({
        orchestrator: orchHealth.ok ? "healthy" : "unhealthy",
        dbStatus,
        integrityScore,
        timestamp: new Date().toISOString(),
      });
    }),
};

const SupportedChainsCommand: Command<{}, number[]> = {
  name: "/supported-chains",
  description: "List supported chain IDs",
  inputSchema: EmptySchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.supportedChains.execute", async () => {
      const validated = parseWithSchema(
        EmptySchema,
        input,
        "gateway.commands.supportedChains.input",
      );
      if (!validated.ok) return validated;

      const clientRes = ctx.orchestrator.getKeylessClient();
      if (!clientRes.ok) return clientRes;

      return safeSync("gateway.commands.supportedChains.call", () =>
        ok(clientRes.value.getSupportedChainIds()),
      );
    }),
};

const StartInputSchema = z
  .object({
    platform: z.enum(["telegram", "whatsapp"]),
    id: z.string().min(1).max(128),
    personality: z.enum([Personality.GUARDIAN, Personality.ACCOUNTANT, Personality.STRATEGIST]),
  })
  .strict();

type StartInput = z.infer<typeof StartInputSchema>;

/**
 * StartCommand - Returns interactive components for onboarding
 * 
 * When called without arguments, returns personality selection buttons.
 * When called with personality, initiates the wallet creation flow.
 */
const StartCommand: Command<StartInput, InteractiveComponents | { txHash: string; wallet: string }> = {
  name: "/start",
  description: "Register your Sentry sentinel identity",
  inputSchema: StartInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.start.execute", async () => {
      // If no input provided, return interactive components
      if (!input || Object.keys(input).length === 0) {
        return ok({
          needsComponents: true
        } as any);
      }

      const validated = parseWithSchema(StartInputSchema, input, "gateway.commands.start.input");
      // If validation fails but we have platform/id, try to use context sender
      if (!validated.ok && ctx.sender) {
        // Use context sender info
        const platform = ctx.sender.platform;
        const id = ctx.sender.id;
        // Check if we have personality in input
        const personality = (input as any).personality;
        if (!personality) {
          return ok({
            needsComponents: true
          } as any);
        }
        // Validate personality
        if (!["GUARDIAN", "ACCOUNTANT", "STRATEGIST"].includes(personality)) {
          return ok({
            needsComponents: true
          } as any);
        }
        // Proceed with the validated data
        const hashRes = hashExternalUserId({ platform, id });
        if (!hashRes.ok) return hashRes as Result<any>;
        const userHashedId = hashRes.value;
        
        // Continue with registration flow...
        const envRes = ctx.orchestrator.getEnv();
        if (!envRes.ok) return envRes as Result<any>;

        // Check if user exists
        const userRepo = getUserRepository();
        const existingUser = await userRepo.findByHashedId(userHashedId);
        if (!existingUser.ok) return existingUser as Result<any>;

        if (existingUser.value) {
          return ok({
            message: `You are already registered as a ${existingUser.value.personality}!`,
            wallet: existingUser.value.walletAddress || "Not linked yet",
          } as any);
        }

        // Create wallet request
        const reqRes = await ctx.signatureRequests.requestCreateWallet({
          baseUrl: envRes.value.KEYLESS_BASE_URL,
          chainId: envRes.value.KEYLESS_CHAIN_ID,
          owner: envRes.value.KEYLESS_OWNER,
        });

        if (!reqRes.ok) return reqRes as Result<any>;

        // Create user record
        await userRepo.create({
          hashedId: userHashedId,
          eoaAddress: envRes.value.KEYLESS_OWNER,
          walletAddress: undefined,
          personality: personality as any,
        });

        return ok({
          message: `Please sign to create your ${personality} sentinel wallet`,
          walletConnectUniversalLink: reqRes.value.walletConnectUniversalLink,
          pairingUri: reqRes.value.walletConnectPairingUri,
        } as any);
      }
      
      if (!validated.ok) {
        // Return interactive components
        return ok({
          needsComponents: true
        } as any);
      }

      const { platform, id, personality } = validated.value;

      // Hash the user ID
      const hashRes = hashExternalUserId({ platform, id });
      if (!hashRes.ok) return hashRes as Result<any>;
      const userHashedId = hashRes.value;

      // Check if user is already registered
      const userRepo = getUserRepository();
      const existingUser = await userRepo.findByHashedId(userHashedId);
      if (!existingUser.ok) return existingUser as Result<any>;

      if (existingUser.value) {
        // User already registered - return their info
        return ok({
          message: `You are already registered as a ${existingUser.value.personality}!`,
          wallet: existingUser.value.walletAddress || "Not linked yet",
        } as any);
      }

      // New user - trigger wallet creation flow via SignatureRequestService
      const envRes = ctx.orchestrator.getEnv();
      if (!envRes.ok) return envRes as Result<any>;

      // Request wallet creation - this will initiate the WalletConnect flow
      const reqRes = await ctx.signatureRequests.requestCreateWallet({
        baseUrl: envRes.value.KEYLESS_BASE_URL,
        chainId: envRes.value.KEYLESS_CHAIN_ID,
        owner: envRes.value.KEYLESS_OWNER,
      });

      if (!reqRes.ok) return reqRes as Result<any>;

      const request = reqRes.value;

      // Store the user with pending wallet status after signature is collected
      await userRepo.create({
        hashedId: userHashedId,
        eoaAddress: envRes.value.KEYLESS_OWNER,
        walletAddress: undefined, // Will be updated when wallet is created
        personality: personality as any,
      });

      // Return the signature request details for the user to sign
      return ok({
        message: `Please sign to create your ${personality} sentinel wallet`,
        walletConnectUniversalLink: request.walletConnectUniversalLink,
        pairingUri: request.walletConnectPairingUri,
      } as any);
    }),
};

const CreateWalletInputSchema = z.object({}).strict();

type CreateWalletInput = z.infer<typeof CreateWalletInputSchema>;

const CreateWalletCommand: Command<CreateWalletInput, SignatureRequest> = {
  name: "/create-wallet",
  description: "Create a new keyless wallet (owner signs via WalletConnect/Valora)",
  inputSchema: CreateWalletInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.createWallet.execute", async () => {
      const validated = parseWithSchema(
        CreateWalletInputSchema,
        input,
        "gateway.commands.createWallet.input",
      );
      if (!validated.ok) return validated;

      const envRes = ctx.orchestrator.getEnv();
      if (!envRes.ok) return envRes;

      // Verify user identity using database
      const userRes = await verifyUserIdentity(ctx, ctx.sender);
      if (!userRes.ok) return userRes as Result<SignatureRequest>;

      // delegate signing to SignatureRequestService (no private keys stored)
      const reqRes = await ctx.signatureRequests.requestCreateWallet({
        baseUrl: envRes.value.KEYLESS_BASE_URL,
        chainId: envRes.value.KEYLESS_CHAIN_ID,
        owner: envRes.value.KEYLESS_OWNER,
      });
      if (!reqRes.ok) return reqRes as Result<SignatureRequest>;

      // Command output is the request object; gateway router will stringify it for the chat.
      return ok(reqRes.value);
    }),
};

const AuthorizeAgentInputSchema = z
  .object({
    agentId: z.string().min(1).max(128),
    limit: z.string().min(1).max(78),
    durationSec: z.coerce.number().int().positive(),
  })
  .strict();
type AuthorizeAgentInput = z.infer<typeof AuthorizeAgentInputSchema>;

const AuthorizeAgentCommand: Command<AuthorizeAgentInput, SignatureRequest> = {
  name: "/authorize-agent",
  description: "Authorize an agent (owner signs via WalletConnect)",
  inputSchema: AuthorizeAgentInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.authorizeAgent.execute", async () => {
      const validated = parseWithSchema(
        AuthorizeAgentInputSchema,
        input,
        "gateway.commands.authorizeAgent.input",
      );
      if (!validated.ok) return validated;

      const envRes = ctx.orchestrator.getEnv();
      if (!envRes.ok) return envRes;

      // Verify user identity using database
      const userRes = await verifyUserIdentity(ctx, ctx.sender);
      if (!userRes.ok) return userRes as Result<SignatureRequest>;

      const reqRes = await ctx.signatureRequests.requestAuthorizeAgent({
        baseUrl: envRes.value.KEYLESS_BASE_URL,
        chainId: envRes.value.KEYLESS_CHAIN_ID,
        owner: envRes.value.KEYLESS_OWNER,
        agentId: validated.value.agentId,
        limit: validated.value.limit,
        durationSec: validated.value.durationSec,
        userHashedId: userRes.value.hashedId,
      });
      if (!reqRes.ok) return reqRes as Result<SignatureRequest>;
      return ok(reqRes.value);
    }),
};

const GetInvoiceInputSchema = z
  .object({
    payTo: z.string().min(1),
    memo: z.string().optional(),
  })
  .strict();
type GetInvoiceInput = z.infer<typeof GetInvoiceInputSchema>;

const GetInvoiceCommand: Command<GetInvoiceInput, unknown> = {
  name: "/get-invoice",
  description: "Generate a signed invoice blob (A2A)",
  inputSchema: GetInvoiceInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.getInvoice.execute", async () => {
      const validated = parseWithSchema(
        GetInvoiceInputSchema,
        input,
        "gateway.commands.getInvoice.input",
      );
      if (!validated.ok) return validated;

      // Verify user identity
      const userRes = await verifyUserIdentity(ctx, ctx.sender);
      if (!userRes.ok) return userRes;

      return await generateInvoice({
        payTo: validated.value.payTo,
        memo: validated.value.memo,
        sender: ctx.sender!,
      });
    }),
};

const ReserveTaskInputSchema = z
  .object({
    taskId: z.string().min(1).max(128),
    token: z.string().min(1),
    amount: z.coerce.bigint().positive(),
  })
  .strict();
type ReserveTaskInput = z.infer<typeof ReserveTaskInputSchema>;

const ReserveTaskCommand: Command<ReserveTaskInput, unknown> = {
  name: "/reserve-task",
  description: "Reserve (escrow) funds for a task (on-chain registry reservation)",
  inputSchema: ReserveTaskInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.reserveTask.execute", async () => {
      const validated = parseWithSchema(
        ReserveTaskInputSchema,
        input,
        "gateway.commands.reserveTask.input",
      );
      if (!validated.ok) return validated;

      // Verify user identity
      const userRes = await verifyUserIdentity(ctx, ctx.sender);
      if (!userRes.ok) return userRes;

      const userHashRes = hashExternalUserId(ctx.sender!);
      if (!userHashRes.ok) return userHashRes;

      const reserved = await reserveFunds(ctx.registry, {
        userIdHash: userHashRes.value,
        taskId: validated.value.taskId,
        token: validated.value.token,
        amount: validated.value.amount,
      });
      return reserved;
    }),
};

const CompleteTaskInputSchema = z.object({ taskId: z.string().min(1).max(128) }).strict();
type CompleteTaskInput = z.infer<typeof CompleteTaskInputSchema>;

const CompleteTaskCommand: Command<CompleteTaskInput, unknown> = {
  name: "/complete-task",
  description: "Release escrow reservation for a task (requires follow-up payment signature)",
  inputSchema: CompleteTaskInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.completeTask.execute", async () => {
      const validated = parseWithSchema(
        CompleteTaskInputSchema,
        input,
        "gateway.commands.completeTask.input",
      );
      if (!validated.ok) return validated;

      // Verify user identity
      const userRes = await verifyUserIdentity(ctx, ctx.sender);
      if (!userRes.ok) return userRes;

      const user = userRes.value;

      // Log the completion attempt
      const auditRepo = getAuditLogRepository();
      await auditRepo.create({
        userHashedId: user.hashedId,
        action: "COMPLETE_TASK_INITIATED",
        status: "PENDING",
        details: {
          taskId: validated.value.taskId,
        },
      });

      const userHashRes = hashExternalUserId(ctx.sender!);
      if (!userHashRes.ok) return userHashRes;
      
      // Execute the release - in real implementation this would return a txHash
      const releaseRes = await releaseFunds(ctx.registry, {
        userIdHash: userHashRes.value,
        taskId: validated.value.taskId,
      });

      if (!releaseRes.ok) {
        // Log failure
        await auditRepo.updateStatusByTxHash(
          "0x" + "0".repeat(64), // placeholder
          "FAILED",
          undefined,
          releaseRes.error.message
        );
        return releaseRes;
      }

      // Get txHash from result (if available) and start watching
      const txHash = (releaseRes.value as any)?.txHash;
      if (txHash && ctx.txWatcher) {
        ctx.txWatcher.watchTransactionBackground(txHash, user.hashedId);
      }

      return releaseRes;
    }),
};

const HelpCommand: Command<{}, TextResponse> = {
  name: "/help",
  description: "List available commands",
  inputSchema: EmptySchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.help.execute", async () => {
      const validated = parseWithSchema(EmptySchema, input, "gateway.commands.help.input");
      if (!validated.ok) return validated;

      const lines = Object.values(buildCommandMap()).map(
        (c) => `${c.name} - ${c.description}`,
      );
      return ok(lines.join("\n"));
    }),
};

/**
 * DistributeInputSchema - Revenue split distribution command
 */
const DistributeInputSchema = z
  .object({
    tokenAddress: z
      .string()
      .refine((v) => isAddress(v), { message: "tokenAddress must be an address" })
      .transform((v) => v as Address),
    recipients: z
      .array(
        z.object({
          address: z
            .string()
            .refine((v) => isAddress(v), { message: "address must be an address" })
            .transform((v) => v as Address),
          percentage: z.number().int().min(1).max(100),
        }),
      )
      .min(1)
      .max(10),
  })
  .strict();
type DistributeInput = z.infer<typeof DistributeInputSchema>;

/**
 * DistributeCommand - Execute revenue split based on personality rules
 * Uses stored signatures from Postgres "Vault" to authorize transactions
 */
const DistributeCommand: Command<DistributeInput, { txHash: string; distributed: { address: string; amount: string }[] }> = {
  name: "/distribute",
  description: "Execute revenue distribution (requires valid authorization)",
  inputSchema: DistributeInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.distribute.execute", async () => {
      const validated = parseWithSchema(DistributeInputSchema, input, "gateway.commands.distribute.input");
      if (!validated.ok) return validated;

      // Verify user identity
      const userRes = await verifyUserIdentity(ctx, ctx.sender);
      if (!userRes.ok) return userRes as Result<any>;

      const user = userRes.value;

      // Check personality rules for distribution
      if (user.personality === Personality.GUARDIAN) {
        // Guardians need explicit approval for distributions
        return err(
          new AppError({
            code: "COMMAND_ERROR",
            message: "Guardian personality requires manual confirmation for distributions. Please use /authorize-agent with appropriate limits.",
            context: "gateway.commands.distribute",
          }),
        );
      }

      // Get signature from Postgres Vault for this user
      const authRepo = getAuthorizationRepository();
      const sigRes = await authRepo.getSignatureForWallet(user.eoaAddress);

      if (!sigRes.ok) {
        return err(
          new AppError({
            code: "DB_ERROR",
            message: "Failed to retrieve authorization signature",
            context: "gateway.commands.distribute",
            causeUnknown: sigRes.error,
          }),
        );
      }

      if (!sigRes.value) {
        return err(
          new AppError({
            code: "COMMAND_ERROR",
            message: "No active authorization found. Please run /authorize-agent first.",
            context: "gateway.commands.distribute",
          }),
        );
      }

      // Log the distribution attempt (with PENDING status)
      const auditRepo = getAuditLogRepository();
      await auditRepo.create({
        userHashedId: user.hashedId,
        action: "DISTRIBUTE_INITIATED",
        status: "PENDING",
        details: {
          tokenAddress: validated.value.tokenAddress,
          recipients: validated.value.recipients,
          agentId: sigRes.value.agentId,
        },
      });

      // TODO: Actually execute the distribution using KeylessClient
      // For now, return mock response - real implementation would:
      // 1. Use personalityEngine.preFlightCheck() to simulate
      // 2. Use personalityEngine.verifyAuthorization() to verify
      // 3. Use KeylessClient with decrypted signature to execute
      // 4. Get the txHash and start watching it

      const mockTxHash = "0x" + "a".repeat(64); // Mock tx hash for demo

      // Start watching the transaction in the background (fire and forget)
      if (ctx.txWatcher) {
        ctx.txWatcher.watchTransactionBackground(mockTxHash as any, user.hashedId);
      }

      return ok({
        message: `Distribution initiated for ${validated.value.recipients.length} recipients. Transaction pending...`,
        txHash: mockTxHash,
        distributed: validated.value.recipients.map((r) => ({
          address: r.address,
          amount: "0", // Would be calculated based on total / percentage
        })),
      } as any);
    }),
};

/**
 * RevokeInputSchema - Revoke agent authorization
 */
const RevokeInputSchema = z
  .object({
    agentId: z.string().min(1).max(128),
  })
  .strict();
type RevokeInput = z.infer<typeof RevokeInputSchema>;

/**
 * RevokeCommand - Instantly revoke an agent's authorization (gasless)
 * Sets isActive = false in the Postgres "Vault"
 */
const RevokeCommand: Command<RevokeInput, { success: boolean; agentId: string }> = {
  name: "/revoke",
  description: "Revoke an agent's authorization (instant, gasless)",
  inputSchema: RevokeInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.revoke.execute", async () => {
      const validated = parseWithSchema(RevokeInputSchema, input, "gateway.commands.revoke.input");
      if (!validated.ok) return validated;

      // Verify user identity
      const userRes = await verifyUserIdentity(ctx, ctx.sender);
      if (!userRes.ok) return userRes as Result<any>;

      const user = userRes.value;

      // Revoke the authorization in Postgres (instant, gasless)
      const authRepo = getAuthorizationRepository();
      const revokeRes = await authRepo.revoke(user.hashedId, validated.value.agentId);

      if (!revokeRes.ok) {
        return err(
          new AppError({
            code: "DB_ERROR",
            message: "Failed to revoke authorization",
            context: "gateway.commands.revoke",
            causeUnknown: revokeRes.error,
          }),
        );
      }

      // Log the revocation
      const auditRepo = getAuditLogRepository();
      await auditRepo.create({
        userHashedId: user.hashedId,
        action: "AUTHORIZATION_REVOKED",
        details: {
          agentId: validated.value.agentId,
          revokedAt: new Date().toISOString(),
        },
      });

      return ok({
        success: true,
        agentId: validated.value.agentId,
      });
    }),
};

/**
 * HistoryInputSchema - Get audit history
 */
const HistoryInputSchema = z
  .object({
    limit: z.coerce.number().int().positive().max(100).default(5),
  })
  .strict();
type HistoryInput = z.infer<typeof HistoryInputSchema>;

/**
 * HistoryCommand - Return last N AuditLog entries
 */
const HistoryCommand: Command<HistoryInput, { history: { action: string; timestamp: string; details?: any; txHash?: string }[] }> = {
  name: "/history",
  description: "Show last N audit log entries",
  inputSchema: HistoryInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.history.execute", async () => {
      const validated = parseWithSchema(HistoryInputSchema, input, "gateway.commands.history.input");
      if (!validated.ok) return validated;

      // Verify user identity
      const userRes = await verifyUserIdentity(ctx, ctx.sender);
      if (!userRes.ok) return userRes as Result<any>;

      const user = userRes.value;

      // Get audit logs
      const auditRepo = getAuditLogRepository();
      const logsRes = await auditRepo.findByUserHashedId(user.hashedId, validated.value.limit);

      if (!logsRes.ok) {
        return err(
          new AppError({
            code: "DB_ERROR",
            message: "Failed to retrieve history",
            context: "gateway.commands.history",
            causeUnknown: logsRes.error,
          }),
        );
      }

      const history = (logsRes.value || []).map((log) => ({
        action: log.action,
        timestamp: new Date().toISOString(), // timestamp is auto-generated in DB
        details: log.details,
        txHash: log.txHash,
      }));

      return ok({ history });
    }),
};

/**
 * SentryVerifyIntegrityInputSchema - Verify code integrity
 */
const SentryVerifyIntegrityInputSchema = z.object({}).strict();
type SentryVerifyIntegrityInput = z.infer<typeof SentryVerifyIntegrityInputSchema>;

/**
 * SentryVerifyIntegrityCommand - Returns current integrity attestation and hash
 * Exposes JSON-RPC method `sentry_verify_integrity`
 */
const SentryVerifyIntegrityCommand: Command<SentryVerifyIntegrityInput, {
  attestation: {
    type: string;
    value: string;
    timestamp: number;
    version: string;
    isTEE: boolean;
  };
  codeHash: string;
  srcFiles: number;
  coreFiles: number;
}> = {
  name: "sentry_verify_integrity",
  description: "Verify code integrity - returns attestation hash and TEE quote",
  inputSchema: SentryVerifyIntegrityInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.sentryVerifyIntegrity.execute", async () => {
      const validated = parseWithSchema(
        SentryVerifyIntegrityInputSchema,
        input,
        "gateway.commands.sentryVerifyIntegrity.input",
      );
      if (!validated.ok) return validated;

      // Import dynamically to avoid circular deps
      const { getSelfclawService } = await import("../auth/selfclaw");
      const selfclawRes = getSelfclawService();
      if (!selfclawRes.ok) return err(selfclawRes.error);

      const verifyRes = await selfclawRes.value.verifyIntegrity();
      if (!verifyRes.ok) return err(verifyRes.error);

      const { attestation, codeHash, srcFiles, coreFiles } = verifyRes.value;

      return ok({
        attestation: {
          type: attestation.type,
          value: attestation.value,
          timestamp: attestation.timestamp,
          version: attestation.version,
          isTEE: attestation.isTEE,
        },
        codeHash,
        srcFiles,
        coreFiles,
      });
    }),
};

/**
 * SentryRegisterHackathonInputSchema - Register for a hackathon event
 */
const SentryRegisterHackathonInputSchema = z
  .object({
    hackathonId: z.string().min(1).max(128),
    teamName: z.string().min(1).max(64),
    projectDescription: z.string().min(1).max(500).optional(),
  })
  .strict();
type SentryRegisterHackathonInput = z.infer<typeof SentryRegisterHackathonInputSchema>;

/**
 * SentryRegisterHackathonCommand - Register the Sentry agent for a hackathon
 * This allows the agent to participate in hackathon-specific tasks and earn badges
 */
const SentryRegisterHackathonCommand: Command<SentryRegisterHackathonInput, {
  success: boolean;
  hackathonId: string;
  registrationId: string;
  message: string;
}> = {
  name: "sentry_register_hackathon",
  description: "Register Sentry for a hackathon event",
  inputSchema: SentryRegisterHackathonInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.sentryRegisterHackathon.execute", async () => {
      const validated = parseWithSchema(
        SentryRegisterHackathonInputSchema,
        input,
        "gateway.commands.sentryRegisterHackathon.input",
      );
      if (!validated.ok) return validated;

      const { hackathonId, teamName, projectDescription } = validated.value;

      // Verify user identity
      const userRes = await verifyUserIdentity(ctx, ctx.sender);
      if (!userRes.ok) return err(userRes.error);

      const user = userRes.value;

      // Generate a unique registration ID
      const registrationId = `hack_${hackathonId}_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      // Log the hackathon registration
      const auditRepo = getAuditLogRepository();
      await auditRepo.create({
        userHashedId: user.hashedId,
        action: "HACKATHON_REGISTRATION",
        status: "SUCCESS",
        details: {
          hackathonId,
          teamName,
          projectDescription,
          registrationId,
        },
      });

      console.log(`[hackathon] Registered for ${hackathonId} as ${teamName}`);

      return ok({
        success: true,
        hackathonId,
        registrationId,
        message: `Successfully registered for ${hackathonId}! Your team: ${teamName}`,
      });
    }),
};

export function buildCommandMap(): CommandMap {
  const built = safeSync("gateway.commands.buildCommandMap", () =>
    ok(
      Object.freeze({
        [HealthCommand.name]: HealthCommand,
        [SupportedChainsCommand.name]: SupportedChainsCommand,
        [StartCommand.name]: StartCommand,
        [CreateWalletCommand.name]: CreateWalletCommand,
        [AuthorizeAgentCommand.name]: AuthorizeAgentCommand,
        [GetInvoiceCommand.name]: GetInvoiceCommand,
        [ReserveTaskCommand.name]: ReserveTaskCommand,
        [CompleteTaskCommand.name]: CompleteTaskCommand,
        [DistributeCommand.name]: DistributeCommand,
        [RevokeCommand.name]: RevokeCommand,
        [HistoryCommand.name]: HistoryCommand,
        [HelpCommand.name]: HelpCommand,
        [SentryVerifyIntegrityCommand.name]: SentryVerifyIntegrityCommand,
        [SentryRegisterHackathonCommand.name]: SentryRegisterHackathonCommand,
      }) as CommandMap,
    ),
  );
  return built.ok ? built.value : (Object.freeze({}) as CommandMap);
}

