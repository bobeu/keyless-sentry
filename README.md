---
# Keyless Sentry - The Sovereign Financial Vault

## Description
Keyless Sentry is a headless, autonomous Financial Orchestrator designed to provide a secure "Banking Layer" for AI agent swarms. Built as a core implementation of the Keyless-Collective SDK, Sentry acts as a trusted custodian that allows other AI agents to execute blockchain transactions without ever touching a private key. 

By combining AES-256-GCM encrypted vaults, TEE (Trusted Execution Environment) hardware security, and a Personality-driven Policy Engine, Sentry ensures that autonomous finance is safe, verifiable, and strictly bound by human intent.

## Problem Statement
The 'Agent Bottleneck' in Web3 is security:
- The Key Exposure Risk: If you give an AI agent a private key, a single prompt-injection or environment breach results in the loss of all funds.
- Lack of Granular Control: Traditional wallets are "all or nothing." There is no middle ground between a dormant wallet and a fully exposed one.
- Complexity for Developers: Building secure transaction logic into every single agent is redundant and prone to error.

## The Solution
Sentry moves the "signing authority" away from the agent and into a Secure Vault. 
- It uses the Keyless-Collective SDK to separate the intent to spend from the authority to sign.
- It introduces Personality-based Governance, where different "Financial Personas" (Guardian, Accountant, Strategist) apply logic to every request.
- It provides A2A (Agent-to-Agent) Interoperability, allowing Sentry to serve as a decentralized back-office for an entire swarm of specialized agents.

## Mission
To become the standard Security Gateway for the autonomous economy-enabling agents to be financially active while ensuring the human owner remains the ultimate sovereign.

## Target Audience
1. Agent Developers: Who need a plug-and-play financial layer for their bots.
2. DeFi Power Users: Who want to automate strategies with "Guardian" oversight.
3. Hackathon Participants (Synthesis/Celo): Who require a verifiable, ERC-8004 compatible identity for their agent submissions.

## Why "Keyless-Sentry"?
The name reflects its two core pillars:
1. Keyless-Collective SDK: Sentry is the flagship implementation of the Keyless-Collective architecture. It proves that an agent can be a high-frequency financial actor without "holding" keys, using owner-signed authorizations instead.
2. Sentry: Like a sentinel at the vault door, it stands between external requests and the blockchain, enforcing rules, simulating outcomes, and watching for network shocks.

---

## Agent-to-Agent (A2A) Interface
Sentry is designed to be called by other agents. It exposes a JSON-RPC 2.0 gateway that follows the Synthesis Skill Standard.

How other agents use Sentry:
1. Discovery: An agent finds Sentry via its ERC-8004 Manifest.
2. Request: The agent sends a sentry_request_payment intent.
3. Validation: Sentry checks its Postgres Vault: "Does this AgentID have permission to spend X from User Y?"
4. Execution: Sentry simulates the tx, signs via the Keyless SDK, and returns a txHash.

### Use Case Scenarios:
- The Research Swarm: A "Data Agent" finds a paywalled paper. It pings Sentry to pay the 1 cUSD fee. Sentry checks the "Accountant" policy and auto-approves the micro-payment.
- The Liquidity Guard: A "Strategist Agent" notices a yield opportunity. Sentry simulates the move, detects a high slippage risk (Guardian logic), and blocks the transaction until the user provides a manual override.
- The Emergency Lockdown: Sentry's Heartbeat detects a smart contract exploit on Celo. It autonomously revokes all agent authorizations and moves funds to a cold "Safe" personality.

---

## Core Architecture

### 1. The Vault (AES-256-GCM)
Signatures are never stored in plain text. They are encrypted at rest and only decrypted inside the runtime (ideally a TEE) at the moment of execution.

### 2. Selfclaw Verification (Integrity)
Sentry proves it is running the correct code.
- Standard Mode: Generates a deterministic SHA-256 hash of the core and gateway.
- TEE Mode: Generates a hardware-level Remote Attestation Quote proving the code is running inside an Intel SGX/TDX enclave.

### 3. Personality Engine
- Guardian: Blocks high-value transfers; prioritizes security over speed.
- Accountant: Focuses on gas efficiency; queues non-urgent tasks.
- Strategist: Optimized for high-frequency A2A interactions.

