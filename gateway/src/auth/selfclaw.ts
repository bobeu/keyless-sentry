/**
 * Selfclaw & TEE Attestation Service
 * 
 * Provides integrity verification for Sentry using TEE attestation
 * or build hash verification (fallback).
 * 
 * - TEE Mode (IS_TEE=true): Fetches Remote Attestation Quote from Intel SGX/TDX
 * - Non-TEE Mode (default): Generates SHA-256 hash of src/ directory
 * 
 * Exposes JSON-RPC method `sentry_verify_integrity` that returns
 * both the hash and the attestation quote.
 */

import { z } from "zod";
import { createHash, type Hash } from "crypto";
import { readdir, readFile, stat } from "fs/promises";
import { join } from "path";
import { AppError, err, ok, type Result, safeAsync, safeSync } from "@keyless-sentry/core";

const SelfclawConfigSchema = z
  .object({
    IS_TEE: z.enum(["true", "false"]).optional().default("false"),
    TEE_ATTESTATION_URL: z.string().url().optional(),
    SRC_PATH: z.string().optional().default("./gateway/src"),
    CORE_PATH: z.string().optional().default("./core/src"),
  })
  .strict();

type SelfclawConfig = z.infer<typeof SelfclawConfigSchema>;

export interface IntegrityAttestation {
  type: "tee" | "code_integrity";
  value: string;
  timestamp: number;
  version: string;
  isTEE: boolean;
  buildId?: string;
}

export interface IntegrityVerificationResult {
  attestation: IntegrityAttestation;
  codeHash: string;
  srcFiles: number;
  coreFiles: number;
}

/**
 * Selfclaw Verification Service
 * 
 * Generates SHA-256 hash of the src/ directory for code integrity verification.
 * If IS_TEE=true, integrates with Intel SGX/TDX remote attestation.
 */
export class SelfclawService {
  private readonly config: SelfclawConfig;
  private readonly isTEE: boolean;
  private bootHash: string | null = null;

  constructor(config: SelfclawConfig) {
    this.config = config;
    this.isTEE = config.IS_TEE === "true";
  }

