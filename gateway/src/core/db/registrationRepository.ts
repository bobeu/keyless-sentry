import { getPrismaClient } from "./client";
import { type PrismaClient } from "../../generated/client";
import { err, ok, type Result } from "../result";
import { AppError } from "../errors";

export class RegistrationRepository {
  private prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || getPrismaClient();
  }

  /**
   * Create a new registration for a bounty
   */
  async create(data: {
    bountyId: string;
    hunterAddress: string;
  }): Promise<Result<{
    id: string;
    bountyId: string;
    hunterAddress: string;
    status: string;
  }>> {
    try {
      const registration = await this.prisma.registration.create({
        data: {
          bountyId: data.bountyId,
          hunterAddress: data.hunterAddress,
          status: "PENDING",
        },
        select: {
          id: true,
          bountyId: true,
          hunterAddress: true,
          status: true,
        },
      });

      return ok({
        id: registration.id,
        bountyId: registration.bountyId,
        hunterAddress: registration.hunterAddress,
        status: registration.status,
      });
    } catch (error) {
      return err(
        new AppError({
          code: "REGISTRATION_ERROR",
          message: `Failed to create registration: ${error instanceof Error ? error.message : "Unknown error"}`,
          context: "RegistrationRepository.create",
        }),
      );
    }
  }

  /**
   * Get registrations by bounty ID
   */
  async getByBountyId(bountyId: string): Promise<Result<Array<{
    id: string;
    bountyId: string;
    hunterAddress: string;
    status: string;
    proofUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  }>>> {
    try {
      const registrations = await this.prisma.registration.findMany({
        where: { bountyId },
        select: {
          id: true,
          bountyId: true,
          hunterAddress: true,
          status: true,
          proofUrl: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return ok(registrations.map(r => ({
        id: r.id,
        bountyId: r.bountyId,
        hunterAddress: r.hunterAddress,
        status: r.status,
        proofUrl: r.proofUrl ?? undefined,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      })));
    } catch (error) {
      return err(
        new AppError({
          code: "REGISTRATION_ERROR",
          message: `Failed to get registrations: ${error instanceof Error ? error.message : "Unknown error"}`,
          context: "RegistrationRepository.getByBountyId",
        }),
      );
    }
  }

  /**
   * Get registration by ID
   */
  async getById(id: string): Promise<Result<{
    id: string;
    bountyId: string;
    hunterAddress: string;
    status: string;
    proofUrl?: string;
    verificationResult?: any;
    createdAt: Date;
    updatedAt: Date;
  } | null>> {
    try {
      const registration = await this.prisma.registration.findUnique({
        where: { id },
        select: {
          id: true,
          bountyId: true,
          hunterAddress: true,
          status: true,
          proofUrl: true,
          verificationResult: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!registration) {
        return ok(null);
      }

      return ok({
        id: registration.id,
        bountyId: registration.bountyId,
        hunterAddress: registration.hunterAddress,
        status: registration.status,
        proofUrl: registration.proofUrl ?? undefined,
        verificationResult: registration.verificationResult ?? undefined,
        createdAt: registration.createdAt,
        updatedAt: registration.updatedAt,
      });
    } catch (error) {
      return err(
        new AppError({
          code: "REGISTRATION_ERROR",
          message: `Failed to get registration: ${error instanceof Error ? error.message : "Unknown error"}`,
          context: "RegistrationRepository.getById",
        }),
      );
    }
  }

  /**
   * Get registration by bounty and hunter
   */
  async getByBountyAndHunter(bountyId: string, hunterAddress: string): Promise<Result<{
    id: string;
    bountyId: string;
    hunterAddress: string;
    status: string;
    proofUrl?: string;
    verificationResult?: any;
    createdAt: Date;
    updatedAt: Date;
  } | null>> {
    try {
      const registration = await this.prisma.registration.findFirst({
        where: { bountyId, hunterAddress: hunterAddress.toLowerCase() },
        select: {
          id: true,
          bountyId: true,
          hunterAddress: true,
          status: true,
          proofUrl: true,
          verificationResult: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
      });

      if (!registration) {
        return ok(null);
      }

      return ok({
        id: registration.id,
        bountyId: registration.bountyId,
        hunterAddress: registration.hunterAddress,
        status: registration.status,
        proofUrl: registration.proofUrl ?? undefined,
        verificationResult: registration.verificationResult ?? undefined,
        createdAt: registration.createdAt,
        updatedAt: registration.updatedAt,
      });
    } catch (error) {
      return err(
        new AppError({
          code: "REGISTRATION_ERROR",
          message: `Failed to get registration: ${error instanceof Error ? error.message : "Unknown error"}`,
          context: "RegistrationRepository.getByBountyAndHunter",
        }),
      );
    }
  }

  /**
   * Update registration status
   */
  async updateStatus(id: string, status: string, verificationResult?: any): Promise<Result<{
    id: string;
    status: string;
  }>> {
    try {
      const registration = await this.prisma.registration.update({
        where: { id },
        data: {
          status: status as any,
          verificationResult: verificationResult || undefined,
        },
        select: {
          id: true,
          status: true,
        },
      });

      return ok({
        id: registration.id,
        status: registration.status,
      });
    } catch (error) {
      return err(
        new AppError({
          code: "REGISTRATION_ERROR",
          message: `Failed to update registration: ${error instanceof Error ? error.message : "Unknown error"}`,
          context: "RegistrationRepository.updateStatus",
        }),
      );
    }
  }

  /**
   * Submit proof for a registration
   */
  async submitProof(id: string, proofUrl: string): Promise<Result<{
    id: string;
    proofUrl: string;
    status: string;
  }>> {
    try {
      const registration = await this.prisma.registration.update({
        where: { id },
        data: {
          proofUrl,
          status: "ACCEPTED", // Pending verification
        },
        select: {
          id: true,
          proofUrl: true,
          status: true,
        },
      });

      return ok({
        id: registration.id,
        proofUrl: registration.proofUrl ?? "",
        status: registration.status,
      });
    } catch (error) {
      return err(
        new AppError({
          code: "REGISTRATION_ERROR",
          message: `Failed to submit proof: ${error instanceof Error ? error.message : "Unknown error"}`,
          context: "RegistrationRepository.submitProof",
        }),
      );
    }
  }
}

let registrationRepository: RegistrationRepository | null = null;

export function getRegistrationRepository(): RegistrationRepository {
  if (!registrationRepository) {
    registrationRepository = new RegistrationRepository();
  }
  return registrationRepository;
}
