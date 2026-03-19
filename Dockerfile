FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY package.json bun.lock tsconfig.json tsconfig.base.json ./

# Copy source code
COPY core ./core
COPY gateway ./gateway
COPY skills ./skills
# DEPRECATED: contracts are not connected to Sentry runtime

# Install dependencies (this installs all workspaces including core)
RUN bun install

# Generate Prisma Client - must run from core directory where prisma/schema.prisma exists
WORKDIR /app/core
RUN bun add -D @prisma/client && bunx prisma generate

# Go back to app root
WORKDIR /app

EXPOSE 18789

# Start the gateway
CMD ["bun", "--cwd", "gateway", "run", "start"]
