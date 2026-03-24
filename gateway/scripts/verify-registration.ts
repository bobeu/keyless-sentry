/**
 * Verify BountyClaw Agent registration - find tokens owned by address
 */
import "dotenv/config";
import { createPublicClient, http } from "viem";
import { celo } from "viem/chains";

const ERC8004_REGISTRY_ADDRESS = process.env.ERC8004_REGISTRY_ADDRESS as string;
const SENTRY_RPC_URL = process.env.SENTRY_RPC_URL as string;
const KEYLESS_OWNER = process.env.KEYLESS_OWNER as string;

// ERC-721 IdentityRegistry ABI
const ERC721_ABI = [
  {
    name: "balanceOf",
    type: "function",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
    stateMutability: "view",
  },
  {
    name: "ownerOf",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "owner", type: "address" }],
    stateMutability: "view",
  },
  {
    name: "tokenURI",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "uri", type: "string" }],
    stateMutability: "view",
  },
  {
    name: "getAgentWallet",
    type: "function",
    inputs: [{ name: "agentId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
] as const;

async function main() {
  console.log("=== Verifying BountyClaw Registration ===\n");
  
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
  
  // Check balance of owner
  const balance = await publicClient.readContract({
    address: ERC8004_REGISTRY_ADDRESS as `0x${string}`,
    abi: ERC721_ABI,
    functionName: "balanceOf",
    args: [KEYLESS_OWNER as `0x${string}`],
  });
  
  console.log(`Token Balance for ${KEYLESS_OWNER}: ${balance}`);
  
  if (balance > 0n) {
    console.log(`\n✅ The address owns ${balance} token(s)!`);
    
    // Search for the token - let's try a range around the recent transaction
    // The transaction minted token 3780 but that seems to be owned by someone else now
    // Let's try a broader search
    
    // Try token IDs from 1 to 5000
    console.log("\nSearching for token IDs owned by this address...");
    
    for (let tokenId = 1n; tokenId <= 5000n; tokenId++) {
      try {
        const owner = await publicClient.readContract({
          address: ERC8004_REGISTRY_ADDRESS as `0x${string}`,
          abi: ERC721_ABI,
          functionName: "ownerOf",
          args: [tokenId],
        });
        
        if (owner.toLowerCase() === KEYLESS_OWNER.toLowerCase()) {
          console.log(`\n✅ Found! Token ID ${tokenId} is owned by ${KEYLESS_OWNER}`);
          
          // Get token URI
          try {
            const tokenURI = await publicClient.readContract({
              address: ERC8004_REGISTRY_ADDRESS as `0x${string}`,
              abi: ERC721_ABI,
              functionName: "tokenURI",
              args: [tokenId],
            });
            console.log(`   Token URI: ${tokenURI}`);
            
            // Decode the URI
            if (tokenURI.startsWith("data:application/json,")) {
              const jsonStr = decodeURIComponent(tokenURI.replace("data:application/json,", ""));
              const metadata = JSON.parse(jsonStr);
              console.log(`   Name: ${metadata.name}`);
              console.log(`   Description: ${metadata.description}`);
            }
          } catch (e) {
            // Token URI might not be set
          }
          
          // Try getAgentWallet
          try {
            const agentWallet = await publicClient.readContract({
              address: ERC8004_REGISTRY_ADDRESS as `0x${string}`,
              abi: ERC721_ABI,
              functionName: "getAgentWallet",
              args: [tokenId],
            });
            console.log(`   Agent Wallet: ${agentWallet}`);
          } catch (e) {
            // getAgentWallet might not exist
          }
          
          break;
        }
      } catch (e) {
        // Token might not exist, skip
      }
    }
  } else {
    console.log("\n❌ No tokens found for this address");
  }
}

main().catch(console.error);
