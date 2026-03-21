/**
 * Telegram Bot
 * 
 * Implements /submit and /status commands for bounty management.
 * Handles the "Claim" flow where AI verifies the link and signs payout.
 */

import { getBountyStore } from "../lib/bounty_engine";
import { getVerificationService } from "../services/verifier";

export interface TelegramUser {
  id: number;
  username?: string;
  first_name?: string;
}

export interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: { id: number };
  text?: string;
}

/**
 * Telegram Bot Handler
 */
export class TelegramBot {
  private token: string;
  private store = getBountyStore();
  private verifier = getVerificationService();

  constructor(token: string) {
    this.token = token;
  }

  /**
   * Handle incoming Telegram updates
   */
  async handleUpdate(update: any): Promise<void> {
    if (!update.message) return;

    const message = update.message as TelegramMessage;
    if (!message.text) return;

    const text = message.text.trim();
    const chatId = message.chat.id;

    // Parse command
    const parts = text.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    try {
      switch (command) {
        case "/start":
          await this.sendMessage(chatId, this.getWelcomeMessage());
          break;
        
        case "/help":
          await this.sendMessage(chatId, this.getHelpMessage());
          break;
        
        case "/create":
          await this.handleCreate(chatId, args);
          break;
        
        case "/submit":
          await this.handleSubmit(chatId, args);
          break;
        
        case "/status":
          await this.handleStatus(chatId, args);
          break;
        
        case "/list":
          await this.handleList(chatId);
          break;

        default:
          await this.sendMessage(chatId, `Unknown command: ${command}\n\nUse /help for available commands.`);
      }
    } catch (error) {
      console.error("[telegram] Error handling update:", error);
      await this.sendMessage(chatId, "An error occurred. Please try again.");
    }
  }

  /**
   * Handle /create command - Create a new bounty
   * Usage: /create <title> <amount> <criteria>
   */
  private async handleCreate(chatId: number, args: string[]): Promise<void> {
    if (args.length < 3) {
      await this.sendMessage(chatId, "Usage: /create <title> <amount> <criteria>\n\nExample:\n/create \"Fix login bug\" 100 \"GitHub PR with fix\"");
      return;
    }

    const title = args[0];
    const amount = args[1];
    const criteria = args.slice(2).join(" ");

    // In production, get user address from Telegram ID
    const creatorAddress = `telegram:${chatId}`;

    const result = await this.store.createBounty({
      creatorAddress,
      title,
      amount,
      proofCriteria: criteria,
      description: criteria,
    });

    if (!result.ok) {
      await this.sendMessage(chatId, `Error creating bounty: ${result.error.message}`);
      return;
    }

    const bounty = result.value;
    await this.sendMessage(chatId, 
      `✅ Bounty Created!\n\n` +
      `Title: ${bounty.title}\n` +
      `Reward: ${bounty.amount} tokens\n` +
      `ID: ${bounty.id}\n` +
      `Escrow: \`${bounty.escrowAddress}\``
    );
  }

  /**
   * Handle /submit command - Submit proof for a bounty
   * Usage: /submit <bounty_id> <proof_url>
   */
  private async handleSubmit(chatId: number, args: string[]): Promise<void> {
    if (args.length < 2) {
      await this.sendMessage(chatId, "Usage: /submit <bounty_id> <proof_url>\n\nExample:\n/submit bounty_abc123 https://github.com/user/pr/1");
      return;
    }

    const bountyId = args[0];
    const proofUrl = args.slice(1).join(" ");

    // In production, get user address from Telegram ID
    const hunterAddress = `telegram:${chatId}`;

    const submitResult = await this.store.submitProof({
      bountyId,
      hunterAddress,
      proofUrl,
    });

    if (!submitResult.ok) {
      await this.sendMessage(chatId, `Error submitting proof: ${submitResult.error.message}`);
      return;
    }

    // Trigger AI verification
    const bounty = submitResult.value;
    const verifyResult = await this.verifier.verify({
      bounty,
      submissionUrl: proofUrl,
    });

    if (!verifyResult.ok) {
      await this.sendMessage(chatId, "Proof submitted, but verification failed. Please try again.");
      return;
    }

    const verification = verifyResult.value;

    // Process verification result
    const processResult = await this.verifier.processVerification(bountyId, verification.valid);

    if (!processResult.ok) {
      await this.sendMessage(chatId, `Error processing verification: ${processResult.error.message}`);
      return;
    }

    if (verification.valid) {
      await this.sendMessage(chatId,
        `🎉 VERIFIED!\n\n` +
        `Your submission has been approved.\n` +
        `Reasoning: ${verification.reasoning}\n` +
        `Reward of ${bounty.amount} tokens released to your wallet!`
      );
    } else {
      await this.sendMessage(chatId,
        `❌ NOT APPROVED\n\n` +
        `Reasoning: ${verification.reasoning}\n\n` +
        `Please address the issues and submit again.`
      );
    }
  }

