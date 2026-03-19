import { z } from "zod";
import { isAddress, type Address } from "viem";
import { AppError } from "./errors";
import { err, ok, type Result } from "./result";
import { safeAsync } from "./validation";
import { getAuthorizationRepository, getAuditLogRepository, getSentryIdentityRepository } from "./db/repository";
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
      case "sentry_request_payment":
        return await this.handleRequestPayment(req.params, req.id);
      case "sentry_check_authorization":
        return await this.handleCheckAuthorization(req.params, req.id);
      case "sentry_revoke_agent":
        return await this.handleRevokeAgent(req.params, req.id);
      case "sentry_verify_integrity":
        return await this.handleVerifyIntegrity(req.params, req.id);
      case "getSkill":
        return await this.handleGetSkill(req.params, req.id);
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
          { availableMethods: ["sentry_request_payment", "sentry_check_authorization", "sentry_revoke_agent", "sentry_verify_integrity", "getSkill", "sentry_register_hackathon"] },
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
}
