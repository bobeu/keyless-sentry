# Sentry — The Private Secure Vault

## Executive Summary

Sentry is a Financial Orchestrator for AI agents built on the Keyless Collective SDK. It enables AI agents to execute transactions without holding private keys, using owner-signed authorizations stored in a secure PostgreSQL "Vault."

## Version History

- **v0.4.0**: ERC-8004 Identity & Selfclaw Verification
- **v0.3.0**: A2A Discovery Interface (JSON-RPC) + Transaction Watcher
- **v0.2.0**: Postgres Vault with encryption
- **v0.1.0**: Initial on-chain registry

## Architecture Overview

### The Problem
AI agents need to pay for things, but they shouldn't hold private keys. If an agent is compromised, the attacker could drain all funds.

### The Solution
Sentry acts as a "Trusted Custodian of Intents." It:
1. Collects owner signatures via WalletConnect deep-links
2. Stores encrypted signatures in PostgreSQL (the "Vault")
3. Verifies authorizations before allowing any transaction
4. Applies personality-based rules (Guardian, Accountant, Strategist)
5. Executes transactions using the Keyless Collective SDK
6. Monitors transaction lifecycle until confirmation
7. Exposes JSON-RPC API for Agent-to-Agent communication

## Key Features

### 1. Postgres Vault (v0.2.0)
Signatures are encrypted using AES-256-GCM:
- **Key**: `ENCRYPTION_KEY` environment variable (32 bytes)
- **IV**: Random 16-byte IV per encryption
- **Auth Tag**: Ensures ciphertext integrity

### 2. Transaction Watcher (v0.3.0)
Tracks transaction lifecycle:
- Uses `publicClient.waitForTransactionReceipt()` from viem
- Updates AuditLog status: PENDING → SUCCESS/FAILED
- Notifies via stdout JSON when status changes
- Tracks gas used for cost analysis

### 3. A2A Discovery Interface (v0.3.0)
JSON-RPC 2.0 API for agent communication:

**Methods:**
- `sentry_request_payment` - Request payment from user wallet
- `sentry_check_authorization` - Check agent permissions
- `sentry_revoke_agent` - Instant, gasless revocation
- `sentry_verify_integrity` - Verify agent integrity (v0.4.0)

**Example Request:**
```json
{
  "jsonrpc": "2.0",
  "method": "sentry_request_payment",
  "params": {
    "fromUserHash": "keccak256('telegram:12345')",
    "agentId": "data-api-agent",
    "to": "0x...",
    "amount": "1000000000000000000",
    "token": "cUSD"
  },
  "id": 1
}
```

**PERMISSION_DENIED Error:**
```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32001,
    "message": "PERMISSION_DENIED",
    "data": { "reason": "No active authorization for agent 'X'" }
  },
  "id": 1
}
```

### 4. ERC-8004 Identity Registry (v0.4.0)
Registers Sentry as an identity on Celo using ERC-8004:
- **Contract**: `ERC8004_REGISTRY_ADDRESS` on Celo
- **Metadata**: Includes Sentry version (v0.4.0) and A2A JSON-RPC endpoint
- **Registration**: Uses KeylessClient to sign the registration

### 5. Selfclaw Verification (v0.4.0)
Integrity verification for auditors:

**TEE Mode** (`IS_TEE=true`):
- Fetches Remote Attestation Quote from Intel SGX/ARM TrustZone/AMD SEV
- Uses `TEE_ATTESTATION_URL` for attestation service

**Non-TEE Mode** (default):
- Generates SHA-256 hash of the `dist/` folder
- Provides build integrity verification

**Verify Integrity Request:**
```json
{
  "jsonrpc": "2.0",
  "method": "sentry_verify_integrity",
  "params": {
    "includeAttestation": true
  },
  "id": 1
}
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "result": {
    "isTEE": false,
    "attestationType": "build_hash",
    "value": "a1b2c3d4...",
    "version": "v0.4.0",
    "timestamp": 1710748800000,
    "buildId": "build-a1b2c3d4"
  },
  "id": 1
}
```

## Deployment

### Docker Compose
```yaml
services:
  postgres:
    image: postgres:alpine
    mem_limit: 256mb
  
  sentry-gateway:
    mem_limit: 512mb
    environment:
      - DATABASE_URL=postgresql://...@postgres:5432/sentry
      - ENCRYPTION_KEY=...
```

### Health Check
```bash
curl -X POST http://localhost:18789/health
```

Response:
```json
{
  "orchestrator": "healthy",
  "dbStatus": "connected",
  "integrityScore": {
    "successRate": 95,
    "total": 100,
    "successful": 95,
    "failed": 5
  },
  "timestamp": "2026-03-18T..."
}
```

## Database Schema

### Users
```prisma
model User {
  hashedId      String     // keccak256(platform:id)
  eoaAddress    String     // Owner's EOA
  walletAddress String?    // Deployed keyless wallet
  personality   Personality
}
```

### Authorizations (The Vault)
```prisma
model Authorization {
  id          String   @id @default(uuid())
  userHashedId String
  agentId     String
  signature   String   // Encrypted hex (AES-256-GCM)
  maxSpend    String   // Wei
  expiresAt   Int      // Unix timestamp
  isActive    Boolean  @default(true)
}
```

### Audit Logs
```prisma
model AuditLog {
  id          String        @id @default(uuid())
  userHashedId String
  action      String
  txHash      String?
  nonce       String?
  status      PENDING | SUCCESS | FAILED
  gasUsed     String?
  timestamp   DateTime
  details     Json?
}
```

## Security Model

- **Sentry AUTH Key**: Used only for service-level operations (on-chain registry)
- **Owner Signatures**: All financial actions use signatures from Postgres "Vault"
- **Double-Spend Prevention**: AuditLog tracks nonces
- **Instant Revocation**: Gasless Postgres update (no on-chain wait)
- **Transaction Watching**: Ensures funds don't get lost in reverts

## Future Enhancements

1. **Multi-sig Support**: Multiple owners required for high-value transactions
2. **Time-locked Vaults**: Funds unlock after cooldown period
3. **Rate Limiting**: Max transactions per hour/day
4. **Hardware Security Module**: Store encryption key in HSM
5. **ZKP Verification**: Prove authorization without revealing details
