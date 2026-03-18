# Keyless Sentry - Autonomous Financial Guardian

## Project Overview

Keyless Sentry is a headless autonomous agent designed to manage cryptocurrency transactions on behalf of human owners while ensuring security through a keyless architecture. The agent operates as a sovereign financial guardian that enforces policy-based transaction limits, monitors blockchain events, and maintains operational integrity through TEE (Trusted Execution Environment) attestation.

## Problem Statement

Traditional cryptocurrency wallets require private keys to be stored on the device, creating significant security risks:
- Private keys can be stolen through malware or phishing
- Single points of failure lead to catastrophic loss
- No autonomous operation possible without human intervention
- No built-in policy enforcement for spending limits

## Solution Architecture

Keyless Sentry addresses these problems through:

1. **Keyless Architecture**: The agent never holds private keys. All signatures are stored in an encrypted PostgreSQL vault (AES-256-GCM). The agent orchestrates transactions but cannot independently sign.

2. **ERC-8004 Identity**: Each Sentry agent registers as an identity NFT on Celo, providing a verifiable on-chain identity linked to its code hash.

3. **TEE Protection**: When running in a Trusted Execution Environment (Intel SGX/AMD SEV), the agent provides remote attestation quotes to prove it's running unmodified code.

4. **Policy Enforcement**: The Personality Engine implements guardian, accountant, and strategist personalities with configurable spending limits and approval workflows.

## Project Structure

```
keyless-sentry/
├── core/                    # Core business logic
│   ├── src/
│   │   ├── auth/           # Authentication & selfclaw
│   │   ├── db/             # Database client & repositories
│   │   ├── identity/       # ERC-8004 identity service
│   │   ├── reasoning/      # Personality engine
│   │   ├── registry/       # Smart contract interactions
│   │   ├── skills/         # Agent capabilities
│   │   ├── encryption.ts   # AES-256-GCM encryption
│   │   ├── errors.ts       # Error handling
│   │   ├── jsonRpcHandler.ts
│   │   └── signatureRequestService.ts
│   └── prisma/
│       └── schema.prisma   # Database schema
├── gateway/                # A2A protocol gateway
│   └── src/
│       ├── auth/           # Selfclaw verification
│       ├── commands.ts     # Command handlers
│       ├── index.ts        # Entry point
│       ├── router.ts      # Message routing
│       └── workspace/      # Persistent memory (SOUL.md, MEMORY.md)
├── contracts/             # Smart contracts
│   └── contracts/
│       └── SentryRegistry.sol
├── skills/                # Agent skill definitions
├── Dockerfile             # Standard deployment
├── Dockerfile.tee         # TEE-enabled deployment
└── docker-compose.yml     # Full stack deployment
```

## Core Modules

### 1. Encryption Service (`core/src/encryption.ts`)
Provides AES-256-GCM encryption for the signature vault. All sensitive data (private key shares, authorization signatures) is encrypted at rest.

**Key Features:**
- 256-bit AES encryption with authenticated GCM mode
- Environment-based key management
- Singleton pattern for service access

### 2. Identity Service (`core/src/identity/erc8004.ts`)
Implements the ERC-8004 identity standard on Celo blockchain. Each Sentry agent registers as an NFT with metadata including capabilities and A2A endpoint.

**Key Features:**
- Check-and-register flow on boot
- Metadata includes: name, type (Orchestrator), version, capabilities
- Integration with Keyless SDK for wallet creation

### 3. Selfclaw Service (`gateway/src/auth/selfclaw.ts`)
Provides code integrity verification through hashing and TEE attestation.

**Key Features:**
- SHA-256 hash of `gateway/src` and `core/src` directories
- TEE mode: fetches remote attestation quote from Intel SGX/TDX
- Exposes `sentry_verify_integrity` JSON-RPC method
- "Proof of Sentry" for hackathon verification

### 4. Heartbeat Service (`gateway/src/services/heartbeat.ts`)
Autonomous health check loop running every 30 minutes.

