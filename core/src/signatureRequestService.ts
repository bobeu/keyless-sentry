import SignClient from "@walletconnect/sign-client";
import type { SessionTypes } from "@walletconnect/types";
import { z } from "zod";
import { isAddress, isHex, toHex, type Address, type Hex } from "viem";
import { AppError, toAppError } from "./errors";
import { err, ok, type Result } from "./result";
import { parseWithSchema, safeAsync, safeSync } from "./validation";
import type { KeylessClientLike, TransactionStatus } from "./keylessSdkTypes";

export const SignatureRequestKindSchema = z.enum(["CREATE_WALLET", "AUTHORIZE_AGENT"]);
export type SignatureRequestKind = z.infer<typeof SignatureRequestKindSchema>;

export const SignatureRequestStatusSchema = z.enum([
  "PENDING_PAIRING",
  "PENDING_SIGNATURE",
  "SIGNATURE_COLLECTED",
  "BROADCASTED",
  "CONFIRMED",
  "FAILED",
  "EXPIRED",
]);
export type SignatureRequestStatus = z.infer<typeof SignatureRequestStatusSchema>;

export const CreateWalletSignaturePayloadSchema = z
  .object({
    operation: z.literal("create-wallet"),
    salt: z.string().min(1),
    owner: z
      .string()
      .refine((v) => isAddress(v), { message: "owner must be an address" })
      .transform((v) => v as Address),
  })
  .strict();

export type CreateWalletSignaturePayload = z.infer<typeof CreateWalletSignaturePayloadSchema>;

const CreateWalletCoordinatorRequestSchema = z
  .object({
    baseUrl: z.string().url(),
    targetChainId: z.number().int().positive(),
    owner: z
      .string()
      .refine((v) => isAddress(v), { message: "owner must be an address" })
      .transform((v) => v as Address),
    signature: z
      .string()
      .refine((v) => isHex(v), { message: "signature must be hex" })
      .transform((v) => v as Hex),
    salt: z.string().min(1),
  })
  .strict();

export type CreateWalletCoordinatorRequest = z.infer<typeof CreateWalletCoordinatorRequestSchema>;

export const CreateWalletResponseSchema = z
  .object({
    txHash: z
      .string()
      .refine((v) => isHex(v), { message: "txHash must be hex" })
      .transform((v) => v as Hex),
    salt: z.string(),
    owner: z
      .string()
      .refine((v) => isAddress(v), { message: "owner must be an address" })
      .transform((v) => v as Address),
    signature: z.string(),
    wallet: z
      .string()
      .refine((v) => isAddress(v), { message: "wallet must be an address" })
      .transform((v) => v as Address),
    nonce: z.string(),
    blockNumber: z.string(),
  })
  .strict();

export type CreateWalletResponse = z.infer<typeof CreateWalletResponseSchema>;

export type SignatureRequest = Readonly<{
  id: string;
  kind: SignatureRequestKind;
  status: SignatureRequestStatus;
  createdAtMs: number;
  expiresAtMs: number;
  owner: Address;
  chainId: number;
  salt: string;
  messageToSign: string;
  encodedData: Hex;
  walletConnectPairingUri: string;
  walletConnectUniversalLink: string;
  signature?: Hex;
  txHash?: Hex;
  wallet?: Address;
  lastError?: { code: string; message: string };
}>;

export const AgentAuthorizationPayloadSchema = z
  .object({
    owner: z
      .string()
      .refine((v) => isAddress(v), { message: "owner must be an address" })
      .transform((v) => v as Address),
    agentId: z.string().min(1).max(128),
    expiresAt: z.number().int().positive(),
    salt: z.string().min(1).optional(),
    maxSpend: z.string().min(1).optional(),
  })
  .strict();

export type AgentAuthorizationPayload = z.infer<typeof AgentAuthorizationPayloadSchema>;

export type SignatureRequestNotifier = (input: {
  requestId: string;
  message: string;
}) => Promise<Result<void>>;

