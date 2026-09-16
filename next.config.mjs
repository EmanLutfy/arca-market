/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // @wagmi/connectors' barrel file pulls in an optional Coinbase "Base
    // Account" connector that depends on @coinbase/cdp-sdk's x402 payment
    // module, which in turn imports a few @x402/* subpackages that aren't
    // published as regular dependencies. We only use the injected (browser
    // wallet) connector, so these are dead code — alias them away instead
    // of installing unrelated x402 packages.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@x402/evm/upto/client": false,
      "@x402/evm/exact/client": false,
      "@x402/core/client": false,
    };
    // MetaMask SDK's React Native code path and WalletConnect's optional
    // pretty-printer are never used in a browser/Next.js build — silence
    // the harmless "module not found" warnings they otherwise produce.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@react-native-async-storage/async-storage": false,
      "pino-pretty": false,
    };
    return config;
  },
};

export default nextConfig;
