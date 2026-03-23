# BountyClaw Frontend - Next.js
FROM node:22-bookworm AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.23.0 --activate
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH="/root/.local/share/pnpm:${PATH}"

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files and configs
COPY src ./src
COPY next.config.mjs tailwind.config.ts postcss.config.mjs tsconfig.json ./

# Generate Prisma Client - needs DATABASE_URL
RUN pnpm add @prisma/client && pnpm exec prisma generate

# Build Next.js
RUN pnpm run build


# Runtime image
FROM node:22-bookworm
ENV NODE_ENV=production

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.23.0 --activate
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH="/root/.local/share/pnpm:${PATH}"

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies
RUN pnpm install --frozen-lockfile --production

# Copy built Next.js app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Copy Prisma client (generated during build)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["pnpm", "exec", "next", "start", "-p", "3000"]