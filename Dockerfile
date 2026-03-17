FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb tsconfig.json tsconfig.base.json ./
COPY core ./core
COPY gateway ./gateway
COPY contracts ./contracts
COPY skills ./skills

RUN bun install

EXPOSE 18789

CMD ["bun", "--cwd", "gateway", "run", "start"]

