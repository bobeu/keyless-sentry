import { z } from "zod";
import type { Result, TransactionWatcher } from "@keyless-sentry/core";

export type CommandContext = Readonly<{
  orchestrator: import("@keyless-sentry/core").SentryOrchestrator;
  signatureRequests: import("@keyless-sentry/core").SignatureRequestService;
  registry: import("@keyless-sentry/core").SentryRegistryClient;
  sender?: import("@keyless-sentry/core").ExternalUserIdText;
  txWatcher?: TransactionWatcher;
}>;

export type Command<TInput, TOutput> = Readonly<{
  name: string;
  description: string;
  inputSchema: z.ZodType<TInput>;
  execute: (ctx: CommandContext, input: TInput) => Promise<Result<TOutput>>;
}>;

export type CommandMap = Readonly<Record<string, Command<unknown, unknown>>>;

