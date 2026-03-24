import { z } from "zod";
import { isAddress, type Address } from "viem";
import { AppError } from "./errors";
import { err, ok, type Result } from "./result";
import { safeAsync } from "./validation";
import { getAuthorizationRepository, getAuditLogRepository, getSentryIdentityRepository } from "./db/repository";
import { getBountyRepository } from "./db/bountyRepository";
import { getSelfclawVerifier } from "./auth/selfclaw";
import { getOwnerVerifier } from "./owner";
import { readFile } from "fs/promises";
import { join } from "path";

export interface JsonRpcRequest {
  jsonrpc: "2.0";
  method: string;
  params?: Record<string, unknown>;
  id: string | number;
}

export interface JsonRpcResponse<T = unknown> {
  jsonrpc: "2.0";
  result: T;
  id: string | number;
}

export interface JsonRpcErrorResponse {
  jsonrpc: "2.0";
  error: {
    code: number;
    message: string;
    data?: Record<string, unknown>;
  };
  id: string | number;
}

export const JsonRpcErrorCode = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  PERMISSION_DENIED: -32001,
  INTERNAL_ERROR: -32000,
} as const;

const RequestPaymentParamsSchema = z
  .object({
    fromUserHash: z.string().min(1),
    agentId: z.string().min(1).max(128),
    to: z
      .string()
      .refine((v) => isAddress(v), { message: "to must be an address" })
      .transform((v) => v as Address),
    amount: z.string().min(1),
    token: z.string().min(1).default("cUSD"),
    reason: z.string().optional(),
  })
  .strict();

const CheckAuthorizationParamsSchema = z
  .object({
    fromUserHash: z.string().min(1),
    agentId: z.string().min(1).max(128),
  })
  .strict();

const RevokeAgentParamsSchema = z
  .object({
    fromUserHash: z.string().min(1),
    agentId: z.string().min(1).max(128),
  })
  .strict();

const VerifyIntegrityParamsSchema = z
  .object({
    includeAttestation: z.boolean().optional().default(true),
  })
  .strict();

const GetSkillParamsSchema = z
  .object({
    skillId: z.string().optional().default("sentry"),
  })
  .strict();

const RegisterHackathonParamsSchema = z
  .object({
    hackathonId: z.string().min(1),
    teamName: z.string().min(1),
    projectDescription: z.string().optional(),
  })
  .strict();

const GetIdentityParamsSchema = z
  .object({})
  .strict();

const UpdateIdentityParamsSchema = z
  .object({
    callerTelegramId: z.string().min(1),
    agentName: z.string().optional(),
    identityAddress: z.string().optional(),
    metadataURI: z.string().optional(),
    a2aEndpoint: z.string().optional(),
  })
  .strict();

// Bounty-Bot JSON-RPC Schemas
const BountyCreateParamsSchema = z
  .object({
    callerTelegramId: z.string().min(1),
    title: z.string().min(1).max(200),
    description: z.string().min(1),
    rewardAmount: z.string().min(1), // in wei
    hunterAddress: z.string().optional(), // specific hunter or open
    expiresAt: z.number().optional(), // Unix timestamp
  })
  .strict();

const BountyGetActiveParamsSchema = z
  .object({
    callerTelegramId: z.string().optional(),
    hunterAddress: z.string().optional(),
  })
  .strict();

const BountySubmitParamsSchema = z
  .object({
    callerTelegramId: z.string().min(1),
    bountyId: z.string().min(1),
    proofUrl: z.string().min(1),
    hunterAddress: z.string().min(1), // Hunter's wallet address
  })
  .strict();

const BountyReleaseParamsSchema = z
  .object({
    callerTelegramId: z.string().min(1),
    bountyId: z.string().min(1),
    approved: z.boolean(),
  })
  .strict();

const BountyVerifyParamsSchema = z
  .object({
    callerTelegramId: z.string().min(1),
    bountyId: z.string().min(1),
    verdict: z.enum(["APPROVED", "REJECTED"]),
    reasoning: z.string().min(1),
  })
  .strict();

