import dotenv from "dotenv";
import {
  AppError,
  SignatureRequestService,
  SentryRegistryClient,
  createTransactionWatcher,
  err,
  ok,
  parseWithSchema,
  safeAsync,
  safeSync,
  type Result,
} from "@keyless-sentry/core";
import { SentryOrchestrator } from "@keyless-sentry/core";
import { ERC8004IdentityService } from "@keyless-sentry/core";
import { z } from "zod";
import { handleTelegramMessage } from "./router";
import { getOpenClawService } from "./services/openclaw";
import { initHeartbeat, startHeartbeat, type HeartbeatResult } from "./services/heartbeat";
import { createHttpServer } from "./httpServer";

/**
 * Initialize ERC-8004 Identity Service
 * This runs on boot to:
 * 1. Check if identity is registered on Celo
 * 2. If not, mint new Identity NFT using PRIVATE_KEY
 * 3. Auto-register for Synthesis hackathon
 * 4. Store identity in database
 */
async function initIdentityService(): Promise<Result<void>> {
  return safeAsync("gateway.initIdentityService", async () => {
    console.log("[identity] Initializing ERC-8004 Identity Service...");
    
    // Check if PRIVATE_KEY is available
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      console.warn("[identity] PRIVATE_KEY not found - skipping ERC-8004 registration");
      console.warn("[identity] Set PRIVATE_KEY in env to enable identity registration");
      return ok(undefined);
    }
    
    // Initialize identity service
    const identityRes = ERC8004IdentityService.fromEnv();
    if (!identityRes.ok) {
      console.error("[identity] Failed to initialize identity service:", identityRes.error.message);
      return identityRes;
    }
    
    const identityService = identityRes.value;
    
    // Check and register identity (this auto-registers for Synthesis hackathon)
    const checkRes = await identityService.checkAndRegister();
    if (!checkRes.ok) {
      console.error("[identity] Identity check/register failed:", checkRes.error.message);
      return checkRes;
    }
    
    console.log("[identity] Identity status:", {
      isRegistered: checkRes.value.isRegistered,
      needsRegistration: checkRes.value.needsRegistration,
    });
    
    return ok(undefined);
  });
}

/**
 * Initialize OpenClaw Service
 * This loads SOUL.md and sets up the workspace
 */
async function initOpenClaw(): Promise<Result<void>> {
  return safeAsync("gateway.initOpenClaw", async () => {
    console.log("[openclaw] Initializing OpenClaw service...");
    
    const openclawRes = getOpenClawService();
    if (!openclawRes.ok) {
      console.error("[openclaw] Failed to get OpenClaw service:", openclawRes.error.message);
      return openclawRes;
    }
    
    const openclaw = openclawRes.value;
    const initRes = await openclaw.initialize();
    if (!initRes.ok) {
      console.error("[openclaw] Failed to initialize:", initRes.error.message);
      return initRes;
    }
    
    console.log("[openclaw] OpenClaw initialized successfully");
    console.log(`[openclaw] Identity: ${initRes.value.identityHandle}`);
    console.log(`[openclaw] Personality: ${initRes.value.personality}`);
    
    return ok(undefined);
  });
}

async function readLines(): Promise<Result<AsyncIterable<string>>> {
  return safeAsync("gateway.index.readLines", async () => {
    try {
      const encoder = new TextDecoder();
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          const reader = Bun.stdin.stream().getReader();
          const pump = async (): Promise<void> => {
            try {
              const { value, done } = await reader.read();
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              await pump();
            } catch (causeUnknown) {
              controller.error(causeUnknown);
            }
          };
          void pump();
        },
      });

      async function* gen(): AsyncGenerator<string> {
        try {
          const reader = stream.getReader();
          let buf = "";
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buf += encoder.decode(value, { stream: true });
            while (true) {
              const idx = buf.indexOf("\n");
              if (idx === -1) break;
              const line = buf.slice(0, idx).replace(/\r$/, "");
              buf = buf.slice(idx + 1);
              yield line;
            }
          }
          if (buf.trim().length > 0) yield buf.trim();
        } catch (causeUnknown) {
          throw causeUnknown;
        }
      }

      return ok(gen());
    } catch (causeUnknown) {
      return err(
        new AppError({
          code: "INTERNAL_ERROR",
          message: "Failed to initialize stdin reader",
          context: "gateway.index.readLines",
          causeUnknown,
        }),
      );
    }
  });
}

async function coerceInput(line: string): Promise<unknown> {
  // Accept either raw command text (legacy) or a JSON intent line:
  // {"text": "...", "user": {"platform":"telegram","id":"123"}}
  const trimmed = line.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      return JSON.parse(trimmed) as unknown;
    } catch {
      return { text: line };
    }
  }
  return { text: line };
}

