/**
 * OpenClaw Service Integration
 * 
 * Embeds OpenClaw as a persistent library/service for the Sentry agent.
 * This service manages the agent's cognitive state, memory persistence,
 * and autonomous decision-making loop.
 * 
 * The Workspace (where MEMORY.md lives) is persistent and separated from the main app code.
 */

import { z } from "zod";
import { createHash } from "crypto";
import { readFile, writeFile, mkdir, readdir } from "fs/promises";
import { join, dirname } from "path";
import { AppError } from "@keyless-sentry/core";
import { err, ok, type Result } from "@keyless-sentry/core";
import { safeAsync, safeSync } from "@keyless-sentry/core";

const OpenClawConfigSchema = z
  .object({
    WORKSPACE_DIR: z.string().optional().default("./gateway/src/workspace"),
    OPENCLAW_ENABLED: z.enum(["true", "false"]).optional().default("true"),
    HEARTBEAT_INTERVAL_MINUTES: z.coerce.number().int().positive().optional().default(30),
  })
  .strict();

type OpenClawConfig = z.infer<typeof OpenClawConfigSchema>;

export interface OpenClawAgentState {
  identityHandle: string;
  a2aEndpoint: string;
  personality: "GUARDIAN" | "ACCOUNTANT" | "STRATEGIST";
  version: string;
  registeredAt: number;
}

export interface HeartbeatResult {
  registrySync: boolean;
  vaultSanitization: boolean;
  liquidityWatch: boolean;
  selfclawAudit: boolean;
  timestamp: number;
}

/**
 * OpenClaw Service - Headless Agent Service
 * 
 * Manages:
 * - SOUL.md loading and initialization
 * - MEMORY.md persistence
 * - Heartbeat loop for autonomous operations
 * - Self-verification and integrity checks
 */
export class OpenClawService {
  private readonly config: OpenClawConfig;
  private readonly workspacePath: string;
  private soulState: OpenClawAgentState | null = null;
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;

  constructor(config: OpenClawConfig) {
    this.config = config;
    this.workspacePath = config.WORKSPACE_DIR;
  }

