# Sentry Deployment Guide - TEE Environment

## Overview

This guide covers deployment of Keyless Sentry to a Trusted Execution Environment (TEE) for the Synthesis Hackathon. The TEE deployment provides hardware-level attestation to prove the agent runs unmodified code.

## Prerequisites

- Docker & Docker Compose installed
- PostgreSQL accessible
- TEE-capable hardware (Intel SGX, AMD SEV, or ARM TrustZone) - OR simulation mode for testing
- Environment variables configured (see `.env.example`)

## Synthesis Hackathon Registration

To register your Sentry agent for the Synthesis hackathon:

```bash
# Register via JSON-RPC
echo '{"jsonrpc":"2.0","method":"sentry_register_hackathon","params":{"hackathonId":"synthesis-2024","teamName":"YourTeamName","projectDescription":"Autonomous DeFi Guardian"},"id":1}' | bun run start
```

The `sentry_register_hackathon` command:
- Records your participation in the audit log
- Generates a unique `registrationId`
- Stores hackathon metadata for verification

## Deployment Options

### Option 1: Standard Deployment (Non-TEE)

```bash
cd keyless-sentry
docker-compose build
docker-compose up -d
```

### Option 2: TEE Deployment (Production)

For production with hardware attestation:

```bash
# Build with TEE Dockerfile
docker build -f Dockerfile.tee -t keyless-sentry:tee .

# Run with TEE enabled
docker run -d \
  -e IS_TEE=true \
  -e TEE_ATTESTATION_URL=https://your-tee-attestation-service \
  -e DATABASE_URL=postgresql://... \
  -e ENCRYPTION_KEY=... \
  keyless-sentry:tee
```

### Option 3: Docker Compose with TEE

```bash
# Using the TEE compose override
docker-compose -f docker-compose.yml -f docker-compose.tee.yml up -d
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `KEYLESS_BASE_URL` | Keyless SDK endpoint | Yes |
| `KEYLESS_CHAIN_ID` | Blockchain chain ID (e.g., 44787 for Celo Alfajores) | Yes |
| `KEYLESS_OWNER` | Owner wallet address | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `ENCRYPTION_KEY` | 64-character hex encryption key | Yes |
| `IS_TEE` | Enable TEE mode (set to `true` for hardware attestation) | No |
| `TEE_ATTESTATION_URL` | URL for TEE attestation service | No |
| `ERC8004_REGISTRY_ADDRESS` | ERC-8004 registry contract address | Yes |
| `SENTRY_RPC_URL` | Blockchain RPC URL | Yes |
| `SENTRY_CHAIN_ID` | Sentry chain ID | Yes |
| `HEARTBEAT_INTERVAL_MINUTES` | Heartbeat frequency (default: 30) | No |
| `WORKSPACE_DIR` | Path to workspace (default: ./gateway/src/workspace) | No |

## TEE Configuration

### Intel SGX Setup

1. Enable SGX in BIOS
2. Install SGX driver:
```bash
# Ubuntu/Debian
apt-get install -y intel-sgx-driver

# Verify
dmesg | grep -i sgx
```

3. Deploy with attestation URL:
```bash
docker run -d \
  --device /dev/sgx/enclave \
  --device /dev/sgx/provision \
  -e IS_TEE=true \
  -e TEE_ATTESTATION_URL=http://localhost:8080/attest \
  keyless-sentry:tee
```

### AMD SEV Setup

```bash
docker run -d \
  --device /dev/sev \
  -e IS_TEE=true \
  -e TEE_ATTESTATION_URL=http://localhost:8080/attest \
  keyless-sentry:tee
```

### Simulation Mode (Testing)

For testing without hardware:

```bash
docker run -d \
  -e IS_TEE=false \
  keyless-sentry:tee
```

In simulation mode, the agent generates a SHA-256 hash of the source code instead of hardware attestation.

## Verification

### Check Integrity

```bash
# Send integrity verification request
echo '{"jsonrpc":"2.0","method":"sentry_verify_integrity","params":{},"id":1}' | bun run start
```

Expected response:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "attestation": {
      "type": "tee",
      "value": "tee_1234567890_abc123",
      "timestamp": 1234567890,
      "version": "v0.4.0",
      "isTEE": true
    },
    "codeHash": "sha256hash...",
    "srcFiles": 42,
    "coreFiles": 28
  },
  "id": 1
}
```

### Check Health

```bash
echo '{"jsonrpc":"2.0","method":"/health","params":{},"id":1}' | bun run start
```

## Heartbeat Operations

The heartbeat runs every 30 minutes (configurable via `HEARTBEAT_INTERVAL_MINUTES`):

1. **Vault Health**: Checks PostgreSQL connection
2. **Integrity Check**: Re-hashes source code and compares to boot hash

If integrity check fails (code tampered):
- Agent enters LOCKDOWN_MODE
- All signing activity stops
- Logs CRITICAL_INTEGRITY_FAILURE

## Security Notes

- Never commit `.env` files
- Keep `ENCRYPTION_KEY` (64 hex chars) secure
- Use strong PostgreSQL passwords
- Use Docker secrets for production
- TEE mode requires hardware support

## Troubleshooting

### High Memory Usage

1. Ensure `.kiloignore` excludes `node_modules/`
2. Close unnecessary VS Code windows
3. Restart Docker containers
4. Memory limits: PostgreSQL 256MB, Gateway 512MB

### Database Connection Issues

```bash
# Check PostgreSQL logs
docker-compose logs postgres

# Verify connection string
docker-compose exec sentry-gateway sh -c 'echo $DATABASE_URL'
```

### TEE Attestation Failures

1. Verify hardware support: `dmesg | grep -i sgx`
2. Check attestation service is running
3. Verify TEE_ATTESTATION_URL is accessible

## Synthesis Hackathon Commands

| Command | Description |
|---------|-------------|
| `sentry_verify_integrity` | Returns attestation and code hash (Proof of Sentry) |
| `sentry_register_hackathon` | Registers for hackathon |
| `/health` | System health check |

## Next Steps

After deployment:
1. Create a test user with `/start`
2. Authorize an agent with `/authorize-agent`
3. Register for Synthesis: `sentry_register_hackathon`
4. Verify integrity: `sentry_verify_integrity`
5. Monitor via `/health` endpoint
