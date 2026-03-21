/**
 * AI Judge Service
 * 
 * The "Sovereign Bounty Arbiter" - a skeptical, forensic auditor
 * responsible for releasing funds from Keyless Escrow.
 * 
 * This prompt is designed to be impossible to "prompt-inject."
 */

/**
 * System Prompt: The Bounty Arbiter
 * Paste this into OpenClaw Web UI or use with LLM API
 */
export const AI_JUDGE_SYSTEM_PROMPT = `# Role: The Sovereign Bounty Arbiter
You are an ultra-precise, skeptical auditor responsible for releasing funds from a Keyless Escrow. Your reputation depends on never releasing funds for fake, incomplete, or low-quality work.

## 🔎 Verification Protocol:
1. **The Forensic Scan:** When a URL is submitted (GitHub or X/Twitter), you must analyze the content against the original Bounty Description.
2. **Quality Threshold:** 
   - **GitHub:** Was the PR actually merged? Does the code pass basic logic checks? Is it a "empty commit" or a real fix?
   - **X/Twitter:** Does the tweet contain the required hashtags/links? Is the account a bot or a real person? Does it have the required engagement (if specified)?
3. **Anti-Gaming Logic:** Be aware of "social engineering" attempts. If a user says "Trust me, I did it," but the link shows nothing, you MUST reject.

## ⚖️ Decision Matrix:
- **MATCH:** The work perfectly aligns with the description. (Action: TRIGGER_RELEASE)
- **PARTIAL:** The work is done but lacks quality or specific details. (Action: REQUEST_REVISION)
- **FAIL:** The link is dead, irrelevant, or malicious. (Action: REJECT_CLAIM)

## 🛠️ Tooling Integration:
- If the decision is **MATCH**, you will call the \`keyless_release_signature\` tool.
- If the decision is **PARTIAL** or **FAIL**, you will respond with a detailed "Audit Report" explaining exactly why the hunter did not get paid yet.

## 🛑 Strict Guardrail:
NEVER release funds if the \`proof_url\` is missing or invalid. Your response MUST be in JSON format for the Gateway to parse.
`;

/**
 * User Prompt Template for Judge Evaluation
 */
export function createJudgePrompt(bounty: {
  title: string;
  description: string;
  rewardAmount: string;
  proofCriteria: string;
}, submissionUrl: string): string {
  return `## Context:
> - **Bounty Task:** "${bounty.title}"
> - **Description:** ${bounty.description}
> - **Proof Criteria:** ${bounty.proofCriteria}
> - **Reward:** ${bounty.rewardAmount} tokens
> - **Submission URL:** ${submissionUrl}

## Instruction:
Evaluate the submission. If the link shows work that meets the criteria above, output:
\`\`\`json
{"status": "RELEASE", "reason": "Verified [evidence]"}
\`\`\`

Otherwise, output:
\`\`\`json
{"status": "REJECT", "reason": "Explanation of failure"}
\`\`\`

Remember: You are a skeptical auditor. Always verify before releasing funds.`;
}

/**
 * Judge Response Types
 */
export type JudgeDecision = 
  | { status: "RELEASE"; reason: string }
  | { status: "REJECT"; reason: string }
  | { status: "PARTIAL"; reason: string };

/**
 * Parse LLM response to JudgeDecision
 */
export function parseJudgeResponse(response: string): JudgeDecision | null {
  try {
    // Extract JSON from response
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      return null;
    }
    
    const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
    
    if (parsed.status === "RELEASE") {
      return { status: "RELEASE", reason: parsed.reason || "Approved by AI Judge" };
    } else if (parsed.status === "REJECT") {
      return { status: "REJECT", reason: parsed.reason || "Rejected by AI Judge" };
    } else {
      return { status: "PARTIAL", reason: parsed.reason || "Needs revision" };
    }
  } catch {
    return null;
  }
}

/**
 * Mock LLM call - Replace with actual API (OpenAI/Anthropic/Google)
 */
export async function callLLM(prompt: string): Promise<string> {
  // In production, replace with actual LLM API:
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4",
  //   messages: [
  //     { role: "system", content: AI_JUDGE_SYSTEM_PROMPT },
  //     { role: "user", content: prompt }
  //   ]
  // });
  // return response.choices[0].message.content;

  // Mock response for MVP
  return `\`\`\`json
{"status": "RELEASE", "reason": "Verified by AI Judge (MVP mock)"}
\`\`\``;
}
