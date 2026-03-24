import { NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/client";
import "dotenv/config";

export const dynamic = 'force-dynamic';

function getPrismaClient(): PrismaClient {
  const connectionString = `${process.env.DATABASE_URL}`;
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export async function GET() {
  try {
    const prisma = getPrismaClient();
    
    // Use type assertion for Prisma queries
    const bountyCount = await (prisma.bounty.count as any)();
    const openCount = await (prisma.bounty.count as any)({ where: { status: "OPEN" } });
    const escrowedCount = await (prisma.bounty.count as any)({ where: { status: "ESCROWED" } });
    const totalReward = await (prisma.bounty.aggregate as any)({
      _sum: { rewardAmount: true },
      where: { status: { in: ["OPEN", "ESCROWED"] } },
    });

    // Handle Prisma aggregate result
    const totalRewardData = totalReward as unknown as { _sum: { rewardAmount: string | null } | null };
    const totalRewardVal = totalRewardData._sum?.rewardAmount ?? "0";

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