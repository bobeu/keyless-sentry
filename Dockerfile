FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY package.json bun.lock tsconfig.json tsconfig.base.json ./

# Copy source code
COPY core ./core
COPY gateway ./gateway
COPY skills ./skills
# DEPRECATED: contracts are not connected to Sentry runtime
# COPY contracts ./contracts

# Install dependencies
RUN bun install

# Generate Prisma Client (required for database access)
# This creates the @prisma/client in node_modules
WORKDIR /app/core
RUN bunx prisma generate

# Go back to app root
WORKDIR /app

EXPOSE 18789

# Start the gateway
CMD ["bun", "--cwd", "gateway", "run", "start"]
