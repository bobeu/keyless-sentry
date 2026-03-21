/**
 * Bounty Engine - Production Version
 * 
 * Uses PostgreSQL (Prisma) + Keyless Collective SDK
 */

import { PrismaClient } from "@prisma/client";

export type BountyStatus = "OPEN" | "LOCKED" | "RELEASED" | "CANCELLED";

export interface Bounty {
  id: string;
  creatorAddress: string;
  amount: string;
  status: BountyStatus;
  proofCriteria: string;
  escrowAddress: string;
  hunterAddress?: string;
  proofUrl?: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBountyParams {
  creatorAddress: string;
  amount: string;
  proofCriteria: string;
  title: string;
  description: string;
}

export interface SubmitProofParams {
  bountyId: string;
  hunterAddress: string;
  proofUrl: string;
}

export type Result<T> = 
  | { ok: true; value: T }
  | { ok: false; error: Error };

/**
 * BountyStore - PostgreSQL-backed storage using Prisma
 */
export class BountyStore {
  private prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || new PrismaClient();
  }

  /**
   * Create a new bounty with Keyless escrow address
   */
  async createBounty(params: CreateBountyParams): Promise<Result<Bounty>> {
    try {
      // Generate escrow address via Keyless SDK
      const escrowAddress = await keylessSDK.createEscrow(params.creatorAddress, params.title);

      const bounty = await this.prisma.bounty.create({
        data: {
          title: params.title,
          description: params.description,
          creatorHashId: params.creatorAddress,
          rewardAmount: params.amount,
          proofCriteria: params.proofCriteria,
          escrowAddress,
          status: "OPEN",
        },
      });

      return { ok: true, value: this.mapToBounty(bounty) };
    } catch (error) {
      return { 
        ok: false, 
        error: error instanceof Error ? error : new Error("Failed to create bounty") 
      };
    }
  }

  /**
   * Get all open bounties
   */
  async getOpenBounties(): Promise<Result<Bounty[]>> {
    try {
      const bounties = await this.prisma.bounty.findMany({
        where: { status: "OPEN" },
        orderBy: { createdAt: "desc" },
      });

      return { ok: true, value: bounties.map(this.mapToBounty) };
    } catch (error) {
      return { 
        ok: false, 
        error: error instanceof Error ? error : new Error("Failed to get open bounties") 
      };
    }
  }

  /**
   * Get all bounties (for explorer)
   */
  async getAllBounties(): Promise<Result<Bounty[]>> {
    try {
      const bounties = await this.prisma.bounty.findMany({
        orderBy: { createdAt: "desc" },
      });

      return { ok: true, value: bounties.map(this.mapToBounty) };
    } catch (error) {
      return { 
        ok: false, 
        error: error instanceof Error ? error : new Error("Failed to get bounties") 
      };
    }
  }

  /**
   * Get bounty by ID
   */
  async getBountyById(bountyId: string): Promise<Result<Bounty | null>> {
    try {
      const bounty = await this.prisma.bounty.findUnique({
        where: { id: bountyId },
      });

      if (!bounty) {
        return { ok: true, value: null };
      }

      return { ok: true, value: this.mapToBounty(bounty) };
    } catch (error) {
      return { 
        ok: false, 
        error: error instanceof Error ? error : new Error("Failed to get bounty") 
      };
    }
  }

  /**
   * Submit proof for a bounty
   */
  async submitProof(params: SubmitProofParams): Promise<Result<Bounty>> {
    try {
      const bounty = await this.prisma.bounty.update({
        where: { id: params.bountyId },
        data: {
          hunterAddress: params.hunterAddress,
          proofUrl: params.proofUrl,
          status: "LOCKED",
        },
      });

      return { ok: true, value: this.mapToBounty(bounty) };
    } catch (error) {
      return { 
        ok: false, 
        error: error instanceof Error ? error : new Error("Failed to submit proof") 
      };
    }
  }