**Key Features:**
- Vault Health: Verifies Postgres connection
- Integrity Check: Re-runs selfclaw hash to detect tampering
- Logs CRITICAL_INTEGRITY_FAILURE if code hash changes

### 5. OpenClaw Service (`gateway/src/services/openclaw.ts`)
Embeds OpenClaw as a persistent cognitive service.

**Key Features:**
- Loads SOUL.md for agent personality configuration
- Manages MEMORY.md for session persistence
- Runs autonomous heartbeat operations

### 6. Personality Engine (`core/src/reasoning/personalityEngine.ts`)
Implements three personality types with different transaction policies:

- **Guardian**: Strict spending limits, requires manual confirmation for large transactions
- **Accountant**: Queues transactions during high gas prices
- **Strategist**: Optimizes idle funds, suggests yield strategies

## User Flow

### 1. Onboarding
```
User sends /start command
    → System creates wallet via Keyless SDK
    → User signs authorization via WalletConnect
    → Agent stores encrypted signature in vault
    → User assigned personality (Guardian/Accountant/Strategist)
```

### 2. Transaction Authorization
```
User initiates transfer
    → Agent intercepts via Personality Engine
    → Engine runs Triple-Check Filter:
        1. Simulation (viem)
        2. Policy alignment (maxSpend, allowedContracts)
        3. Reputation check (ERC-8004 Registry)
    → If passed: retrieve signature from vault, execute transaction
    → If blocked: request manual confirmation
```

### 3. Heartbeat Operations
```
Every 30 minutes:
    → Vault Health Check (Postgres + active signatures)
    → Integrity Check (re-hash src/ directories)
    → If integrity failure: enter LOCKDOWN_MODE
    → Log results to stdout
```

## Deployment

### Standard Deployment
```bash
docker-compose up -d
```

### TEE Deployment (Production)
```bash
docker-compose -f docker-compose.yml -f docker-compose.tee.yml up -d
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `KEYLESS_BASE_URL` | Keyless SDK endpoint |
| `KEYLESS_CHAIN_ID` | Blockchain chain ID |
| `KEYLESS_OWNER` | Owner wallet address |
| `DATABASE_URL` | PostgreSQL connection string |
| `ENCRYPTION_KEY` | 64-char hex encryption key |
| `IS_TEE` | Enable TEE mode (true/false) |
| `HEARTBEAT_INTERVAL_MINUTES` | Heartbeat frequency |

## JSON-RPC API

### sentry_verify_integrity
Returns code integrity attestation and hash.

**Request:**
```json
{
  "jsonrpc": "2.0",
  "method": "sentry_verify_integrity",
  "params": {},
  "id": 1
}
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "result": {
    "attestation": {
      "type": "code_integrity",
      "value": "sha256hash...",
      "timestamp": 1234567890,
      "version": "v0.4.0",
      "isTEE": false
    },
    "codeHash": "sha256hash...",
    "srcFiles": 42,
    "coreFiles": 28
  },
  "id": 1
}
```

### sentry_register_hackathon
Registers the Sentry agent for a hackathon event.

**Request:**
```json
{
  "jsonrpc": "2.0",
  "method": "sentry_register_hackathon",
  "params": {
    "hackathonId": "eth-global-lisbon-2024",
    "teamName": "Sentry Squad",
    "projectDescription": "Autonomous DeFi guardian"
  },
  "id": 2
}
```

## Security Model

1. **Keyless Principle**: Agent never holds private keys. Signatures are retrieved from encrypted vault only at transaction time.

2. **TEE Attestation**: When IS_TEE=true, hardware attestation proves the agent is running unmodified code in a secure enclave.

3. **Policy Enforcement**: All transactions must pass the Personality Engine's Triple-Check Filter before execution.

4. **Audit Trail**: All actions logged to Postgres with timestamps and txHashes.

## Development

### Prerequisites
- Bun runtime
- Docker & Docker Compose
- PostgreSQL (for local development)

### Build
```bash
bun install
bun run build
```

### Run Tests
```bash
bun test
```

## License

MIT
