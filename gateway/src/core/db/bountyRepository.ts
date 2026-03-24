import { getPrismaClient } from "./client";
import { type PrismaClient } from "../../generated/client";
import { err, ok, type Result } from "../result";
import { AppError } from "../errors";

export class BountyRepository {
  private prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || getPrismaClient();
  }

  /**
   * Create a new bounty
   */
  async create(data: {
    title: string;
    description: string;
    rewardAmount: string;
    hunterAddress?: string;
    creatorHashId: string;
    escrowAddress?: string;
    expiresAt?: Date;
  }): Promise<Result<{
    id: string;
    title: string;
    status: string;
    escrowAddress?: string;
  }>> {
    try {
      const bounty = await this.prisma.bounty.create({
        data: {
          title: data.title,
          description: data.description,
          rewardAmount: data.rewardAmount,
          hunterAddress: data.hunterAddress,
          creatorHashId: data.creatorHashId,
          escrowAddress: data.escrowAddress,
          status: data.escrowAddress ? "ESCROWED" : "OPEN",
          expiresAt: data.expiresAt,
        },
        select: {
          id: true,
          title: true,
          status: true,
          escrowAddress: true,
        },
      });

      return ok({
        id: bounty.id,
        title: bounty.title,
        status: bounty.status,
        escrowAddress: bounty.escrowAddress ?? undefined,
      });
    } catch (error) {
      return err(new AppError({
        code: "BOUNTY_CREATE_FAILED",
        message: error instanceof Error ? error.message : "Failed to create bounty",
        context: "core.db.bounty.create",
      }));
    }
  }

  /**
   * Get all active bounties
   */
  async getActive(params?: {
    status?: string;
    hunterAddress?: string;
    creatorHashId?: string;
  }): Promise<Result<Array<{
    id: string;
    title: string;
    description: string;
    rewardAmount: string;
    currency: string;
    status: string;
    hunterAddress?: string;
    creatorHashId: string;
    escrowAddress?: string;
    createdAt: string;
    expiresAt?: string;
  }>>> {
    try {
      const where: any = {};

      // If status is provided, filter by that status
      if (params?.status) {
        where.status = params.status;
      } else {
        // Default: return OPEN and ESCROWED bounties
        where.status = { in: ["OPEN", "ESCROWED"] };
      }

      if (params?.hunterAddress) {
        where.hunterAddress = params.hunterAddress;
      }

      if (params?.creatorHashId) {
        where.creatorHashId = params.creatorHashId;
      }

      const bounties = await this.prisma.bounty.findMany({
        where,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          description: true,
          rewardAmount: true,
          currency: true,
          status: true,
          hunterAddress: true,
          creatorHashId: true,
          escrowAddress: true,
          createdAt: true,
          expiresAt: true,
        },
      });

      return ok(bounties.map(b => ({
        id: b.id,
        title: b.title,
        description: b.description,
        rewardAmount: b.rewardAmount,
        currency: b.currency,
        status: b.status,
        hunterAddress: b.hunterAddress ?? undefined,
        creatorHashId: b.creatorHashId,
        escrowAddress: b.escrowAddress ?? undefined,
        createdAt: b.createdAt.toISOString(),
        expiresAt: b.expiresAt?.toISOString() ?? undefined,
      })));
    } catch (error) {
      return err(new AppError({
        code: "BOUNTY_GET_ACTIVE_FAILED",
        message: error instanceof Error ? error.message : "Failed to get active bounties",
        context: "core.db.bounty.getActive",
      }));
    }
  }

  /**
   * Get a bounty by ID
   */
  async getById(bountyId: string): Promise<Result<{
    id: string;
    title: string;
    description: string;
    rewardAmount: string;
    status: string;
    hunterAddress?: string;
    creatorHashId: string;
    proofUrl?: string;
    escrowAddress?: string;
    createdAt: string;
    expiresAt?: string;
  } | null>> {
    try {
      const bounty = await this.prisma.bounty.findUnique({
        where: { id: bountyId },
        select: {
          id: true,
          title: true,
          description: true,
          rewardAmount: true,
          status: true,
          hunterAddress: true,
          creatorHashId: true,
          proofUrl: true,
          escrowAddress: true,
          createdAt: true,
          expiresAt: true,
        },
      });

      if (!bounty) {
        return ok(null);
      }

      return ok({
        id: bounty.id,
        title: bounty.title,
        description: bounty.description,
        rewardAmount: bounty.rewardAmount,
        status: bounty.status,
        hunterAddress: bounty.hunterAddress ?? undefined,
        creatorHashId: bounty.creatorHashId,
        proofUrl: bounty.proofUrl ?? undefined,
        escrowAddress: bounty.escrowAddress ?? undefined,
        createdAt: bounty.createdAt.toISOString(),
        expiresAt: bounty.expiresAt?.toISOString() ?? undefined,
      });
    } catch (error) {
      return err(new AppError({
        code: "BOUNTY_GET_BY_ID_FAILED",
        message: error instanceof Error ? error.message : "Failed to get bounty",
        context: "core.db.bounty.getById",
      }));
    }
  }

  /**
   * Update bounty status
   */
  async updateStatus(bountyId: string, status: string): Promise<Result<{
    id: string;
    status: string;
  }>> {
    try {
      const bounty = await this.prisma.bounty.update({
        where: { id: bountyId },
        data: { status: status as any },
        select: {
          id: true,
          status: true,
        },
      });

      return ok({
        id: bounty.id,
        status: bounty.status,
      });
    } catch (error) {
      return err(new AppError({
        code: "BOUNTY_UPDATE_STATUS_FAILED",
        message: error instanceof Error ? error.message : "Failed to update bounty status",
        context: "core.db.bounty.updateStatus",
      }));
    }
  }

  /**
   * Submit proof for a bounty
   */
  async submitProof(bountyId: string, proofUrl: string): Promise<Result<{
    id: string;
    status: string;
    proofUrl: string;
  }>> {
    try {
      const bounty = await this.prisma.bounty.update({
        where: { id: bountyId },
        data: {
          proofUrl,
          status: "ESCROWED", // Pending verification
        },
        select: {
          id: true,
          status: true,
          proofUrl: true,
        },
      });

      return ok({
        id: bounty.id,
        status: bounty.status,
        proofUrl: bounty.proofUrl ?? "",
      });
    } catch (error) {
      return err(new AppError({
        code: "BOUNTY_SUBMIT_PROOF_FAILED",
        message: error instanceof Error ? error.message : "Failed to submit proof",
        context: "core.db.bounty.submitProof",
      }));
    }
  }

  /**
   * Release or cancel a bounty
   */
  async release(bountyId: string, approved: boolean): Promise<Result<{
    id: string;
    status: string;
  }>> {
    try {
      const bounty = await this.prisma.bounty.update({
        where: { id: bountyId },
        data: {
          status: approved ? "RELEASED" : "CANCELLED",
        },
        select: {
          id: true,
          status: true,
        },
      });

      return ok({
        id: bounty.id,
        status: bounty.status,
      });
    } catch (error) {
      return err(new AppError({
        code: "BOUNTY_RELEASE_FAILED",
        message: error instanceof Error ? error.message : "Failed to release bounty",
        context: "core.db.bounty.release",
      }));
    }
  }
}

// Singleton instance
let bountyRepository: BountyRepository | null = null;

export function getBountyRepository(): BountyRepository {
  if (!bountyRepository) {
    bountyRepository = new BountyRepository();
  }
  return bountyRepository;
}
