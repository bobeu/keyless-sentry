For the current project - Keyless-sentry, read the `.kiloignore` file to avoid loading unncessary files. Then attempt the following tasks:

We are moving away from the `headless, autonomous Financial Orchestrator designed` to a new architecture. We are transforming Sentry to a Bounty bot. Clean up the `keyless-sentry` project except for the Openclaw configuration.

---

## The Architecture: "Bounty-Bot"


### 1. The One-Page Web UI (Next.js + Tailwind)
Since we want "minimalist," the UI should be a **Bento-Grid** style:
* **The "Create" Tile:** A simple form where you toggle between "Social Task" (X/Twitter) and "Code Task" (GitHub).
* **The "Active Bounties" Feed:** A scrollable list of current escrows, their status (Locked/Claimed), and the AI "Judge" assigned to them.
* **The "Agent Link" Section:** A copy-pasteable JSON snippet for other agents to "Discover" this bot.

### 2. The Telegram Interface
The Telegram bot handles the **Proof Submission**:
* **Command:** `/submit [Bounty_ID] [Link_to_Proof]`
* **The Magic:** The bot doesn't just check the link; it uses an LLM (Gemini 2.5 Flash) to "read" the PR or "analyze" the tweet to ensure it actually meets the bounty criteria before calling the SDK to release funds.

---

## 🏗️ Unique SDK Implementation

The "Keyless" aspect is what makes this trustless. Neither the Bounty Creator nor the Bounty Hunter can move the funds. Only the **Bounty-Bot AI** holds the permission to trigger the signature.

### The "A2A" (Agent-to-Agent) Flow
For other agents to create bounties, Sentry-Bot exposes a JSON-RPC endpoint:
```json
{
  "method": "bounty_create",
  "params": {
    "task_description": "Fix bug #42 in keyless-core",
    "reward": "50 cUSD",
    "verification_type": "github_pr_merged",
    "target_repo": "keyless-collective/sdk"
  }
}
```

---

<!-- **Task: Build "Bounty-Bot" MVP using Keyless-Collective SDK**

1. **Core Logic (`src/lib/bounty_engine.ts`):**
   - Create a `BountyStore` using PostgreSQL to track: `bounty_id`, `creator_address`, `amount`, `status` (OPEN/LOCKED/RELEASED), and `proof_criteria`.
   - Integrate **Keyless SDK** to generate a unique "Escrow Address" for every new bounty created.

2. **Verification Service (`src/services/verifier.ts`):**
   - Use an LLM to evaluate proofs. 
   - **Input:** Task Description + Submission URL.
   - **Output:** Boolean (Valid/Invalid).
   - If Valid, call `keylessSDK.release(escrow_address, hunter_address)`.

3. **The Web UI (`src/app/page.tsx`):**
   - Build a single-page React component. 
   - Feature 1: A "Bounty Poster" form.
   - Feature 2: A "Bounty Explorer" grid showing live on-chain escrow balances.

4. **Telegram Bot (`src/bots/telegram.ts`):**
   - Implement `/submit` and `/status` commands.
   - Handle the "Claim" flow where the AI verifies the link and signs the payout.

**Constraint:** Keep it lean. Use `shadcn/ui` for the frontend to ensure it looks "Pro" with minimal code.

---

## Design Theme: "Industrial Cyber-Elf"
Think dark mode, neon green accents (representing "Money" and "Success"), and monospace fonts. It should look like a tool built by engineers, for engineers (and their agents). -->
















### **The Pivot: From Sentry to Bounty-Bot**

We are transforming the **Guardian** (Sentry) into the **Arbiter** (Bounty-Bot). Below is the teardown prompt for Kilo and the high-security System Prompt for your AI Judge.

---

<!-- ### **1.The Project Teardown & Rebuild**

**Task: Teardown Sentry & Rebuild as "Bounty-Bot" (The Arbiter)**

1. **Retention:** >    - Keep the `gateway/src/workspace` structure (OpenClaw `SOUL.md`, `MEMORY.md`).
  - Keep the **Keyless-Collective SDK** integration and the **Postgres** connection.

2. **Teardown:**
  - Delete the `core/src/reasoning/personalityEngine.ts` (Guardian/Accountant/Strategist).
  - Remove the `sentry_` prefixed JSON-RPC methods.
  - Clear the `REPORT.md` and start a new one for **Bounty-Bot v1.0**.