async function main(): Promise<Result<void>> {
  return safeAsync("gateway.index.main", async () => {
    const dotenvRes = safeSync("gateway.dotenv.config", () => {
      dotenv.config();
      return ok(true);
    });
    if (!dotenvRes.ok) return dotenvRes;

    // Initialize OpenClaw service (loads SOUL.md, sets up workspace)
    const openclawInitRes = await initOpenClaw();
    if (!openclawInitRes.ok) {
      console.warn("[gateway] Warning: OpenClaw initialization failed, continuing anyway...");
    }

    // Initialize ERC-8004 Identity Service (auto-registers for Synthesis hackathon)
    const identityInitRes = await initIdentityService();
    if (!identityInitRes.ok) {
      console.warn("[gateway] Warning: Identity service initialization failed, continuing anyway...");
    }

    const orchRes = await SentryOrchestrator.createFromEnv();
    if (!orchRes.ok) return orchRes;

    const registryRes = SentryRegistryClient.fromProcessEnv();
    if (!registryRes.ok) return registryRes;
    const registry = registryRes.value;

    const WcEnvSchema = z
      .object({
        WALLETCONNECT_PROJECT_ID: z.string().min(1),
      })
      .strict();
    const wcEnvRes = parseWithSchema(WcEnvSchema, process.env, "gateway.env.walletconnect");
    if (!wcEnvRes.ok) return wcEnvRes;

    const signatureRequests = new SignatureRequestService({
      init: {
        projectId: wcEnvRes.value.WALLETCONNECT_PROJECT_ID,
        metadata: {
          name: "Keyless Sentry",
          description: "Public Financial Orchestrator (headless)",
          url: "https://keyless-collective.example/sentry",
          icons: ["https://keyless-collective.example/icon.png"],
        },
      },
      notifier: async ({ requestId, message }) =>
        safeAsync("gateway.signatureRequests.notifier", async () => {
          console.log(`[signature-request:${requestId}] ${message}`);
          return ok(undefined);
        }),
      clientProvider: async () =>
        safeAsync("gateway.signatureRequests.clientProvider", async () => {
          return orchRes.value.getKeylessClient();
        }),
    });

    // Initialize transaction watcher for monitoring tx confirmations
    const txWatcherRes = createTransactionWatcher({
      notifier: async ({ txHash, userHashedId, status, gasUsed, error }) => {
        // Notify via stdout when transaction status changes
        const notification = {
          type: "transaction-status",
          txHash,
          userHashedId,
          status,
          gasUsed,
          error,
          timestamp: new Date().toISOString(),
        };
        console.log(JSON.stringify(notification));
        return ok(undefined);
      },
    });

    if (!txWatcherRes.ok) {
      console.error("[gateway] Warning: Transaction watcher not initialized:", txWatcherRes.error.message);
    }

    const txWatcher = txWatcherRes.ok ? txWatcherRes.value : undefined;

    // Initialize heartbeat service
    await initHeartbeat();
    
    // Start heartbeat loop (30 minutes)
    startHeartbeat(async (result: HeartbeatResult) => {
      console.log(JSON.stringify({
        type: "HEARTBEAT",
        timestamp: result.timestamp,
        status: result.status,
        vaultHealth: result.vaultHealth,
        integrityCheck: result.integrityCheck,
      }));
    });

    // Create HTTP server for cloud deployments (Railway, etc.)
    const ctx = { orchestrator: orchRes.value, signatureRequests, txWatcher } as const;
    const fullCtx = { ...ctx, registry } as const;
    
    // Start HTTP server if not in headless mode
    const isHeadless = process.env.HEADLESS === "true";
    if (!isHeadless) {
      console.log("[gateway] Starting HTTP server for cloud deployment...");
      createHttpServer(fullCtx);
    }

    const linesRes = await readLines();
    if (!linesRes.ok) return linesRes;

    for await (const line of linesRes.value) {
      const input = await coerceInput(line);
      const handled = await handleTelegramMessage(fullCtx, input);
      if (handled.ok) {
        // headless: write to stdout, upstream can adapt to Openclaw transport
        console.log(handled.value);
      } else {
        console.error(
          JSON.stringify(
            { ok: false, error: { code: handled.error.code, message: handled.error.message } },
            null,
            2,
          ),
        );
      }
    }

    return ok(undefined);
  });
}

void (async () => {
  const res = await main();
  if (!res.ok) {
    console.error(
      JSON.stringify(
        { ok: false, error: { code: res.error.code, message: res.error.message } },
        null,
        2,
      ),
    );
    process.exitCode = 1;
  }
})();

