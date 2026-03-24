import { z } from "zod";
import { AppError } from "../errors";
import { err, ok, type Result } from "../result";
import { parseWithSchema, safeAsync } from "../validation";

const DiscoverSchema = z
  .object({
    skillPath: z.string().min(1),
  })
  .strict();

export class SkillDiscoveryService {
  async loadSkill(skillPathUnknown: unknown): Promise<Result<string>> {
    return safeAsync("core.reasoning.skillDiscovery.loadSkill", async () => {
      const parsed = parseWithSchema(DiscoverSchema, skillPathUnknown, "core.reasoning.skillDiscovery.input");
      if (!parsed.ok) return parsed;

      try {
        const text = await Bun.file(parsed.value.skillPath).text();
        if (text.trim().length === 0) {
          return err(
            new AppError({
              code: "INTERNAL_ERROR",
              message: "Skill file is empty",
              context: "core.reasoning.skillDiscovery.loadSkill",
              details: { skillPath: parsed.value.skillPath },
            }),
          );
        }
        return ok(text);
      } catch (causeUnknown) {
        return err(
          new AppError({
            code: "INTERNAL_ERROR",
            message: "Failed to load skill file",
            context: "core.reasoning.skillDiscovery.loadSkill",
            details: { skillPath: parsed.value.skillPath },
            causeUnknown,
          }),
        );
      }
    });
  }
}

