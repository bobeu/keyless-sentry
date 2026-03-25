import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/client";
import "dotenv/config";

export const dynamic = 'force-dynamic';

/**
 * Respond to a negotiation (accept or reject)
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; negotiationId: string }> }
) {
  try {
    const { id: bountyId, negotiationId } = await params;
    const body = await request.json();
    const { action, creatorWalletAddress } = body; // action: "accept" | "reject"

    if (!action || !["accept", "reject"].includes(action)) {
      return NextResponse.json(
        { success: false, error: "Invalid action. Must be 'accept' or 'reject'" },
        { status: 400 }
      );
    }

    const prisma = getPrismaClient() as any;

    // Get the negotiation
    const negotiation = await prisma.negotiation.findUnique({
      where: { id: negotiationId },
    });

    if (!negotiation) {
      return NextResponse.json(
        { success: false, error: "Negotiation not found" },
        { status: 404 }
      );
    }

    // Verify this negotiation belongs to the bounty
    if (negotiation.bountyId !== bountyId) {
      return NextResponse.json(
        { success: false, error: "Negotiation does not belong to this bounty" },
        { status: 400 }
      );
    }

    // Check if negotiation is still pending
    if (negotiation.status !== "PENDING") {
      return NextResponse.json(
        { success: false, error: "Negotiation is no longer pending" },
        { status: 400 }
      );
    }

    // Get the bounty to verify ownership
    const bounty = await prisma.bounty.findUnique({
      where: { id: bountyId },
    });

    if (!bounty) {
      return NextResponse.json(
        { success: false, error: "Bounty not found" },
        { status: 404 }
      );
    }

    // Verify the creator is the one responding
    if (creatorWalletAddress && bounty.creatorHashId !== creatorWalletAddress.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: "You are not the owner of this bounty" },
        { status: 403 }
      );
    }

    // Update negotiation status
    const updatedNegotiation = await prisma.negotiation.update({
      where: { id: negotiationId },
      data: {
        status: action === "accept" ? "ACCEPTED" : "REJECTED",
        respondedAt: new Date(),
      },
    });

    // If accepted, update the bounty
    if (action === "accept") {
      await prisma.bounty.update({
        where: { id: bountyId },
        data: {
          status: "IN_PROGRESS",
          agentHashId: negotiation.agentWallet,
          rewardAmount: negotiation.proposedAmount, // Update to negotiated amount
        },
      });
    }

    // TODO: Notify agent via Telegram (later)

    return NextResponse.json({
      success: true,
      data: {
        id: updatedNegotiation.id,
        status: updatedNegotiation.status,
        respondedAt: updatedNegotiation.respondedAt?.toISOString(),
        message: action === "accept" 
          ? "Negotiation accepted! The agent can now start working."
          : "Negotiation rejected.",
      },
    });
  } catch (error) {
    console.error("Error responding to negotiation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to respond to negotiation" },
      { status: 500 }
    );
  }
}