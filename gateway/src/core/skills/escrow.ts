import { z } from "zod";
import { isAddress, type Address } from "viem";
import { AppError } from "../errors";
import { err, ok, type Result } from "../result";
import { parseWithSchema, safeAsync } from "../validation";
import type { SentryRegistryClient, UserIdHash } from "../registry/registryClient";
import { hashTaskId } from "../registry/registryClient";
import { getTaskEscrowRepository, type CreateTaskEscrowInput } from "../db/repository";

export const ReserveFundsRequestSchema = z
  .object({
    userIdHash: z.string().min(66).max(66),
    taskId: z.string().min(1).max(128),
    token: z
      .string()
      .refine((v) => isAddress(v), { message: "token must be address" })
      .transform((v) => v as Address),
    amount: z.coerce.bigint().positive(),
  })
  .strict();

export type ReserveFundsRequest = z.infer<typeof ReserveFundsRequestSchema>;

export async function reserveFunds(
  registry: SentryRegistryClient,
  requestUnknown: unknown,
): Promise<Result<CreateTaskEscrowInput>> {
  return safeAsync("core.skills.escrow.reserveFunds", async () => {
    const reqRes = parseWithSchema(
      ReserveFundsRequestSchema,
      requestUnknown,
      "core.skills.escrow.reserveFunds.request",
    );
    if (!reqRes.ok) return reqRes;

    const taskHashRes = hashTaskId(reqRes.value.taskId);
    if (!taskHashRes.ok) return taskHashRes as Result<CreateTaskEscrowInput>;

    const txRes = await registry.reserveFunds({
      userIdHash: reqRes.value.userIdHash as UserIdHash,
      taskIdHash: taskHashRes.value,
      token: reqRes.value.token,
      amount: reqRes.value.amount,
    });
    if (!txRes.ok) return txRes;

    return ok(txRes.value);
  });
}

export const ReleaseFundsRequestSchema = z
  .object({
    userIdHash: z.string().min(66).max(66),
    taskId: z.string().min(1).max(128),
  })
  .strict();

export type ReleaseFundsRequest = z.infer<typeof ReleaseFundsRequestSchema>;

export async function releaseFunds(
  registry: SentryRegistryClient,
  requestUnknown: unknown,
): Promise<Result<CreateTaskEscrowInput>> {
  return safeAsync("core.skills.escrow.releaseFunds", async () => {
    const reqRes = parseWithSchema(
      ReleaseFundsRequestSchema,
      requestUnknown,
      "core.skills.escrow.releaseFunds.request",
    );
    if (!reqRes.ok) return reqRes;

    const taskHashRes = hashTaskId(reqRes.value.taskId);
    if (!taskHashRes.ok) return taskHashRes as Result<CreateTaskEscrowInput>;

    // Release the reservation (returns void)
    const txRes = await registry.releaseReservation({
      userIdHash: reqRes.value.userIdHash as UserIdHash,
      taskIdHash: taskHashRes.value,
    });
    if (!txRes.ok) return txRes;

    // Fetch the updated escrow to return
    const escrowRepo = getTaskEscrowRepository();
    const escrowRes = await escrowRepo.findByTaskId(taskHashRes.value);
    if (!escrowRes.ok) return escrowRes as Result<CreateTaskEscrowInput>;
    if (!escrowRes.value) {
      return err(
        new AppError({
          code: "NOT_FOUND",
          message: "Task escrow not found after release",
          context: "core.skills.escrow.releaseFunds",
        }),
      );
    }

    return ok(escrowRes.value);
  });
}
