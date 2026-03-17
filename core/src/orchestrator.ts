import type { HealthCheckResponse, KeylessClientLike } from "./keylessSdkTypes";
import { createKeylessClient } from "./keylessSdkRuntime";
import {
  createWalletClient,
  http,
  isAddress,
  isHex,
  type Address,
  type Hex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import dotenv from "dotenv";
import { z } from "zod";
import { AppError, toAppError } from "./errors";
import { err, ok, type Result } from "./result";
import { parseWithSchema, safeAsync, safeSync } from "./validation";

const EnvSchema = z
  .object({
    KEYLESS_BASE_URL: z.string().url(),
    KEYLESS_CHAIN_ID: z.coerce.number().int().positive(),
    KEYLESS_OWNER: z
      .string()
      .refine((v) => isAddress(v), { message: "KEYLESS_OWNER must be an address" })
      .transform((v) => v as Address),
    KEYLESS_RPC_URL: z.string().url(),
    KEYLESS_OWNER_PRIVATE_KEY: z
      .string()
      .refine((v) => isHex(v) && v.length === 66, {
        message: "KEYLESS_OWNER_PRIVATE_KEY must be a 32-byte 0x-prefixed hex",
      })
      .transform((v) => v as Hex),
  })
  .strict();

export type SentryEnv = z.infer<typeof EnvSchema>;

export class SentryOrchestrator {
  private readonly client: KeylessClientLike;
  private readonly env: SentryEnv;

  private constructor(input: { client: KeylessClientLike; env: SentryEnv }) {
    this.client = input.client;
    this.env = input.env;
  }

  static async createFromEnv(): Promise<Result<SentryOrchestrator>> {
    return safeAsync("core.SentryOrchestrator.createFromEnv", async () => {
      const dotenvResult = safeSync("core.dotenv.config", () => {
        dotenv.config();
        return ok(true);
      });
      if (!dotenvResult.ok) return dotenvResult;

      const parsedEnv = parseWithSchema(EnvSchema, process.env, "core.env");
      if (!parsedEnv.ok) return parsedEnv;

      const { KEYLESS_BASE_URL, KEYLESS_CHAIN_ID, KEYLESS_OWNER } = parsedEnv.value;

      const clientRes = await createKeylessClient({
        baseUrl: KEYLESS_BASE_URL,
        chainId: KEYLESS_CHAIN_ID,
        owner: KEYLESS_OWNER,
      });
      if (!clientRes.ok) return clientRes;

      return ok(new SentryOrchestrator({ client: clientRes.value, env: parsedEnv.value }));
    });
  }

  getKeylessClient(): Result<KeylessClientLike> {
    return safeSync("core.SentryOrchestrator.getKeylessClient", () => ok(this.client));
  }

  getEnv(): Result<SentryEnv> {
    return safeSync("core.SentryOrchestrator.getEnv", () => ok(this.env));
  }

  createOwnerWalletClient(): Result<ReturnType<typeof createWalletClient>> {
    return safeSync("core.SentryOrchestrator.createOwnerWalletClient", () => {
      const account = privateKeyToAccount(this.env.KEYLESS_OWNER_PRIVATE_KEY);
      if (account.address !== this.env.KEYLESS_OWNER) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "Owner address does not match private key",
            context: "core.owner.mismatch",
            details: {
              envOwner: this.env.KEYLESS_OWNER,
              derivedOwner: account.address,
            },
          }),
        );
      }

      const walletClient = createWalletClient({
        account,
        transport: http(this.env.KEYLESS_RPC_URL),
      });

      return ok(walletClient);
    });
  }

  async healthCheck(): Promise<Result<HealthCheckResponse>> {
    return safeAsync("core.SentryOrchestrator.healthCheck", async () => {
      try {
        const res = await this.client.healthCheck();
        return ok(res);
      } catch (causeUnknown) {
        return err(
          toAppError(causeUnknown, {
            code: "SDK_ERROR",
            message: "Health check failed",
            context: "core.sdk.healthCheck",
          }),
        );
      }
    });
  }
}

