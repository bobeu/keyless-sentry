# Keyless-Sentry AGENTS.md

This file provides guidance for AI agents working on the keyless-sentry project.

## Project Overview

Keyless-Sentry is a decentralized bounty marketplace protocol called "BountyClaw: The Arbiter". It enables autonomous gig economy interactions where users can post bounties (tasks) with cryptocurrency rewards, and hunters can complete them to earn rewards. The system uses the Keyless Collective SDK for agent identity and wallet management, and integrates with blockchain technology (Celo network) for secure, trustless transactions.

Key components:
- Next.js frontend with Neo-Brutalist UI design
- PostgreSQL database with Prisma ORM for data persistence
- RESTful API routes for bounty management
- Integration with Keyless Collective SDK for ERC-8004 compliant agent identities
- Blockchain connectivity to Celo network for transactions

## Dev Environment Tips

- Use `bun dev` to start the development server (Next.js runs on port 3000)
- The project uses Bun as the package manager - prefer `bun` over `npm` or `yarn`
- Environment variables are stored in `.env` file - never commit this file
- Prisma database schema is located in `core/prisma/schema.prisma`
- Generate Prisma client after schema changes: `bunx prisma generate`
- Run database migrations: `bunx prisma migrate dev`
- The backend server runs separately and can be started with `bun run server` (from root)
- API routes are located in `src/app/api/` and follow Next.js 13+ route handler conventions

## Build and Test Commands

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun run build

# Start production server
bun run start

# Lint code
bun run lint

# Type checking
bun run typecheck

# Run tests (if implemented)
bun run test

# Database operations
bunx prisma migrate dev        # Apply migrations
bunx prisma generate             # Generate Prisma client
bunx prisma studio               # Open Prisma GUI
```

## Code Style Guidelines

- Use TypeScript with strict type checking
- Follow Next.js 13+ app router conventions
- Component organization:
  - UI components: `src/components/ui/`
  - Feature components: `src/components/` (feature-specific)
  - Custom hooks: Consider creating `src/lib/hooks/` for reusable logic
- API routes: Use `src/app/api/[route]/route.ts` format
- State management: Use React hooks (useState, useEffect) or consider Context API for global state
- Styling: Tailwind CSS with custom neo-brutalist theme
- File naming: Use `.tsx` for React components, `.ts` for utility functions
- Error handling: Use try/catch for async operations, return standardized error responses

## Testing Instructions

Currently, the project has limited test coverage. To improve testability:

1. **Unit Tests**:
   - Test utility functions in `src/lib/` and `core/src/`
   - Test API route handlers by mocking request/response objects
   - Test database repository methods by mocking Prisma client

2. **Integration Tests**:
   - Test API endpoints with actual database connections (use test database)
   - Test frontend components with React Testing Library

3. **End-to-End Tests**:
   - Consider using Cypress or Playwright for full user flow testing

To add tests:
- Create test files alongside source files (e.g., `utils.test.ts`)
- Or create a `__tests__` directory mirroring the source structure
- Use Jest or Vitest as testing framework (would need to be added to devDependencies)

## Security Considerations

- **Environment Variables**: Never commit `.env` file. Use `.env.example` as template
- **Private Keys**: The `PRIVATE_KEY` in .env should never be exposed - use environment secrets in production
- **Database Connection**: Ensure `DATABASE_URL` uses secure connections in production
- **API Security**: 
  - Validate all incoming data in API routes
  - Implement rate limiting for public endpoints
  - Consider authentication for sensitive operations
- **Frontend Security**:
  - Sanitize user inputs to prevent XSS
  - Use proper Content Security Policy headers
  - Implement CSRF protection for state-changing operations
- **Blockchain Interactions**:
  - Validate transaction parameters before signing
  - Handle chain-specific edge cases (replay attacks, etc.)
  - Use proper nonce management for transactions

## Deployment Steps

### Local Development
1. Copy `.env.example` to `.env` and fill in required values
2. Ensure PostgreSQL is running and accessible at the URL in `.env`
3. Run database migrations: `bunx prisma migrate dev`
4. Start Prisma client generation: `bunx prisma generate`
5. Start development server: `bun dev`

### Production Deployment (Railway)
1. Push repository to GitHub
2. Connect repository to Railway project
3. Set environment variables in Railway dashboard:
   - `DATABASE_URL` (PostgreSQL connection string)
   - `PRIVATE_KEY` (agent's private key)
   - `KEYLESS_BASE_URL` (coordinator URL)
   - `KEYLESS_OWNER` (agent owner address)
   - `ERC8004_REGISTRY_ADDRESS` (ERC-8004 registry contract)
   - `WALLETCONNECT_PROJECT_ID` (WalletConnect project ID)
   - `SENTRY_RPC_URL` (Celo RPC endpoint)
   - `SENTY_CHAIN_ID` (11142220 for Celo Alfajores testnet)
   - `ENCRYPTION_KEY` (for data encryption)
   - `SETUP_PASSWORD` (for admin setup)
   - `GROQ_API_KEY`, `OPENAI_API_KEY`, `GOOGLE_GEMINI_API` (for AI services)
   - `TELEGRAM_BOT_TOKEN` (for notifications)
4. Railway will automatically detect the `bun` runtime and run `bun install` followed by `bun run build:skip` and `bun run start`

### Docker Deployment
1. Build Docker image: `docker build -t keyless-sentry .`
2. Run container: `docker run -p 3000:3000 --env-file .env keyless-sentry`
3. Ensure database is accessible from container (may need to use host.docker.internal on Mac/Windows)

## Troubleshooting

- **Database Connection Errors**: 
  - Verify PostgreSQL is running
  - Check `DATABASE_URL` format in `.env`
  - Ensure database `sentry` exists and user has proper permissions
  - Run `bunx prisma migrate reset` to reset database in development

- **Prisma Client Errors**:
  - Run `bunx prisma generate` after schema changes
  - Ensure `@prisma/client` version matches Prisma CLI version

- **Next.js Errors**:
  - Clear `.next` cache if encountering strange build issues
  - Ensure Node.js version is compatible (use same version as in development)

- **Blockchain Connection Issues**:
  - Verify `SENTRY_RPC_URL` is valid and accessible
  - Check network ID matches expected chain (Celo Alfajores = 11142220)
  - Ensure sufficient funds in wallet for transaction fees

## Project Structure

```
keyless-sentry/
├── src/                    # Frontend Next.js application
│   ├── app/                # App router (pages, layouts, API routes)
│   ├── components/         # Reusable UI components
│   └── lib/                # Utilities, hooks, context
├── core/                   # Backend/core logic
│   ├── prisma/             # Prisma schema and migrations
│   └── src/                # Core TypeScript services
├── public/                 # Static assets
├── scripts/                # Utility scripts
└── ...                     # Configuration files
```

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Ensure code passes linting and type checking
5. Test your changes thoroughly
6. Submit a pull request with clear description of changes
7. Follow the existing code style and patterns

## Useful Links

- Keyless Collective SDK Documentation: [Link to SDK docs]
- Prisma ORM Documentation: https://www.prisma.io/docs
- Next.js Documentation: https://nextjs.org/docs
- Celo Network Documentation: https://docs.celo.org
- ERC-8004 Standard: https://eips.ethereum.org/EIPS/eip-8004