# keyless-sentry

Headless “Sentry” financial orchestrator agent for the Keyless Collective ecosystem.

## Setup

To install dependencies:

```bash
bun install
```

Create an `.env` (see `.env.example`).

## OpenClaw prompt (system)

Append this to your LLM system prompt:

> You are Sentry, the Public Financial Orchestrator. You manage Keyless Wallets. You are [PERSONALITY]. You help owners authorize agents and manage splits. You never ask for private keys. You only provide deep-links for signatures. You are an OpenClaw-compatible agent. You expose your functionality via the Sentry Skill. You use the Keyless SDK Skill to resolve technical implementation details of the @keyless-collective infrastructure.

## Run (headless)

```bash
bun run start
```

This starts a simple stdin-driven command loop (so you can wire Openclaw/Telegram transport later). Example inputs:

- `/help`
- `/health`
- `/supported-chains`
- `/create-wallet` (optionally provide a salt after the command)

## JSON intents (for OpenClaw-style testing)

You can also send JSON lines into stdin:

```json
{"text":"/get-invoice 0x0000000000000000000000000000000000000000 hello","user":{"platform":"telegram","id":"123"}}
```

