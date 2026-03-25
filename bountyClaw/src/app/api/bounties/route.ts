import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/client";
import "dotenv/config";

export const dynamic = 'force-dynamic';

/**
 * Get all bounties with optional filters
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const agentHashId = searchParams.get("agentHashId") || undefined;
    const creatorHashId = searchParams.get("creatorHashId") || undefined;
    const includeExpired = searchParams.get("includeExpired") === "true";

    const prisma = getPrismaClient() as any;

    const where: any = {};
    
    // Default to showing OPEN bounties if no status filter
    if (status) {
      where.status = status;
    } else if (!includeExpired) {
      where.status = { in: ["OPEN", "ESCROWED"] };
    }

    if (agentHashId) {
      where.agentHashId = agentHashId;
    }

    if (creatorHashId) {
      where.creatorHashId = creatorHashId;
    }

    const bounties = await prisma.bounty.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        rewardAmount: true,
        maxRewardAmount: true,
        currency: true,
        status: true,
        agentHashId: true,
        previousAgentHashId: true,
        requiredCapabilities: true,
        minReputationThreshold: true,
        completionDeadline: true,
        creatorHashId: true,
        escrowAddress: true,
        createdAt: true,
        expiresAt: true,
      },
    });

    const formattedBounties = bounties.map((b: any) => ({
      id: b.id,
      title: b.title,
      description: b.description,
      rewardAmount: b.rewardAmount,
      maxRewardAmount: b.maxRewardAmount ?? undefined,
      currency: b.currency,
      status: b.status,
      agentHashId: b.agentHashId ?? undefined,
      previousAgentHashId: b.previousAgentHashId ?? undefined,
      requiredCapabilities: b.requiredCapabilities ?? undefined,
      minReputationThreshold: b.minReputationThreshold ?? undefined,
      completionDeadline: b.completionDeadline?.toISOString() ?? undefined,
      creatorHashId: b.creatorHashId,
      escrowAddress: b.escrowAddress ?? undefined,
      createdAt: b.createdAt.toISOString(),
      expiresAt: b.expiresAt?.toISOString() ?? undefined,
    }));

    return NextResponse.json({ success: true, data: formattedBounties });
  } catch (error) {
    console.error("Error fetching bounties:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch bounties",
      },
      { status: 500 }
    );
  }
}

/**
 * Create a new bounty
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, 
      description, 
      rewardAmount, 
      maxRewardAmount,      // Optional: for price range
      currency = "cUSD", 
      eoaAddress,          
      walletAddress,       
      requiredCapabilities, // Required agent capabilities
      minReputationThreshold, // Minimum reputation required
      completionDeadline,   // When work must be completed
      expiresAt 
    } = body;

    if (!title || !description || !rewardAmount || !walletAddress) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title, description, rewardAmount, walletAddress",
        },
        { status: 400 }
      );
    }

    // Validate address format
    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid wallet address format",
        },
        { status: 400 }
      );
    }

    // Validate maxRewardAmount if provided (must be >= rewardAmount)
    if (maxRewardAmount && BigInt(maxRewardAmount) < BigInt(rewardAmount)) {
      return NextResponse.json(
        {
          success: false,
          error: "maxRewardAmount must be >= rewardAmount",
        },
        { status: 400 }
      );
    }

    const creatorHashId = walletAddress.toLowerCase();
    const prisma = getPrismaClient() as any;
    
    // Ensure the user exists
    let user = await prisma.user.findUnique({
      where: { hashedId: creatorHashId },
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          hashedId: creatorHashId,
          eoaAddress: eoaAddress || "",
          walletAddress: walletAddress,
        },
      });
    } else {
      if (eoaAddress && !user.eoaAddress) {
        await prisma.user.update({
          where: { hashedId: creatorHashId },
          data: { eoaAddress },
        });
      }
    }
    
    const bounty = await prisma.bounty.create({
      data: {
        title,
        description,
        rewardAmount,
        maxRewardAmount: maxRewardAmount || null,
        currency,
        creatorHashId,
        status: "OPEN",
        requiredCapabilities: requiredCapabilities || null,
        minReputationThreshold: minReputationThreshold || null,
        completionDeadline: completionDeadline ? new Date(completionDeadline) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      select: {
        id: true,
        title: true,
        description: true,
        rewardAmount: true,
        maxRewardAmount: true,
        currency: true,
        status: true,
        requiredCapabilities: true,
        minReputationThreshold: true,
        completionDeadline: true,
        creatorHashId: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: bounty.id,
        title: bounty.title,
        description: bounty.description,
        rewardAmount: bounty.rewardAmount,
        maxRewardAmount: bounty.maxRewardAmount ?? undefined,
        currency: bounty.currency,
        status: bounty.status,
        requiredCapabilities: bounty.requiredCapabilities ?? undefined,
        minReputationThreshold: bounty.minReputationThreshold ?? undefined,
        completionDeadline: bounty.completionDeadline?.toISOString() ?? undefined,
        creatorHashId: bounty.creatorHashId,
        createdAt: bounty.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error creating bounty:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create bounty",
      },
      { status: 500 }
    );
  }
}

/**
 * Update a bounty (cancel, edit, etc.)
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { 
      bountyId,
      action, // "cancel", "edit"
      // Edit fields
      title,
      description,
      rewardAmount,
      maxRewardAmount,
      requiredCapabilities,
      minReputationThreshold,
      completionDeadline,
      // Cancel reason
      cancelReason
    } = body;

    if (!bountyId || !action) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: bountyId, action" },
        { status: 400 }
      );
    }

    const prisma = getPrismaClient() as any;
    const bounty = await prisma.bounty.findUnique({
      where: { id: bountyId },
    });

    if (!bounty) {
      return NextResponse.json(
        { success: false, error: "Bounty not found" },
        { status: 404 }
      );
    }

    // Handle different actions
    if (action === "cancel") {
      // Only allow cancellation if bounty is OPEN (not taken)
      if (bounty.status !== "OPEN") {
        return NextResponse.json(
          { success: false, error: "Cannot cancel bounty that is not OPEN" },
          { status: 400 }
        );
      }

      const updatedBounty = await prisma.bounty.update({
        where: { id: bountyId },
        data: { status: "CANCELLED" },
        select: {
          id: true,
          status: true,
          updatedAt: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: {
          ...updatedBounty,
          updatedAt: updatedBounty.updatedAt.toISOString(),
        },
      });
    }

    if (action === "edit") {
      // Only allow editing if bounty is OPEN
      if (bounty.status !== "OPEN") {
        return NextResponse.json(
          { success: false, error: "Cannot edit bounty that is not OPEN" },
          { status: 400 }
        );
      }

      const updateData: any = {};
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (rewardAmount) updateData.rewardAmount = rewardAmount;
      if (maxRewardAmount !== undefined) updateData.maxRewardAmount = maxRewardAmount || null;
      if (requiredCapabilities !== undefined) updateData.requiredCapabilities = requiredCapabilities || null;
      if (minReputationThreshold !== undefined) updateData.minReputationThreshold = minReputationThreshold || null;
      if (completionDeadline !== undefined) updateData.completionDeadline = completionDeadline ? new Date(completionDeadline) : null;

      const updatedBounty = await prisma.bounty.update({
        where: { id: bountyId },
        data: updateData,
        select: {
          id: true,
          title: true,
          description: true,
          rewardAmount: true,
          maxRewardAmount: true,
          status: true,
          requiredCapabilities: true,
          minReputationThreshold: true,
          completionDeadline: true,
          updatedAt: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: {
          ...updatedBounty,
          maxRewardAmount: updatedBounty.maxRewardAmount ?? undefined,
          requiredCapabilities: updatedBounty.requiredCapabilities ?? undefined,
          minReputationThreshold: updatedBounty.minReputationThreshold ?? undefined,
          completionDeadline: updatedBounty.completionDeadline?.toISOString() ?? undefined,
          updatedAt: updatedBounty.updatedAt.toISOString(),
        },
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating bounty:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update bounty" },
      { status: 500 }
    );
  }
}