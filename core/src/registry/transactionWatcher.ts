import { z } from "zod";
import { createPublicClient, http, type Hex, type TransactionReceipt } from "viem";
import { AppError } from "../errors";
import { err, ok, type Result } from "../result";
import { safeAsync, safeSync } from "../validation";
import { getAuditLogRepository } from "../db/repository";

const EnvSchema = z
  .object({
    SENTRY_RPC_URL: z.string().url(),
    SENTRY_CHAIN_ID: z.coerce.number().int().positive(),
  })
  .strict();

type TransactionWatcherEnv = z.infer<typeof EnvSchema>;

/**
 * Notification callback for transaction status changes
 */
export type TransactionNotifier = (input: {
  txHash: string;
  userHashedId: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  gasUsed?: string;
  error?: string;
}) => Promise<Result<void>>;

/**
 * Transaction Watcher - Monitors transaction lifecycle until confirmation or failure
 * Uses viem's waitForTransactionReceipt to track on-chain status
 */
export class TransactionWatcher {
  private readonly publicClient: ReturnType<typeof createPublicClient>;
  private readonly notifier: TransactionNotifier;

  constructor(input: { rpcUrl: string; chainId: number; notifier: TransactionNotifier }) {
    // Create client with minimal chain config - types will be inferred from usage
    this.publicClient = createPublicClient({
      transport: http(input.rpcUrl),
      chain: {
        id: input.chainId,
        name: "Unknown Chain",
        nativeCurrency: { name: "Native", symbol: "NATIVE", decimals: 18 },
      } as any,
    }) as any;
    this.notifier = input.notifier;
  }

  /**
   * Watch a transaction until confirmation or failure
   * Updates AuditLog status and notifies via callback
   * 
   * @param txHash - The transaction hash to watch
   * @param userHashedId - The user's hashed ID for logging
   */
  async watchTransaction(txHash: Hex, userHashedId: string): Promise<Result<void>> {
    return safeAsync("core.transactionWatcher.watchTransaction", async () => {
      const auditRepo = getAuditLogRepository();

      // Initial status - update to PENDING
      await auditRepo.updateStatusByTxHash(txHash, "PENDING");
      
      // Notify that transaction is pending
      await this.notifier({
        txHash,
        userHashedId,
        status: "PENDING",
      });

      try {
        // Wait for transaction receipt
        const receipt: TransactionReceipt = await this.publicClient.waitForTransactionReceipt({
          hash: txHash,
          confirmations: 1,
          timeout: 300_000, // 5 minute timeout
        });

        // Transaction confirmed
        const gasUsed = receipt.gasUsed.toString();
        const status = receipt.status === "success" ? "SUCCESS" : "FAILED";

        // Update audit log
        await auditRepo.updateStatusByTxHash(
          txHash,
          status,
          gasUsed,
          status === "FAILED" ? "Transaction reverted on-chain" : undefined,
        );

        // Notify success/failure
        await this.notifier({
          txHash,
          userHashedId,
          status,
          gasUsed,
        });

        return ok(undefined);
      } catch (causeUnknown) {
        // Transaction failed or timed out
        let errorMessage = "Transaction monitoring failed";
        if (causeUnknown instanceof Error) {
          errorMessage = causeUnknown.message;
        }

        // Update audit log to FAILED
        await auditRepo.updateStatusByTxHash(txHash, "FAILED", undefined, errorMessage);

        // Notify failure
        await this.notifier({
          txHash,
          userHashedId,
          status: "FAILED",
          error: errorMessage,
        });

        return err(
          new AppError({
            code: "SDK_ERROR",
            message: "Transaction watch failed",
            context: "core.transactionWatcher.watchTransaction",
            causeUnknown,
          }),
        );
      }
    });
  }

  /**
   * Start watching a transaction in the background (fire and forget)
   * Useful for not blocking the user response
   */
  watchTransactionBackground(txHash: Hex, userHashedId: string): void {
    void this.watchTransaction(txHash, userHashedId).catch((e) => {
      console.error(`[transactionWatcher] Background watch failed for ${txHash}:`, e);
    });
  }
}

// Singleton instance
let transactionWatcher: TransactionWatcher | null = null;

/**
 * Create a transaction watcher from environment variables
 */
export function createTransactionWatcher(input: {
  notifier: TransactionNotifier;
}): Result<TransactionWatcher> {
  return safeSync("core.transactionWatcher.create", () => {
    // Check if already created
    if (transactionWatcher) {
      return ok(transactionWatcher);
    }

    // Parse environment
    const parsed = EnvSchema.safeParse(process.env);
    if (!parsed.success) {
      return err(
        new AppError({
          code: "CONFIG_ERROR",
          message: "Invalid transaction watcher configuration",
          context: "core.transactionWatcher.create",
          details: { issues: parsed.error.issues },
        }),
      );
    }

    const parsedData = parsed.data;
    const { SENTRY_RPC_URL, SENTRY_CHAIN_ID } = parsedData;

    transactionWatcher = new TransactionWatcher({
      rpcUrl: SENTRY_RPC_URL,
      chainId: SENTRY_CHAIN_ID,
      notifier: input.notifier,
    });

    return ok(transactionWatcher);
  });
}

/**
 * Get the singleton transaction watcher instance
 */
export function getTransactionWatcher(): Result<TransactionWatcher> {
  return safeSync("core.transactionWatcher.get", () => {
    if (!transactionWatcher) {
      return err(
        new AppError({
          code: "CONFIG_ERROR",
          message: "Transaction watcher not initialized",
          context: "core.transactionWatcher.get",
        }),
      );
    }
    return ok(transactionWatcher);
  });
}
