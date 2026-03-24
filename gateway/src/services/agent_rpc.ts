/**
 * Agent RPC Service - JSON-RPC 2.0 endpoints for AI agent interaction
 * 
 * This module provides programmatic access for other AI agents to interact with
 * BountyClaw. Agents can discover bounties, register, submit work, and get paid.
 */

import { getPrismaClient } from "@keyless-sentry/core";
import { err, ok, type Result, AppError } from "@keyless-sentry/core";

export interface JsonRpcRequest {
  jsonrpc: "2.0";
  method: string;
  params?: Record<string, unknown>;
  id?: unknown;
}

export interface JsonRpcResponse {
  jsonrpc: "2.0";
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
  id?: unknown;
}

/**
 * Handle all agent RPC method calls
 */
export async function handleAgentRpc(request: JsonRpcRequest): Promise<JsonRpcResponse> {
  const { method, params = {}, id } = request;

  try {
    let result: unknown;

    switch (method) {
      // === BOUNTY DISCOVERY ===
      case "bountyclaw.list_bounties":
        result = await listBounties(params);
        break;
      
      case "bountyclaw.get_bounty":
        result = await getBounty(params);
        break;
      
      case "bountyclaw.search_bounties":
        result = await searchBounties(params);
        break;

      // === REGISTRATION ===
      case "bountyclaw.register_for_bounty":
        result = await registerForBounty(params);
        break;
      
      case "bountyclaw.get_registration":
        result = await getRegistration(params);
        break;
      
      case "bountyclaw.list_my_registrations":
        result = await listMyRegistrations(params);
        break;

      // === SUBMISSION ===
      case "bountyclaw.submit_proof":
        result = await submitProof(params);
        break;

      // === WALLET & PAYOUT ===
      case "bountyclaw.create_wallet":
        result = await createWallet(params);
        break;
      
      case "bountyclaw.get_wallet":
        result = await getWallet(params);
        break;
      
      case "bountyclaw.get_balance":
        result = await getBalance(params);
        break;

      // === IDENTITY ===
      case "bountyclaw.get_agent_info":
        result = await getAgentInfo(params);
        break;

      // === USER BOUNTIES ===
      case "bountyclaw.create_bounty":
        result = await createBounty(params);
        break;
      
      case "bountyclaw.cancel_bounty":
        result = await cancelBounty(params);
        break;
      
      case "bountyclaw.verify_submission":
        result = await verifySubmission(params);
        break;
      
      case "bountyclaw.release_payment":
        result = await releasePayment(params);
        break;

      default:
        return {
          jsonrpc: "2.0",
          error: { code: -32601, message: `Method not found: ${method}` },
          id
        };
    }

    return { jsonrpc: "2.0", result, id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return {
      jsonrpc: "2.0",
      error: { code: -32603, message, data: error },
      id
    };
  }
}

// ============================================
// BOUNTY DISCOVERY METHODS
// ============================================

async function listBounties(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const status = params.status as string | undefined;
  const limit = Math.min(parseInt(String(params.limit || "50"), 10), 100);
  const offset = parseInt(String(params.offset || "0"), 10);

  const where: any = {};
  
  if (status) {
    where.status = status;
  } else {
    where.status = { in: ["OPEN", "ESCROWED"] };
  }

  const bounties = await prisma.bounty.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
    include: {
      creator: { select: { hashedId: true, eoaAddress: true } },
      _count: { select: { registrations: true } }
    }
  });

  return {
    bounties: bounties.map(b => ({
      id: b.id,
      title: b.title,
      description: b.description,
      rewardAmount: b.rewardAmount,
      currency: b.currency,
      status: b.status,
      hunterAddress: b.hunterAddress,
      escrowAddress: b.escrowAddress,
      createdAt: b.createdAt.toISOString(),
      expiresAt: b.expiresAt?.toISOString() || null,
      creatorId: b.creatorHashId,
      registrationCount: b._count.registrations
    })),
    pagination: { limit, offset, hasMore: bounties.length === limit }
  };
}

async function getBounty(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const bountyId = params.bountyId as string;

  if (!bountyId) {
    throw new AppError({ code: "INVALID_INPUT", message: "bountyId is required" });
  }

  const bounty = await prisma.bounty.findUnique({
    where: { id: bountyId },
    include: {
      creator: { select: { hashedId: true, eoaAddress: true, walletAddress: true } },
      registrations: {
        where: { status: { in: ["ACCEPTED", "COMPLETED"] } },
        select: { id: true, hunterAddress: true, status: true, proofUrl: true, createdAt: true }
      }
    }
  });

  if (!bounty) {
    throw new AppError({ code: "NOT_FOUND", message: "Bounty not found" });
  }

  return { bounty };
}

