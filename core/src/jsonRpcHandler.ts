import { z } from "zod";
import { isAddress, type Address } from "viem";
import { AppError } from "./errors";
import { err, ok, type Result } from "./result";
import { getAuthorizationRepository, getAuditLogRepository } from "./db/repository";
import { getSelfclawVerifier } from "./auth/selfclaw";

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
      default:
        return this.errorResponse(
          JsonRpcErrorCode.METHOD_NOT_FOUND,
          `Method '${req.method}' not found`,
          { availableMethods: ["sentry_request_payment", "sentry_check_authorization", "sentry_revoke_agent", "sentry_verify_integrity"] },
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
}
