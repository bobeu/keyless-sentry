import { z } from "zod";
import {
  AppError,
  err,
  ok,
  parseWithSchema,
  safeAsync,
  safeSync,
  type Result,
  JsonRpcHandler,
} from "@keyless-sentry/core";
import type { CommandContext } from "./command";
import { buildCommandMap } from "./commands";

const TelegramTextSchema = z
  .object({
    text: z.string().min(1),
    // optional sender identity (for on-chain registry lookups)
    user: z
      .object({
        platform: z.enum(["telegram", "whatsapp"]),
        id: z.string().min(1).max(128),
      })
      .strict()
      .optional(),
  })
  .strict();

type TelegramTextInput = z.infer<typeof TelegramTextSchema>;

type ParsedCommand = Readonly<{
  command: string;
  rawArgs: string;
}>;

function parseTelegramCommand(text: string): Result<ParsedCommand> {
  return safeSync("gateway.router.parseTelegramCommand", () => {
    const trimmed = text.trim();
    const spaceIdx = trimmed.indexOf(" ");
    const command = (spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx)).trim();
    const rawArgs = (spaceIdx === -1 ? "" : trimmed.slice(spaceIdx + 1)).trim();

    if (!command.startsWith("/")) {
      return err(
        new AppError({
          code: "COMMAND_ERROR",
          message: "Not a command (expected leading '/')",
          context: "gateway.router.parseTelegramCommand",
          details: { text },
        }),
      );
    }

    return ok({ command, rawArgs });
  });
}

function argsToInput(command: string, rawArgs: string): Result<unknown> {
  return safeSync("gateway.router.argsToInput", () => {
    if (command === "/start") {
      // Handle two cases:
      // 1. Interactive component callback: "GUARDIAN telegram 123456" (personality, platform, id)
      // 2. Legacy format: "/start <platform> <id> <personality>"
      const parts = rawArgs.split(/\s+/).filter((p) => p.length > 0);
      
      // Check if it's a button callback (starts with personality)
      if (parts.length === 3) {
        const firstPart = parts[0];
        if (firstPart && ["GUARDIAN", "ACCOUNTANT", "STRATEGIST"].includes(firstPart)) {
          return ok({ 
            personality: firstPart, 
            platform: parts[1], 
            id: parts[2] 
          });
        }
      }
      
      // Legacy format
      if (parts.length !== 3) {
        // Return empty to indicate we need interactive components
        return ok({ needsComponents: true });
      }
      return ok({ platform: parts[0], id: parts[1], personality: parts[2] });
    }
    if (command === "/authorize-agent") {
      // format: /authorize-agent <agentId> <limit> <durationSec>
      const parts = rawArgs.split(/\s+/).filter((p) => p.length > 0);
      if (parts.length !== 3) {
        return err(
          new AppError({
            code: "INVALID_INPUT",
            message: "Usage: /authorize-agent <agentId> <limit> <durationSec>",
            context: "gateway.router.argsToInput:/authorize-agent",
            details: { rawArgs },
          }),
        );
      }
      return ok({ agentId: parts[0], limit: parts[1], durationSec: parts[2] });
    }
    if (command === "/get-invoice") {
      // format: /get-invoice <payTo> <memo...?>
      const parts = rawArgs.split(/\s+/).filter((p) => p.length > 0);
      if (parts.length < 1) {
        return err(
          new AppError({
            code: "INVALID_INPUT",
            message: "Usage: /get-invoice <payTo> [memo]",
            context: "gateway.router.argsToInput:/get-invoice",
            details: { rawArgs },
          }),
        );
      }
      const payTo = parts[0];
      const memo = parts.slice(1).join(" ").trim();
      return ok({ payTo, memo: memo.length > 0 ? memo : undefined });
    }
    if (command === "/reserve-task") {
      // format: /reserve-task <taskId> <token> <amount>
      const parts = rawArgs.split(/\s+/).filter((p) => p.length > 0);
      if (parts.length !== 3) {
        return err(
          new AppError({
            code: "INVALID_INPUT",
            message: "Usage: /reserve-task <taskId> <token> <amount>",
            context: "gateway.router.argsToInput:/reserve-task",
            details: { rawArgs },
          }),
        );
      }
      return ok({ taskId: parts[0], token: parts[1], amount: parts[2] });
    }
    if (command === "/complete-task") {
      // format: /complete-task <taskId>
      const parts = rawArgs.split(/\s+/).filter((p) => p.length > 0);
      if (parts.length !== 1) {
        return err(
          new AppError({
            code: "INVALID_INPUT",
            message: "Usage: /complete-task <taskId>",
            context: "gateway.router.argsToInput:/complete-task",
            details: { rawArgs },
          }),
        );
      }
      return ok({ taskId: parts[0] });
    }
    if (command === "/create-wallet") {
      const salt = rawArgs.length > 0 ? rawArgs : undefined;
      return ok({ salt });
    }
    return ok({});
  });
}