async function searchBounties(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const query = params.query as string;
  const minReward = params.minReward as string | undefined;
  const maxReward = params.maxReward as string | undefined;

  if (!query) {
    throw new AppError({ code: "INVALID_INPUT", message: "query is required" });
  }

  const where: any = {
    OR: [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } }
    ],
    status: { in: ["OPEN", "ESCROWED"] }
  };

  if (minReward) {
    where.rewardAmount = { ...where.rewardAmount, gte: minReward };
  }
  if (maxReward) {
    where.rewardAmount = { ...where.rewardAmount, lte: maxReward };
  }

  const bounties = await prisma.bounty.findMany({
    where,
    orderBy: { rewardAmount: "desc" },
    take: 20
  });

  return { bounties };
}

// ============================================
// REGISTRATION METHODS
// ============================================

async function registerForBounty(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const bountyId = params.bountyId as string;
  const hunterAddress = params.hunterAddress as string;

  if (!bountyId || !hunterAddress) {
    throw new AppError({ code: "INVALID_INPUT", message: "bountyId and hunterAddress are required" });
  }

  // Check if bounty exists and is open
  const bounty = await prisma.bounty.findUnique({ where: { id: bountyId } });
  if (!bounty) {
    throw new AppError({ code: "NOT_FOUND", message: "Bounty not found" });
  }
  if (bounty.status !== "OPEN") {
    throw new AppError({ code: "INVALID_INPUT", message: "Bounty is not open for registration" });
  }

  // Check if already registered
  const existing = await prisma.registration.findFirst({
    where: { bountyId, hunterAddress }
  });
  if (existing) {
    throw new AppError({ code: "ALREADY_EXISTS", message: "Already registered for this bounty" });
  }

  // Create registration
  const registration = await prisma.registration.create({
    data: {
      bountyId,
      hunterAddress,
      status: "PENDING"
    }
  });

  return { registration: { id: registration.id, status: registration.status } };
}

async function getRegistration(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const registrationId = params.registrationId as string;

  if (!registrationId) {
    throw new AppError({ code: "INVALID_INPUT", message: "registrationId is required" });
  }

  const registration = await prisma.registration.findUnique({
    where: { id: registrationId },
    include: { bounty: true }
  });

  if (!registration) {
    throw new AppError({ code: "NOT_FOUND", message: "Registration not found" });
  }

  return { registration };
}

async function listMyRegistrations(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const hunterAddress = params.hunterAddress as string;

  if (!hunterAddress) {
    throw new AppError({ code: "INVALID_INPUT", message: "hunterAddress is required" });
  }

  const registrations = await prisma.registration.findMany({
    where: { hunterAddress },
    include: { bounty: true },
    orderBy: { createdAt: "desc" }
  });

  return { registrations };
}

// ============================================
// SUBMISSION METHODS
// ============================================

async function submitProof(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const registrationId = params.registrationId as string;
  const proofUrl = params.proofUrl as string;

  if (!registrationId || !proofUrl) {
    throw new AppError({ code: "INVALID_INPUT", message: "registrationId and proofUrl are required" });
  }

  const registration = await prisma.registration.findUnique({
    where: { id: registrationId }
  });

  if (!registration) {
    throw new AppError({ code: "NOT_FOUND", message: "Registration not found" });
  }

  if (registration.status !== "ACCEPTED") {
    throw new AppError({ code: "INVALID_INPUT", message: "Registration must be accepted before submitting proof" });
  }

  const updated = await prisma.registration.update({
    where: { id: registrationId },
    data: { proofUrl, status: "COMPLETED" }
  });

  // Update bounty status
  await prisma.bounty.update({
    where: { id: registration.bountyId },
    data: { status: "PENDING_VERIFICATION", proofUrl }
  });

  return { registration: { id: updated.id, status: updated.status, proofUrl: updated.proofUrl } };
}

// ============================================
// WALLET METHODS
// ============================================

async function createWallet(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const userHashedId = params.userHashedId as string;
  const walletType = (params.walletType as string) || "USER";

  if (!userHashedId) {
    throw new AppError({ code: "INVALID_INPUT", message: "userHashedId is required" });
  }

  // In production, this would use Keyless SDK to create wallet
  // For now, return a placeholder
  const walletAddress = `0x${Math.random().toString(16).slice(2, 42)}`;

  const wallet = await prisma.wallet.create({
    data: {
      address: walletAddress,
      walletType: walletType as any,
      userId: userHashedId
    }
  });

  return { wallet: { id: wallet.id, address: wallet.address, walletType: wallet.walletType } };
}

async function getWallet(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const address = params.address as string;

  if (!address) {
    throw new AppError({ code: "INVALID_INPUT", message: "address is required" });
  }

  const wallet = await prisma.wallet.findUnique({
    where: { address },
    include: { user: true }
  });

  if (!wallet) {
    throw new AppError({ code: "NOT_FOUND", message: "Wallet not found" });
  }

  return { wallet };
}

async function getBalance(params: Record<string, unknown>): Promise<unknown> {
  const address = params.address as string;

  if (!address) {
    throw new AppError({ code: "INVALID_INPUT", message: "address is required" });
  }

  // In production, this would query the blockchain
  // For now, return placeholder
  return { balance: "0", currency: "cUSD" };
}

// ============================================
// IDENTITY METHODS
// ============================================

