import { z } from "zod";
import { privateKeyToAccount } from "viem/accounts";
import { isHex, type Hex } from "viem";
import { AppError, toAppError } from "../errors";
import { err, ok, type Result } from "../result";
import { parseWithSchema, safeAsync } from "../validation";

const SealEnvSchema = z
  .object({
    AUTH: z
      .string()
      .refine((v) => /^0x[0-9a-fA-F]{64}$/.test(v), { message: "AUTH must be 32-byte hex" })
      .transform((v) => v as Hex),
    SENTRY_ID: z.string().min(1).default("sentry"),
  })
  .passthrough();

export const SentrySealPayloadSchema = z
  .object({
    txHash: z
      .string()
      .refine((v) => isHex(v), { message: "txHash must be hex" })
      .transform((v) => v as Hex),
    sender: z
      .object({
        platform: z.enum(["telegram", "whatsapp"]),
        id: z.string().min(1).max(128),
      })
      .strict(),
    timestamp: z.number().int().positive(),
    sentryId: z.string().min(1),
  })
  .strict();

export type SentrySealPayload = z.infer<typeof SentrySealPayloadSchema>;

export async function signSentrySeal(payloadUnknown: unknown): Promise<Result<{ payload: SentrySealPayload; signature: Hex }>> {
  return safeAsync("core.skills.seal.signSentrySeal", async () => {
    const payloadRes = parseWithSchema(SentrySealPayloadSchema, payloadUnknown, "core.skills.seal.payload");
    if (!payloadRes.ok) return payloadRes as Result<{ payload: SentrySealPayload; signature: Hex }>;

    const envParsed = SealEnvSchema.safeParse(process.env);
    if (!envParsed.success) {
      return err(
        new AppError({
          code: "CONFIG_ERROR",
          message: "Missing AUTH for Sentry Seal signing",
          context: "core.skills.seal.env",
        }),
      );
    }

    try {
      const account = privateKeyToAccount(envParsed.data.AUTH);
      const message = JSON.stringify(payloadRes.value);
      const signature = await account.signMessage({ message });
      return ok({ payload: payloadRes.value, signature });
    } catch (causeUnknown) {
      return err(
        toAppError(causeUnknown, {
          code: "INTERNAL_ERROR",
          message: "Failed to sign Sentry Seal",
          context: "core.skills.seal.sign",
        }),
      );
    }
  });
}

