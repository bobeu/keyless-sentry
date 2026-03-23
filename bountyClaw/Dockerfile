# BountyClaw Frontend - Next.js
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files FIRST (for dependency caching)
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source files and configs
COPY src ./src
COPY next.config.mjs tailwind.config.ts postcss.config.mjs tsconfig.json ./

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

# Copy built Next.js app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Start Next.js (use PORT from Railway environment)
CMD bunx next start -p $PORT