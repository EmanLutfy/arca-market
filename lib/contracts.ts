import type { Address } from "viem";

export const arcaMarketAddress = process.env.NEXT_PUBLIC_ARCA_MARKET_ADDRESS as
  | Address
  | undefined;

export const arcaMarketAbi = [
  {
    type: "function",
    name: "buy",
    stateMutability: "payable",
    inputs: [
      { name: "marketId", type: "uint256" },
      { name: "yes", type: "bool" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "createMarket",
    stateMutability: "nonpayable",
    inputs: [
      { name: "question", type: "string" },
      { name: "closeTime", type: "uint64" },
      { name: "resolutionTime", type: "uint64" },
      { name: "sourceMarketId", type: "string" },
    ],
    outputs: [{ name: "marketId", type: "uint256" }],
  },
] as const;
