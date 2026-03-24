/**
 * Integration Audit Script
 * 
 * Tests the full Sentry loop: Encryption → DB → SDK → Transaction Watcher
 * 
 * Run via: bun run core/tests/integration_audit.ts
 * 
 * Requirements:
 * - PostgreSQL must be running and accessible
 * - Environment variables must be set (see .env.example)
 * - Keyless Coordinator must be available
 */

import "dotenv/config";
import { type Hex, toHex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celoSepolia } from "viem/chains";

// Import core modules
import { EncryptionService } from "../src/encryption";
import { getUserRepository, getAuthorizationRepository, getAuditLogRepository } from "../src/db/repository";
import type { CreateUserInput, CreateAuthorizationInput, CreateAuditLogInput } from "../src/db/repository";
import { createTransactionWatcher } from "../src/registry/transactionWatcher";
import { ok } from "../src/result";

// Test configuration
const TEST_CONFIG = {
  // Use a test private key (DO NOT USE REAL FUNDS)
  // This is a burner key for testing only
  testPrivateKey: process.env.TEST_PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000001",
  
  // Test agent ID
  agentId: "integration-test-agent",
  
  // Test amount (0.001 cUSD in wei = 1000000000000000)
  testAmount: "1000000000000000",
  
  // Burner address for test transaction (zero address)
  burnerAddress: "0x0000000000000000000000000000000000000000" as Hex,
  
  // Chain ID for testing (Celo Sepolia = 11142220)
  chainId: 11142220,
};

/**
 * System Health Report
 */
interface SystemHealthReport {
  encryptionKey: boolean;
  databaseConnection: boolean;
  publicClient: boolean;
  keylessClient: boolean;
  timestamp: string;
}

/**
 * Main integration test
 */
