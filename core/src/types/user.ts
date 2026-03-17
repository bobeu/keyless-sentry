import { z } from "zod";
import { isAddress, type Address } from "viem";
import { Personality } from "../personality";

export const ExternalUserIdSchema = z
  .object({
    platform: z.enum(["telegram", "whatsapp"]),
    id: z.string().min(1).max(128),
  })
  .strict();

export type ExternalUserId = z.infer<typeof ExternalUserIdSchema>;

export const PersonalitySchema = z.enum([
  Personality.GUARDIAN,
  Personality.ACCOUNTANT,
  Personality.STRATEGIST,
]);

export type PersonalityValue = z.infer<typeof PersonalitySchema>;

export const UserProfileSchema = z
  .object({
    owner: z
      .string()
      .refine((v) => isAddress(v), { message: "owner must be an address" })
      .transform((v) => v as Address),
    wallet: z
      .string()
      .refine((v) => isAddress(v), { message: "wallet must be an address" })
      .transform((v) => v as Address),
    personality: PersonalitySchema,
  })
  .strict();

export type UserProfile = z.infer<typeof UserProfileSchema>;

