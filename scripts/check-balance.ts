/**
 * Check CELO balance of the account
 */
import "dotenv/config";
import { createPublicClient, http } from "viem";
import { celo } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const SENTRY_RPC_URL = process.env.SENTRY_RPC_URL as string;

async function main() {
  const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`);
  
  console.log("=== Account Balance Check ===");
  console.log(`Address: ${account.address}`);
  console.log(`RPC: ${SENTRY_RPC_URL}\n`);
  
  // Create public client
  const publicClient = createPublicClient({
    chain: celo,
    transport: http(SENTRY_RPC_URL),
  });
  
  // Get CELO balance
  const balance = await publicClient.getBalance({
    address: account.address,
  });
  
  console.log(`CELO Balance: ${balance} wei`);
  console.log(`CELO Balance: ${Number(balance) / 1e18} CELO`);
  
  // Also try a public RPC
  console.log("\n=== Checking with public RPC ===");
  const publicRpcClient = createPublicClient({
    chain: celo,
    transport: http("https://forno.celo.org"),
  });
  
  const publicBalance = await publicRpcClient.getBalance({
    address: account.address,
  });
  
  console.log(`CELO Balance (public RPC): ${publicBalance} wei`);
  console.log(`CELO Balance (public RPC): ${Number(publicBalance) / 1e18} CELO`);
}

main().catch(console.error);
