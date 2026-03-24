# BountyFinancials.md

**Purpose:** Teach BountyClaw how to interface with the Keyless Collective SDK for escrow operations.

## Overview
BountyClaw does NOT hold funds. It is an **Authorized Signer** for bounty-specific Keyless wallets. The Keyless SDK allows BountyClaw to:
- Create wallets for users
- Check balances
- Execute transfers when authorized

## SDK Functions

### 1. createWallet(userId: string): Promise<Wallet>
Creates a new Keyless wallet for a user (human or agent).

```typescript
import { KeylessSDK } from "@keyless-collective/sdk";

const sdk = new KeylessSDK({
  coordinatorUrl: process.env.KEYLESS_COORDINATOR_URL,
  chainId: parseInt(process.env.KEYLESS_CHAIN_ID || "44787"),
});

async function createUserWallet(userId: string) {
  // User signs via Coordinator (OAuth/Telegram/Wallet)
  const wallet = await sdk.createWallet(userId);
  return {
    address: wallet.address,
    userId: wallet.userId,
    createdAt: wallet.createdAt,
  };
}
```

### 2. getWalletBalance(address: string): Promise<string>
Returns the native balance (in wei) of a specific wallet address.

```typescript
async function checkEscrowBalance(escrowAddress: string): Promise<string> {
  const balance = await sdk.getWalletBalance(escrowAddress);
  return balance; // Returns wei as string
}
```

### 3. transferNative(fromAddress: string, toAddress: string, amount: string, authorization: string): Promise<Transaction>
Transfers native tokens (ETH/cUSD) from one address to another using stored authorization.

```typescript
async function payHunter(
  escrowAddress: string,
  hunterAddress: string,
  amount: string,
  authorizationSignature: string
): Promise<Transaction> {
  const tx = await sdk.transferNative({
    from: escrowAddress,
    to: hunterAddress,
    amount: amount, // wei string
    authorization: authorizationSignature,
  });
  
  return {
    hash: tx.hash,
    status: tx.status,
    blockNumber: tx.blockNumber,
  };
}
```

### 4. splitPayment(fromAddress: string, recipients: {address: string, amount: string}[], authorization: string): Promise<Transaction[]>
For collaborative bounties where multiple hunters get paid.

```typescript
async function payCollaborators(
  escrowAddress: string,
  payouts: { address: string; amount: string }[],
  authorizationSignature: string
): Promise<Transaction[]> {
  const txs = await sdk.splitPayment({
    from: escrowAddress,
    recipients: payouts,
    authorization: authorizationSignature,
  });
  
  return txs.map(tx => ({
    hash: tx.hash,
    status: tx.status,
  }));
}
```

### 5. getInvoice(bountyId: string, amount: string, creatorAddress: string): Invoice
Generates a "pay this to start the bounty" request.

```typescript
function createBountyInvoice(
  bountyId: string,
  amount: string,
  creatorAddress: string
): Invoice {
  return sdk.getInvoice({
    reference: `BOUNTY_${bountyId}`,
    amount: amount,
    recipient: creatorAddress,
    memo: `BountyClaw Escrow Deposit - ${bountyId}`,
  });
}
```

## BountyClaw's Financial Workflow

### Identity Creation Flow
1. User calls `bounty_register` with their preferred auth method
2. BountyClaw calls `sdk.createWallet(userId)`
3. User signs via Coordinator
4. Wallet address is stored in `Wallets` table, linked to `userId`

### Authorization Flow
1. User signs an Authorization Message: `"Authorize BountyClaw to transfer from my wallet for bounty payments"`
2. BountyClaw stores this signature in `Signatures` table
3. This signature is used for ALL subsequent transfers from that wallet

### Bounty Creation Flow
1. Creator calls `bounty_create`
2. BountyClaw generates a NEW bounty-specific wallet: `sdk.createWallet(bountyId)`
3. Creator deposits funds to this bounty wallet
4. BountyClaw verifies balance: `sdk.getWalletBalance(bountyWallet)`

### Payout Flow (AI Verdict = MATCH)
1. AI Judge returns "MATCH" verdict
2. BountyClaw retrieves stored authorization for the bounty wallet
3. BountyClaw calls `sdk.transferNative(bountyWallet, hunterAddress, amount, authSig)`
4. Transaction hash stored in `Transactions` table

## Security Rules
- **NEVER** store private keys - use Keyless (Coordinator-based signing)
- **ALWAYS** require AI Judge verification before payout
- **ALWAYS** verify balance before payout (prevent double-spend)
- **STORE** all authorization signatures securely in Postgres
- **LOG** all financial transactions to AuditLog table

## Environment Variables Required
```
KEYLESS_COORDINATOR_URL=https://coordinator.keyless.tech
KEYLESS_CHAIN_ID=44787 (Celo Mainnet) or 11142220 (Alfajores)
```
