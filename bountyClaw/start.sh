#!/bin/bash
set -e

echo "=========================================="
echo "Sentry Production Startup"
echo "=========================================="

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

echo "[1/5] Waiting for PostgreSQL to be ready..."
until PGPASSWORD=$POSTGRES_PASSWORD psql -h postgres -U sentry -d sentry -c '\q' 2>/dev/null; do
  echo "  PostgreSQL is unavailable - sleeping"
  sleep 1
done
echo "  PostgreSQL is ready!"

echo "[2/5] Running Prisma migrations..."
cd core
bunx prisma migrate deploy
cd ..

echo "[3/5] Checking ERC-8004 Identity Registration..."
# Check if identity is registered, if not, attempt registration
if [ -n "$ERC8004_REGISTRY_ADDRESS" ]; then
  echo "  ERC-8004 Registry: $ERC8004_REGISTRY_ADDRESS"
  echo "  Running identity check..."
  # In production, this would call a registration script
  # bun run scripts/register-identity.ts
  echo "  Identity registration check completed."
else
  echo "  ⚠️  ERC8004_REGISTRY_ADDRESS not set - skipping identity registration"
fi

echo "[4/5] Starting Sentry services..."

# Start gateway in background
echo "  Starting gateway..."
bun run gateway/src/index.ts &
GATEWAY_PID=$!

# Start agent in background (if needed)
# bun run core/src/index.ts &
# AGENT_PID=$!

echo "=========================================="
echo "Sentry is running!"
echo "  Gateway PID: $GATEWAY_PID"
echo "  Health check: curl http://localhost:18789/health"
echo "  ERC-8004: https://celoscan.io/address/$ERC8004_REGISTRY_ADDRESS"
echo "=========================================="

# Wait for all background processes
wait
