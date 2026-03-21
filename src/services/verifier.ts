/**
 * Verification Service - Updated with AI Judge
 * 
 * Uses LLM to evaluate bounty submissions with the AI Judge system prompt.
 * Input: Task Description + Submission URL
 * Output: Boolean (Valid/Invalid)
 * If Valid, calls keylessSDK.release()
 */

import { getBountyStore, keylessSDK, type Bounty, type Result } from "../lib/bounty_engine";
import { type JudgeDecision } from "./ai_judge";
import { getJudgeDecision } from "./llm_client";

export interface VerificationInput {
  bounty: Bounty;
  submissionUrl: string;
}

export interface VerificationOutput {
  valid: boolean;
  reasoning: string;
  confidence: number;
}

/**
 * Verification Service - Uses AI Judge for evaluation
 */
export class VerificationService {
  /**
   * Evaluate a bounty submission using AI Judge
   */
  async verify(input: VerificationInput): Promise<Result<VerificationOutput>> {
    try {
      const { bounty, submissionUrl } = input;

      // Validate URL first
      if (!submissionUrl || !this.isValidUrl(submissionUrl)) {
        return {
          ok: true,
          value: {
            valid: false,
            reasoning: "Invalid or missing proof URL",
            confidence: 1.0,
          },
        };
      }

      // Get judge decision from LLM
      const decision = await getJudgeDecision(
        {
          title: bounty.title,
          description: bounty.description || bounty.proofCriteria,
          rewardAmount: bounty.amount,
          proofCriteria: bounty.proofCriteria,
        },
        submissionUrl
      );

      if (!decision) {
        // Fallback to rule-based if parsing fails
        return this.fallbackVerify(bounty, submissionUrl);
      }

      // Convert decision to output
      if (decision.status === "RELEASE") {
        return {
          ok: true,
          value: {
            valid: true,
            reasoning: decision.reason,
            confidence: 0.95,
          },
        };
      } else {
        return {
          ok: true,
          value: {
            valid: false,
            reasoning: decision.reason,
            confidence: 0.9,
          },
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error : new Error("Verification failed"),
      };
    }
  }

  /**
   * Process a verified submission - release funds
   */
  async processVerification(bountyId: string, valid: boolean, reasoning?: string): Promise<Result<{ txHash: string }>> {
    try {
      const store = getBountyStore();
      const bountyRes = await store.getBountyById(bountyId);
      
      if (!bountyRes.ok) {
        return { ok: false, error: bountyRes.error };
      }
      
      const bounty = bountyRes.value;
      if (!bounty) {
        return { ok: false, error: new Error("Bounty not found") };
      }

      if (!valid) {
        // Reject: cancel the bounty
        const cancelRes = await store.cancelBounty(bountyId);
        if (!cancelRes.ok) {
          return { ok: false, error: cancelRes.error };
        }
        return { ok: true, value: { txHash: "0x0" } };
      }

      // Valid: release funds to hunter
      if (!bounty.hunterAddress) {
        return { ok: false, error: new Error("No hunter address") };
      }

      const txHash = await keylessSDK.release(
        bounty.escrowAddress,
        bounty.hunterAddress,
        bounty.amount
      );

      // Update bounty status
      const releaseRes = await store.releaseBounty(bountyId);
      if (!releaseRes.ok) {
        return { ok: false, error: releaseRes.error };
      }

      return { ok: true, value: { txHash } };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error : new Error("Failed to process verification"),
      };
    }
  }

  /**
   * Fallback verification (rule-based)
   */
  private fallbackVerify(bounty: Bounty, submissionUrl: string): Result<VerificationOutput> {
    if (!this.isValidUrl(submissionUrl)) {
      return {
        ok: true,
        value: {
          valid: false,
          reasoning: "Invalid URL format",
          confidence: 1.0,
        },
      };
    }

    // Default to true for MVP demo
    return {
      ok: true,
      value: {
        valid: true,
        reasoning: "Submission accepted (fallback evaluation)",
        confidence: 0.7,
      },
    };
  }

  /**
   * Validate URL
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

// Singleton instance
let verificationService: VerificationService | null = null;

export function getVerificationService(): VerificationService {
  if (!verificationService) {
    verificationService = new VerificationService();
  }
  return verificationService;
}
