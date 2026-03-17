import { AppError } from "./errors";

export type Ok<T> = { readonly ok: true; readonly value: T };
export type Err = { readonly ok: false; readonly error: AppError };
export type Result<T> = Ok<T> | Err;

export function ok<T>(value: T): Result<T> {
  try {
    return { ok: true, value } as const;
  } catch (causeUnknown) {
    return {
      ok: false,
      error: new AppError({
        code: "INTERNAL_ERROR",
        message: "Unexpected failure creating ok result",
        context: "core.result.ok",
        causeUnknown,
      }),
    } as const;
  }
}

export function err<T = never>(error: AppError): Result<T> {
  try {
    return { ok: false, error } as const;
  } catch (causeUnknown) {
    return {
      ok: false,
      error: new AppError({
        code: "INTERNAL_ERROR",
        message: "Unexpected failure creating err result",
        context: "core.result.err",
        details: { originalCode: error.code, originalMessage: error.message },
        causeUnknown,
      }),
    } as const;
  }
}

export function isOk<T>(result: Result<T>): result is Ok<T> {
  try {
    return result.ok === true;
  } catch {
    return false;
  }
}

export function isErr<T>(result: Result<T>): result is Err {
  try {
    return result.ok === false;
  } catch {
    return true;
  }
}