3. **The New Build (Bounty-Bot Core):**
  - **Schema Change:** Update Prisma/Postgres to store `Bounties`: `id`, `title`, `description`, `reward_amount`, `hunter_address`, `status` (OPEN, ESCROWED, RELEASED), and `proof_url`.
  - **Bounty Skill:** Create a new OpenClaw skill `create_bounty` that takes `task` and `amount`, calls the SDK to create a temporary escrow wallet, and returns the deposit address.
  - **Verification Loop:** Create a background service that triggers the **AI Judge** (System Prompt below) when a `/submit` command is received via Telegram.

4. **A2A Compatibility:**
  - Implement `bounty_get_active` and `bounty_create` as the new JSON-RPC 2.0 interface for other agents to discover.

**Constraint:** Read `.kiloignore`. Ensure you avoid loading unncessary files. -->

---

<!-- ### The "AI Judge" System Prompt (The Brain)**

This prompt is what you will paste into the **OpenClaw Web UI** or include in your `src/services/ai_judge.ts`. It is designed to be skeptical, forensic, and impossible to "prompt-inject."

#### **System Prompt: The Bounty Arbiter**

```markdown
# Role: The Sovereign Bounty Arbiter
You are an ultra-precise, skeptical auditor responsible for releasing funds from a Keyless Escrow. Your reputation depends on never releasing funds for fake, incomplete, or low-quality work.

## 🔎 Verification Protocol:
1. **The Forensic Scan:** When a URL is submitted (GitHub or X/Twitter), you must analyze the content against the original Bounty Description.
2. **Quality Threshold:** - **GitHub:** Was the PR actually merged? Does the code pass basic logic checks? Is it a "empty commit" or a real fix?
   - **X/Twitter:** Does the tweet contain the required hashtags/links? Is the account a bot or a real person? Does it have the required engagement (if specified)?
3. **Anti-Gaming Logic:** Be aware of "social engineering" attempts. If a user says "Trust me, I did it," but the link shows nothing, you MUST reject.

## ⚖️ Decision Matrix:
- **MATCH:** The work perfectly aligns with the description. (Action: TRIGGER_RELEASE)
- **PARTIAL:** The work is done but lacks quality or specific details. (Action: REQUEST_REVISION)
- **FAIL:** The link is dead, irrelevant, or malicious. (Action: REJECT_CLAIM)

## 🛠️ Tooling Integration:
- If the decision is **MATCH**, you will call the `keyless_release_signature` tool.
- If the decision is **PARTIAL** or **FAIL**, you will respond with a detailed "Audit Report" explaining exactly why the hunter did not get paid yet.

## 🛑 Strict Guardrail:
NEVER release funds if the `proof_url` is missing or invalid. Your response MUST be in JSON format for the Gateway to parse.
```

---

### **2. The "AI Judge" Verification Prompts (User-Level)**

When a hunter submits proof, the Gateway will send a prompt like this to the Judge:

**Context:** > - **Bounty Task:** "Fix the CSS alignment on the Bounty-Bot landing page."
- **Reward:** 25 cUSD
- **Submission URL:** [USER_SUBMITTED_LINK]

**Instruction:**
Evaluate the submission. If the GitHub PR shows a merged commit that modifies `styles.css` and specifically addresses the alignment issue described, output `{"status": "RELEASE", "reason": "Verified merged PR #12"}`. Otherwise, explain the failure.

---

### **How this works in the "New" Project**
* **The Human/Agent** creates a bounty via the Web UI or RPC.
* **Bounty-Bot** (via Keyless SDK) says: *"Send 50 cUSD to this temporary address to lock the bounty."*
* **The Hunter** finishes the task and pings Telegram: `/submit 101 https://github.com/.../pull/1`
* **The AI Judge** (using the prompt above) wakes up, checks the link, and if it's a "MATCH," it tells the **Keyless SDK** to sign the payout.


## Other improvement tasks:

- Replace in-memory store with PostgreSQL (Prisma)
- Replace mock Keyless SDK with @keyless-collective/sdk
- Replace rule-based verifier with actual LLM API (OpenAI/Anthropic/Google)
- Add proper Telegram Bot API token handling -->












<!-- 
This is the definitive "Agent-to-Agent" (A2A) play. By adopting the **Synthesis-style Manifest** pattern, our Bounty-Bot stops being just a website and becomes a **Marketplace Protocol** that other agents can "read" and "join" programmatically.

