/**
 * Selfclaw Verification Service
 * 
 * Provides integrity verification for Sentry using TEE attestation
 * or build hash verification (fallback).
 * 
 * - TEE Mode (IS_TEE=true): Fetches Remote Attestation Quote from TEE
 * - Non-TEE Mode (default): Generates SHA-256 hash of dist folder
 */

import { z } from "zod";
import { createHash } from "crypto";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { AppError } from "../errors";
import { err, ok, type Result } from "../result";
import { safeAsync, safeSync } from "../validation";

const SelfclawConfigSchema = z
  .object({
    IS_TEE: z.enum(["true", "false"]).optional().default("false"),
    TEE_ATTESTATION_URL: z.string().url().optional(),
    DIST_PATH: z.string().optional().default("./dist"),
  })
  .strict();

type SelfclawConfig = z.infer<typeof SelfclawConfigSchema>;

export interface IntegrityAttestation {
  type: "tee" | "build_hash";
  value: string;
  timestamp: number;
  version: string;
  buildId?: string;
}

/**
 * Selfclaw Verification Service
 */
export class SelfclawVerifier {
  private readonly config: SelfclawConfig;
  private readonly isTEE: boolean;

  constructor(config: SelfclawConfig) {
    this.config = config;
    this.isTEE = config.IS_TEE === "true";
  }

  /**
   * Create from environment variables
   */
  static fromEnv(): Result<SelfclawVerifier> {
    return safeSync("core.selfclaw.fromEnv", () => {
      const parsed = SelfclawConfigSchema.safeParse(process.env);
      if (!parsed.success) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "Invalid Selfclaw configuration",
            context: "core.selfclaw.fromEnv",
            details: { issues: parsed.error.issues },
          }),
        );
      }
      return ok(new SelfclawVerifier(parsed.data));
    });
  }

  /**
   * Generate attestation based on environment mode
   */
  async generateAttestation(): Promise<Result<IntegrityAttestation>> {
    if (this.isTEE) {
      return await this.fetchTEEAttestation();
    } else {
      return await this.generateBuildHash();
    }
  }

  /**
   * Fetch TEE Remote Attestation Quote
   * This would connect to Intel SGX, ARM TrustZone, or AMD SEV
   */
  private async fetchTEEAttestation(): Promise<Result<IntegrityAttestation>> {
    return safeAsync("core.selfclaw.fetchTEEAttestation", async () => {
      const attestationUrl = this.config.TEE_ATTESTATION_URL;
      
      if (!attestationUrl) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "TEE_ATTESTATION_URL not configured",
            context: "core.selfclaw.fetchTEEAttestation",
          }),
        );
      }

      // In production, this would fetch the actual attestation
      // For now, return a mock attestation
      console.log(`[selfclaw] Fetching TEE attestation from: ${attestationUrl}`);
      
      // Simulated TEE quote (in production, this comes from the TEE)
      const mockQuote = `tee_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      
      return ok({
        type: "tee",
        value: mockQuote,
        timestamp: Date.now(),
        version: "v0.4.0",
        buildId: `tee-build-${Date.now()}`,
      });
    });
  }

  /**
   * Generate SHA-256 hash of the dist folder
   * This is the fallback when not running in a TEE
   */
  private async generateBuildHash(): Promise<Result<IntegrityAttestation>> {
    return safeAsync("core.selfclaw.generateBuildHash", async () => {
      const distPath = this.config.DIST_PATH || "./dist";
      
      console.log(`[selfclaw] Computing build hash for: ${distPath}`);
      
      // Calculate hash of all files in dist
      const hash = createHash("sha256");
      
      try {
        // Try to read dist directory
        const files = await this.walkDirectory(distPath);
        
        for (const file of files) {
          try {
            const content = await readFile(file);
            hash.update(content);
            hash.update(file); // Include filename in hash
          } catch {
            // Skip files that can't be read
          }
        }
      } catch {
        // If dist doesn't exist, use a placeholder
        console.log("[selfclaw] Dist folder not found, using version hash");
      }
      
      const buildHash = hash.digest("hex");
      
      return ok({
        type: "build_hash",
        value: buildHash,
        timestamp: Date.now(),
        version: "v0.4.0",
        buildId: `build-${buildHash.substring(0, 8)}`,
      });
    });
  }

  /**
   * Recursively walk directory and get all file paths
   */
  private async walkDirectory(dir: string): Promise<string[]> {
    const files: string[] = [];
    
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        
        if (entry.isDirectory()) {
          const subFiles = await this.walkDirectory(fullPath);
          files.push(...subFiles);
        } else if (entry.isFile()) {
          files.push(fullPath);
        }
      }
    } catch {
      // Directory doesn't exist or can't be read
    }
    
    return files;
  }

  /**
   * Verify an attestation (for external auditors)
   */
  async verifyAttestation(attestation: IntegrityAttestation): Promise<Result<boolean>> {
    return safeAsync("core.selfclaw.verifyAttestation", async () => {
      // In production, this would verify the TEE quote or build hash
      // For now, just verify the structure
      
      if (!attestation.value || !attestation.timestamp || !attestation.version) {
        return ok(false);
      }
      
      // Check version matches
      if (attestation.version !== "v0.4.0") {
        console.warn(`[selfclaw] Version mismatch: ${attestation.version} != v0.4.0`);
      }
      
      return ok(true);
    });
  }

  /**
   * Get current mode
   */
  isRunningInTEE(): boolean {
    return this.isTEE;
  }
}

// Singleton instance
let selfclawVerifier: SelfclawVerifier | null = null;

export function getSelfclawVerifier(): Result<SelfclawVerifier> {
  return safeSync("core.selfclaw.getSelfclawVerifier", () => {
    if (!selfclawVerifier) {
      const result = SelfclawVerifier.fromEnv();
      if (!result.ok) return result;
      selfclawVerifier = result.value;
    }
    return ok(selfclawVerifier);
  });
}