  /**
   * Handle /status command - Check bounty status
   * Usage: /status <bounty_id>
   */
  private async handleStatus(chatId: number, args: string[]): Promise<void> {
    if (args.length < 1) {
      await this.sendMessage(chatId, "Usage: /status <bounty_id>");
      return;
    }

    const bountyId = args[0];

    const result = await this.store.getBountyById(bountyId);

    if (!result.ok) {
      await this.sendMessage(chatId, `Error fetching bounty: ${result.error.message}`);
      return;
    }

    const bounty = result.value;

    if (!bounty) {
      await this.sendMessage(chatId, "Bounty not found.");
      return;
    }

    const statusEmoji = {
      OPEN: "🟢",
      LOCKED: "🔒",
      RELEASED: "✅",
      CANCELLED: "❌",
    }[bounty.status] || "❓";

    await this.sendMessage(chatId,
      `📋 Bounty Status\n\n` +
      `ID: ${bounty.id}\n` +
      `Title: ${bounty.title}\n` +
      `Status: ${statusEmoji} ${bounty.status}\n` +
      `Reward: ${bounty.amount} tokens\n` +
      `Criteria: ${bounty.proofCriteria}\n` +
      `${bounty.hunterAddress ? `Hunter: ${bounty.hunterAddress}\n` : ""}` +
      `${bounty.proofUrl ? `Proof: ${bounty.proofUrl}\n` : ""}` +
      `Created: ${bounty.createdAt.toLocaleString()}`
    );
  }

  /**
   * Handle /list command - List open bounties
   */
  private async handleList(chatId: number): Promise<void> {
    const result = await this.store.getOpenBounties();

    if (!result.ok) {
      await this.sendMessage(chatId, `Error fetching bounties: ${result.error.message}`);
      return;
    }

    const bounties = result.value;

    if (bounties.length === 0) {
      await this.sendMessage(chatId, "No open bounties available.");
      return;
    }

    const bountyList = bounties.slice(0, 5).map(b => 
      `• ${b.title} - ${b.amount} tokens\n  ID: \`${b.id}\``
    ).join("\n\n");

    await this.sendMessage(chatId,
      `�悬赏 Open Bounties (${bounties.length})\n\n` +
      bountyList +
      `\n\nUse /status <bounty_id> for details.`
    );
  }

  /**
   * Send a message to a chat
   */
  private async sendMessage(chatId: number, text: string): Promise<void> {
    // In production, this would call Telegram API
    console.log(`[telegram] Sending to ${chatId}: ${text.substring(0, 100)}...`);
  }

  /**
   * Get welcome message
   */
  private getWelcomeMessage(): string {
    return `🏴‍☠️ Welcome to Bounty-Bot!

I'm The Arbiter - an autonomous bounty manager on Celo.

What would you like to do?

• /create - Create a new bounty
• /list - View open bounties
• /submit - Submit work for a bounty
• /status - Check bounty status
• /help - See all commands

Powered by Keyless Collective SDK`;
  }

  /**
   * Get help message
   */
  private getHelpMessage(): string {
    return `📖 Commands

/create <title> <amount> <criteria>
  Create a new bounty
  
/submit <bounty_id> <proof_url>
  Submit proof of work
  
/status <bounty_id>
  Check bounty status
  
/list
  View open bounties

Examples:
/create "Fix bug" 100 "GitHub PR"
/submit bounty_abc123 https://github.com/user/pr/1
/status bounty_abc123`;
  }
}

// Factory function to create bot
export function createTelegramBot(token: string): TelegramBot {
  return new TelegramBot(token);
}
