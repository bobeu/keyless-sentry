# Build openclaw from source to avoid npm packaging gaps (some dist files are not shipped).
FROM node:22-bookworm AS openclaw-build

# Dependencies needed for openclaw build
RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    git \
    ca-certificates \
    curl \
    python3 \
    make \
    g++ \
  && rm -rf /var/lib/apt/lists/*

# Install Bun (openclaw build uses it)
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

RUN corepack enable

WORKDIR /openclaw

# Pin to a known-good ref (tag/branch). Override in Railway template settings if needed.
ARG OPENCLAW_GIT_REF=v2026.3.8
RUN git clone --depth 1 --branch "${OPENCLAW_GIT_REF}" https://github.com/openclaw/openclaw.git .

# Patch: relax version requirements for packages
RUN set -eux; \
  find ./extensions -name 'package.json' -type f | while read -r f; do \
    sed -i -E 's/"openclaw"[[:space:]]*:[[:space:]]*">=[^"]+"/"openclaw": "*"/g' "$f"; \
    sed -i -E 's/"openclaw"[[:space:]]*:[[:space:]]*"workspace:[^"]+"/"openclaw": "*"/g' "$f"; \
  done

RUN pnpm install --no-frozen-lockfile
RUN pnpm build
ENV OPENCLAW_PREFER_PNPM=1
RUN pnpm ui:install && pnpm ui:build


# Build Next.js frontend
FROM node:22-bookworm AS next-build

WORKDIR /app

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --no-frozen-lockfile

# Copy source files
COPY src ./src
COPY core ./core
COPY gateway ./gateway
COPY skills ./skills
COPY next.config.mjs tailwind.config.ts postcss.config.mjs tsconfig.json ./

# Generate Prisma Client for Next.js build
WORKDIR /app/core
RUN bun add @prisma/client prisma && bunx prisma generate
WORKDIR /app

# Build Next.js
RUN bun run build


# Runtime image
FROM node:22-bookworm
ENV NODE_ENV=production

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ca-certificates \
    tini \
    python3 \
    python3-venv \
    curl \
  && rm -rf /var/lib/apt/lists/*

# Install Bun for the wrapper to spawn OpenClaw
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# `openclaw update` expects pnpm. Provide it in the runtime image.
RUN corepack enable && corepack prepare pnpm@10.23.0 --activate

# Persist user-installed tools by default
ENV NPM_CONFIG_PREFIX=/data/npm
ENV NPM_CONFIG_CACHE=/data/npm-cache
ENV PNPM_HOME=/data/pnpm
ENV PNPM_STORE_DIR=/data/pnpm_store
ENV PATH="/data/npm/bin:/data/pnpm:${PATH}"

# BountyClaw Environment Variables
ENV NODE_ENV=production
ENV IS_TEE=false
ENV HEARTBEAT_INTERVAL_MINUTES=30
ENV WORKSPACE_DIR=/app/gateway/src/workspace

# Keyless SDK Configuration
ENV KEYLESS_COORDINATOR_URL=https://coordinator.keyless.tech
ENV KEYLESS_CHAIN_ID=44787

# Database (set by Railway via DATABASE_URL)
# ENV DATABASE_URL=postgresql://...

WORKDIR /app

# Copy wrapper deps
COPY package.json bun.lock ./
RUN bun install --no-frozen-lockfile

# Copy built openclaw
COPY --from=openclaw-build /openclaw /openclaw

# Provide an openclaw executable
RUN printf '%s\n' '#!/usr/bin/env bash' 'exec bun /openclaw/dist/entry.js "$@"' > /usr/local/bin/openclaw \
  && chmod +x /usr/local/bin/openclaw

# Copy source files
COPY src ./src
COPY core ./core
COPY gateway ./gateway
COPY skills ./skills

# Copy built Next.js app
COPY --from=next-build /app/.next ./.next
COPY --from=next-build /app/public ./public

# Generate Prisma Client
WORKDIR /app/core
RUN bun add @prisma/client prisma && bunx prisma generate
WORKDIR /app

# The wrapper listens on $PORT.
# IMPORTANT: Do not set a default PORT here.
# Railway injects PORT at runtime and routes traffic to that port.
EXPOSE 3000

# Ensure PID 1 reaps zombies and forwards signals.
ENTRYPOINT ["tini", "--"]

# Run both Next.js (frontend) and OpenClaw (gateway)
# Next.js handles HTTP requests on port 3000
# OpenClaw runs on port 18789 internally
CMD ["sh", "-c", "node /openclaw/dist/entry.js gateway run --bind loopback --port 18789 & npx next start -p 3000"]