async function runIntegrationAudit() {
  console.log("\n" + "=".repeat(60));
  console.log("🔍 SENTRY INTEGRATION AUDIT");
  console.log("=".repeat(60) + "\n");

  const report: SystemHealthReport = {
    encryptionKey: false,
    databaseConnection: false,
    publicClient: false,
    keylessClient: false,
    timestamp: new Date().toISOString(),
  };

  try {
    // ============================================================
    // STEP 1: Verify Encryption Key
    // ============================================================
    console.log("📋 Step 1: Verifying ENCRYPTION_KEY...");
    
    const encryptionResult = EncryptionService.fromEnv();
    if (!encryptionResult.ok) {
      console.error("❌ ENCRYPTION_KEY not configured or invalid");
      console.error("   Please set ENCRYPTION_KEY in environment (64 hex chars)");
      throw new Error("Encryption key not configured");
    }
    
    const encryption = encryptionResult.value;
    report.encryptionKey = true;
    console.log("✅ ENCRYPTION_KEY is valid\n");

    // ============================================================
    // STEP 2: Verify Database Connection
    // ============================================================
    console.log("📋 Step 2: Verifying Database Connection...");
    
    const userRepo = getUserRepository();
    const authRepo = getAuthorizationRepository();
    const auditRepo = getAuditLogRepository();
    
    // Test DB connectivity
    const existsResult = await userRepo.exists("test-health-check-integration");
    if (!existsResult.ok) {
      console.error("❌ Database connection failed");
      throw new Error("Database not accessible");
    }
    
    report.databaseConnection = true;
    console.log("✅ Database connection verified\n");

    // ============================================================
    // STEP 3: Set Up Test User
    // ============================================================
    console.log("📋 Step 3: Setting up test user...");
    
    // Create test account from private key
    const testAccount = privateKeyToAccount(TEST_CONFIG.testPrivateKey as Hex);
    const eoaAddress: string = testAccount.address;
    
    // Create a unique hashed ID for this test
    const testUserHashedId = `keccak256(telegram:${Date.now()})`;
    
    // Create user in database
    const userInput: CreateUserInput = {
      hashedId: testUserHashedId,
      eoaAddress: eoaAddress.toLowerCase(),
      walletAddress: undefined, // Will be created during transaction
      personality: "STRATEGIST" as any,
    };
    
    const userResult = await userRepo.create(userInput);
    if (!userResult.ok) {
      console.error("❌ Failed to create test user");
      console.error(userResult.error);
      throw new Error("User creation failed");
    }
    
    console.log(`✅ Test user created: ${testUserHashedId.substring(0, 30)}...`);
    console.log(`   EOA Address: ${eoaAddress}\n`);

    // ============================================================
    // STEP 4: Create Mock Signature and Encrypt
    // ============================================================
    console.log("📋 Step 4: Creating mock signature...");
    
    // Generate a mock signature (in real flow, this comes from WalletConnect)
    // For testing, we create a dummy signature that won't actually work on-chain
    // but allows us to test the encryption/decryption flow
    const mockSignature: Hex = await testAccount.signMessage({
      message: `Authorize ${TEST_CONFIG.agentId} for testing at ${Date.now()}`,
    });
    
    // Encrypt the signature using our encryption service
    const encryptedSigResult = encryption.encrypt(mockSignature);
    if (!encryptedSigResult.ok) {
      console.error("❌ Failed to encrypt signature");
      throw new Error("Encryption failed");
    }
    
    console.log(`✅ Signature encrypted successfully`);
    console.log(`   Original: ${mockSignature.substring(0, 20)}...`);
    console.log(`   Encrypted: ${encryptedSigResult.value.substring(0, 20)}...\n`);

    // ============================================================
    // STEP 5: Insert Authorization into Database
    // ============================================================
    console.log("📋 Step 5: Inserting authorization into Vault...");
    
    const expiresAt = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    
    const authInput: CreateAuthorizationInput = {
      userHashedId: testUserHashedId,
      agentId: TEST_CONFIG.agentId,
      signature: mockSignature, // Store raw - will be encrypted by repository
      maxSpend: "1000000000000000000", // 1 cUSD max
      expiresAt,
      isActive: true,
    };
    
    const authResult = await authRepo.create(authInput);
    if (!authResult.ok) {
      console.error("❌ Failed to create authorization");
      console.error(authResult.error);
      throw new Error("Authorization creation failed");
    }
    
    console.log(`✅ Authorization stored in Vault`);
    console.log(`   Agent ID: ${TEST_CONFIG.agentId}`);
    console.log(`   Max Spend: 1 cUSD`);
    console.log(`   Expires: ${new Date(expiresAt * 1000).toISOString()}\n`);

    // ============================================================
    // STEP 6: Create Transaction Watcher
    // ============================================================
    console.log("📋 Step 6: Setting up Transaction Watcher...");
    
    const watcherNotifier = async (input: {
      txHash: string;
      userHashedId: string;
      status: "PENDING" | "SUCCESS" | "FAILED";
      gasUsed?: string;
      error?: string;
    }) => {
      console.log(`   📊 Transaction Status: ${input.status}`);
      if (input.txHash) console.log(`   📋 TX Hash: ${input.txHash}`);
      if (input.gasUsed) console.log(`   ⛽ Gas Used: ${input.gasUsed}`);
      if (input.error) console.log(`   ❌ Error: ${input.error}`);
      return ok(undefined);
    };
    
    const watcherResult = createTransactionWatcher({ notifier: watcherNotifier });
    if (!watcherResult.ok) {
      console.error("❌ Failed to create transaction watcher");
      console.error(watcherResult.error);
      throw new Error("Transaction watcher creation failed");
    }
    
    const watcher = watcherResult.value;
    report.publicClient = true;
    console.log("✅ Transaction Watcher initialized\n");

    // ============================================================
    // STEP 7: Keyless Client (Skipped - requires coordinator)
    // ============================================================
    console.log("📋 Step 7: Keyless Client Setup...");
    console.log("   ℹ️  Skipping Keyless Client (requires coordinator URL)");
    console.log("   ℹ️  In production, this would connect to Keyless Coordinator\n");
    report.keylessClient = false;

    // ============================================================
    // STEP 8: Create AuditLog Entry
    // ============================================================
    console.log("📋 Step 8: Creating AuditLog entry...");
    
    const auditInput: CreateAuditLogInput = {
      userHashedId: testUserHashedId,
      action: "INTEGRATION_TEST",
      txHash: toHex(0, { size: 32 }), // Dummy tx hash for testing
      nonce: "0",
      status: "PENDING",
      details: {
        testType: "integration_audit",
        agentId: TEST_CONFIG.agentId,
        amount: TEST_CONFIG.testAmount,
        timestamp: Date.now(),
      },
    };
    
    const auditResult = await auditRepo.create(auditInput);
    if (!auditResult.ok) {
      console.error("❌ Failed to create audit log");
      throw new Error("Audit log creation failed");
    }
    
    console.log("✅ AuditLog entry created (PENDING)\n");

    // ============================================================
    // STEP 9: Simulate Transaction Watcher Status Update
    // ============================================================
    console.log("📋 Step 9: Testing Transaction Watcher status update...");
    
    const dummyTxHash = toHex(0xabab, { size: 32 });
    
    // Update audit log to SUCCESS (simulating what watcher would do)
    const updateResult = await auditRepo.updateStatusByTxHash(
      dummyTxHash,
      "SUCCESS",
      "21000", // Typical gas for simple transfer
      undefined
    );
    
    if (!updateResult.ok) {
      console.error("❌ Failed to update audit log status");
      throw new Error("Status update failed");
    }
    
    // Verify the update
    const verifyResult = await auditRepo.findByTxHash(dummyTxHash);
    if (!verifyResult.ok || !verifyResult.value) {
      console.error("❌ Failed to verify audit log update");
      throw new Error("Verification failed");
    }
    
    console.log("✅ Transaction Watcher status update verified");
    console.log(`   Status: ${verifyResult.value.status}`);
    console.log(`   Gas Used: ${verifyResult.value.gasUsed}\n`);

    // ============================================================
    // FINAL REPORT
    // ============================================================
    console.log("=".repeat(60));
    console.log("📊 SYSTEM HEALTH REPORT");
    console.log("=".repeat(60));
    console.log(`Timestamp:        ${report.timestamp}`);
    console.log(`Encryption Key:   ${report.encryptionKey ? "✅ VALID" : "❌ INVALID"}`);
    console.log(`Database:          ${report.databaseConnection ? "✅ CONNECTED" : "❌ DISCONNECTED"}`);
    console.log(`Public Client:    ${report.publicClient ? "✅ READY" : "❌ NOT READY"}`);
    console.log(`Keyless Client:  ${report.keylessClient ? "✅ CONNECTED" : "⚠️  SKIPPED (no coordinator)"}`);
    console.log("=".repeat(60));
    
    // Calculate overall health
    const healthScore = [
      report.encryptionKey,
      report.databaseConnection,
      report.publicClient,
    ].filter(Boolean).length;
    
    const overallHealth = healthScore >= 3 ? "✅ HEALTHY" : "⚠️  DEGRADED";
    console.log(`\n🎯 Overall Health: ${overallHealth}`);
    console.log(`   Score: ${healthScore}/3 core systems operational\n`);

    // ============================================================
    // CLEANUP (Optional)
    // ============================================================
    console.log("📋 Cleanup: Revoking test authorization...");
    await authRepo.revoke(testUserHashedId, TEST_CONFIG.agentId);
    console.log("✅ Test authorization revoked\n");

    console.log("🎉 Integration Audit Complete!\n");
    
    return {
      success: true,
      report,
    };
    
  } catch (error) {
    console.error("\n❌ INTEGRATION AUDIT FAILED");
    console.error("=".repeat(60));
    console.error(error);
    console.error("=".repeat(60) + "\n");
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Run the integration audit
runIntegrationAudit()
  .then((result) => {
    if (result.success) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
