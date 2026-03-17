import dotenv from "dotenv";
import { AppError, err, ok, safeAsync, safeSync, type Result } from "@keyless-sentry/core";
import { SentryOrchestrator } from "@keyless-sentry/core";
import { handleTelegramMessage } from "./router";

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

async function main(): Promise<Result<void>> {
  return safeAsync("gateway.index.main", async () => {
    const dotenvRes = safeSync("gateway.dotenv.config", () => {
      dotenv.config();
      return ok(true);
    });
    if (!dotenvRes.ok) return dotenvRes;

    const orchRes = await SentryOrchestrator.createFromEnv();
    if (!orchRes.ok) return orchRes;

    const linesRes = await readLines();
    if (!linesRes.ok) return linesRes;

    const ctx = { orchestrator: orchRes.value } as const;

    for await (const line of linesRes.value) {
      const handled = await handleTelegramMessage(ctx, { text: line });
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

