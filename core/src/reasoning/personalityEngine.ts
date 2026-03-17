import { z } from "zod";
import {
  createPublicClient,
  http,
  isAddress,
  parseUnits,
  type Address,
  type Hex,
} from "viem";
import { AppError } from "../errors";
import { err, ok, type Result } from "../result";
import { parseWithSchema, safeAsync, safeSync } from "../validation";
import { Personality, type Personality as PersonalityValue } from "../personality";

export const ActionRequestSchema = z
  .object({
    kind: z.enum(["MANUAL_CONFIRM"]),
    message: z.string().min(1),
    intentId: z.string().min(1),
  })
  .strict();

export type ActionRequest = z.infer<typeof ActionRequestSchema>;

export type MiddlewareDecision =
  | Readonly<{ decision: "ALLOW"; message?: string }>
  | Readonly<{ decision: "QUEUE"; message: string }>
  | Readonly<{ decision: "BLOCK"; action: ActionRequest }>;

export const TransferIntentSchema = z
  .object({
    intentId: z.string().min(1),
    kind: z.enum(["TRANSFER_ERC20", "TRANSFER_NATIVE"]),
    to: z
      .string()
      .refine((v) => isAddress(v), { message: "to must be an address" })
      .transform((v) => v as Address),
    // For MVP: treat amount as human units string, and assume USD==token for cUSD.
    amount: z.string().min(1),
    symbol: z.string().min(1).max(16),
    token: z
      .string()
      .refine((v) => isAddress(v), { message: "token must be an address" })
      .transform((v) => v as Address)
      .optional(),
    decimals: z.number().int().min(0).max(36).default(18),
  })
  .strict();

export type TransferIntent = z.infer<typeof TransferIntentSchema>;

export const PersonalityEngineInitSchema = z
  .object({
    rpcUrl: z.string().url(),
    guardianUsdLimit: z.number().positive().default(10),
    accountantMaxGasGwei: z.number().positive().default(50),
    whitelist: z.record(z.string(), z.boolean()).default({}),
    // strategist
    cusdToken: z
      .string()
      .refine((v) => isAddress(v), { message: "cusdToken must be an address" })
      .transform((v) => v as Address)
      .optional(),
    strategistIdleThreshold: z.number().positive().default(100),
  })
  .strict();

export type PersonalityEngineInit = z.input<typeof PersonalityEngineInitSchema>;

const Erc20BalanceOfAbi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

export class PersonalityEngine {
  private readonly init: z.infer<typeof PersonalityEngineInitSchema>;

  constructor(init: PersonalityEngineInit) {
    const parsed = PersonalityEngineInitSchema.safeParse(init);
    if (!parsed.success) {
      throw new AppError({
        code: "CONFIG_ERROR",
        message: "Invalid PersonalityEngine init",
        context: "core.reasoning.personalityEngine.init",
        details: { issues: parsed.error.issues },
      });
    }
    this.init = parsed.data;
  }

  private publicClient() {
    return createPublicClient({ transport: http(this.init.rpcUrl) });
  }

  isWhitelisted(to: Address): Result<boolean> {
    return safeSync("core.reasoning.personalityEngine.isWhitelisted", () => {
      const key = to.toLowerCase();
      return ok(Boolean(this.init.whitelist[key]));
    });
  }

  async interceptTransfer(
    personality: PersonalityValue,
    intentUnknown: unknown,
    walletAddress?: Address,
  ): Promise<Result<MiddlewareDecision>> {
    return safeAsync("core.reasoning.personalityEngine.interceptTransfer", async () => {
      const intentRes = parseWithSchema(
        TransferIntentSchema,
        intentUnknown,
        "core.reasoning.transferIntent",
      );
      if (!intentRes.ok) return intentRes;
      const intent = intentRes.value;

      if (personality === Personality.GUARDIAN) {
        const whitelistRes = this.isWhitelisted(intent.to);
        if (!whitelistRes.ok) return whitelistRes;

        // MVP: 1 cUSD == $1, so compare numeric amount.
        const amountNumber = Number(intent.amount);
        const aboveUsd = Number.isFinite(amountNumber) && amountNumber > this.init.guardianUsdLimit;

        if (aboveUsd || !whitelistRes.value) {
          return ok({
            decision: "BLOCK",
            action: {
              kind: "MANUAL_CONFIRM",
              intentId: intent.intentId,
              message:
                "This transfer requires your approval. Reply with CONFIRM or REJECT.\n" +
                `To: ${intent.to}\n` +
                `Amount: ${intent.amount} ${intent.symbol}`,
            },
          });
        }
        return ok({ decision: "ALLOW" });
      }

      if (personality === Personality.ACCOUNTANT) {
        const pc = this.publicClient();
        const gas = await pc.getGasPrice();
        const gasGwei = Number(gas) / 1e9;

        if (!Number.isFinite(gasGwei)) {
          return err(
            new AppError({
              code: "SDK_ERROR",
              message: "Failed to read gas price",
              context: "core.reasoning.accountant.gas",
            }),
          );
        }

        if (gasGwei > this.init.accountantMaxGasGwei) {
          return ok({
            decision: "QUEUE",
            message:
              "Gas is high. Queuing this transaction for lower congestion.",
          });
        }
        return ok({ decision: "ALLOW" });
      }

      if (personality === Personality.STRATEGIST) {
        // Allow, but optionally append suggestion if idle funds are above threshold.
        if (!walletAddress || !this.init.cusdToken) {
          return ok({ decision: "ALLOW" });
        }

        try {
          const pc = this.publicClient();
          const bal = await pc.readContract({
            address: this.init.cusdToken,
            abi: Erc20BalanceOfAbi,
            functionName: "balanceOf",
            args: [walletAddress],
          });

          const threshold = parseUnits(
            String(this.init.strategistIdleThreshold),
            18,
          );

          if (bal > threshold) {
            return ok({
              decision: "ALLOW",
              message:
                "You have idle funds. Use /optimize to move 50 cUSD to Mento/Aave.",
            });
          }
        } catch {
          // Non-fatal: still allow transfer.
        }

        return ok({ decision: "ALLOW" });
      }

      return err(
        new AppError({
          code: "INVALID_INPUT",
          message: "Unknown personality",
          context: "core.reasoning.personalityEngine.interceptTransfer",
          details: { personality },
        }),
      );
    });
  }

  async loadSdkContext(): Promise<Result<string>> {
    return safeAsync("core.reasoning.personalityEngine.loadSdkContext", async () => {
      try {
        const path = "skills/sdk/SKILL.md";
        const text = await Bun.file(path).text();
        if (text.trim().length === 0) {
          return err(
            new AppError({
              code: "INTERNAL_ERROR",
              message: "SDK skill file is empty",
              context: "core.reasoning.personalityEngine.loadSdkContext",
              details: { path },
            }),
          );
        }
        return ok(text);
      } catch (causeUnknown) {
        return err(
          new AppError({
            code: "INTERNAL_ERROR",
            message: "Failed to load SDK skill context",
            context: "core.reasoning.personalityEngine.loadSdkContext",
            causeUnknown,
          }),
        );
      }
    });
  }
}