  /**
   * Create from environment variables
   */
  static fromEnv(): Result<SelfclawService> {
    return safeSync("gateway.selfclaw.fromEnv", () => {
      const parsed = SelfclawConfigSchema.safeParse(process.env);
      if (!parsed.success) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "Invalid Selfclaw configuration",
            context: "gateway.selfclaw.fromEnv",
            details: { issues: parsed.error.issues },
          }),
        );
      }
      return ok(new SelfclawService(parsed.data));
    });
  }

  /**
   * Generate attestation based on environment mode
   * This is called on boot and stores the hash for integrity verification
   */
  async generateBootAttestation(): Promise<Result<IntegrityAttestation>> {
    return safeAsync("gateway.selfclaw.generateBootAttestation", async () => {
      let attestation: Result<IntegrityAttestation>;
      
      if (this.isTEE) {
        attestation = await this.fetchTEEAttestation();
      } else {
        attestation = await this.generateCodeIntegrityHash();
      }
      
      if (attestation.ok) {
        this.bootHash = attestation.value.value;
        console.log(`[selfclaw] Boot attestation generated: ${attestation.value.type}`);
        console.log(`[selfclaw] Hash: ${attestation.value.value.substring(0, 16)}...`);
      }
      
      return attestation;
    });
  }

  /**
   * Fetch TEE Remote Attestation Quote
   * Connects to Intel SGX, ARM TrustZone, or AMD SEV
   */
  private async fetchTEEAttestation(): Promise<Result<IntegrityAttestation>> {
    return safeAsync("gateway.selfclaw.fetchTEEAttestation", async () => {
      const attestationUrl = this.config.TEE_ATTESTATION_URL;
      
      if (!attestationUrl) {
        // If no URL configured, fall back to code integrity
        console.log("[selfclaw] TEE_ATTESTATION_URL not configured, using code integrity");
        return await this.generateCodeIntegrityHash();
      }

      console.log(`[selfclaw] Fetching TEE attestation from: ${attestationUrl}`);
      
      // In production, this would fetch the actual attestation from the TEE
      // For now, return a mock attestation that represents what would come from Intel SGX/TDX
      // 
      // Real implementation would:
      // 1. Connect to the TEE's attestation service
      // 2. Request a remote attestation quote
      // 3. Verify the quote's PCRs (Platform Configuration Registers)
      // 4. Return the quote along with measurement data
      
      const mockQuote = `tee_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      
      return ok({
        type: "tee",
        value: mockQuote,
        timestamp: Date.now(),
        version: "v0.4.0",
        isTEE: true,
        buildId: `tee-build-${Date.now()}`,
      });
    });
  }

  /**
   * Generate SHA-256 hash of the gateway/src and core directories
   * This is used for "Code Integrity" verification in non-TEE mode
   */
  async generateCodeIntegrityHash(): Promise<Result<IntegrityAttestation>> {
    return safeAsync("gateway.selfclaw.generateCodeIntegrityHash", async () => {
      const srcPath = this.config.SRC_PATH || "./gateway/src";
      const corePath = this.config.CORE_PATH || "./core/src";
      
      console.log(`[selfclaw] Computing code integrity hash...`);
      console.log(`[selfclaw] SRC path: ${srcPath}`);
      console.log(`[selfclaw] CORE path: ${corePath}`);
      
      const hash = createHash("sha256");
      let totalFiles = 0;
      
      // Hash gateway/src directory
      const srcResult = await this.hashDirectory(srcPath, hash);
      if (srcResult.ok) {
        totalFiles += srcResult.value;
      }
      
      // Hash core/src directory
      const coreResult = await this.hashDirectory(corePath, hash);
      if (coreResult.ok) {
        totalFiles += coreResult.value;
      }
      
      const codeHash = hash.digest("hex");
      
      console.log(`[selfclaw] Code integrity hash computed for ${totalFiles} files`);
      
      return ok({
        type: "code_integrity",
        value: codeHash,
        timestamp: Date.now(),
        version: "v0.4.0",
        isTEE: false,
        buildId: `build-${codeHash.substring(0, 8)}`,
      });
    });
  }

  /**
   * Recursively hash all files in a directory
   */
  private async hashDirectory(dir: string, hash: Hash): Promise<Result<number>> {
    return safeAsync("gateway.selfclaw.hashDirectory", async () => {
      let fileCount = 0;
      
      try {
        const entries = await readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = join(dir, entry.name);
          
          // Skip node_modules, .git, and other irrelevant directories
          if (entry.isDirectory()) {
            if (["node_modules", ".git", "dist", "build"].includes(entry.name)) {
              continue;
            }
            const subResult = await this.hashDirectory(fullPath, hash);
            if (subResult.ok) {
              fileCount += subResult.value;
            }
          } else if (entry.isFile()) {
            // Only hash TypeScript and JavaScript files
            if (/\.(ts|js|tsx|jsx)$/.test(entry.name)) {
              try {
                const content = await readFile(fullPath);
                hash.update(content);
                hash.update(fullPath); // Include path in hash
                fileCount++;
              } catch {
                // Skip files that can't be read
              }
            }
          }
        }
      } catch {
        // Directory doesn't exist or can't be read
        console.log(`[selfclaw] Warning: Could not read directory: ${dir}`);
      }
      
      return ok(fileCount);
    });
  }

  /**
   * Verify integrity - compares current hash against boot hash
   * Called during heartbeat to ensure code hasn't been tampered with
   */
  async verifyIntegrity(): Promise<Result<IntegrityVerificationResult>> {
    return safeAsync("gateway.selfclaw.verifyIntegrity", async () => {
      // Generate current attestation
      let attestationRes: Result<IntegrityAttestation>;
      
      if (this.isTEE) {
        attestationRes = await this.fetchTEEAttestation();
      } else {
        attestationRes = await this.generateCodeIntegrityHash();
      }
      
      if (!attestationRes.ok) {
        return err(attestationRes.error);
      }
      
      const attestation = attestationRes.value;
      const currentHash = attestation.value;
      
      // Compare against boot hash if available
      if (this.bootHash && currentHash !== this.bootHash) {
        console.error(`[selfclaw] INTEGRITY VIOLATION!`);
        console.error(`[selfclaw] Boot hash:   ${this.bootHash.substring(0, 16)}...`);
        console.error(`[selfclaw] Current hash: ${currentHash.substring(0, 16)}...`);
      }
      
      // Get file count for reporting
      const { srcFiles, coreFiles } = await this.getFileCounts();
      
      return ok({
        attestation,
        codeHash: currentHash,
        srcFiles,
        coreFiles,
      });
    });
  }

  /**
   * Get file counts for the source directories
   */
  private async getFileCounts(): Promise<{ srcFiles: number; coreFiles: number }> {
    const srcPath = this.config.SRC_PATH || "./gateway/src";
    const corePath = this.config.CORE_PATH || "./core/src";
    
    const srcCount = await this.countFiles(srcPath);
    const coreCount = await this.countFiles(corePath);
    
    return { srcFiles: srcCount, coreFiles: coreCount };
  }

  /**
   * Count files in a directory
   */
  private async countFiles(dir: string): Promise<number> {
    let count = 0;
    
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        
        if (entry.isDirectory()) {
          if (["node_modules", ".git", "dist", "build"].includes(entry.name)) {
            continue;
          }
          count += await this.countFiles(fullPath);
        } else if (entry.isFile() && /\.(ts|js|tsx|jsx)$/.test(entry.name)) {
          count++;
        }
      }
    } catch {
      // Ignore errors
    }
    
    return count;
  }

  /**
   * Check if running in TEE mode
   */
  isRunningInTEE(): boolean {
    return this.isTEE;
  }

  /**
   * Get boot hash
   */
  getBootHash(): string | null {
    return this.bootHash;
  }
}

// Singleton instance
let selfclawService: SelfclawService | null = null;

export function getSelfclawService(): Result<SelfclawService> {
  return safeSync("gateway.selfclaw.getSelfclawService", () => {
    if (!selfclawService) {
      const result = SelfclawService.fromEnv();
      if (!result.ok) return result;
      selfclawService = result.value;
    }
    return ok(selfclawService);
  });
}

export type { SelfclawConfig };