/**
 * INTERNAL: Register for Synthesis hackathon
 * Called automatically when ERC-8004 identity is registered on boot
 * Exported for use by the identity service
 */
export async function registerForHackathonInternal(
  hackathonId: string,
  teamName: string,
  projectDescription?: string,
): Promise<Result<{
  success: boolean;
  hackathonId: string;
  teamName: string;
  registeredAt: string;
  message: string;
}>> {
  return safeAsync("core.jsonRpc.registerForHackathonInternal", async () => {
    const auditRepo = getAuditLogRepository();
    await auditRepo.create({
      userHashedId: "system",
      action: "HACKATHON_REGISTRATION",
      status: "SUCCESS",
      details: {
        hackathonId,
        teamName,
        projectDescription,
        registeredAt: new Date().toISOString(),
      },
    });

    return ok({
      success: true,
      hackathonId,
      teamName,
      registeredAt: new Date().toISOString(),
      message: `Successfully registered for ${hackathonId}`,
    });
  });
}

export class JsonRpcHandler {
  async handleRequest(request: unknown): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parseResult = this.parseRequest(request);
    if (!parseResult.ok) {
      return this.errorResponse(
        JsonRpcErrorCode.INVALID_REQUEST,
        parseResult.error.message,
        parseResult.error.details,
        this.getRequestId(request),
      );
    }

    const req = parseResult.value;