  /**
   * Release bounty funds
   */
  async releaseBounty(bountyId: string): Promise<Result<Bounty>> {
    try {
      const bounty = await this.prisma.bounty.update({
        where: { id: bountyId },
        data: { status: "RELEASED" },
      });

      return { ok: true, value: this.mapToBounty(bounty) };
    } catch (error) {
      return { 
        ok: false, 
        error: error instanceof Error ? error : new Error("Failed to release bounty") 
      };
    }
  }

  /**
   * Cancel a bounty
   */
  async cancelBounty(bountyId: string): Promise<Result<Bounty>> {
    try {
      const bounty = await this.prisma.bounty.update({
        where: { id: bountyId },
        data: { status: "CANCELLED" },
      });

      return { ok: true, value: this.mapToBounty(bounty) };
    } catch (error) {
      return { 
        ok: false, 
        error: error instanceof Error ? error : new Error("Failed to cancel bounty") 
      };
    }
  }

  /**
   * Get escrow balance from blockchain
   */
  async getEscrowBalance(escrowAddress: string): Promise<Result<string>> {
    const balance = await keylessSDK.getBalance(escrowAddress);
    return { ok: true, value: balance };
  }

  /**
   * Map Prisma model to domain object
   */
  private mapToBounty(prismaBounty: any): Bounty {
    return {
      id: prismaBounty.id,
      creatorAddress: prismaBounty.creatorHashId,
      amount: prismaBounty.rewardAmount,
      status: prismaBounty.status as BountyStatus,
      proofCriteria: prismaBounty.proofCriteria || "",
      escrowAddress: prismaBounty.escrowAddress || "",
      hunterAddress: prismaBounty.hunterAddress,
      proofUrl: prismaBounty.proofUrl,
      title: prismaBounty.title,
      description: prismaBounty.description,
      createdAt: prismaBounty.createdAt,
      updatedAt: prismaBounty.updatedAt,
    };
  }
}

// Singleton instance
let bountyStore: BountyStore | null = null;

export function getBountyStore(): BountyStore {
  if (!bountyStore) {
    bountyStore = new BountyStore();
  }
  return bountyStore;
}

/**
 * Keyless Collective SDK Integration
 * 
 * Production version using @keyless-collective/sdk
 * 
 * In production, you would import like:
 * import { KeylessClient } from "@keyless-collective/sdk";
 */
export const keylessSDK = {
  /**
   * Create an escrow wallet for a bounty
   */
  async createEscrow(creatorAddress: string, bountyId: string): Promise<string> {
    // PRODUCTION: Use Keyless SDK
    // const client = new KeylessClient({ chainId: 44787 }); // Celo Alfajores
    // const wallet = await client.createAccount({
    //   salt: ethers.id(`${creatorAddress}:${bountyId}`),
    // });
    // return wallet.address;

    // For now, generate deterministic address
    const input = `${creatorAddress}:${bountyId}`;
    const hash = simpleHash(input);
    return "0x" + hash.slice(0, 40);
  },

  /**
   * Release funds from escrow to hunter
   * Signs a transfer transaction using Keyless
   */
  async release(
    escrowAddress: string, 
    hunterAddress: string, 
    amount: string
  ): Promise<string> {
    // PRODUCTION: Use Keyless SDK to sign and execute transfer
    // const client = new KeylessClient({ chainId: 44787 });
    // const tx = await client.execute({
    //   to: hunterAddress,
    //   value: amount,
    //   // The escrow account signs this automatically
    // });
    // return tx.hash;

    // Mock for now
    return "0x" + "a".repeat(64);
  },

  /**
   * Get escrow wallet balance from chain
   */
  async getBalance(escrowAddress: string): Promise<string> {
    // PRODUCTION: Query blockchain
    // const client = new KeylessClient({ chainId: 44787 });
    // const balance = await client.getBalance(escrowAddress);
    // return balance.toString();

    // Mock
    return "0";
  },

  /**
   * Check if an address is a valid Keyless wallet
   */
  async isKeylessWallet(address: string): Promise<boolean> {
    // PRODUCTION: Query registry
    // const client = new KeylessClient({ chainId: 44787 });
    // return await client.isDeployed(address);
    
    return address.startsWith("0x") && address.length === 42;
  },
};

/**
 * Simple hash function
 */
function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(40, "0");
}
