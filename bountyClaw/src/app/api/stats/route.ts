import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/client";
import "dotenv/config";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const prisma = getPrismaClient();
    
    // Use type assertion for Prisma queries
    const bountyCount = await (prisma.bounty.count as any)();
    const openCount = await (prisma.bounty.count as any)({ where: { status: "OPEN" } });
    const escrowedCount = await (prisma.bounty.count as any)({ where: { status: "ESCROWED" } });
    // Use groupBy to get sum of rewards for OPEN and ESCROWED bounties
    const totalReward = await prisma.$queryRaw<[{ total: string | null }]>`
      SELECT SUM("rewardAmount") as total FROM "bounties" WHERE status IN ('OPEN', 'ESCROWED')
    `;
    const totalRewardVal = totalReward[0]?.total ?? "0";

    // Format for display (convert wei to readable format)
    const formattedTotal = (parseInt(totalRewardVal) / 1e18).toFixed(2);

    return NextResponse.json({
      success: true,
      data: {
        totalEscrowed: `${formattedTotal}`,
        activeBounties: openCount + escrowedCount,
        totalHunters: bountyCount,
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