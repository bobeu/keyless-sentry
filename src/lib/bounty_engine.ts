/**
 * Bounty Engine - Core Logic
 * 
 * Manages bounty lifecycle with PostgreSQL storage and Keyless SDK integration.
 * Each bounty gets a unique escrow address generated via Keyless Collective SDK.
 * 
 * MVP Version - Uses in-memory store with mock Keyless SDK integration.
 * In production, replace with Prisma + @keyless-collective/sdk
 */

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

/**
 * Simple result type for error handling
 */
export type Result<T> = 
  | { ok: true; value: T }
  | { ok: false; error: Error };

/**
 * BountyStore - In-memory store (replace with PostgreSQL in production)
 */
export class BountyStore {
  private bounties: Map<string, Bounty> = new Map();

  /**
   * Create a new bounty with Keyless escrow address
   */
  async createBounty(params: CreateBountyParams): Promise<Result<Bounty>> {
    try {
      const id = this.generateId();
      const escrowAddress = keylessSDK.createEscrow(params.creatorAddress, id);
      
      const bounty: Bounty = {
        id,
        creatorAddress: params.creatorAddress,
        amount: params.amount,
        status: "OPEN",
        proofCriteria: params.proofCriteria,
        escrowAddress,
        title: params.title,
        description: params.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.bounties.set(id, bounty);
      return { ok: true, value: bounty };
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
      const openBounties = Array.from(this.bounties.values())
        .filter(b => b.status === "OPEN")
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      return { ok: true, value: openBounties };
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
      const allBounties = Array.from(this.bounties.values())
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      return { ok: true, value: allBounties };
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
      const bounty = this.bounties.get(bountyId) || null;
      return { ok: true, value: bounty };
    } catch (error) {
      return { 
        ok: false, 
        error: error instanceof Error ? error : new Error("Failed to get bounty") 
      };
    }
  }

  /**
   * Submit proof for a bounty (hunter claims it)
   */
  async submitProof(params: SubmitProofParams): Promise<Result<Bounty>> {
    try {
      const bounty = this.bounties.get(params.bountyId);
      
      if (!bounty) {
        return { ok: false, error: new Error("Bounty not found") };
      }

      if (bounty.status !== "OPEN") {
        return { ok: false, error: new Error("Bounty is not open for submissions") };
      }

      const updatedBounty: Bounty = {
        ...bounty,
        hunterAddress: params.hunterAddress,
        proofUrl: params.proofUrl,
        status: "LOCKED",
        updatedAt: new Date(),
      };

      this.bounties.set(params.bountyId, updatedBounty);
      return { ok: true, value: updatedBounty };
    } catch (error) {
      return { 
        ok: false, 
        error: error instanceof Error ? error : new Error("Failed to submit proof") 
      };
    }
  }

  /**
   * Release bounty funds to hunter (after verification)
   */
  async releaseBounty(bountyId: string): Promise<Result<Bounty>> {
    try {
      const bounty = this.bounties.get(bountyId);
      
      if (!bounty) {
        return { ok: false, error: new Error("Bounty not found") };
      }

      const updatedBounty: Bounty = {
        ...bounty,
        status: "RELEASED",
        updatedAt: new Date(),
      };

      this.bounties.set(bountyId, updatedBounty);
      return { ok: true, value: updatedBounty };
    } catch (error) {
      return { 
        ok: false, 
        error: error instanceof Error ? error : new Error("Failed to release bounty") 
      };
    }
  }

  /**
   * Cancel a bounty (return funds to creator)
   */
  async cancelBounty(bountyId: string): Promise<Result<Bounty>> {
    try {
      const bounty = this.bounties.get(bountyId);
      
      if (!bounty) {
        return { ok: false, error: new Error("Bounty not found") };
      }

      const updatedBounty: Bounty = {
        ...bounty,
        status: "CANCELLED",
        updatedAt: new Date(),
      };

      this.bounties.set(bountyId, updatedBounty);
      return { ok: true, value: updatedBounty };
    } catch (error) {
      return { 
        ok: false, 
        error: error instanceof Error ? error : new Error("Failed to cancel bounty") 
      };
    }
  }

  /**
   * Get escrow balance for a bounty
   */
  async getEscrowBalance(escrowAddress: string): Promise<Result<string>> {
    // In production, query the blockchain
    return { ok: true, value: "1000000000000000000" };
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return "bounty_" + Math.random().toString(36).substring(2, 15);
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
 * Keyless SDK Mock
 * Replace with @keyless-collective/sdk in production
 */
export const keylessSDK = {
  /**
   * Create an escrow wallet for a bounty
   */
  createEscrow(creatorAddress: string, bountyId: string): string {
    // Deterministic address from creator + bounty
    const input = `${creatorAddress}:${bountyId}:${Date.now()}`;
    const hash = simpleHash(input);
    return "0x" + hash.slice(0, 40);
  },

  /**
   * Release funds from escrow to hunter
   */
  async release(escrowAddress: string, hunterAddress: string, amount: string): Promise<string> {
    // In production: Use Keyless SDK to sign and execute transfer
    // Mock transaction hash
    return "0x" + "a".repeat(64);
  },

  /**
   * Get escrow wallet balance
   */
  async getBalance(escrowAddress: string): Promise<string> {
    // In production: Query chain for balance
    return "1000000000000000000";
  },
};

/**
 * Simple hash function for address generation
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