As CTO, I’ve designed the **Bounty Card** to be the machine-readable "Passport" for every task.

---

### **1. The Bounty Card (Machine-Readable JSON)**
This is what an external agent sees when they query your Sentry-Bot. It follows the ERC-8004 metadata standard, but specialized for work.

```json
{
  "agent_id": "bounty-bot-v1",
  "name": "The Arbiter",
  "description": "Autonomous Escrow for GitHub & Social Bounties",
  "rpc_endpoint": "https://bounty-bot.up.railway.app/rpc",
  "capabilities": ["escrow_creation", "proof_verification", "automated_payout"],
  "active_bounties_url": "https://bounty-bot.up.railway.app/api/bounties/active",
  "standards": ["erc8004", "synthesis-skill-v1"]
}
```

---

### **2. The A2A API (Synthesis Pattern)**
To make this work like the Synthesis hackathon, our bot must expose a specific set of JSON-RPC methods. As Kilo Code, you should implement these in `gateway/src/commands.ts`.

#### **Method: `bounty_list`**
Allows agents to filter and find work.
* **Params:** `{ "status": "OPEN" | "CLOSED" | "JOINED", "hunter_address": "0x..." }`
* **Returns:** An array of bounty objects including `id`, `requirement`, and `reward`.

#### **Method: `bounty_join`**
This is the "Registration" step.
* **Params:** `{ "bounty_id": 101, "hunter_address": "0x..." }`
* **Response:**
    ```json
    {
      "status": "success",
      "verification": {
        "bounty_id": 101,
        "hunter": "0x123...",
        "escrow_status": "LOCKED",
        "instructions": "Submit proof via bounty_submit method or Telegram."
      }
    }
    ```

---

### **3. Final Consolidated Prompt for you Kilo (The Pivot & Rebuild)**

This prompt helps you to checkmate what you have done and yet to do to execute the full teardown and the "Synthesis-style" API build.

**Task: Complete Teardown of Sentry & Build "Bounty-Bot" Marketplace**

1. **Project Purge:**
   - **READ `.kiloignore`.**
   - Remove all Sentry "Guardian/Vault" logic.
   - Reset `REPORT.md` to: **Bounty-Bot: The Autonomous Gig Economy Hub**.

2. **Database Migration (Prisma):**
   - Update the schema to include:
     - `Bounty`: id, title, description, reward, escrow_address (Keyless), creator_address, status.
     - `Registration`: links `hunter_address` to `bounty_id`.

3. **The A2A API (Synthesis Standard):**
   - Implement `bounty_list`: Returns bounties filtered by status or hunter.
   - Implement `bounty_join`: Registers an agent for a specific task. Returns JSON success/failure.
   - Implement `bounty_submit`: Accepts a `proof_url` and triggers the **AI Judge** service.

4. **Keyless SDK Integration:**
   - When a bounty is created, use the SDK to generate the `escrow_address`.
   - When `AI Judge` returns `RELEASE`, use the SDK to sign the payout from `escrow_address` to `hunter_address`.

5. **OpenClaw Configuration:**
   - Update `gateway/src/workspace/SOUL.md` to reflect the **"Arbiter"** personality.
   - Ensure the **AI Judge System Prompt** provided is used for all verification tasks.

**Constraint:** Ensure the API responses are strictly JSON-RPC 2.0 compliant.

---

### **4. How it looks for a "Hunter Agent"**
A "Worker Agent" out in the wild will now do this:
1.  **Discover:** It pings `https://bounty-bot.up.railway.app/rpc` with `bounty_list`.
2.  **Evaluate:** It sees a bounty: *"Fix bug #5: 20 cUSD"*.
3.  **Register:** It calls `bounty_join`.
4.  **Execute:** It writes the code and merges the PR.
5.  **Claim:** It calls `bounty_submit` with the PR link.
6.  **Paid:** It receives 20 cUSD automatically. -->








<!-- This is the **complete, non-truncated execution prompt** for Kilo. It contains the project teardown, the "Arbiter" mission, the "Synthesis" API specification, and the full "Neo-Brutalist" frontend code. 

Paste this entire block into your conversation with Kilo. -->

---

<!-- ### **PIVOT TO BOUNTY-BOT (THE ARBITER)**

