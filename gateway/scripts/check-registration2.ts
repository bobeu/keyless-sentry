/**
 * Check if BountyClaw is already registered on Celo Mainnet
 * Try different registry addresses
 */
import "dotenv/config";
import { createPublicClient, http } from "viem";
import { celo } from "viem/chains";

const SENTRY_RPC_URL = process.env.SENTRY_RPC_URL as string;
const KEYLESS_OWNER = process.env.KEYLESS_OWNER as string;

// Try both registry addresses from .env
const REGISTRY_ADDRESSES = [
  "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432", // Active in .env
  "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63", // Commented in .env
];

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
  
  console.log(`RPC:      ${SENTRY_RPC_URL}`);
  console.log(`Identity: ${KEYLESS_OWNER}\n`);
  
  // Create public client
  const publicClient = createPublicClient({
    chain: celo,
    transport: http(SENTRY_RPC_URL),
  });
  
  for (const registry of REGISTRY_ADDRESSES) {
    console.log(`\n--- Trying Registry: ${registry} ---`);
    
    try {
      const identity = await publicClient.readContract({
        address: registry as `0x${string}`,
        abi: ERC8004_ABI,
        functionName: "getIdentity",
        args: [KEYLESS_OWNER as `0x${string}`],
      });
      
      console.log("✅ FOUND REGISTRATION!");
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
      console.log("❌ Not registered with this registry");
    }
  }
}

main().catch(console.error);
