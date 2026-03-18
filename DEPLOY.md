# Sentry Zero-Bandwidth Deployment Guide

## Overview

This guide covers transitioning from **Development Mode** (high data usage) to **Runtime Mode** (low data/bandwidth).

## Prerequisites

- Docker & Docker Compose installed
- PostgreSQL accessible
- Environment variables configured (see `.env.example`)

## Zero-Bandwidth Deployment Steps

### Step 1: Build Containers

```bash
cd keyless-sentry

# Build all services
docker-compose build
```

### Step 2: Disable Kilo Codebase Indexing

Before running the project, disable VS Code / Kilo indexing to save RAM and bandwidth:

1. **Close VS Code** or disable the extension temporarily
2. **OR** add `keyless-sentry/` to your `.kiloignore`:
   ```
   keyless-sentry/
   ```

### Step 3: Run in Background

```bash
# Option A: Using the production script
bun run prod:local

# Option B: Manual
docker-compose up -d
```

### Step 4: Monitor Health

Check system health via the `/health` command:

```bash
# Send health check via stdin
echo '{"jsonrpc":"2.0","method":"sentry_health","params":{},"id":1}' | bun run start
```

Expected response:
```json
{
  "orchestrator": "healthy",
  "dbStatus": "connected",
  "integrityScore": {
    "successRate": 100,
    "total": 0,
    "successful": 0,
    "failed": 0
  },
  "timestamp": "2026-03-18T..."
}
```

## Memory Optimization

The docker-compose.yml includes memory limits:
- **PostgreSQL**: 256MB
- **Sentry Gateway**: 512MB  
- **Sentry Agent**: 512MB

## Troubleshooting

### High Memory Usage

If experiencing high RAM usage:
1. Ensure `.kiloignore` excludes `node_modules/`
2. Close unnecessary VS Code windows
3. Restart Docker containers

### Database Connection Issues

```bash
# Check PostgreSQL logs
docker-compose logs postgres

# Verify connection string
docker-compose exec sentry-gateway sh -c 'echo $DATABASE_URL'
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `bun run prod:local` | Start containers with message |
| `docker-compose up -d` | Start containers in background |
| `docker-compose down` | Stop all containers |
| `docker-compose logs -f` | View live logs |
| `docker-compose restart` | Restart all services |

## Security Notes

- Never commit `.env` files
- Keep `ENCRYPTION_KEY` (64 hex chars) secure
- Use strong PostgreSQL passwords
- Consider using Docker secrets for production

## Next Steps

After deployment:
1. Create a test user with `/start`
2. Authorize an agent with `/authorize-agent`
3. Test A2A interface with `bun run test:a2a`
4. Monitor via `/health` endpoint