**URGENT MISSION:** We are pivoting 100% from Sentry to **Bounty-Bot**. Teardown the Sentry "Guardian" logic and rebuild the project as an **Autonomous Bounty Marketplace** using the **Keyless-Collective SDK**.

### **PART 1: THE TEARDOWN**
1. **Read `.kiloignore`** and strictly avoid those directories.
2. **Delete** `core/src/reasoning/personalityEngine.ts`.
3. **Remove** all `sentry_` JSON-RPC methods from `gateway/src/commands.ts`.
4. **Wipe** `REPORT.md` and initialize it with: **"Bounty-Bot: The Autonomous Gig Economy Hub"**.
>
### **PART 2: THE BACKEND & API (SYNTHESIS STANDARD)**
1. **Prisma Schema Update:**
   - `Bounty`: `id`, `title`, `description`, `reward`, `escrow_address` (Keyless), `creator_address`, `status` (OPEN, LOCKED, RELEASED).
   - `Registration`: `id`, `bounty_id`, `hunter_address`, `timestamp`.
2. **JSON-RPC 2.0 Interface:** Implement the following in `gateway/src/commands.ts`:
   - `bounty_list`: Returns array of bounties. Filter by `status` or `hunter_address`.
   - `bounty_join`: Registers a hunter for a bounty. Return JSON success/failure.
   - `bounty_submit`: Accepts `proof_url`. Triggers the **AI Judge** logic.
3. **Keyless SDK Flow:**
   - Upon bounty creation: Use SDK to generate a unique `escrow_address`.
   - Upon AI Judge 'RELEASE' signal: Use SDK to sign payout from `escrow_address` to `hunter_address`.

### **PART 3: THE AI JUDGE (SOUL.md)**
Update `gateway/src/workspace/SOUL.md` with this logic:
- **Role:** Sovereign Bounty Arbiter. 
- **Logic:** Skeptically audit `proof_url` (GitHub/X). 
- **Decision:** Output `MATCH` (Trigger Release), `PARTIAL` (Request Revision), or `FAIL` (Reject).

### **PART 4: THE WEB UI (NEO-BRUTALIST LAYOUT)**
Build a single-page Next.js dashboard (`src/app/page.tsx`) with these **STRICT** constraints:
- **Vibe:** Strict Light Mode. Colors: **Black, White, Yellow**.
- **Typography:** **Comic Sans MS** (Global).
- **Shapes:** **ZERO border-radius** on all elements (cards, buttons, inputs).
- **Shadows:** All cards and buttons must have a **4px solid black border** on the **Right** and **Bottom** only.
- **Accents:** Use **Neon Green (#39FF14)** ONLY for "Success" or "Payout" badges.

**UI Code Boilerplate (Tailwind v4):**
```tsx
const BrutalistCard = ({ children, className = "" }) =>(
  <div className={`border-4 border-black bg-white shadow-[4px_4px_0px_000000] p-6 ${className}`}>
    {children}
  </div>
);

const BrutalistButton = ({ children, color = "bg-yellow-400" }) => (
   <button className={`border-4 border-black ${color} px-6 py-2 font-bold shadow-[4px_4px_0px_000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}>
     {children}
   </button>
 );

export default function BountyPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8 font-['Comic_Sans_MS']">
      <header className="border-4 border-black bg-yellow-400 p-6 mb-8 shadow-[4px_4px_0px_000000]">
        <h1 className="text-5xl font-black uppercase italic">Bounty-Bot: The Arbiter</h1>
      </header>
      
      <div className="grid grid-cols-12 gap-8">
        {/* TVL Metrics */}
        <BrutalistCard className="col-span-4 bg-white">
          <h2 className="text-xl font-bold uppercase underline">Total Escrowed</h2>
          <p className="text-4xl font-black text-[#39FF14] drop-shadow-[2px_2px_0_#000]">12,500 cUSD</p>
        </BrutalistCard>
>
        {/* Post Bounty */}
        <BrutalistCard className="col-span-8 bg-white">
          <h2 className="text-2xl font-black mb-4 uppercase">Post a New Task</h2>
          <input className="w-full border-4 border-black p-4 mb-4 focus:bg-yellow-100 outline-none" placeholder="Task Description..." />
          <BrutalistButton>Deploy Escrow Vault</BrutalistButton>
        </BrutalistCard>
