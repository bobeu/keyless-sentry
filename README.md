# keyless-sentry

Headless “Sentry” financial orchestrator agent for the Keyless Collective ecosystem.

## Setup

To install dependencies:

```bash
bun install
```

Create an `.env` (see `.env.example`).

## Run (headless)

```bash
bun run start
```

This starts a simple stdin-driven command loop (so you can wire Openclaw/Telegram transport later). Example inputs:

- `/help`
- `/health`
- `/supported-chains`
- `/create-wallet` (optionally provide a salt after the command)

