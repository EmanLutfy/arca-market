import type { Address } from "viem";

// Normalize env values so a mixed-case address with a bad checksum cannot
// prevent viem from preparing the transaction.
const configuredAddress = process.env.NEXT_PUBLIC_ARCA_MARKET_ADDRESS;
export const arcaMarketAddress = configuredAddress
  ? (configuredAddress.toLowerCase() as Address)
  : undefined;

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