const InitSchema = z
  .object({
    projectId: z.string().min(1),
    metadata: z
      .object({
        name: z.string().min(1),
        description: z.string().min(1),
        url: z.string().url(),
        icons: z.array(z.string().url()).min(1),
      })
      .strict(),
    requestTtlMs: z.number().int().positive().default(10 * 60 * 1000),
    pollIntervalMs: z.number().int().positive().default(4_000),
    pollTimeoutMs: z.number().int().positive().default(5 * 60 * 1000),
  })
  .strict();

export type SignatureRequestServiceInit = z.input<typeof InitSchema>;

type CreateWalletIntent = Readonly<{
  baseUrl: string;
  chainId: number;
  owner: Address;
}>;

const CreateWalletIntentSchema = z
  .object({
    baseUrl: z.string().url(),
    chainId: z.number().int().positive(),
    owner: z
      .string()
      .refine((v) => isAddress(v), { message: "owner must be an address" })
      .transform((v) => v as Address),
  })
  .strict();

function randomSaltHex(bytes: number): string {
  // safeSync wrapper will ensure errors are captured
  const buf = crypto.getRandomValues(new Uint8Array(bytes));
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function nowMs(): number {
  return Date.now();
}

function buildWalletConnectUniversalLink(wcUri: string): string {
  // WalletConnect’s “universal” link works for many wallets; Valora can scan/handle WC from its scanner UI.
  return `https://walletconnect.com/wc?uri=${encodeURIComponent(wcUri)}`;
}

export class SignatureRequestService {
  private readonly init: z.infer<typeof InitSchema>;
  private readonly notifier: SignatureRequestNotifier;
  private readonly clientProvider: () => Promise<Result<KeylessClientLike>>;
  private signClient: SignClient | null = null;

  // in-memory state; later we’ll replace with PersistenceService for durability
  private readonly requests = new Map<string, SignatureRequest>();

  constructor(input: {
    init: SignatureRequestServiceInit;
    notifier: SignatureRequestNotifier;
    clientProvider: () => Promise<Result<KeylessClientLike>>;
  }) {
    const parsed = InitSchema.safeParse(input.init);
    if (!parsed.success) {
      throw new AppError({
        code: "CONFIG_ERROR",
        message: "Invalid SignatureRequestService init",
        context: "core.signatureRequestService.init",
        details: { issues: parsed.error.issues },
      });
    }

    this.init = parsed.data;
    this.notifier = input.notifier;
    this.clientProvider = input.clientProvider;
  }

  async ensureWalletConnect(): Promise<Result<SignClient>> {
    return safeAsync("core.signatureRequestService.ensureWalletConnect", async () => {
      if (this.signClient) return ok(this.signClient);
      try {
        const sc = await SignClient.init({
          projectId: this.init.projectId,
          metadata: this.init.metadata,
        });
        this.signClient = sc;
        return ok(sc);
      } catch (causeUnknown) {
        return err(
          toAppError(causeUnknown, {
            code: "CONFIG_ERROR",
            message: "Failed to initialize WalletConnect SignClient",
            context: "core.signatureRequestService.walletconnect.init",
          }),
        );
      }
    });
  }

  getRequest(id: string): Result<SignatureRequest> {
    return safeSync("core.signatureRequestService.getRequest", () => {
      const found = this.requests.get(id);
      if (!found) {
        return err(
          new AppError({
            code: "INVALID_INPUT",
            message: "Unknown signature request id",
            context: "core.signatureRequestService.getRequest",
            details: { id },
          }),
        );
      }
      return ok(found);
    });
  }

  async requestCreateWallet(intentUnknown: unknown): Promise<Result<SignatureRequest>> {
    return safeAsync("core.signatureRequestService.requestCreateWallet", async () => {
      const intentRes = parseWithSchema(
        CreateWalletIntentSchema,
        intentUnknown,
        "core.signatureRequestService.createWallet.intent",
      );
      if (!intentRes.ok) return intentRes;
      const intent = intentRes.value as CreateWalletIntent;

      const wcRes = await this.ensureWalletConnect();
      if (!wcRes.ok) return wcRes;

      const salt = safeSync("core.signatureRequestService.salt", () => ok(randomSaltHex(16)));
      if (!salt.ok) return salt;

      const payloadRes = parseWithSchema(
        CreateWalletSignaturePayloadSchema,
        { operation: "create-wallet", salt: salt.value, owner: intent.owner },
        "core.signatureRequestService.createWallet.payload",
      );
      if (!payloadRes.ok) return payloadRes;

      const messageToSign = JSON.stringify(payloadRes.value);
      const encodedData = toHex(messageToSign) as Hex;

      // WalletConnect session request: we’ll ask for personal_sign of the JSON string.
      const connectRes = await safeAsync(
        "core.signatureRequestService.walletconnect.connect",
        async () => {
          const res = await wcRes.value.connect({
            requiredNamespaces: {
              eip155: {
                methods: ["personal_sign"],
                chains: [`eip155:${intent.chainId}`],
                events: [],
              },
            },
          });
          return ok(res);
        },
      );
      if (!connectRes.ok) return connectRes;
      if (typeof connectRes.value.uri !== "string" || connectRes.value.uri.length === 0) {
        return err(
          new AppError({
            code: "SDK_ERROR",
            message: "WalletConnect pairing URI was not provided",
            context: "core.signatureRequestService.walletconnect.connect",
          }),
        );
      }

      const id = crypto.randomUUID();
      const createdAtMs = nowMs();
      const expiresAtMs = createdAtMs + this.init.requestTtlMs;

      const request: SignatureRequest = Object.freeze({
        id,
        kind: "CREATE_WALLET",
        status: "PENDING_PAIRING",
        createdAtMs,
        expiresAtMs,
        owner: intent.owner,
        chainId: intent.chainId,
        salt: salt.value,
        messageToSign,
        encodedData,
        walletConnectPairingUri: connectRes.value.uri,
        walletConnectUniversalLink: buildWalletConnectUniversalLink(connectRes.value.uri),
      });

      this.requests.set(id, request);

      // fire-and-forget background workflow
      void this.runCreateWalletFlow({
        requestId: id,
        intent,
        signClient: wcRes.value,
        sessionPromise: connectRes.value.approval(),
        messageToSign,
      });

      const notifyRes = await this.notifier({
        requestId: id,
        message:
          "Please sign this transaction to deploy your agent's wallet.\n\n" +
          `WalletConnect link: ${request.walletConnectUniversalLink}\n` +
          `Pairing URI (QR): ${request.walletConnectPairingUri}`,
      });
      if (!notifyRes.ok) return notifyRes as Result<SignatureRequest>;

      return ok(request);
    });
  }

  async requestAuthorizeAgent(inputUnknown: unknown): Promise<Result<SignatureRequest>> {
    return safeAsync("core.signatureRequestService.requestAuthorizeAgent", async () => {
      const schema = z
        .object({
          baseUrl: z.string().url(),
          chainId: z.number().int().positive(),
          owner: z
            .string()
            .refine((v) => isAddress(v), { message: "owner must be an address" })
            .transform((v) => v as Address),
          agentId: z.string().min(1).max(128),
          limit: z.string().min(1).max(78), // passthrough (SDK expects string)
          durationSec: z.coerce.number().int().positive(),
        })
        .strict();
      const parsed = parseWithSchema(schema, inputUnknown, "core.signatureRequestService.authorizeAgent.input");
      if (!parsed.ok) return parsed;

      const wcRes = await this.ensureWalletConnect();
      if (!wcRes.ok) return wcRes;

      const saltRes = safeSync("core.signatureRequestService.authorizeAgent.salt", () => ok(randomSaltHex(16)));
      if (!saltRes.ok) return saltRes;

      const expiresAt = Date.now() + parsed.value.durationSec * 1000;
      const authPayloadRes = parseWithSchema(
        AgentAuthorizationPayloadSchema,
        {
          owner: parsed.value.owner,
          agentId: parsed.value.agentId,
          expiresAt,
          salt: saltRes.value,
          maxSpend: parsed.value.limit,
        },
        "core.signatureRequestService.authorizeAgent.payload",
      );
      if (!authPayloadRes.ok) return authPayloadRes;

      const messageToSign = JSON.stringify(authPayloadRes.value);
      const encodedData = toHex(messageToSign) as Hex;

      const connectRes = await safeAsync("core.signatureRequestService.walletconnect.connect.authorizeAgent", async () => {
        const res = await wcRes.value.connect({
          requiredNamespaces: {
            eip155: {
              methods: ["personal_sign"],
              chains: [`eip155:${parsed.value.chainId}`],
              events: [],
            },
          },
        });
        return ok(res);
      });
      if (!connectRes.ok) return connectRes;
      if (typeof connectRes.value.uri !== "string" || connectRes.value.uri.length === 0) {
        return err(
          new AppError({
            code: "SDK_ERROR",
            message: "WalletConnect pairing URI was not provided",
            context: "core.signatureRequestService.walletconnect.connect.authorizeAgent",
          }),
        );
      }

      const id = crypto.randomUUID();
      const createdAtMs = nowMs();
      const expiresAtMs = createdAtMs + this.init.requestTtlMs;

      const request: SignatureRequest = Object.freeze({
        id,
        kind: "AUTHORIZE_AGENT",
        status: "PENDING_PAIRING",
        createdAtMs,
        expiresAtMs,
        owner: parsed.value.owner,
        chainId: parsed.value.chainId,
        salt: saltRes.value,
        messageToSign,
        encodedData,
        walletConnectPairingUri: connectRes.value.uri,
        walletConnectUniversalLink: buildWalletConnectUniversalLink(connectRes.value.uri),
      });

      this.requests.set(id, request);

      void this.runAuthorizeAgentFlow({
        requestId: id,
        chainId: parsed.value.chainId,
        owner: parsed.value.owner,
        signClient: wcRes.value,
        sessionPromise: connectRes.value.approval(),
        messageToSign,
      });

      const notifyRes = await this.notifier({
        requestId: id,
        message:
          "Please sign this authorization to allow your agent to operate.\n\n" +
          `WalletConnect link: ${request.walletConnectUniversalLink}\n` +
          `Pairing URI (QR): ${request.walletConnectPairingUri}`,
      });
      if (!notifyRes.ok) return notifyRes as Result<SignatureRequest>;

      return ok(request);
    });
  }

  private async runAuthorizeAgentFlow(input: {
    requestId: string;
    chainId: number;
    owner: Address;
    signClient: SignClient;
    sessionPromise: Promise<SessionTypes.Struct>;
    messageToSign: string;
  }): Promise<void> {
    const { requestId } = input;
    const expireIfNeeded = (): boolean => {
      const req = this.requests.get(requestId);
      if (!req) return true;
      if (nowMs() > req.expiresAtMs) {
        this.setStatus(requestId, {
          status: "EXPIRED",
          lastError: { code: "EXPIRED", message: "Signature request expired" },
        });
        return true;
      }
      return false;
    };

    try {
      if (expireIfNeeded()) return;
      this.setStatus(requestId, { status: "PENDING_SIGNATURE" });

      const session = await input.sessionPromise;
      if (expireIfNeeded()) return;

      const signature = (await input.signClient.request({
        topic: session.topic,
        chainId: `eip155:${input.chainId}`,
        request: {
          method: "personal_sign",
          params: [input.messageToSign, input.owner],
        },
      })) as unknown;

      if (typeof signature !== "string" || !isHex(signature)) {
        this.setStatus(requestId, {
          status: "FAILED",
          lastError: { code: "SDK_ERROR", message: "Invalid signature response from wallet" },
        });
        await this.notifier({
          requestId,
          message: "Signature failed: wallet returned an invalid response.",
        });
        return;
      }

      this.setStatus(requestId, { status: "CONFIRMED", signature: signature as Hex });
      await this.notifier({
        requestId,
        message: "Authorization signature collected. Sentry will store it for agent operations.",
      });
    } catch (causeUnknown) {
      const appErr = toAppError(causeUnknown, {
        code: "INTERNAL_ERROR",
        message: "Unhandled error in authorization flow",
        context: "core.signatureRequestService.runAuthorizeAgentFlow",
      });
      this.setStatus(requestId, {
        status: "FAILED",
        lastError: { code: appErr.code, message: appErr.message },
      });
      await this.notifier({
        requestId,
        message: `Authorization failed: ${appErr.message}`,
      });
    }
  }

  private setStatus(
    requestId: string,
    patch: Partial<Omit<SignatureRequest, "id" | "kind">> & { status: SignatureRequestStatus },
  ): void {
    const existing = this.requests.get(requestId);
    if (!existing) return;
    const next: SignatureRequest = Object.freeze({ ...existing, ...patch });
    this.requests.set(requestId, next);
  }

  private async runCreateWalletFlow(input: {
    requestId: string;
    intent: CreateWalletIntent;
    signClient: SignClient;
    sessionPromise: Promise<SessionTypes.Struct>;
    messageToSign: string;
  }): Promise<void> {
    const { requestId } = input;
    const expireIfNeeded = (): boolean => {
      const req = this.requests.get(requestId);
      if (!req) return true;
      if (nowMs() > req.expiresAtMs) {
        this.setStatus(requestId, {
          status: "EXPIRED",
          lastError: { code: "EXPIRED", message: "Signature request expired" },
        });
        return true;
      }
      return false;
    };

    try {
      if (expireIfNeeded()) return;
      this.setStatus(requestId, { status: "PENDING_SIGNATURE" });

      const session = await input.sessionPromise;
      if (expireIfNeeded()) return;

      const address = input.intent.owner;
      const signature = (await input.signClient.request({
        topic: session.topic,
        chainId: `eip155:${input.intent.chainId}`,
        request: {
          method: "personal_sign",
          params: [input.messageToSign, address],
        },
      })) as unknown;

      if (typeof signature !== "string" || !isHex(signature)) {
        this.setStatus(requestId, {
          status: "FAILED",
          lastError: { code: "SDK_ERROR", message: "Invalid signature response from wallet" },
        });
        await this.notifier({
          requestId,
          message: "Signature failed: wallet returned an invalid response.",
        });
        return;
      }

      this.setStatus(requestId, { status: "SIGNATURE_COLLECTED", signature: signature as Hex });

      const broadcastRes = await this.broadcastCreateWallet({
        baseUrl: input.intent.baseUrl,
        targetChainId: input.intent.chainId,
        owner: input.intent.owner,
        salt: this.requests.get(requestId)?.salt ?? "",
        signature: signature as Hex,
      });

      if (!broadcastRes.ok) {
        this.setStatus(requestId, {
          status: "FAILED",
          lastError: { code: broadcastRes.error.code, message: broadcastRes.error.message },
        });
        await this.notifier({
          requestId,
          message: `Transaction failed: ${broadcastRes.error.message}`,
        });
        return;
      }

      this.setStatus(requestId, {
        status: "BROADCASTED",
        txHash: broadcastRes.value.txHash,
        wallet: broadcastRes.value.wallet,
      });

      await this.notifier({
        requestId,
        message: `Broadcasted. txHash: ${broadcastRes.value.txHash}`,
      });

      // Poll coordinator tx endpoint via SDK (clientProvider) until confirmed/failed/timeout
      const pollRes = await this.pollTxStatus(broadcastRes.value.txHash);
      if (!pollRes.ok) {
        this.setStatus(requestId, {
          status: "FAILED",
          lastError: { code: pollRes.error.code, message: pollRes.error.message },
        });
        await this.notifier({
          requestId,
          message: `Transaction polling failed: ${pollRes.error.message}`,
        });
        return;
      }

      this.setStatus(requestId, { status: "CONFIRMED" });
      await this.notifier({
        requestId,
        message: `Confirmed. Wallet: ${broadcastRes.value.wallet}`,
      });
    } catch (causeUnknown) {
      const appErr = toAppError(causeUnknown, {
        code: "INTERNAL_ERROR",
        message: "Unhandled error in signature request flow",
        context: "core.signatureRequestService.runCreateWalletFlow",
      });
      this.setStatus(requestId, {
        status: "FAILED",
        lastError: { code: appErr.code, message: appErr.message },
      });
      await this.notifier({
        requestId,
        message: `Transaction failed: ${appErr.message}`,
      });
    }
  }

  private async broadcastCreateWallet(inputUnknown: unknown): Promise<Result<CreateWalletResponse>> {
    return safeAsync("core.signatureRequestService.broadcastCreateWallet", async () => {
      const parsed = parseWithSchema(
        CreateWalletCoordinatorRequestSchema,
        inputUnknown,
        "core.signatureRequestService.broadcastCreateWallet.input",
      );
      if (!parsed.ok) return parsed;

      try {
        const url = new URL("/create-wallet", parsed.value.baseUrl);
        const res = await fetch(url.toString(), {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            targetChainId: parsed.value.targetChainId,
            owner: parsed.value.owner,
            signature: parsed.value.signature,
            salt: parsed.value.salt,
          }),
        });

        if (!res.ok) {
          const bodyText = await res.text().catch(() => "");
          return err(
            new AppError({
              code: "SDK_ERROR",
              message: `Coordinator rejected create-wallet (${res.status})`,
              context: "core.signatureRequestService.broadcastCreateWallet.http",
              details: { status: res.status, bodyText },
            }),
          );
        }

        const jsonUnknown = (await res.json()) as unknown;
        const parsedRes = parseWithSchema(
          CreateWalletResponseSchema,
          jsonUnknown,
          "core.signatureRequestService.broadcastCreateWallet.response",
        );
        if (!parsedRes.ok) return parsedRes;
        return ok(parsedRes.value);
      } catch (causeUnknown) {
        return err(
          toAppError(causeUnknown, {
            code: "SDK_ERROR",
            message: "Failed to call coordinator create-wallet",
            context: "core.signatureRequestService.broadcastCreateWallet",
          }),
        );
      }
    });
  }

  private async pollTxStatus(txHash: Hex): Promise<Result<TransactionStatus>> {
    return safeAsync("core.signatureRequestService.pollTxStatus", async () => {
      const started = nowMs();
      while (nowMs() - started < this.init.pollTimeoutMs) {
        const clientRes = await this.clientProvider();
        if (!clientRes.ok) return clientRes;

        try {
          const status = await clientRes.value.getTransactionStatus(txHash);
          if (status.status === "confirmed") return ok(status);
          if (status.status === "failed") {
            return err(
              new AppError({
                code: "SDK_ERROR",
                message: "Transaction failed on-chain",
                context: "core.signatureRequestService.pollTxStatus",
                details: { txHash },
              }),
            );
          }
        } catch (causeUnknown) {
          // ignore transient polling errors; continue
        }

        await new Promise((r) => setTimeout(r, this.init.pollIntervalMs));
      }

      return err(
        new AppError({
          code: "SDK_ERROR",
          message: "Timed out waiting for transaction confirmation",
          context: "core.signatureRequestService.pollTxStatus",
          details: { txHash },
        }),
      );
    });
  }
}