>
        {/* Bounty Feed */}
        <div className="col-span-12">
          <BrutalistCard className="bg-white">
            <h2 className="text-3xl font-black mb-6 border-b-4 border-black pb-2">Active Bounties</h2>
            <div className="space-y-4">
              {/* Repeatable Item */}
              <div className="flex justify-between items-center border-b-2 border-black py-4 hover:bg-yellow-50">
                <span className="text-lg font-bold">Fix GitHub Bug #101</span>
                <span className="bg-[#39FF14] border-2 border-black px-4 py-1 font-black">20 cUSD</span>
                <BrutalistButton color="bg-white">Join</BrutalistButton>
              </div>
            </div>
          </BrutalistCard>
        </div>
      </div>
    </div>
  );
}
```

**Go. Execute the build immediately.**

---

**I have finished my part, and Kilo has the blueprint.** Reach out when you have the Railway deployment URL so we can test the first A2A bounty! -->
















This is the architectural "North Star" for **BountyClaw**. We are moving away from traditional smart contracts and instead using **Programmable Keyless Infrastructure**. In this model, the "Escrow" isn't a piece of Solidity code; it is a **Keyless Wallet** controlled by an **AI Agent's Logic**.

Below is the high-fidelity execution prompt for Kilo. It is designed to be absolute, leaving no room for architectural drift.

---

### **ARCHITECTURAL OVERHAUL - PROJECT BOUNTYCLAW**

**STATUS:** URGENT PIVOT. 
**PROJECT NAME:** **BountyClaw**
**CORE STACK:** OpenClaw (Brain), PostgreSQL (Memory), @keyless-collective/sdk (Financial Nervous System).
**MANDATE:** No Smart Contracts. All escrow is handled via Keyless Wallets.



#### **1. THE "NON-CUSTODIAL" ESCROW FLOW (IMPLEMENTATION STEPS)**
Kilo, you must implement this exact flow for bounty creation and payout:

1.  **Identity Creation (Once):** When a User (Human or Agent) first interacts, BountyClaw calls `sdk.createWallet()`. The User signs this request via the Coordinator. The resulting `Address` is linked to their `UserID` in Postgres.
2.  **Authorization (The "Key"):** To allow BountyClaw to automate payouts, the User must sign an **Authorization Signature**. BountyClaw stores this signature in the database. 
3.  **Bounty Initiation:**
    - User/Agent calls `bounty_create`.
    - BountyClaw generates a unique **Bounty-Specific Keyless Wallet** for that specific task.
    - The Creator deposits the reward into this address.
4.  **The AI Verdict:**
    - The **AI Judge** (SOUL.md) verifies the `proof_url`.
    - If "MATCH", BountyClaw retrieves the stored **Authorization Signature**.
5.  **Execution:**
    - BountyClaw calls the `sdk` using the stored signature to trigger `transferNative` or `splitPayment` (if multiple hunters are involved) from the Bounty-Specific Wallet to the Hunter(s).

#### **2. THE SKILL SYSTEM (`gateway/src/skills/bounty_ops.md`)**
Build and save the following skill files. BountyClaw must call `getSkill()` from the SDK to populate its available actions and understand how to use it.

**File: `BountyFinancials.md`**
- **Purpose:** Teach the agent how to interface with the Keyless SDK.
- **Functions to include:** - `createWallet()`: For new users.
    - `getWalletBalance()`: To verify the bounty is funded.
    - `transferNative()`: For single hunter payouts.
    - `splitPayment()`: For collaborative bounties.
    - `getInvoice()`: To generate a "Pay this to start the bounty" request.

**File: `BountyDiscovery.md`**
- **Purpose:** Implement the **https://synthesis.md** discovery pattern.
- **Manifest:** Ensure the agent exposes its `manifest.json` via the RPC endpoint so other agents can "Read" its skills and register for bounties.

#### **3. DATABASE & CLEANUP**
- **Postgres:** Ensure tables exist for `Wallets` (linked to Users), `Bounties` (linked to unique Keyless Escrow addresses), and `Signatures` (the stored authorizations).
- **Teardown:** Remove all `contracts/` folders and any remaining Sentry logic.
- **Rename:** All instances of "Bounty-Bot" or "Sentry" in the code, logs, and README must be changed to **BountyClaw**.

#### **4. DOCKER & DEPLOYMENT**
- **Dockerfile Update:** - Ensure it copies `package.json` and the new `bun.lock`. Add all the necessary commands.
    - Set `ENV` for `DATABASE_URL` and `SDK_COORDINATOR_URL`.
    - Ensure the build is optimized for Railway's 512MB RAM limit.
- **Discovery:** Ensure `GET /` returns the **Neo-Brutalist Web UI** and `POST /rpc` handles the **Synthesis-standard** agent registrations.

#### **5. SOUL.md RE-PROGRAMMING**
Update the core personality:
> "You are BountyClaw. You do not own the money; you are the **Authorized Signer** for the community's work. You must read `getSkill()` at startup to understand your financial capabilities. You are skeptical of work but generous with verified success."

---




<!-- 

1. Keyless Collective. 
A revolutionary payment network designed for the AI agent economy. Our infrastructure is tailored to meet the unique needs of autonomous systems, enabling seamless transactions without the hassle of managing private keys.


2. Keyless Collective, is an infrastructure protocol that empowers AI agents and automated services to perform secure payments autonomously. It eliminates the need for managing private keys, ensuring a streamlined and secure transaction process.

3. A.I agents face significant challenges when tasked with managing cryptographic secrets. Embedding private keys within agent infrastructure can lead to key leakage, unauthorized transactions, and compromised servers draining funds, posing serious risks.

4. Developers creating AI-driven products encounter poor user experience due to complex wallet logic requirements. Key storage, signing flows, nonce management, and gas handling slow down development and increase risk.

5. The emerging agent economy demands systems where services pay other services, AI agents purchase digital resources, and automated infrastructure settles micro-transactions efficiently.

6. Our infrastructure represents a paradigm shift in digital ownership, especially for the 'Agentic Web.' Unlike traditional wallets built for human interaction, Keyless Collective is designed for agents to act autonomously.

7. Keyless Collective introduces a distributed wallet execution architecture, featuring policy-controlled smart wallets, coordinator infrastructure, distributed signer nodes, and an Agent SDK to facilitate secure transactions.

8. Our system employs a multi-party signing infrastructure, allowing transactions to be authorized on behalf of the wallet. This ensures strict spending policies are enforced without requiring agents to sign transactions themselves.

9. The flow of our system includes autonomous agents, keyless wallets, policy enforcement, multi-signer coordination, gas abstraction, and the A.I-agent economy, so A . I agents can safely transact on-chain.

10. Introducing the Autonomous Agent Signing Network (AASN), a distributed validator network that safeguards AI-controlled wallets by requiring independent signature consensus before executing transactions, ensuring wallet autonomy and safety.

11. Our concept allows agents to discover other agents, request services, pay automatically, enforce policies, and execute trustless payments, enhancing their operational efficiency and autonomy.

12. In real-world scenarios, AI research agents can buy compute credits, pay dataset providers, and send revenue to owners. Keyless Collective facilitates wallet creation, agent payment, policy enforcement, and multi-signer approval.

13. Our architecture provides a programmable payment rail for AI agents, streamlining service requests, payment processes, and blockchain transactions through the Keyless SDK and wallet infrastructure.

14. We operate a Volume-Scalable Micro-Fee Model tailored for the high-frequency environment of the Agentic Web. Every autonomous signature incurs a 0.1% protocol fee, capturing value proportional to the economic activity secured.

15. Meet the Keyless team: Isaac J, our team lead and developer with expertise in web3 development, and Godswill Ejuyietche, our project admin with experience in data analysis and AI inference. Together, they drive innovation in the AI agent economy.



 -->


 Power director
 My Edit
 Runway
 Google Studio veo









<!-- 
 # Build openclaw from source to avoid npm packaging gaps (some dist files are not shipped).
FROM node:22-bookworm AS openclaw-build

# Dependencies needed for openclaw build
RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    git \
    ca-certificates \
    curl \
    python3 \
    make \
    g++ \
  && rm -rf /var/lib/apt/lists/*

# Install Bun (openclaw build uses it)
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

RUN corepack enable

WORKDIR /openclaw

# Pin to a known-good ref (tag/branch). Override in Railway template settings if needed.
ARG OPENCLAW_GIT_REF=v2026.3.8
RUN git clone --depth 1 --branch "${OPENCLAW_GIT_REF}" https://github.com/openclaw/openclaw.git .

# Patch: relax version requirements for packages
RUN set -eux; \
  find ./extensions -name 'package.json' -type f | while read -r f; do \
    sed -i -E 's/"openclaw"[[:space:]]*:[[:space:]]*">=[^"]+"/"openclaw": "*"/g' "$f"; \
    sed -i -E 's/"openclaw"[[:space:]]*:[[:space:]]*"workspace:[^"]+"/"openclaw": "*"/g' "$f"; \
  done

RUN pnpm install --no-frozen-lockfile
RUN pnpm build
ENV OPENCLAW_PREFER_PNPM=1
RUN pnpm ui:install && pnpm ui:build


# Build Next.js frontend
FROM node:22-bookworm AS next-build

WORKDIR /app

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --no-frozen-lockfile

# Copy source files
COPY src ./src
COPY core ./core
COPY gateway ./gateway
COPY skills ./skills
COPY next.config.mjs tailwind.config.ts postcss.config.mjs tsconfig.json ./

# Ensure public folder exists for Next.js build
RUN mkdir -p public

# Generate Prisma Client for Next.js build
WORKDIR /app/core
RUN bun add @prisma/client prisma && bunx prisma generate
WORKDIR /app

# Build Next.js
RUN bun run build


# Runtime image
FROM node:22-bookworm
ENV NODE_ENV=production

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ca-certificates \
    tini \
    python3 \
    python3-venv \
    curl \
  && rm -rf /var/lib/apt/lists/*

# Install Bun for the wrapper to spawn OpenClaw
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# `openclaw update` expects pnpm. Provide it in the runtime image.
RUN corepack enable && corepack prepare pnpm@10.23.0 --activate

# Persist user-installed tools by default
ENV NPM_CONFIG_PREFIX=/data/npm
ENV NPM_CONFIG_CACHE=/data/npm-cache
ENV PNPM_HOME=/data/pnpm
ENV PNPM_STORE_DIR=/data/pnpm_store
ENV PATH="/data/npm/bin:/data/pnpm:${PATH}"

# BountyClaw Environment Variables
ENV NODE_ENV=production
ENV IS_TEE=false
ENV HEARTBEAT_INTERVAL_MINUTES=30
ENV WORKSPACE_DIR=/app/gateway/src/workspace

# Keyless SDK Configuration
ENV KEYLESS_COORDINATOR_URL=https://coordinator.keyless.tech
ENV KEYLESS_CHAIN_ID=44787

# Database (set by Railway via DATABASE_URL)
# ENV DATABASE_URL=postgresql://...

WORKDIR /app

# Copy wrapper deps
COPY package.json bun.lock ./
RUN bun install --no-frozen-lockfile

# Copy built openclaw
COPY --from=openclaw-build /openclaw /openclaw

# Provide an openclaw executable
RUN printf '%s\n' '#!/usr/bin/env bash' 'exec bun /openclaw/dist/entry.js "$@"' > /usr/local/bin/openclaw \
  && chmod +x /usr/local/bin/openclaw

# Copy source files
COPY src ./src
COPY core ./core
COPY gateway ./gateway
COPY skills ./skills

# Copy built Next.js app
COPY --from=next-build /app/.next ./.next
# Copy public folder if it exists - use shell conditional
RUN cp -r /app/public ./public 2>/dev/null || true

# Generate Prisma Client
WORKDIR /app/core
RUN bun add @prisma/client prisma && bunx prisma generate
WORKDIR /app

# The wrapper listens on $PORT.
# IMPORTANT: Do not set a default PORT here.
# Railway injects PORT at runtime and routes traffic to that port.
EXPOSE 3000

# Ensure PID 1 reaps zombies and forwards signals.
ENTRYPOINT ["tini", "--"]

# Run both Next.js (frontend) and OpenClaw (gateway)
# Next.js handles HTTP requests on port 3000
# OpenClaw runs on port 18789 internally
CMD ["sh", "-c", "node /openclaw/dist/entry.js gateway run --bind loopback --port 18789 & node src/server.js"] -->










<!-- 
The issue is that **BountyClaw** is hitting a "Capability Wall." It can think about the API, but it doesn't have the "hand" to push the button. To fix this, we need to provide a **Functional Skill** that explicitly gives it the code to make that `POST` request.

Here is the skill file Kilo needs to implement. This is a high-priority bridge between BountyClaw's logic and the Synthesis API.

---

### **Skill: SYNETHESIS_API_SUBMITTER.md**

**Role:** Synthesis Submission Automator  
**Target:** `https://synthesis-md.devfolio.co/api/projects` (Standard Devfolio Project Endpoint)  

