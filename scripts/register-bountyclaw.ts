/**
 * Register BountyClaw Agent on Celo Mainnet ERC-8004 Registry
 * Uses the ERC-721 based IdentityRegistry contract
 */
import "dotenv/config";
import { createPublicClient, http, createWalletClient } from "viem";
import { celo } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const ERC8004_REGISTRY_ADDRESS = process.env.ERC8004_REGISTRY_ADDRESS as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const KEYLESS_OWNER = process.env.KEYLESS_OWNER as string;
const SENTRY_RPC_URL = process.env.SENTRY_RPC_URL as string;

// ERC-8004 IdentityRegistry ABI - using the correct register function
const ERC8004_ABI = [
  {
    name: "register",
    type: "function",
    inputs: [
      { name: "agentURI", type: "string" },
    ],
    outputs: [
      { name: "agentId", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
] as const;

async function main() {
  console.log("=== BountyClaw Registration on Celo Mainnet ===\n");
  
  // Validate required env vars
  if (!ERC8004_REGISTRY_ADDRESS || !PRIVATE_KEY || !KEYLESS_OWNER || !SENTRY_RPC_URL) {
    console.error("Missing required environment variables!");
    console.error("Need: ERC8004_REGISTRY_ADDRESS, PRIVATE_KEY, KEYLESS_OWNER, SENTRY_RPC_URL");
    process.exit(1);
  }
  
  console.log("Configuration:");
  console.log(`  Registry: ${ERC8004_REGISTRY_ADDRESS}`);
  console.log(`  RPC URL:  ${SENTRY_RPC_URL}`);
  console.log(`  Owner:    ${KEYLESS_OWNER}`);
  console.log();
  
  // Create public client
  const publicClient = createPublicClient({
    chain: celo,
    transport: http(SENTRY_RPC_URL),
  });
  
  // Create wallet client
  const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`);
  const walletClient = createWalletClient({
    chain: celo,
    transport: http(SENTRY_RPC_URL),
    account,
  });
  
  console.log("Registering BountyClaw on Celo mainnet...\n");
  
  // Build agent URI with metadata
  const agentMetadata = {
    name: "BountyClaw",
    type: "AI Agent",
    version: "1.0.0",
    capabilities: ["bounty creation", "bounty hunting", "proof verification"],
    description: "AI agent for creating and managing bounties on Celo"
  };
  
  const agentURI = `data:application/json,${encodeURIComponent(JSON.stringify(agentMetadata))}`;
  
  console.log("Registration Details:");
  console.log(`  Caller:      ${account.address}`);
  console.log(`  Agent URI:   ${agentURI}\n`);
  
  try {
    // First, simulate the call to check if it would succeed
    console.log("Simulating registration...\n");
    
    try {
      const simulateResult = await publicClient.simulateContract({
        address: ERC8004_REGISTRY_ADDRESS as `0x${string}`,
        abi: ERC8004_ABI,
        functionName: "register",
        args: [agentURI],
        account: account.address,
      });
      console.log("Simulation successful!");
    } catch (simError: any) {
      console.log("Simulation failed:", simError.message || simError);
      // Continue anyway to try the actual transaction
    }
    
    // Send registration transaction
    console.log("\nSending registration transaction...\n");
    const txHash = await walletClient.writeContract({
      address: ERC8004_REGISTRY_ADDRESS as `0x${string}`,
      abi: ERC8004_ABI,
      functionName: "register",
      args: [agentURI],
    });
    
    console.log(`Transaction submitted: ${txHash}`);
    console.log("\nWaiting for confirmation...\n");
    
    // Wait for receipt
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });
    
    console.log("=== Registration Complete! ===");
    console.log(`  Transaction Hash: ${receipt.transactionHash}`);
    console.log(`  Block Number:     ${receipt.blockNumber}`);
    console.log(`  Status:          ${receipt.status === 'success' ? 'SUCCESS' : 'FAILED'}`);
    console.log(`  Gas Used:        ${receipt.gasUsed.toString()}`);
    
    // Parse the logs to find the Registered event
    if (receipt.logs && receipt.logs.length > 0) {
      console.log("\n=== Events Emitted ===");
      for (const log of receipt.logs) {
        console.log(`  Log: ${log.address} - ${log.topics.join(', ')}`);
      }
    }
    
    console.log("\n=== Registration Summary ===");
    console.log(`Caller (Owner):     ${account.address}`);
    console.log(`Agent Name:         BountyClaw`);
    console.log(`Network:            Celo Mainnet (chainId: 42220)`);
    console.log(`Registry:           ${ERC8004_REGISTRY_ADDRESS}`);
    console.log(`Transaction:        ${receipt.transactionHash}`);
    
  } catch (error: any) {
    console.error("\nRegistration failed:");
    if (error.message) {
      console.error(error.message);
    }
    if (error.cause) {
      console.error("\nCaused by:", error.cause.message || error.cause);
    }
    process.exit(1);
  }
}

main().catch(console.error);
