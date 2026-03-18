id: sentry
name: Sentry — Private Secure Vault
version: 0.3.0
description: >
  Sentry is a private, chat-first financial orchestrator for Keyless Agent Wallets on Celo/Celo Sepolia.
  It acts as a "Trusted Custodian of Intents" - storing encrypted owner signatures in a PostgreSQL "Vault"
  and applying personality-based policy checks before executing any transaction. All financial actions use
  signatures from the Vault (not Sentry's AUTH key).
  
  Sentry also exposes a JSON-RPC API for Agent-to-Agent (A2A) communication, allowing other agents
  to request payments programmatically.
triggers:
  - when: "A user asks to send tokens or execute a payment"
    then: "Run personality checks, verify authorization in Vault, pre-flight simulate, then execute."
  - when: "A user needs to deploy or link their Keyless wallet"
    then: "Guide /start → /create-wallet and provide signature deep-links."
  - when: "Funds must be reserved for a task (escrow) and released on completion"
    then: "Use /reserve-task and /complete-task patterns."
  - when: "An agent needs delegated authorization"
    then: "Use /authorize-agent to generate an owner-signed authorization stored in the Vault."
  - when: "User wants to instantly revoke an agent's authorization (gasless)"
    then: "Use /revoke to set isActive=false in Postgres Vault."
  - when: "User wants to see their transaction history"
    then: "Use /history to retrieve last N AuditLog entries."
  - when: "Another agent sends a JSON-RPC request for payment"
    then: "Check Authorizations table, verify agentId permission, auto-execute or return PERMISSION_DENIED."
json_rpc_interface:
  """
  Sentry exposes a JSON-RPC 2.0 interface for A2A communication.
  
  Request Format:
  {
    "jsonrpc": "2.0",
    "method": "sentry_request_payment",
    "params": {
      "fromUserHash": "keccak256(platform:id)",
      "agentId": "requesting-agent-id",
      "to": "0x...",
      "amount": "1000000000000000000",  // in wei
      "token": "cUSD",
      "reason": "Data API Fee"
    },
    "id": 1
  }
  
  Response - Success:
  {
    "jsonrpc": "2.0",
    "result": {
      "txHash": "0x...",
      "status": "PENDING"
    },
    "id": 1
  }
  
  Response - Permission Denied:
  {
    "jsonrpc": "2.0",
    "error": {
      "code": -32001,
      "message": "PERMISSION_DENIED",
      "data": {
        "reason": "No active authorization found for agent XYZ",
        "expiresAt": null,
        "maxSpend": null
      }
    },
    "id": 1
  }
  
  Response - Error:
  {
    "jsonrpc": "2.0",
    "error": {
      "code": -32000,
      "message": "Error description"
    },
    "id": 1
  }
  """
methods:
  - name: "sentry_request_payment"
    description: "Request a payment from a user's keyless wallet"
    params:
      - name: "fromUserHash"
        type: "string"
        description: "keccak256 of platform:id (e.g., keccak256('telegram:12345'))"
      - name: "agentId"
        type: "string"
        description: "The requesting agent's ID (must be authorized by the user)"
      - name: "to"
        type: "string"
        description: "Recipient address (0x...)"
      - name: "amount"
        type: "string"
        description: "Amount in wei"
      - name: "token"
        type: "string"
        description: "Token symbol (cUSD, CELO, etc.)"
      - name: "reason"
        type: "string"
        description: "Optional reason for the payment"
    returns: "txHash on success, PERMISSION_DENIED error if not authorized"
  
  - name: "sentry_check_authorization"
    description: "Check if an agent has authorization to pull funds"
    params:
      - name: "fromUserHash"
        type: "string"
      - name: "agentId"
        type: "string"
    returns: "Authorization details (expiresAt, maxSpend, isActive)"
  
  - name: "sentry_revoke_agent"
    description: "Revoke an agent's authorization (instant, gasless)"
    params:
      - name: "fromUserHash"
        type: "string"
      - name: "agentId"
        type: "string"
    returns: "Success confirmation"
capabilities:
  - name: "Personality Middleware"
    inputs:
      - "transfer intent (to, amount, token/symbol)"
      - "user profile (personality, whitelist)"
    outputs:
      - "ALLOW | QUEUE | MANUAL_CONFIRM request"
  - name: "Keyless Signature Deep-Links"
    inputs:
      - "create-wallet payload or agent authorization payload"
    outputs:
      - "WalletConnect pairing URI + universal link"
  - name: "Vault Authorization Storage"
    inputs:
      - "agentId, maxSpend, expiresAt, owner signature"
    outputs:
      - "Encrypted signature stored in Postgres (AES-256-GCM)"
  - name: "Auth Verification"
    inputs:
      - "eoaAddress, agentId, amount to spend"
    outputs:
      - "authorized: boolean, reason?: string, expiresAt?, maxSpend?"
  - name: "Pre-Flight Simulation"
    inputs:
      - "transaction (from, to, abi, functionName, args)"
    outputs:
      - "success: boolean, error?: string"
  - name: "Instant Revocation"
    inputs:
      - "agentId to revoke"
    outputs:
      - "isActive=false in Postgres (gasless)"
  - name: "Audit History"
    inputs:
      - "limit (number of entries)"
    outputs:
      - "Array of {action, timestamp, details, txHash}"
  - name: "Flash Escrow (Registry Reservations)"
    inputs:
      - "taskId, token, amount"
    outputs:
      - "on-chain reservation record"
  - name: "Adaptive Invoicing"
    inputs:
      - "payTo address + memo"
    outputs:
      - "signed invoice blob (memoId) usable for A2A payments"
  - name: "Sentry Seal"
    inputs:
      - "txHash, sender, timestamp, sentryId"
    outputs:
      - "signed receipt metadata packet"
security:
  - "Signatures are encrypted at rest using AES-256-GCM with ENCRYPTION_KEY"
  - "Sentry's AUTH key is used only for registry transactions (on-chain onboarding)"
  - "All owner-level financial actions use signatures from the Postgres Vault"
  - "AuditLog tracks nonces to prevent double-spending"
  - "Instant revocation is gasless (Postgres update, not on-chain)"
personality_rules:
  GUARDIAN:
    - "Blocks transfers > $10 unless recipient is whitelisted"
    - "Requires manual confirmation for high-value transactions"
  ACCOUNTANT:
    - "Queues transactions when gas > 50 gwei"
    - "Optimizes for low-cost execution"
  STRATEGIST:
    - "Suggests fund optimization when idle balance > $100"
    - "Allows most transfers automatically"
notes:
  - "Sentry never stores user private keys."
  - "The Vault (PostgreSQL) is the source of truth for agent authorizations."
  - "Use /revoke for instant, gasless revocation - no need to wait for block confirmations."

