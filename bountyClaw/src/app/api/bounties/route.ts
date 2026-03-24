import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/client";
import "dotenv/config";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const hunterAddress = searchParams.get("hunterAddress") || undefined;
    const creatorHashId = searchParams.get("creatorHashId") || undefined;

    const prisma = getPrismaClient();

    const where: any = {};
    
    if (status) {
      where.status = status;
    } else {
      where.status = { in: ["OPEN", "ESCROWED"] };
    }

    if (hunterAddress) {
      where.hunterAddress = hunterAddress;
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
        currency: true,
        status: true,
        hunterAddress: true,
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
      currency: b.currency,
      status: b.status,
      hunterAddress: b.hunterAddress ?? undefined,
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, 
      description, 
      rewardAmount, 
      currency = "cUSD", 
      eoaAddress,      // User's EOA wallet address
      walletAddress,   // Keyless wallet address (used as creatorHashId)
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

    // Validate address format (must be valid Ethereum address)
    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid wallet address format. Must be a valid Ethereum address (0x...)",
        },
        { status: 400 }
      );
    }

    // Use Keyless wallet address as the unique identifier (creatorHashId)
    // This is what we'll use to index user's bounties
    const creatorHashId = walletAddress.toLowerCase();

    const prisma = getPrismaClient();
    
    // Ensure the user exists before creating bounty
    // Check if user exists by wallet address
    let user = await prisma.user.findUnique({
      where: { hashedId: creatorHashId },
    });
    
    if (!user) {
      // Create new user with their Keyless wallet address
      user = await prisma.user.create({
        data: {
          hashedId: creatorHashId,
          eoaAddress: eoaAddress || "", // Store EOA if provided
          walletAddress: walletAddress, // Store Keyless wallet address
        },
      });
    } else {
      // Update existing user with EOA if not set
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
        currency,
        creatorHashId,
        status: "OPEN",
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      },
      select: {
        id: true,
        title: true,
        description: true,
        rewardAmount: true,
        currency: true,
        status: true,
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
        currency: bounty.currency,
        status: bounty.status,
        creatorHashId: bounty.creatorHashId,
        createdAt: bounty.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error creating bounty:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create bounty",
      },
      { status: 500 }
    );
  }
}