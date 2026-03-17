id: keyless-sdk
name: Keyless Collective SDK Documentation Skill
version: 0.1.0
description: >
  Machine-readable usage guide for @keyless-collective/sdk. Load this skill when you need accurate
  method signatures, payload shapes, or examples for KeylessClient workflows (wallet creation, authorization,
  transfers, execution, invoices, revenue splits, health checks).
triggers:
  - when: "You need to create or deploy a Keyless wallet (createWallet) or compute wallet state"
    then: "Load this skill and follow the Wallet Creation + Policy Status sections."
  - when: "You need delegated agent authorization (AgentAuthorization / signAgentAuthorization)"
    then: "Load this skill and follow the Authorization section; never ask for private keys."
  - when: "You need to execute payments (transferNative / transferERC20 / execute)"
    then: "Load this skill and follow the Payments + Execution sections."
  - when: "You need transaction monitoring or invoices"
    then: "Load this skill and follow Transaction Status + Invoices sections."
  - when: "You need to configure or distribute revenue splits"
    then: "Load this skill and follow Revenue Splits + Distribution sections."
capabilities:
  - name: "Initialize KeylessClient"
    example: |
      import { KeylessClient } from "@keyless-collective/sdk";
      import { celoSepolia } from "viem/chains";

      const client = new KeylessClient({
        baseUrl: "https://coordinator.keyless.collective",
        chainId: celoSepolia.id,
        owner: "0xYourHumanOwnerAddress",
      });

  - name: "Create Wallet"
    example: |
      // Owner signs "create-wallet" JSON message, then:
      const result = await client.createWallet(walletClient, {
        owner: "0xYourHumanOwnerAddress",
        salt: "unique-agent-session-v1",
      });
      // result contains createWalletResponse + authResponse

  - name: "Get Policy Status"
    example: |
      const status = await client.getPolicyStatus();
      // status.hasWallet, status.dailySpent, status.maxDailySpend, etc.

  - name: "Get Policy Status By Wallet"
    example: |
      const status = await client.getPolicyStatusByWallet("0xWalletAddress");

  - name: "Agent Authorization (Permission Slip)"
    example: |
      const authorization = {
        owner: "0xOwnerAddress",
        agentId: "research-agent-001",
        expiresAt: Math.floor(Date.now() / 1000) + 86400,
        maxSpend: "1000000000000000000",
      };

      // Owner signs the JSON string of `authorization`:
      const authResponse = await client.signAgentAuthorization(walletClient, authorization);
      const authSig = authResponse.signature;

  - name: "Execute (generic)"
    example: |
      const exec = await client.execute({
        wallet: "0xWalletAddress",
        to: "0xRecipientOrContract",
        value: "0",
        data: "0x...",
        chainId: 11142220,
        signature: authSig,
        authorization,
      });

  - name: "transferNative (CELO)"
    example: |
      const tx = await client.transferNative({
        to: "0xRecipient",
        amount: "100000000000000000",
        signature: authSig,
        authorization,
      });

  - name: "transferERC20 (cUSD/USDC)"
    example: |
      const tx = await client.transferERC20({
        token: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
        to: "0xRecipient",
        amount: "5000000",
        signature: authSig,
        authorization,
      });

  - name: "getTransactionStatus"
    example: |
      const status = await client.getTransactionStatus("0xTxHash");
      // status.status: pending | confirmed | failed

  - name: "Invoices"
    example: |
      const invoice = await client.getInvoice("0xTxHash");
      // For batch:
      const invoices = await client.getBatchInvoices(["0xTxHashA", "0xTxHashB"]);

  - name: "Execution fees"
    example: |
      const fee = await client.getExecutionFee();

  - name: "Revenue Splits"
    example: |
      const splits = await client.getRevenueSplits("0xAgentId");
      await client.configureRevenueSplits({
        agentId: "0xAgentId",
        recipients: [
          { recipient: "0xA", bps: 5000 },
          { recipient: "0xB", bps: 5000 },
        ],
        signature: authSig,
        authorization,
      });

  - name: "Revenue Distribution"
    example: |
      await client.executeRevenueDistribution({
        wallet: "0xAgentWallet",
        token: "0xTokenAddress",
        totalAmount: "1000000000000000000",
        signature: authSig,
        authorization,
      });

  - name: "healthCheck"
    example: |
      const health = await client.healthCheck();
      // health.signers[], health.allSignersOnline
notes:
  - "Never request or store private keys. Owners sign via WalletConnect/deep-link."
  - "AgentAuthorization is a JSON object signed with personal_sign of the JSON string."
  - "Always validate inputs with schemas and handle coordinator errors as user-facing messages."