---

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
├── Dockerfile.tee        # TEE-enabled deployment
└── docker-compose.yml     # Full stack deployment
```

---

## Core Modules

### 1. Encryption Service (core/src/encryption.ts)
Provides AES-256-GCM encryption for the signature vault. All sensitive data (private key shares, authorization signatures) is encrypted at rest.

Key Features:
- 256-bit AES encryption with authenticated GCM mode
- Environment-based key management
- Singleton pattern for service access

### 2. Identity Service (core/src/identity/erc8004.ts)
Implements the ERC-8004 identity standard on Celo blockchain. Each Sentry agent registers as an NFT with metadata including capabilities and A2A endpoint.

Key Features:
- Check-and-register flow on boot
- Metadata includes: name, type (Orchestrator), version, capabilities
- Integration with Keyless SDK for wallet creation

### 3. Selfclaw Service (gateway/src/auth/selfclaw.ts)
Provides code integrity verification through hashing and TEE attestation.

Key Features:
- SHA-256 hash of gateway/src and core/src directories
- TEE mode: fetches remote attestation quote from Intel SGX/TDX
- Exposes sentry_verify_integrity JSON-RPC method
- "Proof of Sentry" for hackathon verification

### 4. Heartbeat Service (gateway/src/services/heartbeat.ts)
Autonomous health check loop running every 30 minutes.

Key Features:
- Vault Health: Verifies Postgres connection
- Integrity Check: Re-runs selfclaw hash to detect tampering
- Logs CRITICAL_INTEGRITY_FAILURE if code hash changes

### 5. OpenClaw Service (gateway/src/services/openclaw.ts)
Embeds OpenClaw as a persistent cognitive service.

Key Features:
- Loads SOUL.md for agent personality configuration
- Manages MEMORY.md for session persistence
- Runs autonomous heartbeat operations

### 6. Personality Engine (core/src/reasoning/personalityEngine.ts)
Implements three personality types with different transaction policies:

- Guardian: Strict spending limits, requires manual confirmation for large transactions
- Accountant: Queues transactions during high gas prices
- Strategist: Optimizes idle funds, suggests yield strategies

---

## Deployment & Integrity

### Environment Setup
Sentry is optimized for low-resource environments (4GB RAM). It uses postgres:alpine and bun to keep the footprint lean.

| Variable | Importance |
|----------|-------------|
| ENCRYPTION_KEY | Critical. 32-byte hex key used to seal the Vault. |
| IS_TEE | Set to true when deploying to providers like Phala Puffer. |

### Integrity Check
To verify a Sentry instance is untampered, call:
```bash
curl -X POST http://localhost:18789 -d '{"jsonrpc":"2.0","method":"sentry_verify_integrity","id":1}'
```

---

## ERC-8004 Compatibility
Sentry is ERC-8004 ready. It provides a standardized manifest (sentry_get_manifest) that allows it to be registered as an Identity NFT on the Celo network, linking its on-chain persona to its verifiable Selfclaw hash.

---

## User Flow

### 1. Onboarding
User sends /start command
    -> System creates wallet via Keyless SDK
    -> User signs authorization via WalletConnect
    -> Agent stores encrypted signature in vault
    -> User assigned personality (Guardian/Accountant/Strategist)

### 2. Transaction Authorization
User initiates transfer
    -> Agent intercepts via Personality Engine
    -> Engine runs Triple-Check Filter:
        1. Simulation (viem)
        2. Policy alignment (maxSpend, allowedContracts)
        3. Reputation check (ERC-8004 Registry)
    -> If passed: retrieve signature from vault, execute transaction
    -> If blocked: request manual confirmation

### 3. Heartbeat Operations
Every 30 minutes:
    -> Vault Health Check (Postgres + active signatures)
    -> Integrity Check (re-hash src/ directories)
    -> If integrity failure: enter LOCKDOWN_MODE
    -> Log results to stdout

## JSON-RPC API

### sentry_verify_integrity
Returns code integrity attestation and hash.

Request:
```json
{
  "jsonrpc": "2.0",
  "method": "sentry_verify_integrity",
  "params": {},
  "id": 1
}
```

Response:
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

Request:
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

1. Keyless Principle: Agent never holds private keys. Signatures are retrieved from encrypted vault only at transaction time.

2. TEE Attestation: When IS_TEE=true, hardware attestation proves the agent is running unmodified code in a secure enclave.

3. Policy Enforcement: All transactions must pass the Personality Engine's Triple-Check Filter before execution.

4. Audit Trail: All actions logged to Postgres with timestamps and txHashes.

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

## Troubleshooting

### High Memory Usage
1. Ensure .kiloignore excludes node_modules/
2. Close unnecessary VS Code windows
3. Restart Docker containers

### Database Connection Issues
```bash
# Check PostgreSQL logs
docker-compose logs postgres

# Verify connection string
docker-compose exec sentry-gateway sh -c 'echo $DATABASE_URL'
```

## License

MIT
