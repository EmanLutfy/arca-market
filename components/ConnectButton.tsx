"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useSwitchChain,
} from "wagmi";
import { useState } from "react";
import { arcTestnet } from "@/lib/chains";

function short(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function ConnectButton({ className = "" }: { className?: string }) {
  const [showWallets, setShowWallets] = useState(false);
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { data: balance } = useBalance({
    address,
    chainId: arcTestnet.id,
    query: { enabled: isConnected },
  });

  const ghostBtn =
    "inline-flex items-center justify-center rounded-md border border-border-strong px-4 py-2 text-sm font-medium text-ink transition hover:border-ink";
  const primaryBtn =
    "inline-flex items-center justify-center rounded-md bg-ink px-4 py-2 text-sm font-medium text-bg transition hover:bg-ink/90 disabled:opacity-60";

  if (isConnected && address) {
    const onWrongNetwork = chainId !== arcTestnet.id;

    if (onWrongNetwork) {
      return (
        <button
          className={`${ghostBtn} ${className}`}
          disabled={isSwitching}
          onClick={() => switchChain({ chainId: arcTestnet.id })}
        >
          {isSwitching ? "Switching…" : "Switch to Arc Testnet"}
        </button>
      );
    }

    return (
      <div className="flex items-center gap-2.5">
        {balance && (
          <span className="hidden text-sm text-ink-muted sm:inline">
            {Number(balance.formatted).toFixed(2)} {balance.symbol}
          </span>
        )}
        <button
          className={`${ghostBtn} ${className}`}
          onClick={() => disconnect()}
          title="Disconnect wallet"
        >
          {short(address)}
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        className={`${primaryBtn} ${className}`}
        disabled={isPending}
        onClick={() => setShowWallets(true)}
      >
        {isPending ? "Connecting…" : "Connect Wallet"}
      </button>
      {showWallets && (
        <div
          className="fixed inset-0 z-[100] flex min-h-screen items-start justify-center overflow-y-auto bg-bg/80 px-4 py-6 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Connect a wallet"
          onClick={() => setShowWallets(false)}
        >
          <div
            className="my-0 max-h-[calc(100vh-3rem)] w-full max-w-sm overflow-y-auto border border-border-strong bg-card p-5 shadow-2xl sm:my-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-medium">Connect a wallet</h2>
                <p className="mt-1 text-xs text-ink-muted">Choose an installed wallet to continue.</p>
              </div>
              <button
                onClick={() => setShowWallets(false)}
                className="text-sm text-ink-muted transition hover:text-ink"
                aria-label="Close wallet picker"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  className="flex items-center justify-between border border-border px-4 py-3 text-left text-sm transition hover:border-border-strong hover:bg-bg-alt"
                  onClick={() => {
                    setShowWallets(false);
                    connect({ connector, chainId: arcTestnet.id });
                  }}
                >
                  <span>{connector.name}</span>
                  <span className="text-ink-dim">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {error && (
        <p className="mt-1.5 max-w-[200px] text-xs text-ink-muted">
          {error.message}
        </p>
      )}
    </div>
  );
}
