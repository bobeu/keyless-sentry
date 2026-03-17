import { z } from "zod";
import {
  AppError,
  err,
  ok,
  parseWithSchema,
  safeAsync,
  safeSync,
  type Result,
} from "@keyless-sentry/core";
import type { CommandContext } from "./command";
import { buildCommandMap } from "./commands";

const TelegramTextSchema = z
  .object({
    text: z.string().min(1),
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
    return ok(JSON.stringify(output, null, 2));
  });
}

export async function handleTelegramMessage(
  ctx: CommandContext,
  inputUnknown: unknown,
): Promise<Result<string>> {
  return safeAsync("gateway.router.handleTelegramMessage", async () => {
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

    const execRes = await cmd.execute(ctx, validated.value);
    if (!execRes.ok) return execRes;

    const formatted = formatOutput(cmd.name, execRes.value);
    if (!formatted.ok) return formatted;
    return ok(formatted.value);
  });
}

