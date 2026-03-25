import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/client";
import "dotenv/config";

export const dynamic = 'force-dynamic';

/**
 * Create a negotiation for a bounty
 * 
 * Agents can propose a different amount than the bounty reward.
 * If the amount is within the creator's acceptable range, it can be auto-accepted.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bountyId } = await params;
    const body = await request.json();
    const { agentWalletAddress, proposedAmount, message } = body;

    if (!agentWalletAddress || !proposedAmount) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: agentWalletAddress, proposedAmount" },
        { status: 400 }
      );
    }

    const prisma = getPrismaClient() as any;
    const agentAddressLower = agentWalletAddress.toLowerCase();

    // Get the bounty
    const bounty = await prisma.bounty.findUnique({
      where: { id: bountyId },
    });

    if (!bounty) {
      return NextResponse.json(
        { success: false, error: "Bounty not found" },
        { status: 404 }
      );
    }

    // Only allow negotiation for OPEN bounties
    if (bounty.status !== "OPEN") {
      return NextResponse.json(
        { success: false, error: "Cannot negotiate on a bounty that is not OPEN" },
        { status: 400 }
      );
    }

    // Check if agent exists and is verified
    const agent = await prisma.agent.findUnique({
      where: { walletAddress: agentAddressLower },
    });

    if (!agent) {
      return NextResponse.json(
        { success: false, error: "Agent not found. Please register first." },
        { status: 404 }
      );
    }

    if (agent.verificationStatus !== "VERIFIED") {
      return NextResponse.json(
        { success: false, error: "Agent is not verified" },
        { status: 403 }
      );
    }

    // Check reputation threshold
    if (bounty.minReputationThreshold && agent.reputation < bounty.minReputationThreshold) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Insufficient reputation. Required: ${bounty.minReputationThreshold}, Your: ${agent.reputation}` 
        },
        { status: 403 }
      );
    }

    // Check if there's already a pending negotiation from this agent
    const existingNegotiation = await prisma.negotiation.findFirst({
      where: {
        bountyId,
        agentWallet: agentAddressLower,
        status: "PENDING",
      },
    });

    if (existingNegotiation) {
      return NextResponse.json(
        { success: false, error: "You already have a pending negotiation for this bounty" },
        { status: 409 }
      );
    }

    // Check if proposed amount is within the creator's acceptable range
    const proposedAmountBig = BigInt(proposedAmount);
    const minAmountBig = BigInt(bounty.rewardAmount);
    const maxAmountBig = bounty.maxRewardAmount ? BigInt(bounty.maxRewardAmount) : minAmountBig;

    // If within range, auto-accept and assign agent
    const isWithinRange = proposedAmountBig >= minAmountBig && proposedAmountBig <= maxAmountBig;

    if (isWithinRange) {
      // Update bounty with the negotiated amount and assign agent
      await prisma.bounty.update({
        where: { id: bountyId },
        data: {
          status: "IN_PROGRESS",
          agentHashId: agentAddressLower,
          rewardAmount: proposedAmount, // Update to negotiated amount
        },
      });

      return NextResponse.json({
        success: true,
        data: {
          message: "Negotiation accepted! You can now start working on the bounty.",
          status: "ACCEPTED",
          bounty: {
            id: bounty.id,
            status: "IN_PROGRESS",
            rewardAmount: proposedAmount,
            agentHashId: agentAddressLower,
          }
        },
      });
    }

    // Create negotiation request
    const negotiation = await prisma.negotiation.create({
      data: {
        bountyId,
        agentWallet: agentAddressLower,
        proposedAmount,
        message: message || null,
        status: "PENDING",
      },
    });

    // TODO: Send Telegram alert to bounty creator
    // This will be implemented later

    return NextResponse.json({
      success: true,
      data: {
        id: negotiation.id,
        bountyId: negotiation.bountyId,
        proposedAmount: negotiation.proposedAmount,
        message: negotiation.message,
        status: negotiation.status,
        createdAt: negotiation.createdAt.toISOString(),
        notificationMessage: "Negotiation submitted. The bounty creator will be notified.",
      },
    });
  } catch (error) {
    console.error("Error creating negotiation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create negotiation" },
      { status: 500 }
    );
  }
}

/**
 * Get negotiations for a bounty
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bountyId } = await params;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;

    const prisma = getPrismaClient() as any;

    const where: any = { bountyId };
    if (status) {
      where.status = status;
    }

    const negotiations = await prisma.negotiation.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: negotiations.map((n: any) => ({
        id: n.id,
        bountyId: n.bountyId,
        agentWallet: n.agentWallet,
        proposedAmount: n.proposedAmount,
        message: n.message,
        status: n.status,
        createdAt: n.createdAt.toISOString(),
        respondedAt: n.respondedAt?.toISOString() || null,
      })),
    });
  } catch (error) {
    console.error("Error fetching negotiations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch negotiations" },
      { status: 500 }
    );
  }
}