import type { Address, Hex } from "viem";

export type KeylessConfig = Readonly<{
  baseUrl: string;
  chainId: number;
  owner: Address;
}>;

export type AuthResponse = Readonly<{
  signature: Hex;
  owner: Address;
  salt?: string;
}>;

export type CreateWalletRequest = Readonly<{
  owner: Address;
  salt?: string;
}>;

export type CreateWalletReturn = Readonly<{
  createWalletResponse: CreateWalletRequest;
  authResponse: AuthResponse;
}>;

export type HealthCheckResponse = Readonly<{
  status: string;
  timestamp: number;
  signers: ReadonlyArray<
    Readonly<{
      url: string;
      online: boolean;
      type?: string;
    }>
  >;
  allSignersOnline?: boolean;
}>;

export type KeylessClientLike = Readonly<{
  healthCheck: () => Promise<HealthCheckResponse>;
  getSupportedChainIds: () => number[];
  createWallet: (
    walletClient: unknown,
    walletRequest: CreateWalletRequest,
    authorization?: unknown,
  ) => Promise<CreateWalletReturn>;
}>;

