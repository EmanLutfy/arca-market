// Fictional example data only. Every value here is illustrative — swap this
// module for real API/subgraph calls when wiring ARCA up to live markets.
// Keeping all mock data in one place makes that swap a one-file change.

export type Category =
  | "Crypto"
  | "Finance"
  | "Technology"
  | "Sports"
  | "Politics"
  | "World"
  | "Culture";

export type Market = {
  slug: string;
  onchainId?: number;
  question: string;
  category: Category;
  yesPrice: number; // cents, 0-100
  volume: number; // USD
  liquidity: number;
  endsInDays: number;
  endsLabel: string;
  change24h: number; // percentage points
  sparkline: number[]; // recent probability samples, 0-100
  createdDaysAgo: number;
  history: { t: string; p: number }[]; // probability over time for the chart
  rules: string;
};

export const markets: Market[] = [
  {
    slug: "btc-150k-2027",
    onchainId: 1,
    question: "Will BTC reach $150K before January 1, 2027?",
    category: "Crypto",
    yesPrice: 67,
    volume: 2402821,
    liquidity: 420000,
    endsInDays: 84,
    endsLabel: "Jan 1, 2027",
    change24h: 8.4,
    sparkline: [52, 55, 58, 57, 61, 64, 61, 67],
    createdDaysAgo: 41,
    history: [
      { t: "Aug 03", p: 52 },
      { t: "Aug 17", p: 58 },
      { t: "Aug 31", p: 64 },
      { t: "Sep 08", p: 61 },
      { t: "Sep 16", p: 67 },
    ],
    rules:
      "Resolves YES if the Coinbase BTC/USD spot price prints at or above $150,000 on any exchange-recognized reference feed before 00:00 UTC on January 1, 2027. Resolves NO otherwise.",
  },
  {
    slug: "fed-rate-cut-2026",
    onchainId: 2,
    question: "Will the Fed cut rates before December 2026?",
    category: "Finance",
    yesPrice: 61,
    volume: 842190,
    liquidity: 168000,
    endsInDays: 60,
    endsLabel: "Dec 1, 2026",
    change24h: -3.2,
    sparkline: [70, 68, 66, 64, 63, 65, 63, 61],
    createdDaysAgo: 22,
    history: [
      { t: "Aug 10", p: 70 },
      { t: "Aug 24", p: 66 },
      { t: "Sep 07", p: 63 },
      { t: "Sep 16", p: 61 },
    ],
    rules:
      "Resolves YES if the Federal Open Market Committee announces a reduction in the federal funds target rate at any scheduled meeting before December 1, 2026. Resolves NO otherwise.",
  },
  {
    slug: "eth-outperform-btc-q4",
    onchainId: 3,
    question: "Will ETH outperform BTC in Q4 2026?",
    category: "Crypto",
    yesPrice: 54,
    volume: 391004,
    liquidity: 92000,
    endsInDays: 106,
    endsLabel: "Dec 31, 2026",
    change24h: 4.1,
    sparkline: [48, 47, 49, 51, 50, 53, 52, 54],
    createdDaysAgo: 15,
    history: [
      { t: "Sep 01", p: 48 },
      { t: "Sep 08", p: 50 },
      { t: "Sep 16", p: 54 },
    ],
    rules:
      "Resolves YES if ETH/USD percentage price change from Oct 1, 2026 00:00 UTC to Dec 31, 2026 23:59 UTC exceeds BTC/USD percentage price change over the same window. Resolves NO otherwise.",
  },
  {
    slug: "next-gen-console-2026",
    onchainId: 4,
    question: "Will a next-gen game console ship before end of 2026?",
    category: "Technology",
    yesPrice: 38,
    volume: 152300,
    liquidity: 41000,
    endsInDays: 106,
    endsLabel: "Dec 31, 2026",
    change24h: -1.6,
    sparkline: [44, 42, 41, 40, 39, 39, 38, 38],
    createdDaysAgo: 30,
    history: [
      { t: "Aug 16", p: 44 },
      { t: "Sep 01", p: 40 },
      { t: "Sep 16", p: 38 },
    ],
    rules:
      "Resolves YES if a major manufacturer announces general retail availability of a next-generation home console before Dec 31, 2026 23:59 UTC.",
  },
  {
    slug: "champions-league-final-holder",
    onchainId: 5,
    question: "Will the reigning champion reach the final again?",
    category: "Sports",
    yesPrice: 29,
    volume: 88410,
    liquidity: 22000,
    endsInDays: 240,
    endsLabel: "May 2027",
    change24h: 2.0,
    sparkline: [24, 25, 26, 27, 28, 27, 29, 29],
    createdDaysAgo: 5,
    history: [
      { t: "Sep 10", p: 26 },
      { t: "Sep 16", p: 29 },
    ],
    rules:
      "Resolves YES if the current title holder appears in the next final. Resolves NO otherwise, including elimination at any earlier round.",
  },
  {
    slug: "election-turnout-record",
    onchainId: 6,
    question: "Will the next general election set a turnout record?",
    category: "Politics",
    yesPrice: 18,
    volume: 61250,
    liquidity: 15000,
    endsInDays: 300,
    endsLabel: "Jul 2027",
    change24h: 0.4,
    sparkline: [17, 17, 18, 18, 17, 18, 19, 18],
    createdDaysAgo: 60,
    history: [
      { t: "Jul 20", p: 17 },
      { t: "Sep 16", p: 18 },
    ],
    rules:
      "Resolves YES if the official national turnout percentage exceeds the highest previously recorded figure, per the relevant electoral authority's certified results.",
  },
];

