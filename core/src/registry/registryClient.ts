import { z } from "zod";
import {
  createPublicClient,
  createWalletClient,
  encodeFunctionData,
  http,
  isAddress,
  keccak256,
  stringToHex,
  type Address,
  type Hex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celo, celoSepolia } from "viem/chains";
import { AppError, toAppError } from "../errors";
import { err, ok, type Result } from "../result";
import { parseWithSchema, safeAsync, safeSync } from "../validation";
import { SentryRegistryAbi } from "./abi";
import { Personality, type Personality as PersonalityValue } from "../personality";

export const RegistryEnvSchema = z
  .object({
    SENTRY_REGISTRY_ADDRESS: z
      .string()
      .refine((v) => isAddress(v), { message: "SENTRY_REGISTRY_ADDRESS must be an address" })
      .transform((v) => v as Address),
    SENTRY_RPC_URL: z.string().url(),
    SENTRY_CHAIN_ID: z.coerce.number().int().positive(),
    AUTH: z
      .string()
      .refine((v) => /^0x[0-9a-fA-F]{64}$/.test(v), { message: "AUTH must be 32-byte hex" })
      .transform((v) => v as Hex),
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

function personalityToUint8(p: PersonalityValue): Result<number> {
  return safeSync("core.registry.personalityToUint8", () => {
    switch (p) {
      case Personality.GUARDIAN:
        return ok(0);
      case Personality.ACCOUNTANT:
        return ok(1);
      case Personality.STRATEGIST:
        return ok(2);
      default:
        return err(
          new AppError({
            code: "INVALID_INPUT",
            message: "Unknown personality",
            context: "core.registry.personalityToUint8",
            details: { p },
          }),
        );
    }
  });
}

export class SentryRegistryClient {
  private readonly env: RegistryEnv;

  constructor(env: RegistryEnv) {
    this.env = env;
  }

  static fromProcessEnv(): Result<SentryRegistryClient> {
    return safeSync("core.registry.fromProcessEnv", () => {
      const parsed = parseWithSchema(RegistryEnvSchema, process.env, "core.registry.env");
      if (!parsed.ok) return parsed;
      return ok(new SentryRegistryClient(parsed.value));
    });
  }

  private publicClient() {
    return createPublicClient({
      transport: http(this.env.SENTRY_RPC_URL),
    });
  }

  private walletClient() {
    const account = privateKeyToAccount(this.env.AUTH);
    return createWalletClient({
      account,
      transport: http(this.env.SENTRY_RPC_URL),
    });
  }

  async isRegistered(userIdHash: UserIdHash): Promise<Result<boolean>> {
    return safeAsync("core.registry.isRegistered", async () => {
      try {
        const client = this.publicClient();
        const res = await client.readContract({
          address: this.env.SENTRY_REGISTRY_ADDRESS,
          abi: SentryRegistryAbi,
          functionName: "isRegistered",
          args: [userIdHash],
        });
        return ok(Boolean(res));
      } catch (causeUnknown) {
        return err(
          toAppError(causeUnknown, {
            code: "SDK_ERROR",
            message: "Failed to read registry",
            context: "core.registry.isRegistered",
          }),
        );
      }
    });
  }

  buildRegisterUserEncodedData(inputUnknown: unknown): Result<Hex> {
    return safeSync("core.registry.buildRegisterUserEncodedData", () => {
      const schema = z
        .object({
          userIdHash: z.string().refine((v) => v.startsWith("0x") && v.length === 66, {
            message: "userIdHash must be bytes32 hex",
          }),
          owner: z.string().refine((v) => isAddress(v), { message: "owner must be address" }),
          personality: z.enum([Personality.GUARDIAN, Personality.ACCOUNTANT, Personality.STRATEGIST]),
        })
        .strict();

      const parsed = parseWithSchema(schema, inputUnknown, "core.registry.registerUser.input");
      if (!parsed.ok) return parsed;

      const personalityRes = personalityToUint8(parsed.value.personality);
      if (!personalityRes.ok) return personalityRes;

      const data = encodeFunctionData({
        abi: SentryRegistryAbi,
        functionName: "registerUser",
        args: [parsed.value.userIdHash as Hex, parsed.value.owner as Address, personalityRes.value],
      });
      return ok(data);
    });
  }

  async registerUserOnchain(inputUnknown: unknown): Promise<Result<Hex>> {
    return safeAsync("core.registry.registerUserOnchain", async () => {
      const schema = z
        .object({
          userIdHash: z.string().refine((v) => v.startsWith("0x") && v.length === 66, {
            message: "userIdHash must be bytes32 hex",
          }),
          owner: z
            .string()
            .refine((v) => isAddress(v), { message: "owner must be address" })
            .transform((v) => v as Address),
          personality: z.enum([Personality.GUARDIAN, Personality.ACCOUNTANT, Personality.STRATEGIST]),
        })
        .strict();
      const parsed = parseWithSchema(schema, inputUnknown, "core.registry.registerUserOnchain.input");
      if (!parsed.ok) return parsed;

      const dataRes = this.buildRegisterUserEncodedData({
        userIdHash: parsed.value.userIdHash,
        owner: parsed.value.owner,
        personality: parsed.value.personality,
      });
      if (!dataRes.ok) return dataRes;

      try {
        const wc = this.walletClient();
        const chainObj =
          this.env.SENTRY_CHAIN_ID === 42220
            ? celo
            : this.env.SENTRY_CHAIN_ID === 44787
              ? celoSepolia
              : undefined;
        if (!chainObj) {
          return err(
            new AppError({
              code: "CONFIG_ERROR",
              message: "SENTRY_CHAIN_ID must be 42220 or 44787",
              context: "core.registry.registerUserOnchain.chain",
            }),
          );
        }
        const txHash = await wc.sendTransaction({
          chain: chainObj,
          to: this.env.SENTRY_REGISTRY_ADDRESS,
          data: dataRes.value,
        });
        return ok(txHash);
      } catch (causeUnknown) {
        return err(
          toAppError(causeUnknown, {
            code: "SDK_ERROR",
            message: "Failed to register user on-chain",
            context: "core.registry.registerUserOnchain",
          }),
        );
      }
    });
  }

  async linkWalletOnchain(inputUnknown: unknown): Promise<Result<Hex>> {
    return safeAsync("core.registry.linkWalletOnchain", async () => {
      const schema = z
        .object({
          userIdHash: z.string().refine((v) => v.startsWith("0x") && v.length === 66, {
            message: "userIdHash must be bytes32 hex",
          }),
          wallet: z
            .string()
            .refine((v) => isAddress(v), { message: "wallet must be address" })
            .transform((v) => v as Address),
        })
        .strict();
      const parsed = parseWithSchema(schema, inputUnknown, "core.registry.linkWalletOnchain.input");
      if (!parsed.ok) return parsed;

      const data = encodeFunctionData({
        abi: SentryRegistryAbi,
        functionName: "linkWallet",
        args: [parsed.value.userIdHash as Hex, parsed.value.wallet],
      });

      const chainObj =
        this.env.SENTRY_CHAIN_ID === 42220
          ? celo
          : this.env.SENTRY_CHAIN_ID === 44787
            ? celoSepolia
            : undefined;
      if (!chainObj) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "SENTRY_CHAIN_ID must be 42220 or 44787",
            context: "core.registry.linkWalletOnchain.chain",
          }),
        );
      }

      try {
        const wc = this.walletClient();
        const txHash = await wc.sendTransaction({
          chain: chainObj,
          to: this.env.SENTRY_REGISTRY_ADDRESS,
          data,
        });
        return ok(txHash);
      } catch (causeUnknown) {
        return err(
          toAppError(causeUnknown, {
            code: "SDK_ERROR",
            message: "Failed to link wallet on-chain",
            context: "core.registry.linkWalletOnchain",
          }),
        );
      }
    });
  }

  async reserveFundsOnchain(inputUnknown: unknown): Promise<Result<Hex>> {
    return safeAsync("core.registry.reserveFundsOnchain", async () => {
      const schema = z
        .object({
          userIdHash: z.string().refine((v) => v.startsWith("0x") && v.length === 66, {
            message: "userIdHash must be bytes32 hex",
          }),
          taskIdHash: z.string().refine((v) => v.startsWith("0x") && v.length === 66, {
            message: "taskIdHash must be bytes32 hex",
          }),
          token: z
            .string()
            .refine((v) => isAddress(v), { message: "token must be address" })
            .transform((v) => v as Address),
          amount: z.coerce.bigint().positive(),
        })
        .strict();
      const parsed = parseWithSchema(schema, inputUnknown, "core.registry.reserveFundsOnchain.input");
      if (!parsed.ok) return parsed;

      const data = encodeFunctionData({
        abi: SentryRegistryAbi,
        functionName: "reserveFunds",
        args: [parsed.value.userIdHash as Hex, parsed.value.taskIdHash as Hex, parsed.value.token, parsed.value.amount],
      });

      const chainObj =
        this.env.SENTRY_CHAIN_ID === 42220
          ? celo
          : this.env.SENTRY_CHAIN_ID === 44787
            ? celoSepolia
            : undefined;
      if (!chainObj) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "SENTRY_CHAIN_ID must be 42220 or 44787",
            context: "core.registry.reserveFundsOnchain.chain",
          }),
        );
      }

      try {
        const wc = this.walletClient();
        const txHash = await wc.sendTransaction({
          chain: chainObj,
          to: this.env.SENTRY_REGISTRY_ADDRESS,
          data,
        });
        return ok(txHash);
      } catch (causeUnknown) {
        return err(
          toAppError(causeUnknown, {
            code: "SDK_ERROR",
            message: "Failed to reserve funds on-chain",
            context: "core.registry.reserveFundsOnchain",
          }),
        );
      }
    });
  }

  async releaseReservationOnchain(inputUnknown: unknown): Promise<Result<Hex>> {
    return safeAsync("core.registry.releaseReservationOnchain", async () => {
      const schema = z
        .object({
          userIdHash: z.string().refine((v) => v.startsWith("0x") && v.length === 66, {
            message: "userIdHash must be bytes32 hex",
          }),
          taskIdHash: z.string().refine((v) => v.startsWith("0x") && v.length === 66, {
            message: "taskIdHash must be bytes32 hex",
          }),
        })
        .strict();
      const parsed = parseWithSchema(schema, inputUnknown, "core.registry.releaseReservationOnchain.input");
      if (!parsed.ok) return parsed;

      const data = encodeFunctionData({
        abi: SentryRegistryAbi,
        functionName: "releaseReservation",
        args: [parsed.value.userIdHash as Hex, parsed.value.taskIdHash as Hex],
      });

      const chainObj =
        this.env.SENTRY_CHAIN_ID === 42220
          ? celo
          : this.env.SENTRY_CHAIN_ID === 44787
            ? celoSepolia
            : undefined;
      if (!chainObj) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "SENTRY_CHAIN_ID must be 42220 or 44787",
            context: "core.registry.releaseReservationOnchain.chain",
          }),
        );
      }

      try {
        const wc = this.walletClient();
        const txHash = await wc.sendTransaction({
          chain: chainObj,
          to: this.env.SENTRY_REGISTRY_ADDRESS,
          data,
        });
        return ok(txHash);
      } catch (causeUnknown) {
        return err(
          toAppError(causeUnknown, {
            code: "SDK_ERROR",
            message: "Failed to release reservation on-chain",
            context: "core.registry.releaseReservationOnchain",
          }),
        );
      }
    });
  }
}