function formatOutput(command: string, output: unknown): Result<string> {
  return safeSync("gateway.router.formatOutput", () => {
    if (command === "/help") {
      return ok(String(output));
    }
    // Handle special output types
    if (command === "/start" && typeof output === "object" && output !== null) {
      const outputObj = output as Record<string, unknown>;
      
      // If it's a needsComponents request, return interactive buttons
      if ("needsComponents" in outputObj && outputObj.needsComponents === true) {
        const components = {
          components: [
            { type: "button" as const, label: "🛡️ Guardian", action: "/start GUARDIAN" },
            { type: "button" as const, label: "📊 Accountant", action: "/start ACCOUNTANT" },
            { type: "button" as const, label: "🚀 Strategist", action: "/start STRATEGIST" },
          ],
          message: "Welcome to Sentry! Choose your sentinel personality:"
        };
        return ok(JSON.stringify(components));
      }
    }
    return ok(JSON.stringify(output, null, 2));
  });
}

export async function handleTelegramMessage(
  ctx: CommandContext,
  inputUnknown: unknown,
): Promise<Result<string>> {
  return safeAsync("gateway.router.handleTelegramMessage", async () => {
    // Check if this is a JSON-RPC request (A2A communication)
    if (isJsonRpcRequest(inputUnknown)) {
      const handler = new JsonRpcHandler();
      const response = await handler.handleRequest(inputUnknown);
      return ok(JSON.stringify(response));
    }

    // Otherwise, handle as a Telegram text command
    const inputRes = parseWithSchema(TelegramTextSchema, inputUnknown, "gateway.router.input");
    if (!inputRes.ok) return inputRes;

    const parsedCmdRes = parseTelegramCommand(inputRes.value.text);
    if (!parsedCmdRes.ok) return parsedCmdRes;

    const map = buildCommandMap();
    const cmd = map[parsedCmdRes.value.command];
    if (!cmd) {
      return err(
        new AppError({
          code: "COMMAND_ERROR",
          message: "Unknown command",
          context: "gateway.router.unknownCommand",
          details: { command: parsedCmdRes.value.command },
        }),
      );
    }

    const inputForCommandRes = argsToInput(parsedCmdRes.value.command, parsedCmdRes.value.rawArgs);
    if (!inputForCommandRes.ok) return inputForCommandRes;

    const validated = parseWithSchema(
      cmd.inputSchema,
      inputForCommandRes.value,
      `gateway.router.commandInput:${cmd.name}`,
    );
    if (!validated.ok) return validated;

    const execRes = await cmd.execute(
      Object.freeze({ ...ctx, sender: inputRes.value.user }) as CommandContext,
      validated.value,
    );
    if (!execRes.ok) return execRes;

    const formatted = formatOutput(cmd.name, execRes.value);
    if (!formatted.ok) return formatted;
    return ok(formatted.value);
  });
}

/**
 * Check if input is a JSON-RPC 2.0 request
 */
function isJsonRpcRequest(input: unknown): boolean {
  if (typeof input !== "object" || input === null) return false;
  const obj = input as Record<string, unknown>;
  return obj.jsonrpc === "2.0" && typeof obj.method === "string";
}

