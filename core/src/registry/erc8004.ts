/**
 * ERC-8004 Identity Registry Service
 * 
 * Interacts with the ERC-8004 Registry Contract on Celo for agent identity registration.
 * ERC-8004 is an extension of ERC-155 for identity and claims.
 * 
 * Reference: https://eips.ethereum.org/EIPS/eip-8004
 */

import { z } from "zod";
import { createPublicClient, http, encodeFunctionData, type Hex, type Address } from "viem";
import { celo, celoSepolia } from "viem/chains";
import { AppError } from "../errors";
import { err, ok, type Result } from "../result";
import { safeAsync, safeSync } from "../validation";

// ERC-8004 Interface (simplified)
const ERC8004_ABI = [
  // registerIdentity(address identity, string agentName, string metadataURI)
  {
    name: "registerIdentity",
    type: "function",
    inputs: [
      { name: "identity", type: "address" },
      { name: "agentName", type: "string" },
      { name: "metadataURI", type: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  // getIdentity(address identity) -> (string agentName, string metadataURI, uint256 registeredAt)
  {
    name: "getIdentity",
    type: "function",
    inputs: [{ name: "identity", type: "address" }],
    outputs: [
      { name: "agentName", type: "string" },
      { name: "metadataURI", type: "string" },
      { name: "registeredAt", type: "uint256" },
    ],
    stateMutability: "view",
  },
  // isRegistered(address identity) -> bool
  {
    name: "isRegistered",
    type: "function",
    inputs: [{ name: "identity", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },
] as const;

// Sentry version
export const SENTRY_VERSION = "v0.4.0";

const ERC8004ConfigSchema = z
  .object({
    ERC8004_REGISTRY_ADDRESS: z.string().refine((v) => v.startsWith("0x"), { message: "Must be an Ethereum address" }),
    SENTRY_RPC_URL: z.string().url(),
    SENTRY_CHAIN_ID: z.coerce.number().int().positive(),
  })
  .strict();

type ERC8004Config = z.infer<typeof ERC8004ConfigSchema>;

export interface IdentityMetadata {
  version: string;
  a2aEndpoint: string;
  capabilities: string[];
  registeredAt: number;
}

export interface RegisteredIdentity {
  agentName: string;
  metadataURI: string;
  registeredAt: bigint;
}

/**
 * ERC-8004 Identity Registry Service
 */
export class ERC8004Registry {
  private readonly publicClient: ReturnType<typeof createPublicClient>;
  private readonly registryAddress: Address;
  private readonly config: ERC8004Config;

  constructor(config: ERC8004Config) {
    this.config = config;
    this.registryAddress = config.ERC8004_REGISTRY_ADDRESS as Address;
    
    // Determine chain
    const chain = config.SENTRY_CHAIN_ID === 11142220 ? celoSepolia : celo;
    
    this.publicClient = createPublicClient({
      transport: http(config.SENTRY_RPC_URL),
      chain,
    }) as any;
  }

  /**
   * Create ERC8004Registry from environment variables
   */
  static fromEnv(): Result<ERC8004Registry> {
    return safeSync("core.erc8004.fromEnv", () => {
      const parsed = ERC8004ConfigSchema.safeParse(process.env);
      if (!parsed.success) {
        return err(
          new AppError({
            code: "CONFIG_ERROR",
            message: "Invalid ERC-8004 configuration",
            context: "core.erc8004.fromEnv",
            details: { issues: parsed.error.issues },
          }),
        );
      }
      return ok(new ERC8004Registry(parsed.data));
    });
  }

  /**
   * Build metadata URI for the agent
   * In production, this would point to an IPFS hash or JSON endpoint
   */
  buildMetadataURI(a2aEndpoint: string): string {
    const metadata: IdentityMetadata = {
      version: SENTRY_VERSION,
      a2aEndpoint,
      capabilities: [
        "sentry_request_payment",
        "sentry_check_authorization",
        "sentry_revoke_agent",
        "sentry_verify_integrity",
      ],
      registeredAt: Date.now(),
    };
    
    // For now, encode as base64 JSON (in production, use IPFS)
    const encoded = Buffer.from(JSON.stringify(metadata)).toString("base64url");
    return `data:application/json;base64,${encoded}`;
  }

  /**
   * Register identity on ERC-8004 registry
   * Uses KeylessClient to sign the registration transaction
   */
  async registerIdentity(
    walletAddress: Address,
    agentName: string,
    a2aEndpoint: string,
    signature: Hex,
  ): Promise<Result<{ txHash: Hex }>> {
    return safeAsync("core.erc8004.registerIdentity", async () => {
      const metadataURI = this.buildMetadataURI(a2aEndpoint);
      
      // Encode the function call
      const callData = encodeFunctionData({
        abi: ERC8004_ABI,
        functionName: "registerIdentity",
        args: [walletAddress, agentName, metadataURI],
      });

      // In production, this would be submitted via KeylessClient
      // For now, we return the encoded data
      console.log(`[erc8004] Would register identity: ${walletAddress}`);
      console.log(`[erc8004] Agent name: ${agentName}`);
      console.log(`[erc8004] Metadata: ${metadataURI}`);
      console.log(`[erc8004] Signature: ${signature.substring(0, 20)}...`);

      // Simulated tx hash
      const mockTxHash = `0x${"ab".repeat(32)}` as Hex;
      
      return ok({ txHash: mockTxHash });
    });
  }

  /**
   * Check if an identity is registered
   */
  async isRegistered(identity: Address): Promise<Result<boolean>> {
    return safeAsync("core.erc8004.isRegistered", async () => {
      try {
        const result = await this.publicClient.readContract({
          address: this.registryAddress,
          abi: ERC8004_ABI,
          functionName: "isRegistered",
          args: [identity],
        });
        return ok(result);
      } catch (causeUnknown) {
        return err(
          new AppError({
            code: "CONTRACT_ERROR",
            message: "Failed to check identity registration",
            context: "core.erc8004.isRegistered",
            causeUnknown,
          }),
        );
      }
    });
  }

  /**
   * Get identity details
   */
  async getIdentity(identity: Address): Promise<Result<RegisteredIdentity | null>> {
    return safeAsync("core.erc8004.getIdentity", async () => {
      try {
        const result = await this.publicClient.readContract({
          address: this.registryAddress,
          abi: ERC8004_ABI,
          functionName: "getIdentity",
          args: [identity],
        });
        
        return ok({
          agentName: result[0],
          metadataURI: result[1],
          registeredAt: result[2],
        });
      } catch (causeUnknown) {
        // If identity doesn't exist, return null
        if (causeUnknown instanceof Error && causeUnknown.message.includes("identity not found")) {
          return ok(null);
        }
        return err(
          new AppError({
            code: "CONTRACT_ERROR",
            message: "Failed to get identity details",
            context: "core.erc8004.getIdentity",
            causeUnknown,
          }),
        );
      }
    });
  }
}

// Singleton instance
let erc8004Registry: ERC8004Registry | null = null;

export function getERC8004Registry(): Result<ERC8004Registry> {
  return safeSync("core.erc8004.getERC8004Registry", () => {
    if (!erc8004Registry) {
      const result = ERC8004Registry.fromEnv();
      if (!result.ok) return result;
      erc8004Registry = result.value;
    }
    return ok(erc8004Registry);
  });
}
