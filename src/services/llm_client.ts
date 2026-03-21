/**
 * LLM Client - Production Version
 * 
 * Supports OpenAI, Anthropic, and Google Gemini
 */

import { 
  AI_JUDGE_SYSTEM_PROMPT, 
  createJudgePrompt, 
  parseJudgeResponse, 
  type JudgeDecision 
} from "./ai_judge";

export type LLMProvider = "openai" | "anthropic" | "google";

export interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
  model?: string;
}

export interface LLMResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * LLM Client for AI Judge
 */
export class LLMClient {
  private config: LLMConfig;

  constructor(config: LLMConfig) {
    this.config = config;
  }

  /**
   * Call the LLM with the judge prompt
   */
  async call(prompt: string): Promise<string> {
    switch (this.config.provider) {
      case "openai":
        return this.callOpenAI(prompt);
      case "anthropic":
        return this.callAnthropic(prompt);
      case "google":
        return this.callGoogle(prompt);
      default:
        throw new Error(`Unknown provider: ${this.config.provider}`);
    }
  }

  /**
   * OpenAI API call
   */
  private async callOpenAI(prompt: string): Promise<string> {
    const model = this.config.model || "gpt-4";
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: AI_JUDGE_SYSTEM_PROMPT },
          { role: "user", content: prompt }
        ],
        temperature: 0.1, // Low temperature for consistent judgments
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json() as any;
    return data.choices[0].message.content;
  }

  /**
   * Anthropic API call
   */
  private async callAnthropic(prompt: string): Promise<string> {
    const model = this.config.model || "claude-3-opus-20240229";
    
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.config.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        system: AI_JUDGE_SYSTEM_PROMPT,
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error: ${error}`);
    }

    const data = await response.json() as any;
    return data.content[0].text;
  }

  /**
   * Google Gemini API call
   */
  private async callGoogle(prompt: string): Promise<string> {
    const model = this.config.model || "gemini-pro";
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${this.config.apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${AI_JUDGE_SYSTEM_PROMPT}\n\n${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 500,
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Google API error: ${error}`);
    }

    const data = await response.json() as any;
    return data.candidates[0].content.parts[0].text;
  }
}

/**
 * Factory function to create LLM client from environment
 */
export function createLLMClient(): LLMClient {
  const provider = (process.env.LLM_PROVIDER as LLMProvider) || "openai";
  const apiKey = process.env.LLM_API_KEY || "";
  
  if (!apiKey) {
    throw new Error("LLM_API_KEY environment variable is required");
  }

  return new LLMClient({
    provider,
    apiKey,
    model: process.env.LLM_MODEL,
  });
}

/**
 * Call LLM and get judge decision
 */
export async function getJudgeDecision(
  bounty: {
    title: string;
    description: string;
    rewardAmount: string;
    proofCriteria: string;
  },
  submissionUrl: string
): Promise<JudgeDecision> {
  const client = createLLMClient();
  const prompt = createJudgePrompt(bounty, submissionUrl);
  const response = await client.call(prompt);
  
  const decision = parseJudgeResponse(response);
  
  if (!decision) {
    // Fallback if parsing fails
    return { 
      status: "REJECT", 
      reason: "Failed to parse LLM response" 
    };
  }
  
  return decision;
}