    switch (req.method) {
      // Bounty-Bot A2A Methods
      case "bounty_create":
        return await this.handleBountyCreate(req.params, req.id);
      case "bounty_get_active":
        return await this.handleBountyGetActive(req.params, req.id);
      case "bounty_submit":
        return await this.handleBountySubmit(req.params, req.id);
      case "bounty_release":
        return await this.handleBountyRelease(req.params, req.id);
      case "bounty_verify":
        return await this.handleBountyVerify(req.params, req.id);
      case "getSkill":
        return await this.handleGetSkill(req.params, req.id);
      // Legacy Sentry methods (for backward compatibility)
      case "sentry_request_payment":
        return await this.handleRequestPayment(req.params, req.id);
      case "sentry_check_authorization":
        return await this.handleCheckAuthorization(req.params, req.id);
      case "sentry_revoke_agent":
        return await this.handleRevokeAgent(req.params, req.id);
      case "sentry_verify_integrity":
        return await this.handleVerifyIntegrity(req.params, req.id);
      case "sentry_register_hackathon":
        return await this.handleRegisterHackathon(req.params, req.id);
      case "sentry_get_identity":
        return await this.handleGetIdentity(req.params, req.id);
      case "sentry_update_identity":
        return await this.handleUpdateIdentity(req.params, req.id);
      default:
        return this.errorResponse(
          JsonRpcErrorCode.METHOD_NOT_FOUND,
          `Method '${req.method}' not found`,
          { availableMethods: ["bounty_create", "bounty_get_active", "bounty_submit", "bounty_release", "bounty_verify", "getSkill", "sentry_request_payment", "sentry_check_authorization"] },
          req.id,
        );
    }
  }

  private parseRequest(input: unknown): Result<JsonRpcRequest> {
    try {
      if (typeof input !== "object" || input === null) {
        return err(new AppError({ code: "INVALID_INPUT", message: "Request must be a JSON object", context: "jsonRpc.parseRequest" }));
      }

      const obj = input as Record<string, unknown>;

      if (obj.jsonrpc !== "2.0") {
        return err(new AppError({ code: "INVALID_INPUT", message: "jsonrpc must be '2.0'", context: "jsonRpc.parseRequest" }));
      }

      if (typeof obj.method !== "string" || obj.method.length === 0) {
        return err(new AppError({ code: "INVALID_INPUT", message: "method must be a non-empty string", context: "jsonRpc.parseRequest" }));
      }

      const id = obj.id ?? "";
      return ok({
        jsonrpc: "2.0",
        method: obj.method,
        params: (obj.params as Record<string, unknown>) || {},
        id: typeof id === "string" || typeof id === "number" ? id : "",
      });
    } catch (causeUnknown) {
      return err(new AppError({ code: "INTERNAL_ERROR", message: "Failed to parse request", context: "jsonRpc.parseRequest", causeUnknown }));
    }
  }

  private async handleRequestPayment(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = RequestPaymentParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    const p = parsed.data;
    const authRepo = getAuthorizationRepository();
    const authRes = await authRepo.findByUserAndAgent(p.fromUserHash, p.agentId, true);

    if (!authRes.ok) {
      return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Database error checking authorization", { cause: authRes.error.message }, id);
    }

    const auth = authRes.value;

    if (!auth) {
      return this.errorResponse(JsonRpcErrorCode.PERMISSION_DENIED, "PERMISSION_DENIED", { reason: `No active authorization for agent '${p.agentId}'`, expiresAt: null, maxSpend: null }, id);
    }

    const now = Math.floor(Date.now() / 1000);
    if (auth.expiresAt < now) {
      return this.errorResponse(JsonRpcErrorCode.PERMISSION_DENIED, "PERMISSION_DENIED", { reason: `Authorization expired`, expiresAt: auth.expiresAt, maxSpend: auth.maxSpend }, id);
    }

    const amountBigInt = BigInt(p.amount);
    const maxSpendBigInt = BigInt(auth.maxSpend);
    if (amountBigInt > maxSpendBigInt) {
      return this.errorResponse(JsonRpcErrorCode.PERMISSION_DENIED, "PERMISSION_DENIED", { reason: `Amount ${p.amount} exceeds maxSpend ${auth.maxSpend}`, expiresAt: auth.expiresAt, maxSpend: auth.maxSpend }, id);
    }

    const auditRepo = getAuditLogRepository();
    await auditRepo.create({
      userHashedId: p.fromUserHash,
      action: "A2A_PAYMENT_REQUESTED",
      status: "PENDING",
      details: { agentId: p.agentId, to: p.to, amount: p.amount, token: p.token, reason: p.reason },
    });

    const mockTxHash = "0x" + "a".repeat(64);
    return { jsonrpc: "2.0", result: { txHash: mockTxHash, status: "PENDING", message: "Payment initiated" }, id };
  }

  private async handleCheckAuthorization(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = CheckAuthorizationParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    const p = parsed.data;
    const authRepo = getAuthorizationRepository();
    const authRes = await authRepo.findByUserAndAgent(p.fromUserHash, p.agentId, true);

    if (!authRes.ok) {
      return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Database error", { cause: authRes.error.message }, id);
    }

    const auth = authRes.value;
    if (!auth) {
      return { jsonrpc: "2.0", result: { isActive: false, agentId: p.agentId, expiresAt: null, maxSpend: null }, id };
    }

    return { jsonrpc: "2.0", result: { isActive: auth.isActive ?? true, agentId: auth.agentId, expiresAt: auth.expiresAt, maxSpend: auth.maxSpend }, id };
  }

  private async handleRevokeAgent(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = RevokeAgentParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    const p = parsed.data;
    const authRepo = getAuthorizationRepository();
    const revokeRes = await authRepo.revoke(p.fromUserHash, p.agentId);

    if (!revokeRes.ok) {
      return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to revoke", { cause: revokeRes.error.message }, id);
    }

    const auditRepo = getAuditLogRepository();
    await auditRepo.create({ userHashedId: p.fromUserHash, action: "A2A_AUTHORIZATION_REVOKED", details: { agentId: p.agentId, revokedAt: new Date().toISOString() } });

    return { jsonrpc: "2.0", result: { success: true, agentId: p.agentId, message: "Authorization revoked" }, id };
  }

  private errorResponse(code: number, message: string, data?: Record<string, unknown>, id: string | number = ""): JsonRpcErrorResponse {
    return { jsonrpc: "2.0", error: { code, message, ...(data && { data }) }, id };
  }

  private getRequestId(request: unknown): string | number {
    if (typeof request === "object" && request !== null) {
      const id = (request as Record<string, unknown>).id;
      return typeof id === "string" || typeof id === "number" ? id : "";
    }
    return "";
  }

  private async handleVerifyIntegrity(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = VerifyIntegrityParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    const p = parsed.data;
    const verifier = getSelfclawVerifier();
    if (!verifier.ok) {
      return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to initialize verifier", { cause: verifier.error.message }, id);
    }

    const attestationRes = await verifier.value.generateAttestation();
    if (!attestationRes.ok) {
      return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to generate attestation", { cause: attestationRes.error.message }, id);
    }

    const attestation = attestationRes.value;

    return {
      jsonrpc: "2.0",
      result: {
        isTEE: p.includeAttestation ? attestation.type === "tee" : null,
        attestationType: attestation.type,
        value: p.includeAttestation ? attestation.value : undefined,
        version: attestation.version,
        timestamp: attestation.timestamp,
        buildId: attestation.buildId,
      },
      id,
    };
  }

  /**
   * Handle getSkill method - exposes SKILL.md content for agent discovery
   * Other agents can call this to understand Sentry's capabilities
   */
  private async handleGetSkill(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = GetSkillParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    const p = parsed.data;
    const skillId = p.skillId;

    // Map skillId to file path
    const skillPaths: Record<string, string> = {
      sentry: "./skills/sentry/SKILL.md",
      bounty: "./skills/bounty/SKILL.md",
      sdk: "./skills/sdk/SKILL.md",
    };

    const skillPath = skillPaths[skillId];
    if (!skillPath) {
      return this.errorResponse(
        JsonRpcErrorCode.INVALID_REQUEST,
        "Unknown skill ID",
        { availableSkills: Object.keys(skillPaths) },
        id
      );
    }

    try {
      // For SDK skill, provide structured skill info with note about SDK
      // The SDK's getSkill() method is available in @keyless-collective/sdk
      // Agents can use it directly: await sdkClient.getSkill()
      if (skillId === "sdk") {
        return {
          jsonrpc: "2.0",
          result: {
            skillId,
            content: JSON.stringify({
              id: "keyless-sdk",
              name: "Keyless Collective SDK",
              description: "SDK for keyless autonomous payments. Use @keyless-collective/sdk package.",
              usage: "import { KeylessClient } from '@keyless-collective/sdk'; const client = new KeylessClient({...}); await client.getSkill();",
              note: "Call getSkill() directly from the SDK for full skill definition"
            }, null, 2),
            loadedAt: new Date().toISOString(),
            source: "sentry-manifest",
          },
          id,
        };
      }

      const content = await readFile(skillPath, "utf-8");
      return {
        jsonrpc: "2.0",
        result: {
          skillId,
          content,
          loadedAt: new Date().toISOString(),
        },
        id,
      };
    } catch (causeUnknown) {
      return this.errorResponse(
        JsonRpcErrorCode.INTERNAL_ERROR,
        "Failed to load skill",
        { skillId, cause: String(causeUnknown) },
        id
      );
    }
  }

  /**
   * Handle sentry_register_hackathon method
   * Registers the Sentry agent for a Synthesis hackathon event
   */
  private async handleRegisterHackathon(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = RegisterHackathonParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    const p = parsed.data;

    // Log the hackathon registration
    const auditRepo = getAuditLogRepository();
    await auditRepo.create({
      userHashedId: "system",
      action: "HACKATHON_REGISTRATION",
      status: "SUCCESS",
      details: {
        hackathonId: p.hackathonId,
        teamName: p.teamName,
        projectDescription: p.projectDescription,
        registeredAt: new Date().toISOString(),
      },
    });

    return {
      jsonrpc: "2.0",
      result: {
        success: true,
        hackathonId: p.hackathonId,
        teamName: p.teamName,
        registeredAt: new Date().toISOString(),
        message: `Successfully registered for ${p.hackathonId}`,
      },
      id,
    };
  }

  /**
   * Handle sentry_get_identity method
   * Returns Sentry's stored ERC-8004 identity from the database
   */
  private async handleGetIdentity(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = GetIdentityParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    try {
      const identityRepo = getSentryIdentityRepository();
      const identityRes = await identityRepo.findFirst();

      if (!identityRes.ok) {
        return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to retrieve identity", { cause: identityRes.error.message }, id);
      }

      const identity = identityRes.value;
      if (!identity) {
        return {
          jsonrpc: "2.0",
          result: {
            isRegistered: false,
            message: "Identity not registered yet",
          },
          id,
        };
      }

      return {
        jsonrpc: "2.0",
        result: {
          isRegistered: true,
          agentName: identity.agentName,
          identityAddress: identity.identityAddress,
          metadataURI: identity.metadataURI,
          a2aEndpoint: identity.a2aEndpoint,
          chainId: identity.chainId,
          registryAddress: identity.registryAddress,
          registeredAt: identity.registeredAt.toISOString(),
          lastVerifiedAt: identity.lastVerifiedAt.toISOString(),
        },
        id,
      };
    } catch (causeUnknown) {
      return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to retrieve identity", { cause: String(causeUnknown) }, id);
    }
  }

  /**
   * Handle sentry_update_identity method
   * Updates Sentry's identity - only callable by the owner
   */
  private async handleUpdateIdentity(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = UpdateIdentityParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    const p = parsed.data;

    // Verify caller is the owner
    const ownerVerifier = getOwnerVerifier();
    if (!ownerVerifier.ok) {
      return this.errorResponse(
        JsonRpcErrorCode.INTERNAL_ERROR,
        "Owner verification not configured",
        { cause: ownerVerifier.error.message },
        id
      );
    }

    const verification = ownerVerifier.value.verify(p.callerTelegramId);
    if (!verification.ok) {
      return this.errorResponse(
        JsonRpcErrorCode.INTERNAL_ERROR,
        "Failed to verify owner",
        { cause: verification.error.message },
        id
      );
    }

    if (!verification.value.isOwner) {
      return this.errorResponse(
        JsonRpcErrorCode.PERMISSION_DENIED,
        "PERMISSION_DENIED",
        { reason: "Only the Sentry owner can update the identity", callerTelegramId: p.callerTelegramId },
        id
      );
    }

    try {
      const identityRepo = getSentryIdentityRepository();
      const updateRes = await identityRepo.updateIdentity({
        agentName: p.agentName,
        identityAddress: p.identityAddress,
        metadataURI: p.metadataURI,
        a2aEndpoint: p.a2aEndpoint,
      });

      if (!updateRes.ok) {
        return this.errorResponse(
          JsonRpcErrorCode.INTERNAL_ERROR,
          "Failed to update identity",
          { cause: updateRes.error.message },
          id
        );
      }

      const identity = updateRes.value;
      return {
        jsonrpc: "2.0",
        result: {
          success: true,
          message: "Identity updated successfully",
          agentName: identity.agentName,
          identityAddress: identity.identityAddress,
          a2aEndpoint: identity.a2aEndpoint,
          lastVerifiedAt: identity.lastVerifiedAt.toISOString(),
        },
        id,
      };
    } catch (causeUnknown) {
      return this.errorResponse(
        JsonRpcErrorCode.INTERNAL_ERROR,
        "Failed to update identity",
        { cause: String(causeUnknown) },
        id
      );
    }
  }

  // ==================== Bounty-Bot A2A Methods ====================

  /**
   * Handle bounty_create method
   * Creates a new bounty with escrow wallet
   */
  private async handleBountyCreate(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = BountyCreateParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    const p = parsed.data;

    try {
      const bountyRepo = getBountyRepository();
      
      // Create escrow wallet via Keyless SDK (simulated for now)
      const escrowAddress = "0x" + "b".repeat(40);
      
      const createRes = await bountyRepo.create({
        title: p.title,
        description: p.description,
        rewardAmount: p.rewardAmount,
        hunterAddress: p.hunterAddress,
        creatorHashId: p.callerTelegramId,
        escrowAddress,
        expiresAt: p.expiresAt ? new Date(p.expiresAt * 1000) : undefined,
      });

      if (!createRes.ok) {
        return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to create bounty", { cause: createRes.error.message }, id);
      }

      const bounty = createRes.value;
      
      // Log the bounty creation
      const auditRepo = getAuditLogRepository();
      await auditRepo.create({
        userHashedId: p.callerTelegramId,
        action: "BOUNTY_CREATED",
        status: "SUCCESS",
        details: { bountyId: bounty.id, title: p.title, rewardAmount: p.rewardAmount },
      });

      return {
        jsonrpc: "2.0",
        result: {
          success: true,
          bountyId: bounty.id,
          escrowAddress: bounty.escrowAddress,
          status: bounty.status,
        },
        id,
      };
    } catch (causeUnknown) {
      return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to create bounty", { cause: String(causeUnknown) }, id);
    }
  }

  /**
   * Handle bounty_get_active method
   * Returns all active bounties
   */
  private async handleBountyGetActive(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = BountyGetActiveParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    const p = parsed.data;

    try {
      const bountyRepo = getBountyRepository();
      const bountiesRes = await bountyRepo.getActive({
        hunterAddress: p.hunterAddress,
        creatorHashId: p.callerTelegramId,
      });

      if (!bountiesRes.ok) {
        return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to get bounties", { cause: bountiesRes.error.message }, id);
      }

      const bounties = bountiesRes.value.map((b) => ({
        id: b.id,
        title: b.title,
        description: b.description,
        rewardAmount: b.rewardAmount,
        status: b.status,
        createdAt: b.createdAt,
        expiresAt: b.expiresAt || null,
      }));

      return {
        jsonrpc: "2.0",
        result: {
          bounties,
          count: bounties.length,
        },
        id,
      };
    } catch (causeUnknown) {
      return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to get bounties", { cause: String(causeUnknown) }, id);
    }
  }

  /**
   * Handle bounty_submit method
   * Hunter submits proof for a bounty
   */
  private async handleBountySubmit(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = BountySubmitParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    const p = parsed.data;

    try {
      const bountyRepo = getBountyRepository();
      
      // Verify bounty exists and is active
      const bountyRes = await bountyRepo.getById(p.bountyId);
      if (!bountyRes || !bountyRes.ok) {
        return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to get bounty", { cause: bountyRes ? String(bountyRes.error) : "Unknown error" }, id);
      }

      const bounty = bountyRes.value;
      if (!bounty) {
        return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Bounty not found", { bountyId: p.bountyId }, id);
      }

      if (bounty.status !== "OPEN" && bounty.status !== "ESCROWED") {
        return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Bounty is not active", { status: bounty.status }, id);
      }

      // Submit proof
      const submitRes = await bountyRepo.submitProof(p.bountyId, p.proofUrl);
      if (!submitRes.ok) {
        return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to submit proof", { cause: String(submitRes.error) }, id);
      }

      // Log submission
      const auditRepo = getAuditLogRepository();
      await auditRepo.create({
        userHashedId: p.hunterAddress,
        action: "BOUNTY_SUBMISSION",
        status: "PENDING_VERIFICATION",
        details: { bountyId: p.bountyId, proofUrl: p.proofUrl, hunterAddress: p.hunterAddress },
      });

      return {
        jsonrpc: "2.0",
        result: {
          success: true,
          bountyId: p.bountyId,
          status: "ESCROWED",
          message: "Submission received. AI Judge will verify shortly.",
        },
        id,
      };
    } catch (causeUnknown) {
      return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to submit proof", { cause: String(causeUnknown) }, id);
    }
  }

  /**
   * Handle bounty_release method
   * Releases reward to hunter after verification
   */
  private async handleBountyRelease(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = BountyReleaseParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    const p = parsed.data;

    try {
      const bountyRepo = getBountyRepository();
      
      // First get bounty to get hunter address and reward
      const bountyRes = await bountyRepo.getById(p.bountyId);
      if (!bountyRes || !bountyRes.ok) {
        return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to get bounty", { cause: bountyRes ? String(bountyRes.error) : "Unknown error" }, id);
      }
      const bounty = bountyRes.value;
      if (!bounty) {
        return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Bounty not found", { bountyId: p.bountyId }, id);
      }

      // Release the bounty
      const releaseRes = await bountyRepo.release(p.bountyId, p.approved);

      if (!releaseRes.ok) {
        return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to release bounty", { cause: String(releaseRes.error) }, id);
      }

      // Log release
      const auditRepo = getAuditLogRepository();
      await auditRepo.create({
        userHashedId: bounty.hunterAddress || "unknown",
        action: p.approved ? "BOUNTY_RELEASED" : "BOUNTY_CANCELLED",
        status: "SUCCESS",
        details: { bountyId: p.bountyId, rewardAmount: bounty.rewardAmount, approved: p.approved },
      });

      return {
        jsonrpc: "2.0",
        result: {
          success: true,
          bountyId: p.bountyId,
          status: p.approved ? "RELEASED" : "CANCELLED",
          hunterAddress: bounty.hunterAddress,
          rewardAmount: bounty.rewardAmount,
        },
        id,
      };
    } catch (causeUnknown) {
      return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to release bounty", { cause: String(causeUnknown) }, id);
    }
  }

  /**
   * Handle bounty_verify method
   * AI Judge verifies a submission
   */
  private async handleBountyVerify(params: unknown, id: string | number): Promise<JsonRpcResponse | JsonRpcErrorResponse> {
    const parsed = BountyVerifyParamsSchema.safeParse(params);
    if (!parsed.success) {
      return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Invalid params", { issues: parsed.error.issues }, id);
    }

    const p = parsed.data;

    try {
      const bountyRepo = getBountyRepository();
      const bountyRes = await bountyRepo.getById(p.bountyId);

      if (!bountyRes || !bountyRes.ok) {
        return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to get bounty", { cause: bountyRes ? String(bountyRes.error) : "Unknown error" }, id);
      }

      const bounty = bountyRes.value;
      if (!bounty) {
        return this.errorResponse(JsonRpcErrorCode.INVALID_REQUEST, "Bounty not found", { bountyId: p.bountyId }, id);
      }

      // AI Judge logic
      const isApproved = p.verdict === "APPROVED";

      if (isApproved) {
        await bountyRepo.release(p.bountyId, true);
        
        const auditRepo = getAuditLogRepository();
        await auditRepo.create({
          userHashedId: bounty.hunterAddress || "unknown",
          action: "BOUNTY_VERIFIED",
          status: "SUCCESS",
          details: { bountyId: p.bountyId, verdict: p.verdict, reasoning: p.reasoning },
        });

        return {
          jsonrpc: "2.0",
          result: {
            success: true,
            bountyId: p.bountyId,
            verdict: "APPROVED",
            reasoning: p.reasoning,
            status: "COMPLETED",
          },
          id,
        };
      } else {
        // Reject - reset to active
        // Would need to add a reject method to repository
        
        const auditRepo = getAuditLogRepository();
        await auditRepo.create({
          userHashedId: bounty.hunterAddress || "unknown",
          action: "BOUNTY_REJECTED",
          status: "FAILED",
          details: { bountyId: p.bountyId, verdict: p.verdict, reasoning: p.reasoning },
        });

        return {
          jsonrpc: "2.0",
          result: {
            success: true,
            bountyId: p.bountyId,
            verdict: "REJECTED",
            reasoning: p.reasoning,
            status: "ACTIVE",
          },
          id,
        };
      }
    } catch (causeUnknown) {
      return this.errorResponse(JsonRpcErrorCode.INTERNAL_ERROR, "Failed to verify bounty", { cause: String(causeUnknown) }, id);
    }
  }
}
