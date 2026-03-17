import { z } from "zod";
import type { CreateWalletRequest, CreateWalletReturn, HealthCheckResponse } from "@keyless-sentry/core";
import {
  AppError,
  err,
  ok,
  parseWithSchema,
  safeAsync,
  safeSync,
  type Result,
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

const CreateWalletInputSchema = z
  .object({
    salt: z.string().min(1).max(128).optional(),
  })
  .strict();

type CreateWalletInput = z.infer<typeof CreateWalletInputSchema>;

const CreateWalletCommand: Command<CreateWalletInput, CreateWalletReturn> = {
  name: "/create-wallet",
  description: "Create a new keyless wallet (requires owner private key env)",
  inputSchema: CreateWalletInputSchema,
  execute: async (ctx, input) =>
    safeAsync("gateway.commands.createWallet.execute", async () => {
      const validated = parseWithSchema(
        CreateWalletInputSchema,
        input,
        "gateway.commands.createWallet.input",
      );
      if (!validated.ok) return validated;

      const clientRes = ctx.orchestrator.getKeylessClient();
      if (!clientRes.ok) return clientRes;

      const envRes = ctx.orchestrator.getEnv();
      if (!envRes.ok) return envRes;

      const walletClientRes = ctx.orchestrator.createOwnerWalletClient();
      if (!walletClientRes.ok) return walletClientRes;

      const request: CreateWalletRequest = {
        owner: envRes.value.KEYLESS_OWNER,
        salt: validated.value.salt,
      };

      try {
        const res = await clientRes.value.createWallet(walletClientRes.value, request);
        return ok(res);
      } catch (causeUnknown) {
        return err(
          new AppError({
            code: "SDK_ERROR",
            message: "SDK createWallet failed",
            context: "gateway.commands.createWallet.sdk",
            causeUnknown,
          }),
        );
      }
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
        [CreateWalletCommand.name]: CreateWalletCommand,
        [HelpCommand.name]: HelpCommand,
      }) as CommandMap,
    ),
  );
  return built.ok ? built.value : (Object.freeze({}) as CommandMap);
}

