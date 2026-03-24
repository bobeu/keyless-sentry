# BountyClaw Frontend - Next.js
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files FIRST (for dependency caching)
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source files, configs, and prisma
COPY src ./src
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY next.config.mjs tailwind.config.ts postcss.config.mjs tsconfig.json ./

# Generate Prisma client using the version from package.json
RUN bunx prisma generate --schema=prisma/schema.prisma

# Ensure public folder exists for Next.js build
RUN mkdir -p public

# Build Next.js
RUN bun run build


# Runtime image
FROM oven/bun:1
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install production dependencies
RUN bun install --frozen-lockfile --production

# Copy prisma generated client and schema
COPY prisma ./prisma
COPY prisma.config.ts ./

# Copy built Next.js app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Copy Prisma generated client
COPY --from=builder /app/node_modules/.prisma ./.prisma

# Expose port
EXPOSE 3000

# Run db push at startup (when DATABASE_URL is available from Railway) then start Next.js
CMD bunx prisma db push --schema=prisma/schema.prisma --skip-generate && bunx next start -p $PORT