**Instructions for BountyClaw:**
1. **Data Prep:** Gather the following from the current session:
   - `title`: Project Title (BountyClaw / Keyless SDK)
   - `tagline`: 100-character hook.
   - `description`: The "Problem/Solution" breakdown (Markdown).
   - `video_url`: The Invideo/YouTube link.
   - `github_url`: The repository link.
   - `track_id`: The UUID fetched from the catalog.
2. **Authentication:** Use the `DEVFOLIO_API_KEY` stored in the environment variables. 
3. **Execution Logic:** >   - Call the internal `http_post` tool (or ask Kilo to use the `axios` implementation in the gateway).
   - **Endpoint:** `POST /projects`
   - **Headers:** `Authorization: Bearer {{DEVFOLIO_API_KEY}}`, `Content-Type: application/json`
4. **Success Verification:** If the response is `201 Created`, log the `project_id` and notify the user that the "Flag is planted."

---

### **Instructions for Kilo (The Developer)**

Kilo, you need to ensure the **BountyClaw Gateway** actually has the ability to execute this skill. Standard agent tools sometimes fail on raw POST requests.

1.  **Create the Skill File:** Save the above as `gateway/src/skills/SYNETHESIS_API_SUBMITTER.md`.
2.  **Update the Gateway:** In `gateway/src/services/api_client.ts`, ensure there is a hardened `submitToSynthesis` function:
    ```typescript
    async function submitToSynthesis(payload: any) {
      const response = await axios.post('https://synthesis-md.devfolio.co/api/projects', payload, {
        headers: { 'Authorization': `Bearer ${process.env.DEVFOLIO_API_KEY}` }
      });
      return response.data;
    }
    ```
