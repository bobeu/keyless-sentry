/**
 * Check if BountyClaw is already registered on Celo Mainnet
 */
import "dotenv/config";
import { createPublicClient, http } from "viem";
import { celo } from "viem/chains";

const ERC8004_REGISTRY_ADDRESS = process.env.ERC8004_REGISTRY_ADDRESS as string;
const SENTRY_RPC_URL = process.env.SENTRY_RPC_URL as string;
const KEYLESS_OWNER = process.env.KEYLESS_OWNER as string;

// ERC-8004 ABI - only read functions
const ERC8004_ABI = [
  {
    name: "getIdentity",
    type: "function",
    inputs: [{ name: "identity", type: "address" }],
    outputs: [
      { name: "agentName", type: "string" },
      { name: "metadataURI", type: "string" },
      { name: "registeredAt", type: "uint256" },
    ],
    stateMutability: "view",
  },
] as const;

async function main() {
  console.log("=== Checking Registration Status ===\n");
  
  console.log(`Registry: ${ERC8004_REGISTRY_ADDRESS}`);
  console.log(`RPC:      ${SENTRY_RPC_URL}`);
  console.log(`Identity: ${KEYLESS_OWNER}\n`);
  
  // Create public client
  const publicClient = createPublicClient({
    chain: celo,
    transport: http(SENTRY_RPC_URL),
  });
  
  try {
    const identity = await publicClient.readContract({
      address: ERC8004_REGISTRY_ADDRESS as `0x${string}`,
      abi: ERC8004_ABI,
      functionName: "getIdentity",
      args: [KEYLESS_OWNER as `0x${string}`],
    });
    
    console.log("=== Already Registered! ===");
    console.log(`Agent Name:    ${identity[0]}`);
    console.log(`Metadata URI:  ${identity[1]}`);
    console.log(`Registered At: ${identity[2].toString()}`);
    console.log(`Timestamp:     ${new Date(Number(identity[2]) * 1000).toISOString()}`);
    
    // Parse metadata
    try {
      const metadataJson = decodeURIComponent(identity[1].replace("data:application/json,", ""));
      const metadata = JSON.parse(metadataJson);
      console.log("\nMetadata:");
      console.log(JSON.stringify(metadata, null, 2));
    } catch (e) {
      // Couldn't parse metadata
    }
    
  } catch (error) {
    console.log("Not registered yet or error checking registration.");
    console.log("Error:", error instanceof Error ? error.message : error);
  }
}

main().catch(console.error);
