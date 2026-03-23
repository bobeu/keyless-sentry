import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const hunterAddress = searchParams.get("hunterAddress") || undefined;
    const creatorHashId = searchParams.get("creatorHashId") || undefined;

    // Call gateway API
    const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080';
    const queryParams = new URLSearchParams();
    if (status) queryParams.set('status', status);
    if (hunterAddress) queryParams.set('hunterAddress', hunterAddress);
    if (creatorHashId) queryParams.set('creatorHashId', creatorHashId);

    const response = await fetch(`${gatewayUrl}/api/bounties?${queryParams.toString()}`);
    const result = await response.json();

    return NextResponse.json(result);
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
    const { title, description, rewardAmount, currency = "cUSD", creatorHashId, expiresAt } = body;

    if (!title || !description || !rewardAmount || !creatorHashId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title, description, rewardAmount, creatorHashId",
        },
        { status: 400 }
      );
    }

    // Call gateway API
    const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080';
    
    const response = await fetch(`${gatewayUrl}/api/bounties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        rewardAmount,
        currency,
        creatorHashId,
        expiresAt,
      }),
    });

    const result = await response.json();
    return NextResponse.json(result);
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