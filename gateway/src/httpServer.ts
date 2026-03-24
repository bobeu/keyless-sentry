/**
 * HTTP Server for Railway Deployment
 * 
 * The gateway runs as a headless service by default (stdin/stdout).
 * This module adds HTTP server capability for cloud deployments like Railway.
 */

import { handleTelegramMessage } from "./router";
import type { CommandContext } from "./command";
import { buildCommandMap } from "./commands";
import { getSelfclawService } from "./auth/selfclaw";
import { getPrismaClient } from "../../core/src/db/client";
import { handleAgentRpc } from "./services/agent_rpc";
import "dotenv/config";

export interface HttpServerConfig {
  port: number;
}

export function createHttpServer(
  ctx: CommandContext,
  config?: Partial<HttpServerConfig>
) {
  const port = config?.port || parseInt(process.env.PORT || "8080", 10);
  
  const commandMap = buildCommandMap();
  
  // Create a simple HTTP server using Bun
  const server = Bun.serve({
    port,
    async fetch(req) {
      const url = new URL(req.url);
      
      // Health check endpoint
      if (url.pathname === "/health" || url.pathname === "/") {
        return new Response(
          JSON.stringify({
            status: "ok",
            timestamp: new Date().toISOString(),
            service: "keyless-sentry",
            version: "0.4.0",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      
      // JSON-RPC endpoint
      if (url.pathname === "/" && req.method === "POST") {
        return await handleJsonRpcRequest(req, ctx, commandMap);
      }
      
      // Bounties API endpoints
      if (url.pathname === "/api/bounties" && req.method === "GET") {
        return await handleGetBounties(req, ctx);
      }
      if (url.pathname === "/api/bounties" && req.method === "POST") {
        return await handleCreateBounty(req, ctx);
      }
      
      // Stats API endpoint
      if (url.pathname === "/api/stats" && req.method === "GET") {
        return await handleGetStats(ctx);
      }
      
      // Agent RPC endpoint for programmatic interaction
      if (url.pathname === "/api/agent" && req.method === "POST") {
        try {
          const body = await req.json();
          const result = await handleAgentRpc(body as any);
          return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } catch (error) {
          return new Response(JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            error: {
              code: -32603,
              message: error instanceof Error ? error.message : "Internal error"
            }
          }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
      }
      
      // 404 for other routes
      return new Response(
        JSON.stringify({ error: { code: "NOT_FOUND", message: "Not found" } }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    },
  });
  
  console.log(`[http] HTTP server listening on port ${server.port}`);
  
  return server;
}

interface JsonRpcRequest {
  jsonrpc?: string;
  method?: string;
  params?: Record<string, unknown>;
  id?: unknown;
}

async function handleJsonRpcRequest(
  req: Request,
  ctx: CommandContext,
  commandMap: Record<string, unknown>
): Promise<Response> {
  try {
    const body = (await req.json()) as JsonRpcRequest;
    const { jsonrpc, method, params, id } = body;
    
    if (jsonrpc !== "2.0") {
      return jsonRpcError(id, "INVALID_REQUEST", "Invalid JSON-RPC version");
    }
    
    if (!method) {
      return jsonRpcError(id, "INVALID_REQUEST", "Method is required");
    }
    
    // Handle known methods
    if (method === "sentry_verify_integrity") {
      return handleSentryVerifyIntegrity(ctx, id);
    }
    
    if (method === "sentry_register_hackathon") {
      return handleRegisterHackathon(ctx, params || {}, id);
    }
    
    // Try to find a command
    const command = commandMap[method];
    if (command) {
      const result = await (command as { execute: (ctx: CommandContext, params: unknown) => Promise<unknown> }).execute(ctx, params || {});
      return jsonRpcResponse(id, result);
    }
    
    return jsonRpcError(id, "METHOD_NOT_FOUND", `Unknown method: ${method}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return jsonRpcError(1, "INTERNAL_ERROR", message);
  }
}

async function handleSentryVerifyIntegrity(ctx: CommandContext, id: unknown): Promise<Response> {
  try {
    const selfclawRes = getSelfclawService();
    
    if (!selfclawRes.ok) {
      return jsonRpcError(id, "INTERNAL_ERROR", selfclawRes.error.message);
    }
    
    const verifyRes = await selfclawRes.value.verifyIntegrity();
    
    if (!verifyRes.ok) {
      return jsonRpcError(id, "VERIFICATION_FAILED", verifyRes.error.message);
    }
    
    return jsonRpcResponse(id, verifyRes.value);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonRpcError(id, "INTERNAL_ERROR", message);
  }
}

async function handleRegisterHackathon(
  ctx: CommandContext,
  params: Record<string, unknown>,
  id: unknown
): Promise<Response> {
  try {
    // For now, return a mock response
    // In production, this would call the actual registration logic
    const result = {
      success: true,
      registrationId: `hackathon-${Date.now()}`,
      message: "Hackathon registration successful",
      hackathonId: params.hackathonId || "synthesis-2024",
      teamName: params.teamName || "Keyless-Sentry",
      timestamp: new Date().toISOString(),
    };
    
    return jsonRpcResponse(id, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonRpcError(id, "INTERNAL_ERROR", message);
  }
}

function jsonRpcResponse(id: unknown, result: unknown): Response {
  return new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      result,
      id,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

function jsonRpcError(id: unknown, code: string, message: string): Response {
  return new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      error: { code, message },
      id,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// ============================================
// Bounties API Handlers
// ============================================

async function handleGetBounties(req: Request, ctx: CommandContext): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
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

    return new Response(
      JSON.stringify({ success: true, data: formattedBounties }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching bounties:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch bounties";
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

async function handleCreateBounty(req: Request, ctx: CommandContext): Promise<Response> {
  try {
    const body = await req.json() as Record<string, unknown>;
    const title = String(body.title ?? "");
    const description = String(body.description ?? "");
    const rewardAmount = String(body.rewardAmount ?? 0);
    const currency = String(body.currency ?? "cUSD");
    const creatorHashId = String(body.creatorHashId ?? "");
    const expiresAt = body.expiresAt ? new Date(String(body.expiresAt)) : undefined;

    if (!title || !description || !rewardAmount || !creatorHashId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: title, description, rewardAmount, creatorHashId",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const prisma = getPrismaClient();

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

    return new Response(
      JSON.stringify({
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
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating bounty:", error);
    const message = error instanceof Error ? error.message : "Failed to create bounty";
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

async function handleGetStats(ctx: CommandContext): Promise<Response> {
  try {
    const prisma = getPrismaClient();
    
    // Use type assertion for Prisma queries to avoid type inference issues
    const bountyCount = await (prisma.bounty.count as any)();
    const openCount = await (prisma.bounty.count as any)({ where: { status: "OPEN" } });
    const closedCount = await (prisma.bounty.count as any)({ where: { status: { in: ["RELEASED", "CANCELLED"] } } });
    const totalReward = await (prisma.bounty.aggregate as any)({
      _sum: { rewardAmount: true },
      where: { status: { in: ["OPEN", "ESCROWED"] } },
    });

    // Handle Prisma aggregate result - use type assertion
    const totalRewardData = totalReward as unknown as { _sum: { rewardAmount: string | null } | null };
    const totalRewardVal = totalRewardData._sum?.rewardAmount ?? "0";

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          totalBounties: bountyCount,
          openBounties: openCount,
          closedBounties: closedCount,
          totalReward: totalRewardVal,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch stats";
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
