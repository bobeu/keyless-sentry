export const Personality = Object.freeze({
  GUARDIAN: "GUARDIAN",
  ACCOUNTANT: "ACCOUNTANT",
  STRATEGIST: "STRATEGIST",
} as const);

export type Personality = (typeof Personality)[keyof typeof Personality];

