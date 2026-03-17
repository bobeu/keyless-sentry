import { z } from "zod";
import type { Result } from "@keyless-sentry/core";

export type CommandContext = Readonly<{
  orchestrator: import("@keyless-sentry/core").SentryOrchestrator;
}>;

export type Command<TInput, TOutput> = Readonly<{
  name: string;
  description: string;
  inputSchema: z.ZodType<TInput>;
  execute: (ctx: CommandContext, input: TInput) => Promise<Result<TOutput>>;
}>;

export type CommandMap = Readonly<Record<string, Command<unknown, unknown>>>;

