import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { getPrismaClient } = await import("../../../../core/src/db/client");
    const prisma = getPrismaClient();

    // Get total escrowed amount (from ESCROWED bounties)
    const escrowedBounties = await prisma.bounty.findMany({
      where: { status: "ESCROWED" },
      select: { rewardAmount: true },
    });

    const totalEscrowed = escrowedBounties.reduce((sum: bigint, b: { rewardAmount: string }) => {
      const amount = BigInt(b.rewardAmount || "0");
      return sum + amount;
    }, BigInt(0));

    // Get open bounties count
    const activeBountiesCount = await prisma.bounty.count({
      where: { status: { in: ["OPEN", "ESCROWED"] } },
    });

    // Get total unique hunters (unique hunter addresses)
    const huntersResult = await prisma.bounty.findMany({
      where: { hunterAddress: { not: null } },
      select: { hunterAddress: true },
      distinct: ['hunterAddress'],
    });
    const totalHunters = huntersResult.length;

    return NextResponse.json({
      success: true,
      data: {
        totalEscrowed: totalEscrowed.toString(),
        activeBounties: activeBountiesCount,
        totalHunters,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch stats",
      },
      { status: 500 }
    );
  }
}