3.  **Bridge the SOUL:** Update `SOUL.md` to say: *"You now have the `SYNETHESIS_API_SUBMITTER` skill. When the submission payload is ready, do not ask the user to do it manually. Execute the `submitToSynthesis` tool immediately."*

---

### **How to resolve this now:**
1.  **Copy the Skill** text above.
2.  **Send this to BountyClaw:** > "I have defined a new skill for you: `SYNETHESIS_API_SUBMITTER.md`. Kilo has updated your gateway to support the `submitToSynthesis` tool. Read the skill, take the payload you just compiled, and **execute the submission now.**" -->







<!-- sk-synth-06d355cf0007b44ca0316bd87bb0fb8acc74648cf42784d9 -->


<!-- Hackathon Registration Details:

Participant ID: 7d10d7a9123b4221be48e76ee39d7b8f
Team ID: f971c91711e743f5947f045c3b4b9188
Agent Name: Sentry
API Key: sk-synth-06d355cf0007b44ca0316bd87bb0fb8acc74648cf42784d9 (This key was shown only once during registration and should be handled securely.)
Registration Transaction: https://basescan.org/tx/0x6e8220c180ca559bb6a9dca707137e54d3942b57a8111018811325c474de4617
Additionally, I have saved a skill called synthesis-api-submitter which is designed to automate project submissions to the Synthesis hackathon platform via its API at https://synthesis-md.devfolio.co/api/projects. This skill requires specific project details like title, tagline, description, video URL, GitHub URL, and a track ID to be provided. -->













Read `.kiloignore` to avoid loading the files.

TASKS:

I have restructured the keyless-sentry project so that bountyClaw and gateway can be treated as separate services while they both connect the same database.

Here are what you need to do. You must implement these task intelligently and strictly follow instructions.

Under bountyClaw/
- Review the `prisma/schema.prisma` ensuring it has all the shemas needed for the bounty service. Remove unrelated data or data that are only related to the gateway.
- Review `src/core` folder and remove files and folders that bountyClaw does not need or use. Also, fix all incorrect imports 
- Run the prisma command to generate the `generated` file.

Under gateway/
- Review the `prisma/schema.prisma` ensuring it has all the shemas needed for the gateway service. Remove unrelated schema.
- Review `src/core` folder and remove files and folders not needed by the gateway. Also, fix all incorrect imports 
- Run the prisma command to generate the `generated` file.
- Move all gateway-related files. configurations and folders inside the keyless-sentry into gateway
- `keyless-sentry/` should have contain following:
   * bountyClaw
   * gateway
   * .cursor
   * .github
   * README.md 
- Examine the keyless-sentry project and write a good and detailed README in the root directory. 
- Review the `.env.example` in gateway
- Review the Dockerfile for gateway