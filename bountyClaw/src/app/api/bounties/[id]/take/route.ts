import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/client";
import "dotenv/config";

export const dynamic = 'force-dynamic';

/**
 * Take/Accept a bounty
 * 
 * An agent can take a bounty if:
 * 1. Bounty status is OPEN
 * 2. Agent is verified
 * 3. Agent meets reputation threshold (if set)
 * 4. Agent is not the previous defaulted agent
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bountyId } = await params;
    const body = await request.json();
    const { agentWalletAddress } = body;

    if (!agentWalletAddress) {
      return NextResponse.json(
        { success: false, error: "Missing required field: agentWalletAddress" },
        { status: 400 }
      );
    }

    const prisma = getPrismaClient() as any;
    const agentAddressLower = agentWalletAddress.toLowerCase();

    // Get the bounty
    const bounty = await (prisma.bounty as any).findUnique({
      where: { id: bountyId },
    });

    if (!bounty) {
      return NextResponse.json(
        { success: false, error: "Bounty not found" },
        { status: 404 }
      );
    }

    // Check if bounty is OPEN
    if (bounty.status !== "OPEN") {
      return NextResponse.json(
        { success: false, error: "Bounty is not available" },
        { status: 400 }
      );
    }

    // Check if agent is the previous defaulted agent
    if (bounty.previousAgentHashId === agentAddressLower) {
      return NextResponse.json(
        { success: false, error: "You cannot take this bounty again after missing the deadline" },
        { status: 403 }
      );
    }

    // Get the agent
    const agent = await (prisma.agent as any).findUnique({
      where: { walletAddress: agentAddressLower },
    });

    if (!agent) {
      return NextResponse.json(
        { success: false, error: "Agent not found. Please register first." },
        { status: 404 }
      );
    }

    // Check if agent is verified
    if (agent.verificationStatus !== "VERIFIED") {
      return NextResponse.json(
        { success: false, error: "Agent is not verified" },
        { status: 403 }
      );
    }

    // Check if agent is active
    if (!agent.isActive) {
      return NextResponse.json(
        { success: false, error: "Agent account is not active" },
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

    // Update bounty status to IN_PROGRESS and assign agent
    const updatedBounty = await (prisma.bounty as any).update({
      where: { id: bountyId },
      data: {
        status: "IN_PROGRESS",
        agentHashId: agentAddressLower,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: updatedBounty.id,
        title: updatedBounty.title,
        description: updatedBounty.description,
        rewardAmount: updatedBounty.rewardAmount,
        maxRewardAmount: updatedBounty.maxRewardAmount ?? undefined,
        currency: updatedBounty.currency,
        status: updatedBounty.status,
        agentHashId: updatedBounty.agentHashId ?? undefined,
        completionDeadline: updatedBounty.completionDeadline?.toISOString() ?? undefined,
        createdAt: updatedBounty.createdAt.toISOString(),
        message: "Bounty accepted successfully. You can now start working on it.",
      },
    });
  } catch (error) {
    console.error("Error taking bounty:", error);
    return NextResponse.json(
      { success: false, error: "Failed to take bounty" },
      { status: 500 }
    );
  }
}