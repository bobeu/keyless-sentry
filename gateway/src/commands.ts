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
} from "@keyless-sentry/core";
import {
  hashExternalUserId,
  Personality,
  type Personality as PersonalityValue,
} from "@keyless-sentry/core";
import type { Command, CommandContext, CommandMap } from "./command";

type TextResponse = string;

const EmptySchema = z.object({}).strict();

const HealthCommand: Command<{}, HealthCheckResponse> = {
  name: "/health",
  description: "Check coordinator health",
  inputSchema: EmptySchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.health.execute", async () => {
      const validated = parseWithSchema(EmptySchema, input, "gateway.commands.health.input");
      if (!validated.ok) return validated;
      return await ctx.orchestrator.healthCheck();
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

const StartCommand: Command<StartInput, { txHash: string }> = {
  name: "/start",
  description: "Register your chat identity on-chain (requires AUTH env)",
  inputSchema: StartInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.start.execute", async () => {
      const validated = parseWithSchema(StartInputSchema, input, "gateway.commands.start.input");
      if (!validated.ok) return validated;

      const hashRes = hashExternalUserId({
        platform: validated.value.platform,
        id: validated.value.id,
      });
      if (!hashRes.ok) return hashRes;

      // In this scaffold, we register the owner EOA as KEYLESS_OWNER from env.
      // Full flow will register after signature-based wallet creation.
      const orchRes = ctx.orchestrator.getEnv();
      if (!orchRes.ok) return orchRes;

      const txRes = await ctx.registry.registerUserOnchain({
        userIdHash: hashRes.value,
        owner: orchRes.value.KEYLESS_OWNER,
        personality: validated.value.personality as PersonalityValue,
      });
      if (!txRes.ok) return txRes;

      return ok({ txHash: txRes.value });
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

      // Require that the sender has registered on-chain first.
      if (!ctx.sender) {
        return err(
          new AppError({
            code: "COMMAND_ERROR",
            message: "Missing sender identity. OpenClaw must provide { user: { platform, id } }.",
            context: "gateway.commands.createWallet.sender",
          }),
        );
      }
      const userHashRes = hashExternalUserId(ctx.sender);
      if (!userHashRes.ok) return userHashRes as Result<SignatureRequest>;
      const registeredRes = await ctx.registry.isRegistered(userHashRes.value);
      if (!registeredRes.ok) return registeredRes as Result<SignatureRequest>;
      if (!registeredRes.value) {
        return err(
          new AppError({
            code: "COMMAND_ERROR",
            message: "You are not registered. Run /start first.",
            context: "gateway.commands.createWallet.notRegistered",
          }),
        );
      }

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

      if (!ctx.sender) {
        return err(
          new AppError({
            code: "COMMAND_ERROR",
            message: "Missing sender identity. OpenClaw must provide { user: { platform, id } }.",
            context: "gateway.commands.authorizeAgent.sender",
          }),
        );
      }
      const userHashRes = hashExternalUserId(ctx.sender);
      if (!userHashRes.ok) return userHashRes as Result<SignatureRequest>;
      const registeredRes = await ctx.registry.isRegistered(userHashRes.value);
      if (!registeredRes.ok) return registeredRes as Result<SignatureRequest>;
      if (!registeredRes.value) {
        return err(
          new AppError({
            code: "COMMAND_ERROR",
            message: "You are not registered. Run /start first.",
            context: "gateway.commands.authorizeAgent.notRegistered",
          }),
        );
      }

      const reqRes = await ctx.signatureRequests.requestAuthorizeAgent({
        baseUrl: envRes.value.KEYLESS_BASE_URL,
        chainId: envRes.value.KEYLESS_CHAIN_ID,
        owner: envRes.value.KEYLESS_OWNER,
        agentId: validated.value.agentId,
        limit: validated.value.limit,
        durationSec: validated.value.durationSec,
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
      if (!ctx.sender) {
        return err(
          new AppError({
            code: "COMMAND_ERROR",
            message: "Missing sender identity. OpenClaw must provide { user: { platform, id } }.",
            context: "gateway.commands.getInvoice.sender",
          }),
        );
      }
      return await generateInvoice({
        payTo: validated.value.payTo,
        memo: validated.value.memo,
        sender: ctx.sender,
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
      if (!ctx.sender) {
        return err(
          new AppError({
            code: "COMMAND_ERROR",
            message: "Missing sender identity. OpenClaw must provide { user: { platform, id } }.",
            context: "gateway.commands.reserveTask.sender",
          }),
        );
      }
      const userHashRes = hashExternalUserId(ctx.sender);
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
      if (!ctx.sender) {
        return err(
          new AppError({
            code: "COMMAND_ERROR",
            message: "Missing sender identity. OpenClaw must provide { user: { platform, id } }.",
            context: "gateway.commands.completeTask.sender",
          }),
        );
      }
      const userHashRes = hashExternalUserId(ctx.sender);
      if (!userHashRes.ok) return userHashRes;
      return await releaseFunds(ctx.registry, {
        userIdHash: userHashRes.value,
        taskId: validated.value.taskId,
      });
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
        [HelpCommand.name]: HelpCommand,
      }) as CommandMap,
    ),
  );
  return built.ok ? built.value : (Object.freeze({}) as CommandMap);
}

