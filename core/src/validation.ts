import { z } from "zod";
import { AppError, toAppError } from "./errors";
import { err, ok, type Result } from "./result";

export function parseWithSchema<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  input: unknown,
  context: string,
): Result<z.infer<TSchema>> {
  try {
    const parsed = schema.safeParse(input);
    if (!parsed.success) {
      return err(
        new AppError({
          code: "INVALID_INPUT",
          message: "Input validation failed",
          context,
          details: { issues: parsed.error.issues, input },
        }),
      );
    }
    return ok(parsed.data);
  } catch (causeUnknown) {
    return err(
      toAppError(causeUnknown, {
        code: "INTERNAL_ERROR",
        message: "Unexpected validation failure",
        context,
      }),
    );
  }
}

export async function safeAsync<T>(
  context: string,
  fn: () => Promise<Result<T>>,
): Promise<Result<T>> {
  try {
    return await fn();
  } catch (causeUnknown) {
    return err(
      toAppError(causeUnknown, {
        code: "INTERNAL_ERROR",
        message: "Unhandled exception",
        context,
      }),
    );
  }
}

export function safeSync<T>(context: string, fn: () => Result<T>): Result<T> {
  try {
    return fn();
  } catch (causeUnknown) {
    return err(
      toAppError(causeUnknown, {
        code: "INTERNAL_ERROR",
        message: "Unhandled exception",
        context,
      }),
    );
  }
}

