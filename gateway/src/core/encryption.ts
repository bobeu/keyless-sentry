import { z } from "zod";
import { AppError } from "./errors";
import { err, ok, type Result } from "./result";
import { safeSync } from "./validation";
import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

const EnvEncryptionSchema = z
  .object({
    ENCRYPTION_KEY: z.string().length(64), // 32 bytes = 64 hex chars
  })
  .strict();

type EncryptionEnv = z.infer<typeof EnvEncryptionSchema>;

/**
 * Encryption utility for securing sensitive data like signatures in the database.
 * Uses AES-256-GCM for authenticated encryption.
 */
export class EncryptionService {
  private readonly key: Buffer;

  private constructor(key: Buffer) {
    this.key = key;
  }

  /**
   * Create encryption service from environment variables
   */
  static fromEnv(): Result<EncryptionService> {
    return safeSync("core.encryption.fromEnv", () => {
      const parsed = EnvEncryptionSchema.safeParse(process.env);
      if (!parsed.success) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "Invalid ENCRYPTION_KEY in environment",
            context: "core.encryption.fromEnv",
            details: { issues: parsed.error.issues },
          }),
        );
      }

      const keyBuffer = Buffer.from(parsed.data.ENCRYPTION_KEY, "hex");
      if (keyBuffer.length !== 32) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "ENCRYPTION_KEY must be 32 bytes (64 hex characters)",
            context: "core.encryption.fromEnv",
          }),
        );
      }

      return ok(new EncryptionService(keyBuffer));
    });
  }

  /**
   * Create encryption service with a specific key (for testing)
   */
  static fromKey(keyHex: string): Result<EncryptionService> {
    return safeSync("core.encryption.fromKey", () => {
      if (keyHex.length !== 64) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "Key must be 32 bytes (64 hex characters)",
            context: "core.encryption.fromKey",
          }),
        );
      }

      const keyBuffer = Buffer.from(keyHex, "hex");
      return ok(new EncryptionService(keyBuffer));
    });
  }

  /**
   * Encrypt data using AES-256-GCM
   * Returns: iv (16 bytes) + authTag (16 bytes) + ciphertext
   */
  encrypt(plaintext: string): Result<string> {
    return safeSync("core.encryption.encrypt", () => {
      try {
        // Generate random 16-byte IV
        const iv = randomBytes(16);

        // Create cipher
        const cipher = createCipheriv("aes-256-gcm", this.key, iv);

        // Encrypt
        const plaintextBuffer = Buffer.from(plaintext, "utf8");
        const encrypted = Buffer.concat([
          cipher.update(plaintextBuffer),
          cipher.final(),
        ]);

        // Get auth tag
        const authTag = cipher.getAuthTag();

        // Combine: IV (16) + AuthTag (16) + Ciphertext
        const result = Buffer.concat([iv, authTag, encrypted]);

        return ok(result.toString("hex"));
      } catch (causeUnknown) {
        return err(
          new AppError({
            code: "INTERNAL_ERROR",
            message: "Encryption failed",
            context: "core.encryption.encrypt",
            causeUnknown,
          }),
        );
      }
    });
  }

  /**
   * Decrypt data using AES-256-GCM
   * Input: iv (16 bytes) + authTag (16 bytes) + ciphertext
   */
  decrypt(ciphertext: string): Result<string> {
    return safeSync("core.encryption.decrypt", () => {
      try {
        const data = Buffer.from(ciphertext, "hex");

        if (data.length < 33) {
          // 16 (IV) + 16 (authTag) + 1 (min ciphertext)
          return err(
            new AppError({
              code: "INVALID_INPUT",
              message: "Invalid ciphertext length",
              context: "core.encryption.decrypt",
            }),
          );
        }

        // Extract components
        const iv = data.subarray(0, 16);
        const authTag = data.subarray(16, 32);
        const encrypted = data.subarray(32);

        // Create decipher
        const decipher = createDecipheriv("aes-256-gcm", this.key, iv);
        decipher.setAuthTag(authTag);

        // Decrypt
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

        return ok(decrypted.toString("utf8"));
      } catch (causeUnknown) {
        return err(
          new AppError({
            code: "INTERNAL_ERROR",
            message: "Decryption failed",
            context: "core.encryption.decrypt",
            causeUnknown,
          }),
        );
      }
    });
  }
}

// Singleton instance
let encryptionService: EncryptionService | null = null;

export function getEncryptionService(): Result<EncryptionService> {
  return safeSync("core.encryption.getEncryptionService", () => {
    if (!encryptionService) {
      const result = EncryptionService.fromEnv();
      if (!result.ok) return result;
      encryptionService = result.value;
    }
    return ok(encryptionService);
  });
}