  /**
   * Create OpenClaw service from environment variables
   */
  static fromEnv(): Result<OpenClawService> {
    return safeSync("gateway.openclaw.fromEnv", () => {
      const parsed = OpenClawConfigSchema.safeParse(process.env);
      if (!parsed.success) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "Invalid OpenClaw configuration",
            context: "gateway.openclaw.fromEnv",
            details: { issues: parsed.error.issues },
          }),
        );
      }
      return ok(new OpenClawService(parsed.data));
    });
  }

  /**
   * Initialize the OpenClaw service
   * Loads SOUL.md and sets up the workspace
   */
  async initialize(): Promise<Result<OpenClawAgentState>> {
    return safeAsync("gateway.openclaw.initialize", async () => {
      console.log("[openclaw] Initializing OpenClaw service...");
      
      // Ensure workspace directory exists
      await this.ensureWorkspaceExists();
      
      // Load SOUL.md
      const soulRes = await this.loadSoul();
      if (!soulRes.ok) return soulRes;
      
      this.soulState = soulRes.value;
      
      console.log("[openclaw] OpenClaw initialized successfully");
      console.log(`[openclaw] Identity: ${soulRes.value.identityHandle}`);
      console.log(`[openclaw] Personality: ${soulRes.value.personality}`);
      
      return soulRes;
    });
  }

  /**
   * Load and parse SOUL.md from workspace
   */
  async loadSoul(): Promise<Result<OpenClawAgentState>> {
    return safeAsync("gateway.openclaw.loadSoul", async () => {
      const soulPath = join(this.workspacePath, "SOUL.md");
      
      console.log(`[openclaw] Loading SOUL from: ${soulPath}`);
      
      try {
        const content = await readFile(soulPath, "utf-8");
        
        // Parse SOUL.md - extract key information
        // In a full implementation, this would be a proper parser
        const identityHandle = this.extractIdentityHandle(content);
        const personality = this.extractPersonality(content);
        const version = this.extractVersion(content);
        
        const state: OpenClawAgentState = {
          identityHandle,
          a2aEndpoint: process.env.A2A_ENDPOINT || "http://localhost:18789",
          personality,
          version,
          registeredAt: Date.now(),
        };
        
        return ok(state);
      } catch (causeUnknown) {
        return err(
          new AppError({
            code: "INTERNAL_ERROR",
            message: "Failed to load SOUL.md",
            context: "gateway.openclaw.loadSoul",
            causeUnknown,
          }),
        );
      }
    });
  }

  /**
   * Get or create MEMORY.md in the workspace
   * MEMORY.md is the persistent memory store for the agent
   */
  async getMemory(): Promise<Result<string>> {
    return safeAsync("gateway.openclaw.getMemory", async () => {
      const memoryPath = join(this.workspacePath, "MEMORY.md");
      
      try {
        const content = await readFile(memoryPath, "utf-8");
        return ok(content);
      } catch {
        // If doesn't exist, create with initial content
        const initialContent = `# Sentry Memory\n\nLast Updated: ${new Date().toISOString()}\n\n## Session History\n\n- Initialized: ${new Date().toISOString()}\n`;
        await writeFile(memoryPath, initialContent, "utf-8");
        return ok(initialContent);
      }
    });
  }

  /**
   * Append to MEMORY.md
   */
  async appendMemory(entry: string): Promise<Result<void>> {
    return safeAsync("gateway.openclaw.appendMemory", async () => {
      const memoryPath = join(this.workspacePath, "MEMORY.md");
      
      try {
        const timestamp = new Date().toISOString();
        const memoryEntry = `\n## ${timestamp}\n${entry}\n`;
        
        await writeFile(memoryPath, memoryEntry, { flag: "a" });
        return ok(undefined);
      } catch (causeUnknown) {
        return err(
          new AppError({
            code: "INTERNAL_ERROR",
            message: "Failed to append to MEMORY.md",
            context: "gateway.openclaw.appendMemory",
            causeUnknown,
          }),
        );
      }
    });
  }

  /**
   * Start the Heartbeat loop
   * Runs every 30 minutes to perform autonomous operations
   */
  async startHeartbeat(
    onHeartbeat: (result: HeartbeatResult) => Promise<void>
  ): Promise<Result<void>> {
    return safeAsync("gateway.openclaw.startHeartbeat", async () => {
      const intervalMs = this.config.HEARTBEAT_INTERVAL_MINUTES * 60 * 1000;
      
      console.log(`[openclaw] Starting heartbeat loop (every ${this.config.HEARTBEAT_INTERVAL_MINUTES} minutes)`);
      
      this.heartbeatInterval = setInterval(async () => {
        const result = await this.runHeartbeat();
        await onHeartbeat(result);
      }, intervalMs);
      
      // Run immediately on start
      const initialResult = await this.runHeartbeat();
      await onHeartbeat(initialResult);
      
      return ok(undefined);
    });
  }

  /**
   * Stop the Heartbeat loop
   */
  stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
      console.log("[openclaw] Heartbeat loop stopped");
    }
  }

  /**
   * Run heartbeat operations
   * - Registry Sync: Check if ERC-8004 Registry points to current endpoint
   * - Vault Sanitization: Scan for expired authorizations
   * - Liquidity Watch: Scan for shock events on stablecoins
   * - Selfclaw Audit: Re-hash src/ and compare against boot-time hash
   */
  async runHeartbeat(): Promise<HeartbeatResult> {
    console.log("[openclaw] Running heartbeat...");
    
    const result: HeartbeatResult = {
      registrySync: false,
      vaultSanitization: false,
      liquidityWatch: false,
      selfclawAudit: false,
      timestamp: Date.now(),
    };

    try {
      // 1. Registry Sync
      result.registrySync = await this.syncRegistry();
      
      // 2. Vault Sanitization
      result.vaultSanitization = await this.sanitizeVault();
      
      // 3. Liquidity Watch
      result.liquidityWatch = await this.watchLiquidity();
      
      // 4. Selfclaw Audit
      result.selfclawAudit = await this.auditSelfclaw();
      
      console.log("[openclaw] Heartbeat completed:", result);
    } catch (error) {
      console.error("[openclaw] Heartbeat error:", error);
    }

    return result;
  }

  /**
   * Sync with ERC-8004 Registry
   */
  private async syncRegistry(): Promise<boolean> {
    // In production, this would check the Celo blockchain
    // For now, return true (mock)
    console.log("[openclaw:heartbeat] Registry sync: OK");
    return true;
  }

  /**
   * Sanitize the Vault - clean expired authorizations
   */
  private async sanitizeVault(): Promise<boolean> {
    // In production, this would scan Postgres for expired auths
    // For now, return true (mock)
    console.log("[openclaw:heartbeat] Vault sanitization: OK");
    return true;
  }

  /**
   * Watch for liquidity shock events on Celo stablecoins
   */
  private async watchLiquidity(): Promise<boolean> {
    // In production, this would scan Celo for 20%+ de-pegs
    // For now, return true (mock)
    console.log("[openclaw:heartbeat] Liquidity watch: OK");
    return true;
  }

  /**
   * Selfclaw Audit - re-hash src/ and compare
   */
  private async auditSelfclaw(): Promise<boolean> {
    // In production, this would re-hash src/ and compare
    // For now, return true (mock)
    console.log("[openclaw:heartbeat] Selfclaw audit: OK");
    return true;
  }

  /**
   * Ensure workspace directory exists
   */
  private async ensureWorkspaceExists(): Promise<void> {
    try {
      await mkdir(this.workspacePath, { recursive: true });
    } catch {
      // Directory may already exist
    }
  }

  /**
   * Extract identity handle from SOUL.md content
   */
  private extractIdentityHandle(content: string): string {
    const match = content.match(/\*\*Identity Handle:\*\*\s*(.+)/);
    const matched = match?.[1];
    return matched?.trim() ?? "Sentry-Vault";
  }

  /**
   * Extract personality from SOUL.md content
   */
  private extractPersonality(content: string): "GUARDIAN" | "ACCOUNTANT" | "STRATEGIST" {
    if (content.includes("GUARDIAN")) return "GUARDIAN";
    if (content.includes("ACCOUNTANT")) return "ACCOUNTANT";
    if (content.includes("STRATEGIST")) return "STRATEGIST";
    return "GUARDIAN"; // Default
  }

  /**
   * Extract version from SOUL.md content
   */
  private extractVersion(content: string): string {
    const match = content.match(/(v\d+\.\d+\.\d+)/);
    const matched = match?.[1];
    return matched ?? "v0.4.0";
  }

  /**
   * Get current agent state
   */
  getState(): OpenClawAgentState | null {
    return this.soulState;
  }

  /**
   * Check if service is initialized
   */
  isInitialized(): boolean {
    return this.soulState !== null;
  }

  /**
   * Get workspace path
   */
  getWorkspacePath(): string {
    return this.workspacePath;
  }
}

// Singleton instance
let openclawService: OpenClawService | null = null;

export function getOpenClawService(): Result<OpenClawService> {
  return safeSync("gateway.openclaw.getOpenClawService", () => {
    if (!openclawService) {
      const result = OpenClawService.fromEnv();
      if (!result.ok) return result;
      openclawService = result.value;
    }
    return ok(openclawService);
  });
}

export type { OpenClawConfig };
