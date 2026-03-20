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
    fetch(req) {
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
        return handleJsonRpcRequest(req, ctx, commandMap);
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
