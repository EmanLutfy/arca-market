import { defineChain } from "viem";

/**
 * ARC Mainnet — chain definition.
 *
 * IMPORTANT — verify before shipping to production:
 * These values were provided directly by the ARCA team and have NOT been
 * independently confirmed against a live `eth_chainId` RPC response by this
 * codebase. ARC Mainnet is an extremely new network (public launch reported
 * for mid-September 2026), and public information about it has historically
 * been inconsistent — third-party chain registries have circulated wrong
 * chain IDs and dead RPC/explorer URLs for both ARC Testnet and Mainnet.
 *
 * Before going live, confirm the chain ID directly against your RPC:
 *
 *   curl -X POST https://rpc.mainnet.arc.io \
 *     -H "Content-Type: application/json" \
 *     -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
 *
 * The result should decode to 5042 (hex 0x13b2). If it doesn't match,
 * DO NOT ship — update the values below first.
 *
 * Also note: ARC uses USDC as its native gas token rather than a separate
 * volatile asset. Some ARC tooling accounts for native USDC at 18 decimals
 * (native-currency convention) even though the ERC-20 USDC token elsewhere
 * uses 6 decimals. Confirm which convention your RPC/indexer uses before
 * trusting displayed balances.
 */
export const arcMainnet = defineChain({
  id: 5042,
  name: "ARC Mainnet",
  nativeCurrency: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.mainnet.arc.io",
        "https://rpc.quicknode.mainnet.arc.io",
        "https://arc.drpc.org",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "ArcScan",
      url: "https://arcscan.app",
    },
  },
  testnet: false,
});

/**
 * ARC Testnet — chain definition.
 *
 * Chain ID verified 2026-09-16 against a live `eth_chainId` RPC response:
 *
 *   curl -X POST https://rpc.testnet.arc.io \
 *     -H "Content-Type: application/json" \
 *     -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
 *
 * Returned 0x4cef52 (5042002), matching Circle's published docs at
 * docs.arc.io/arc/references/rpc-endpoints. Re-run this check if wallet
 * connections start failing — testnet config has historically drifted.
 */
export const arcTestnet = defineChain({
  id: 5042002,
  name: "ARC Testnet",
  nativeCurrency: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.testnet.arc.io",
        "https://rpc.blockdaemon.testnet.arc.io",
        "https://rpc.drpc.testnet.arc.io",
        "https://rpc.quicknode.testnet.arc.io",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Arc Explorer",
      url: "https://explorer.testnet.arc.io",
    },
  },
  testnet: true,
});