async function getAgentInfo(_params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  
  const identity = await prisma.bountyClawIdentity.findFirst({
    where: { isActive: true }
  });

  if (!identity) {
    return {
      agent: {
        name: "BountyClaw: The Arbiter",
        description: "Autonomous gig economy protocol for bounty management",
        version: "1.0.0",
        capabilities: [
          "bounty_discovery",
          "bounty_registration", 
          "proof_submission",
          "wallet_management",
          "payment_release"
        ],
        endpoints: {
          jsonRpc: "/",
          rest: "/api"
        }
      }
    };
  }

  return {
    agent: {
      name: identity.agentName,
      identityAddress: identity.identityAddress,
      a2aEndpoint: identity.a2aEndpoint,
      metadataUri: identity.metadataUri,
      chainId: identity.chainId,
      registeredAt: identity.registeredAt.toISOString()
    }
  };
}

// ============================================
// USER BOUNTY MANAGEMENT
// ============================================

async function createBounty(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const title = params.title as string;
  const description = params.description as string;
  const rewardAmount = params.rewardAmount as string;
  const currency = (params.currency as string) || "cUSD";
  const creatorHashId = params.creatorHashId as string;
  const expiresAt = params.expiresAt ? new Date(params.expiresAt as string) : undefined;

  if (!title || !description || !rewardAmount || !creatorHashId) {
    throw new AppError({ code: "INVALID_INPUT", message: "title, description, rewardAmount, and creatorHashId are required" });
  }

  const bounty = await prisma.bounty.create({
    data: {
      title,
      description,
      rewardAmount,
      currency,
      creatorHashId,
      status: "OPEN",
      expiresAt
    }
  });

  return { bounty: { id: bounty.id, title: bounty.title, status: bounty.status } };
}

async function cancelBounty(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const bountyId = params.bountyId as string;
  const creatorHashId = params.creatorHashId as string;

  if (!bountyId || !creatorHashId) {
    throw new AppError({ code: "INVALID_INPUT", message: "bountyId and creatorHashId are required" });
  }

  const bounty = await prisma.bounty.findUnique({ where: { id: bountyId } });
  
  if (!bounty) {
    throw new AppError({ code: "NOT_FOUND", message: "Bounty not found" });
  }
  
  if (bounty.creatorHashId !== creatorHashId) {
    throw new AppError({ code: "COMMAND_ERROR", message: "Not the bounty creator" });
  }

  const updated = await prisma.bounty.update({
    where: { id: bountyId },
    data: { status: "CANCELLED" }
  });

  return { bounty: { id: updated.id, status: updated.status } };
}

async function verifySubmission(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const bountyId = params.bountyId as string;
  const creatorHashId = params.creatorHashId as string;
  const accepted = params.accepted as boolean;

  if (!bountyId || !creatorHashId || accepted === undefined) {
    throw new AppError({ code: "INVALID_INPUT", message: "bountyId, creatorHashId, and accepted are required" });
  }

  const bounty = await prisma.bounty.findUnique({ 
    where: { id: bountyId },
    include: { registrations: { where: { status: "COMPLETED" } } }
  });
  
  if (!bounty) {
    throw new AppError({ code: "NOT_FOUND", message: "Bounty not found" });
  }
  
  if (bounty.creatorHashId !== creatorHashId) {
    throw new AppError({ code: "COMMAND_ERROR", message: "Not the bounty creator" });
  }

  if (accepted) {
    await prisma.bounty.update({
      where: { id: bountyId },
      data: { status: "RELEASED" }
    });
  } else {
    await prisma.bounty.update({
      where: { id: bountyId },
      data: { status: "OPEN" }
    });
  }

  return { success: true, bountyId, verified: accepted };
}

async function releasePayment(params: Record<string, unknown>): Promise<unknown> {
  const prisma = getPrismaClient();
  const bountyId = params.bountyId as string;
  const creatorHashId = params.creatorHashId as string;

  if (!bountyId || !creatorHashId) {
    throw new AppError({ code: "INVALID_INPUT", message: "bountyId and creatorHashId are required" });
  }

  const bounty = await prisma.bounty.findUnique({ where: { id: bountyId } });
  
  if (!bounty) {
    throw new AppError({ code: "NOT_FOUND", message: "Bounty not found" });
  }
  
  if (bounty.creatorHashId !== creatorHashId) {
    throw new AppError({ code: "COMMAND_ERROR", message: "Not the bounty creator" });
  }

  // In production, this would trigger blockchain transaction
  // Update status to released
  const updated = await prisma.bounty.update({
    where: { id: bountyId },
    data: { status: "RELEASED" }
  });

  // Create transaction record
  await prisma.transaction.create({
    data: {
      bountyId,
      fromAddress: bounty.escrowAddress || "",
      toAddress: bounty.hunterAddress || "",
      amount: bounty.rewardAmount,
      currency: bounty.currency,
      type: "PAYOUT",
      status: "CONFIRMED"
    }
  });

  return { success: true, bountyId, status: updated.status };
}
