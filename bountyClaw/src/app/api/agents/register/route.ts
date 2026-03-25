import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/client";
import "dotenv/config";

export const dynamic = 'force-dynamic';

/**
 * Agent Registration API
 * 
 * Registers a new agent and creates their user account.
 * For MVP, verification is auto-approved (later will integrate with Keyless SDK verification)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      walletAddress,      // Keyless wallet address (required)
      eoaAddress,         // User's EOA (optional)
      capabilities       // Agent's capabilities/skills (optional)
    } = body;

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Missing required field: walletAddress" },
        { status: 400 }
      );
    }

    // Validate address format
    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      return NextResponse.json(
        { success: false, error: "Invalid wallet address format" },
        { status: 400 }
      );
    }

    const prisma = getPrismaClient() as any;
    const walletLower = walletAddress.toLowerCase();

    // Check if agent already exists
    const existingAgent = await prisma.agent.findUnique({
      where: { walletAddress: walletLower },
    });

    if (existingAgent) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Agent already registered",
          data: {
            id: existingAgent.id,
            walletAddress: existingAgent.walletAddress,
            verificationStatus: existingAgent.verificationStatus,
            reputation: existingAgent.reputation,
          }
        },
        { status: 409 }
      );
    }

    // Create or update User first
    let user = await prisma.user.findUnique({
      where: { hashedId: walletLower },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          hashedId: walletLower,
          eoaAddress: eoaAddress || "",
          walletAddress: walletLower,
          isAgent: true,
          reputation: 0,
        },
      });
    } else {
      // Update existing user to be an agent
      user = await prisma.user.update({
        where: { hashedId: walletLower },
        data: { isAgent: true },
      });
    }

    // Create the agent
    const agent = await prisma.agent.create({
      data: {
        walletAddress: walletLower,
        userHashId: walletLower,
        verificationStatus: "VERIFIED", // Auto-verify for MVP
        reputation: 0,
        capabilities: capabilities || {},
        lastVerifiedAt: new Date(),
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: agent.id,
        walletAddress: agent.walletAddress,
        verificationStatus: agent.verificationStatus,
        reputation: agent.reputation,
        capabilities: agent.capabilities,
        registeredAt: agent.registeredAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error registering agent:", error);
    return NextResponse.json(
      { success: false, error: "Failed to register agent" },
      { status: 500 }
    );
  }
}

/**
 * Get agent by wallet address
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Missing required parameter: walletAddress" },
        { status: 400 }
      );
    }

    const prisma = getPrismaClient() as any;
    const agent = await prisma.agent.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (!agent) {
      return NextResponse.json(
        { success: false, error: "Agent not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: agent.id,
        walletAddress: agent.walletAddress,
        verificationStatus: agent.verificationStatus,
        reputation: agent.reputation,
        capabilities: agent.capabilities,
        isActive: agent.isActive,
        registeredAt: agent.registeredAt.toISOString(),
        lastVerifiedAt: agent.lastVerifiedAt?.toISOString() || null,
      },
    });
  } catch (error) {
    console.error("Error fetching agent:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch agent" },
      { status: 500 }
    );
  }
}