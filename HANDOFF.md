# ARCA — Session Handoff

Context for continuing this project in a new Claude session. Paste this file's
contents (or just point Claude at it) at the start of the new conversation.

## Project

**ARCA** — a prediction-market product built on **Arc** (Circle's L1 for
stablecoin finance, testnet launched late 2025, public mainnet Sep 16 2026).
Stack: Next.js (App Router) + TypeScript, Tailwind CSS, Framer Motion, Lucide
icons, wagmi + viem for wallet connection.

Positioning: "Markets for what comes next." — people trade on the probability
of future outcomes.

Local path: `/Users/emanlutfy/Documents/arca-next`. Not a git repo (no `.git`
yet) — everything is uncommitted working-tree state.

## What's been done this session, in order

1. **Switched wallet config from Arc Mainnet to Arc Testnet.**
   `lib/chains.ts` now exports both `arcMainnet` and `arcTestnet`. Testnet
   chain ID `5042002` (`0x4cef52`) was verified live against
   `https://rpc.testnet.arc.io` via `eth_chainId` — not guessed. Testnet
   RPC/explorer URLs came from `docs.arc.io/arc/references/rpc-endpoints`.
   `Providers.tsx` and `ConnectButton.tsx` were switched to use `arcTestnet`.

2. **Full ground-up visual redesign** (this was the bulk of the session — see
   design brief below, which the user gave verbatim and which should guide
   any further visual work).

3. **Generated X (Twitter) brand assets** — `public/brand/arca-logo-x.png`
   (400×400 profile picture) and `public/brand/arca-banner-x.png` (1500×500
   header), rendered via headless Chrome from HTML built to match the new
   design system. Not wired into the app anywhere — just static files for the
   user's social account.

## The design brief (user's own words, kept verbatim — treat as durable style guide)

> Redesign the existing ARCA website UI from the ground up. The current
> website looks too much like a generic AI-generated crypto template. Do not
> make another template-style Web3 landing page. Keep the existing codebase,
> functionality, responsiveness, and useful components where appropriate, but
> completely rethink the visual system, layout composition, hierarchy,
> spacing, typography, and product interface. The goal is to make ARCA feel
> like a real, premium financial technology product designed by a strong
> product design team.
>
> Design reference: use the visual philosophy of **folio.market** as
> inspiration for quality/direction (minimal, editorial, financial,
> sophisticated, typography-led, data-first, restrained, generous whitespace,
> subtle borders, quiet interactions, strong hierarchy, premium feel) — but
> do NOT copy its layout, branding, colors, text, or components. ARCA needs
> its own identity.
>
> Core philosophy: **make it look designed, not generated.** Avoid: excessive
> rounded cards, huge gradients, neon glows, floating 3D coins, generic
> crypto illustrations, glassmorphism, giant hero text filling the screen,
> repetitive card grids, decorative blobs, excessive shadows, overly rounded
> buttons, generic dashboard templates, excessive icons, unnecessary
> animations, "Web3 futuristic" clichés. Use instead: strong typography,
> whitespace, asymmetrical layouts, thin borders, subtle separators,
> editorial composition, restrained color, meaningful charts, subtle hover
> states, intentional alignment.
>
> Personality: financial terminal × editorial magazine × modern fintech ×
> prediction market. Not crypto casino × DeFi dashboard.
>
> Color: mostly monochromatic. Near-black bg, white primary, neutral gray
> secondary, very subtle borders, ONE restrained accent color used only for
> active probability / market movement / interactive states / selected nav /
> CTA emphasis. No rainbow gradients.
>
> Typography: premium modern grotesk/neo-grotesk, heavy reliance on type
> over decoration. Clear hierarchy (display/heading/body/data). Tabular
> numerals for data. Prices like "67¢" should visually stand out.

## How that brief was executed (reference this before making further changes)

**Root cause found first:** `app/layout.tsx` loaded **no font at all** (page
title was literally "test") — the whole site had been rendering in the
browser's default system sans-serif the entire time. Fixed by loading
**Geist** (`--font-display`, used for everything — headings and body) and
**Geist Mono** (`--font-mono`, used only for numeric/data display) via
`next/font/google`.

