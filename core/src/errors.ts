import { z } from "zod";

export const AppErrorCodeSchema = z.enum([
  "INVALID_INPUT",
  "CONFIG_ERROR",
  "SDK_ERROR",
  "COMMAND_ERROR",
  "INTERNAL_ERROR",
  "ALREADY_EXISTS",
  "NOT_FOUND",
  "DB_ERROR",
  "CONTRACT_ERROR",
  "IDENTITY_ERROR",
  "BOUNTY_CREATE_FAILED",
  "BOUNTY_VERIFY_FAILED",
  "BOUNTY_NOT_FOUND",
  "BOUNTY_GET_ACTIVE_FAILED",
  "BOUNTY_SUBMIT_FAILED",
  "BOUNTY_RELEASE_FAILED",
  "BOUNTY_GET_BY_ID_FAILED",
  "BOUNTY_UPDATE_STATUS_FAILED",
  "BOUNTY_SUBMIT_PROOF_FAILED",
  "WALLET_ERROR",
  "REGISTRATION_ERROR",
  "SIGNATURE_ERROR",
  "INSUFFICIENT_BALANCE",
  "NOT_REGISTERED",
]);

export type AppErrorCode = z.infer<typeof AppErrorCodeSchema>;

export const AppErrorSchema = z.object({
  code: AppErrorCodeSchema,
  message: z.string(),
  context: z.string().optional(),
  details: z.record(z.string(), z.unknown()).optional(),
});

export type AppErrorShape = z.infer<typeof AppErrorSchema>;

export class AppError extends Error {
  public readonly code: AppErrorCode;
  public readonly context?: string;
  public readonly details?: Record<string, unknown>;
  public readonly causeUnknown?: unknown;

  constructor(input: AppErrorShape & { causeUnknown?: unknown }) {
    super(input.message);
    this.name = "AppError";
    this.code = input.code;
    this.context = input.context;
    this.details = input.details;
    this.causeUnknown = input.causeUnknown;
  }
}

export function toAppError(causeUnknown: unknown, fallback: AppErrorShape): AppError {
  try {
    if (causeUnknown instanceof AppError) return causeUnknown;

    if (causeUnknown instanceof Error) {
      return new AppError({
        ...fallback,
        message: `${fallback.message}: ${causeUnknown.message}`,
        causeUnknown,
      });
    }

    return new AppError({ ...fallback, causeUnknown });
  } catch {
    return new AppError({
      code: "INTERNAL_ERROR",
      message: "Failed to normalize error",
      context: fallback.context,
      details: { fallback },
      causeUnknown,
    });
  }
}
