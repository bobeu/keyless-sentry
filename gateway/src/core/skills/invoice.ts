import { z } from "zod";
import { isAddress, isHex, keccak256, stringToHex, type Address, type Hex } from "viem";
import { AppError } from "../errors";
import { err, ok, type Result } from "../result";
import { parseWithSchema, safeAsync, safeSync } from "../validation";
import { signSentrySeal } from "./seal";

export const InvoiceRequestSchema = z
  .object({
    payTo: z
      .string()
      .refine((v) => isAddress(v), { message: "payTo must be an address" })
      .transform((v) => v as Address),
    memo: z.string().min(1).max(256).optional(),
    sender: z
      .object({
        platform: z.enum(["telegram", "whatsapp"]),
        id: z.string().min(1).max(128),
      })
      .strict(),
  })
  .strict();

export type InvoiceRequest = z.infer<typeof InvoiceRequestSchema>;

export const InvoiceBlobSchema = z
  .object({
    payTo: z
      .string()
      .refine((v) => isAddress(v), { message: "payTo must be an address" })
      .transform((v) => v as Address),
    memoId: z
      .string()
      .refine((v) => isHex(v), { message: "memoId must be hex" })
      .transform((v) => v as Hex),
    memo: z.string().optional(),
    timestamp: z.number().int().positive(),
  })
  .strict();

export type InvoiceBlob = z.infer<typeof InvoiceBlobSchema>;

export async function generateInvoice(requestUnknown: unknown): Promise<Result<{ invoice: InvoiceBlob; sentrySeal: { signature: Hex } }>> {
  return safeAsync("core.skills.invoice.generateInvoice", async () => {
    const reqRes = parseWithSchema(InvoiceRequestSchema, requestUnknown, "core.skills.invoice.request");
    if (!reqRes.ok) return reqRes as Result<{ invoice: InvoiceBlob; sentrySeal: { signature: Hex } }>;

    const timestamp = Date.now();
    const memoId = safeSync("core.skills.invoice.memoId", () => {
      const canonical = JSON.stringify({
        payTo: reqRes.value.payTo,
        memo: reqRes.value.memo ?? "",
        sender: reqRes.value.sender,
        timestamp,
      });
      return ok(keccak256(stringToHex(canonical)));
    });
    if (!memoId.ok) return memoId as Result<{ invoice: InvoiceBlob; sentrySeal: { signature: Hex } }>;

    const invoice: InvoiceBlob = {
      payTo: reqRes.value.payTo,
      memoId: memoId.value,
      memo: reqRes.value.memo,
      timestamp,
    };

    const sealRes = await signSentrySeal({
      txHash: memoId.value, // for invoices, txHash field carries memo hash for integrity
      sender: reqRes.value.sender,
      timestamp,
      sentryId: process.env.SENTRY_ID ?? "sentry",
    });
    if (!sealRes.ok) {
      return err(
        new AppError({
          code: "INTERNAL_ERROR",
          message: "Failed to sign invoice metadata",
          context: "core.skills.invoice.seal",
        }),
      );
    }

    return ok({ invoice, sentrySeal: { signature: sealRes.value.signature } });
  });
}

