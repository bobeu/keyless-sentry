import { z } from "zod";
import type { Address } from "viem";
import { isAddress } from "viem";
import { AppError, toAppError } from "./errors";
import { err, ok, type Result } from "./result";
import { parseWithSchema, safeAsync } from "./validation";
import type { KeylessClientLike, KeylessConfig } from "./keylessSdkTypes";

const KeylessConfigSchema = z
  .object({
    baseUrl: z.string().url(),
    chainId: z.number().int().positive(),
    owner: z
      .string()
      .refine((v) => isAddress(v), { message: "owner must be an address" })
      .transform((v) => v as Address),
  })
  .strict();

export async function createKeylessClient(configUnknown: unknown): Promise<Result<KeylessClientLike>> {
  return safeAsync("core.keylessSdkRuntime.createKeylessClient", async () => {
    const parsed = parseWithSchema(KeylessConfigSchema, configUnknown, "core.keylessConfig");
    if (!parsed.ok) return parsed;

    try {
      const mod = (await import("@keyless-collective/sdk/src/client")) as {
        KeylessClient?: unknown;
        default?: unknown;
      };

      const CtorUnknown = mod.KeylessClient ?? mod.default;
      if (typeof CtorUnknown !== "function") {
        return err(
          new AppError({
            code: "SDK_ERROR",
            message: "KeylessClient constructor not found",
            context: "core.keylessSdkRuntime.import",
          }),
        );
      }

      // We keep runtime boundary as unknown, then validate the minimum surface we rely on.
      const instanceUnknown = new (CtorUnknown as new (cfg: KeylessConfig) => unknown)(
        parsed.value,
      );

      const client = instanceUnknown as Partial<KeylessClientLike>;

      if (
        typeof client.healthCheck !== "function" ||
        typeof client.getSupportedChainIds !== "function" ||
        typeof client.createWallet !== "function"
      ) {
        return err(
          new AppError({
            code: "SDK_ERROR",
            message: "SDK client does not implement required methods",
            context: "core.keylessSdkRuntime.shape",
            details: {
              hasHealthCheck: typeof client.healthCheck,
              hasGetSupportedChainIds: typeof client.getSupportedChainIds,
              hasCreateWallet: typeof client.createWallet,
            },
          }),
        );
      }

      return ok(client as KeylessClientLike);
    } catch (causeUnknown) {
      return err(
        toAppError(causeUnknown, {
          code: "SDK_ERROR",
          message: "Failed to initialize KeylessClient",
          context: "core.keylessSdkRuntime",
        }),
      );
    }
  });
}

