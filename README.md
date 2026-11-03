# DAILYHABIT — Phase 1B Frontend Implementation

Futuristic AI-powered social media and creator-commerce web application featuring Personal AI SOCMED profiles, AI SHOP, AI Assistant copilot, and a simulated dual wallet architecture.

## Phase 1B Implementation Scope

This release is a **strictly frontend-only client-side demonstration**:
- Built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.
- **In-memory React Context state**: All posts, reels playback, shop listings, wallet balances, and admin verification queues are simulated client-side.
- **Zero-Billing Safety Boundary**: No paid Gemini API keys, Firebase provisioning, GCash webhooks, external databases, or real-money payment processors are configured or invoked.

## Getting Started (Local Development)

### Prerequisites
- Node.js 20.19+ or 22.12+ (required by Vite 8)
- npm (v10 or higher) or bun

### Installation & Development Run

1. Clone or navigate to the repository directory.
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

### Production Build & Linting

- To validate TypeScript:
  ```bash
  npm run lint
  ```
- To produce an optimized production bundle:
  ```bash
  npm run build
  ```
- To preview the production bundle locally:
  ```bash
  npm run preview
  ```

## Architecture & Simulation Notices

- **AI Coins (AIC)**: Non-cash utility credits used exclusively for simulated AI SHOP tier upgrades. Carries zero monetary value and cannot be withdrawn or converted to fiat.
- **AI Pocket Money (AIPM)**: SIMULATED DEMO EQUIVALENCE ONLY — NO REAL STORED VALUE (1 AIPM = ₱1.00 PHP demo equivalence). Withdrawal requests place funds into a simulated reservation queue with batch disbursements scheduled on the 5th and 20th of the month.
- **Sample Data Only**: All treasury solvency metrics, receipt image previews, and ledger transactions are sample demonstration records and do not represent actual reserves or regulatory approvals.
- **Persona Quick-Switcher**: The bottom-left persona switcher allows auditing different role perspectives (Creator User, Admin Assistant L1 screener, Main Admin L2 reviewer) via client-side state.