**Design tokens** (single source of truth — check these before hand-writing
any new color/spacing/radius in a component):
- `tailwind.config.js` — color palette (`bg #08080a`, `ink #f5f5f4`/`muted
  #9a9a9f`/`dim #5c5c62`, `border` at 7%/14% white, **one accent** `#d98e3e`
  restrained amber — deliberately not blue/purple to avoid generic
  "AI SaaS"/Web3 blue, and distinct from Folio's green), `yes`/`no` green/red
  kept as functional market-data color (not decorative). Border radius scale
  shrunk to 4–14px (`sm`/`md`/`lg`/`xl`) — no more giant pill radii.
- `lib/ui.ts` — shared class tokens: `container`, `sectionPad`, `divider`,
  `card`, `eyebrow` (now a neutral gray uppercase label, no colored dot),
  `data` (new — `font-mono tabular-nums`, use this on every price/number),
  `btnPrimary`/`btnGhost` (rectangular `rounded-md`, no hover-lift/glow
  shadow), `yesPill`/`noPill`.
- `app/globals.css` — flat black body background; removed the decorative
  `.bg-grain` / `.bg-glow` divs that used to sit behind every page.

**Systematic sweep across ~20 components/pages:**
- Removed every `rounded-full` pill button/tab/filter/badge, replaced with
  rectangular/thin-border treatments. Kept `rounded-full` only for things
  that should actually be circular (status dots, monogram avatars).
- Removed the two animated wavy-line SVG hero decorations (`Hero.tsx`,
  `FinalCta.tsx`) and the "architecture flowchart" component
  (`ArcConnection.tsx`, now a slim one-line band).
- Removed gradient cards (`bg-gradient-to-b from-[#121214] to-[#0c0c0d]`),
  replaced with flat `bg-card` + border.
- Replaced the generic "3 icon-in-a-box cards" pattern (`CoreConcept.tsx`)
  with a numbered editorial list — **this component was later deleted
  entirely** (see below) because it duplicated `HowItWorks.tsx`.
  `Roadmap.tsx` went from a 4-card grid to table-style rows for the same
  reason (too many repeated card grids reads as templated).
  `Leaderboard.tsx` avatars went from 4 cycling colors to monochrome
  (brief: "don't make every component colorful").
- Applied `data` (tabular-nums mono) to every price/volume/score/P&L number
  sitewide: `Hero`, `MarketCard`, `Leaderboard`, `TradingPanel`, `Portfolio`,
  `ProfileCard`, `Trending`, `MarketThinks`, `MarketDetailTabs`, `ShareCard`,
  market detail page, profile page.
- Normalized heading scale sitewide from heavy `text-4xl font-semibold
  sm:text-[2.6rem]` to a calmer `text-3xl font-medium tracking-[-0.01em]
  sm:text-4xl`.

**Iterative polish after the redesign landed (user feedback, applied in this
order — useful precedent for taste/preferences going forward):**
- Removed `CoreConcept.tsx` from the homepage entirely (and deleted the
  file) — user felt the page was too dense/packed; it was redundant with
  `HowItWorks.tsx` anyway.
- `Hero.tsx`: bottom padding progressively increased
  (`pb-16` → `pb-24` → `pb-32` → **`pb-40 sm:pb-52`** final) because the
  gap to the next section (`MarketExplorer`, "Live markets") felt cramped
  once `CoreConcept` was removed as a buffer.
- `Hero.tsx`: grid alignment changed from `lg:items-end` to
  **`lg:items-center`** so the left text column and the right trending-card
  panel are vertically centered against each other, not bottom-aligned.
- `Hero.tsx`: internal spacing inside the left text block tightened
  (`mt-6`→`mt-4` before the h1 and the paragraph, `mt-9`→`mt-6` before the
  CTA buttons) so the eyebrow/headline/paragraph/buttons read as one
  compact, visually centered unit rather than a loosely-spread column.

**Takeaway if you keep iterating on spacing/layout:** the user cares a lot
about breathing room between sections and about elements reading as
intentionally aligned/centered rather than merely stacked — lean toward
generous section padding and check cross-axis (`items-*`) alignment
explicitly, don't just rely on default `items-start`.

## Known non-issues (don't waste time chasing these)

- The Browser-pane screenshot tool in this session intermittently returned
  solid-black frames mid-scroll that did **not** reflect real content —
  verified via DOM (`read_page`) and `get_page_text` that the page was
  rendering correctly the whole time. If screenshots look broken but
  `tsc --noEmit` is clean and `get_page_text`/`read_page` show correct
  content, it's the tool, not the app. Opening a fresh tab usually fixes it.
- Dev server runs on **port 3001**, not 3000 — something else on this
  machine already holds 3000. Started via `npm run dev` in the background
  (not through `.claude/launch.json` — that config exists but the browser
  tool's cwd didn't pick it up mid-session; a plain `npm run dev &` was used
  instead and it's been fine).

## Not yet done / still open

- No `/create` (MarketCreator) or `/portfolio`/`/profile` pages were
  visually spot-checked as thoroughly as the homepage/leaderboard/market
  detail pages after the redesign — the class-level fixes were applied
  everywhere via the shared tokens, but a visual pass to confirm nothing
  looks off on those routes hasn't happened yet.
- `TradingPanel.tsx` and `MarketCreator.tsx` are still UI-only / simulated —
  no real market contract exists on Arc yet, so "Buy YES/NO" and "Publish
  market" fake a pending→filled state locally. Both files have inline
  comments marking exactly where to wire a real `useWriteContract` call.
  See `README.md`'s "Before you deploy to production" section for the full
  pre-launch checklist (chain config verification, mock data swap, etc.) —
  that section is still accurate and worth reading.
- Nothing has been committed to git — there is no `.git` in this project at
  all yet. If the user wants version history, `git init` + first commit is
  still pending and untouched.
- The X logo/banner assets are static files only, not referenced from any
  metadata (e.g. Open Graph tags) in the app itself — if the user wants the
  banner/logo used as the site's actual social preview image, that's a small
  follow-up (`app/layout.tsx` `metadata.openGraph`/`metadata.twitter`).

## Quick start for the next session

```bash
cd arca-next
npm install
npm run dev
```

Then open whatever port it reports (check the terminal output — it was port
3001 last time because 3000 was taken).
