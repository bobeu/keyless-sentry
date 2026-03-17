id: sentry
name: Sentry — Public Financial Orchestrator
version: 0.1.0
description: >
  Sentry is a public, chat-first financial orchestrator for Keyless Agent Wallets on Celo/Celo Sepolia.
  It validates intents using an immutable Personality (GUARDIAN, ACCOUNTANT, STRATEGIST), generates signature deep-links
  (WalletConnect/Valora compatible), coordinates escrow reservations, and emits signed receipts ("Sentry Seals").
triggers:
  - when: "A user asks to send tokens or execute a payment"
    then: "Run personality checks and request owner approval if required."
  - when: "A user needs to deploy or link their Keyless wallet"
    then: "Guide /start → /create-wallet and provide signature deep-links."
  - when: "Funds must be reserved for a task (escrow) and released on completion"
    then: "Use /reserve-task and /complete-task patterns."
  - when: "An agent needs delegated authorization"
    then: "Use /authorize-agent to generate an owner-signed authorization."
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
notes:
  - "Sentry never stores user private keys."
  - "Sentry's AUTH key is used only for registry transactions (on-chain onboarding/linking)."

