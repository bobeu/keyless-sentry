/**
 * Sentry Owner Verification Service
 * 
 * Verifies that the requester is the owner of Sentry based on their Telegram ID.
 * The owner's Telegram ID is stored in environment variables.
 */

import { z } from "zod";
import { AppError } from "./errors";
import { err, ok, type Result } from "./result";
import { safeSync } from "./validation";

const OwnerConfigSchema = z
  .object({
    SENTRY_OWNER_TELEGRAM_ID: z.string().min(1),
  })
  .strict();

type OwnerConfig = z.infer<typeof OwnerConfigSchema>;

/**
 * Verify if a Telegram user is the owner of Sentry
 */
export class OwnerVerifier {
  private readonly ownerTelegramId: string;

  constructor(config: OwnerConfig) {
    this.ownerTelegramId = config.SENTRY_OWNER_TELEGRAM_ID;
  }

  /**
   * Create from environment variables
   */
  static fromEnv(): Result<OwnerVerifier> {
    return safeSync("core.owner.fromEnv", () => {
      const parsed = OwnerConfigSchema.safeParse(process.env);
      if (!parsed.success) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "Invalid owner configuration - SENTRY_OWNER_TELEGRAM_ID is required",
            context: "core.owner.fromEnv",
            details: { issues: parsed.error.issues },
          }),
        );
      }
      return ok(new OwnerVerifier(parsed.data));
    });
  }

  /**
   * Verify if the given Telegram ID is the owner
   */
  isOwner(telegramId: string): boolean {
    return telegramId === this.ownerTelegramId;
  }

  /**
   * Verify and return result
   */
  verify(telegramId: string): Result<{ isOwner: boolean; ownerId: string }> {
    return ok({
      isOwner: this.isOwner(telegramId),
      ownerId: this.ownerTelegramId,
    });
  }

  /**
   * Get the owner's Telegram ID
   */
  getOwnerId(): string {
    return this.ownerTelegramId;
  }
}

// Singleton instance
let ownerVerifier: OwnerVerifier | null = null;

export function getOwnerVerifier(): Result<OwnerVerifier> {
  return safeSync("core.owner.getOwnerVerifier", () => {
    if (!ownerVerifier) {
      const result = OwnerVerifier.fromEnv();
      if (!result.ok) return result;
      ownerVerifier = result.value;
    }
    return ok(ownerVerifier);
  });
}