export const categories: (Category | "All")[] = [
  "All",
  "Crypto",
  "Finance",
  "Technology",
  "Sports",
  "Politics",
  "World",
  "Culture",
];

export const activityFeed = [
  { user: "alex", side: "YES" as const, amount: 240, secondsAgo: 2 },
  { user: "nova", side: "NO" as const, amount: 120, secondsAgo: 18 },
  { user: "james", side: "YES" as const, amount: 1200, secondsAgo: 42 },
  { user: "maya", side: "YES" as const, amount: 420, secondsAgo: 71, sold: true },
  { user: "orion", side: "NO" as const, amount: 310, secondsAgo: 95 },
];

export const leaderboard = [
  { handle: "alpha", score: 942, accuracy: 81.2, pnl: 4820, trend: "up" as const },
  { handle: "nova", score: 917, accuracy: 77.5, pnl: 6210, trend: "up" as const },
  { handle: "orion", score: 891, accuracy: 84.0, pnl: 2190, trend: "down" as const },
  { handle: "quinn", score: 842, accuracy: 73.4, pnl: 1840, trend: "up" as const },
  { handle: "vela", score: 803, accuracy: 69.1, pnl: 3220, trend: "same" as const },
  { handle: "hex", score: 771, accuracy: 71.8, pnl: 980, trend: "down" as const },
  { handle: "kai", score: 744, accuracy: 66.4, pnl: 1420, trend: "up" as const },
  { handle: "sage", score: 712, accuracy: 75.9, pnl: 640, trend: "down" as const },
];

export const profile = {
  handle: "quinn",
  forecastScore: 842,
  predictions: 128,
  correct: 94,
  accuracy: 73.4,
  totalVolume: 18420,
  marketsWon: 94,
  history: [
    { market: "BTC $150K", side: "YES" as const, result: "open" as const, pnl: 82.4 },
    { market: "Fed Cut", side: "NO" as const, result: "open" as const, pnl: -24.1 },
    { market: "ETH/BTC", side: "YES" as const, result: "open" as const, pnl: 124.8 },
    { market: "US CPI < 3%", side: "YES" as const, result: "won" as const, pnl: 210.0 },
    { market: "Layer 2 TVL ATH", side: "NO" as const, result: "lost" as const, pnl: -85.0 },
  ],
};

export const portfolio = {
  totalValue: 4821.42,
  openPositions: 2840,
  available: 1981,
  unrealizedPnl: 284.12,
  positions: [
    { market: "BTC $150K", side: "YES" as const, pnl: 82.4 },
    { market: "Fed Cut", side: "NO" as const, pnl: -24.1 },
    { market: "ETH/BTC", side: "YES" as const, pnl: 124.8 },
  ],
};
