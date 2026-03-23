# BountyClaw Frontend - Next.js
FROM oven/bun:1 AS builder

WORKDIR /app

# Install dependencies
RUN bun install --no-frozen-lockfile

# Copy source files and configs
COPY src ./src
COPY next.config.mjs tailwind.config.ts postcss.config.mjs tsconfig.json ./

# Generate Prisma Client - needs DATABASE_URL
RUN bun add @prisma/client && bunx prisma generate

# Build Next.js
RUN bun run build


# Runtime image
FROM oven/bun:1
ENV NODE_ENV=production

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install production dependencies
RUN bun install --no-frozen-lockfile --production

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
CMD ["bunx", "next", "start", "-p", "3000"]