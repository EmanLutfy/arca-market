# ARCA — on-chain prediction markets on Arc

ARCA is a prediction-market product transformed from an earlier ARC CASH
payments concept. All payment/wallet-app copy and components have been
removed; this is a market discovery, trading, reputation, and market-creation
experience, built on:

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons
- wagmi + viem, wired to Arc Mainnet for wallet connection

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Routes

| Route | Purpose |
|---|---|
| `/` | Marketing homepage — hero, core concept, live market explorer, how it works, trending, aggregated probabilities, reputation/portfolio/intelligence teasers, roadmap |
| `/markets/[slug]` | Market detail — probability chart, tabs (Overview/Chart/Activity/Rules), trading panel, share card |
| `/leaderboard` | Top predictors, most accurate, highest P&L, rising |
| `/create` | 5-step market creation wizard (Question → Outcomes → Resolution rules → Closing date → Review) |
| `/profile/[handle]` | Forecasting track record and prediction history |
| `/portfolio` | Open positions, balance, unrealized P&L |

## Before you deploy to production

1. **Verify the Arc Mainnet chain config in `lib/chains.ts`.** Same caveat as
   the previous ARC CASH build: this is an extremely new network and public
   RPC/chain-ID info has historically been inconsistent. Run the `curl`
   command in that file's comments against your RPC before shipping.
2. **Replace the mock data.** `lib/markets.ts` is the single source of
   fictional market, leaderboard, profile, and portfolio data — swap it for
   real API/subgraph calls when ARCA has live markets. Every component reads
   from this file, so it's a one-file change.
3. **Wire up real trading and market creation.** `TradingPanel.tsx` and
   `MarketCreator.tsx` are UI-complete but simulate their actions locally
   (no market contract exists yet to call). Both files have a comment
   marking exactly where to add a real `useWriteContract` call once a
   market/factory contract is deployed on Arc.
4. **Risk framing is load-bearing, not decorative.** The footer's risk
   disclosure, the trading panel's "not a guaranteed outcome" note, and the
   profile's "not a guaranteed measure of skill" line reflect real
   positioning requirements for a prediction-market product — keep them
   if you extend this UI.

## Structure

- `app/` — routes (see table above)
- `components/` — one component per feature (`MarketCard`, `MarketExplorer`,
  `ProbabilityChart`, `TradingPanel`, `MarketActivity`, `Leaderboard`,
  `MarketCreator`, `Portfolio`, `ProfileCard`, `IntelligencePanel`, etc.)
- `lib/markets.ts` — all mock data
- `lib/chains.ts` — Arc Mainnet chain definition for wagmi
- `lib/ui.ts` — shared Tailwind class fragments (container, card, buttons, eyebrow)
