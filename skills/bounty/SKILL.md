id: bounty
name: BountyClaw — The Arbiter
version: 2.1.0
description: >
  BountyClaw (The Arbiter) is an autonomous bounty management agent for Celo. No smart contracts - all escrow via Keyless SDK. It creates, manages, and verifies 
  bounties with AI-powered judgment. Hunters submit proof of work, and Bounty-Bot uses AI to verify submissions 
  and release escrow funds. All bounty escrow wallets are created via Keyless Collective SDK.
  
  Bounty-Bot exposes a JSON-RPC 2.0 API for Agent-to-Agent (A2A) communication, allowing other agents and users
  to create bounties, submit work, and receive automated verification.
triggers:
  - when: "A user wants to create a new bounty with escrow"
    then: "Call bounty_create with title, description, rewardAmount. Bounty-Bot creates escrow wallet."
  - when: "A hunter wants to see available bounties"
    then: "Call bounty_get_active to retrieve all open bounties."
  - when: "A hunter completes a bounty task and wants to submit proof"
    then: "Call bounty_submit with bountyId, proofUrl, hunterAddress."
  - when: "Bounty creator or AI Judge wants to verify a submission"
    then: "Call bounty_verify with bountyId, verdict (APPROVED/REJECTED), reasoning."
  - when: "A bounty needs to be released or cancelled"
    then: "Call bounty_release with bountyId and approved boolean."
json_rpc_interface: |
  # Bounty-Bot JSON-RPC 2.0 Interface
  
  ## Request Format
  ```json
  {
    "jsonrpc": "2.0",
    "method": "bounty_create",
    "params": {
      "callerTelegramId": "keccak256(telegram:12345)",
      "title": "Fix login bug",
      "description": "Fix the OAuth redirect issue on mobile",
      "rewardAmount": "1000000000000000000",
      "hunterAddress": "0x...",
      "expiresAt": 1699999999
    },
    "id": 1
  }
  ```
  
  ## Responses
  - Success: `{ "jsonrpc": "2.0", "result": { "success": true, "bountyId": "...", "escrowAddress": "0x...", "status": "OPEN" }, "id": 1 }`
  - Error: `{ "jsonrpc": "2.0", "error": { "code": -32000, "message": "Error description" }, "id": 1 }`
methods:
  - name: "bounty_create"
    description: "Create a new bounty with Keyless escrow wallet"
    params:
      - name: "callerTelegramId"
        type: "string"
        description: "Hashed Telegram ID of the bounty creator"
      - name: "title"
        type: "string"
        description: "Bounty title (max 200 chars)"
      - name: "description"
        type: "string"
        description: "Detailed bounty description"
      - name: "rewardAmount"
        type: "string"
        description: "Reward amount in wei"
      - name: "hunterAddress"
        type: "string"
        description: "Specific hunter address (optional, null for open bounty)"
      - name: "expiresAt"
        type: "number"
        description: "Unix timestamp for bounty expiration (optional)"
    returns: "bountyId, escrowAddress, status"
  
  - name: "bounty_get_active"
    description: "Get all active (open) bounties"
    params:
      - name: "callerTelegramId"
        type: "string"
        description: "Optional filter by creator"
      - name: "hunterAddress"
        type: "string"
        description: "Optional filter by assigned hunter"
    returns: "Array of active bounties with id, title, description, rewardAmount, status, escrowAddress"
  
  - name: "bounty_submit"
    description: "Hunter submits proof of work for a bounty"
    params:
      - name: "callerTelegramId"
        type: "string"
        description: "Hashed Telegram ID of the hunter"
      - name: "bountyId"
        type: "string"
        description: "ID of the bounty being submitted to"
      - name: "proofUrl"
        type: "string"
        description: "URL to proof (GitHub PR, document, etc.)"
      - name: "hunterAddress"
        type: "string"
        description: "Hunter's wallet address"
    returns: "success status, new bounty status (ESCROWED)"
  
  - name: "bounty_verify"
    description: "AI Judge verifies a bounty submission"
    params:
      - name: "callerTelegramId"
        type: "string"
        description: "Hashed Telegram ID of verifier (AI or human)"
      - name: "bountyId"
        type: "string"
        description: "ID of the bounty to verify"
      - name: "verdict"
        type: "string"
        description: "APPROVED or REJECTED"
      - name: "reasoning"
        type: "string"
        description: "AI or human reasoning for the verdict"
    returns: "verdict, reasoning, final status"
  
  - name: "bounty_release"
    description: "Release escrow funds to hunter or cancel bounty"
    params:
      - name: "callerTelegramId"
        type: "string"
        description: "Hashed Telegram ID of the release initiator"
      - name: "bountyId"
        type: "string"
        description: "ID of the bounty to release"
      - name: "approved"
        type: "boolean"
        description: "true to release funds, false to cancel"
    returns: "success status, final status (RELEASED or CANCELLED), hunterAddress, rewardAmount"
capabilities:
  - name: "Escrow Wallet Creation"
    inputs:
      - "rewardAmount, token, bountyId"
    outputs:
      - "escrowAddress: Keyless wallet address"
  - name: "AI Judge Verification"
    inputs:
      - "bountyId, proofUrl, submission timestamp"
    outputs:
      - "verdict: APPROVED | REJECTED"
      - "reasoning: string"
  - name: "Proof Submission"
    inputs:
      - "bountyId, proofUrl, hunter wallet"
    outputs:
      - "submission record in database"
  - name: "Automatic Release"
    inputs:
      - "verdict = APPROVED"
    outputs:
      - "Funds transferred to hunter's Keyless wallet"
  - name: "Audit Trail"
    inputs:
      - "any bounty action"
    outputs:
      - "logged to AuditLog table with full details"
security:
  - "Escrow wallets are Keyless (no private keys stored)"
  - "AI Judge verdict required before funds release"
  - "All actions logged to PostgreSQL AuditLog"
  - "Bounty creator can override AI verdict (manual approval)"
  - "Expired bounties can be cancelled by creator"
workflow:
  1. Creator calls bounty_create → escrow wallet created
  2. Hunter calls bounty_get_active → sees available bounties
  3. Hunter calls bounty_submit → uploads proof
  4. Bounty-Bot AI Judge evaluates proof
  5. Bounty-Bot calls bounty_verify with verdict
  6. If APPROVED → funds auto-released to hunter
  7. Full audit trail stored in Postgres
notes:
  - "Bounty-Bot uses Keyless Collective SDK for escrow wallet operations"
  - "AI Judge can be triggered automatically or manually"
  - "Multiple hunters can submit to open bounties"
  - "Creator can specify a single hunter or leave open for anyone"
  - "The Arbiter persona ensures fair, transparent verification"
