"use client";

import { useMemo, useState } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import type { Market } from "@/lib/markets";
import { data } from "@/lib/ui";
import { arcaMarketAbi, arcaMarketAddress } from "@/lib/contracts";

export function TradingPanel({ market }: { market: Market }) {
  const { isConnected } = useAccount();
  const [side, setSide] = useState<"YES" | "NO">("YES");
  const [amount, setAmount] = useState("100");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    query: { enabled: Boolean(hash) },
  });

  const price = side === "YES" ? market.yesPrice : 100 - market.yesPrice;
  const numericAmount = Number(amount) || 0;
  const payout = useMemo(() => {
    if (price <= 0) return 0;
    return (numericAmount / (price / 100)).toFixed(2);
  }, [numericAmount, price]);

  const canTrade = Boolean(arcaMarketAddress && market.onchainId !== undefined);

  const buy = () => {
    if (!arcaMarketAddress || market.onchainId === undefined) return;
    writeContract({
      address: arcaMarketAddress,
      abi: arcaMarketAbi,
      functionName: "buy",
      args: [BigInt(market.onchainId), side === "YES"],
      value: parseUnits(amount || "0", 18),
    });
  };

  return (
    <div className="border border-border-strong bg-card p-6">
      <div className="mb-5 grid grid-cols-2 border border-border">
        <button
          onClick={() => setSide("YES")}
          className={`py-2.5 text-sm font-medium transition ${
            side === "YES" ? "bg-yes-soft text-yes" : "text-ink-muted hover:text-ink"
          }`}
        >
          Buy YES · {market.yesPrice}¢
        </button>
        <button
          onClick={() => setSide("NO")}
          className={`border-l border-border py-2.5 text-sm font-medium transition ${
            side === "NO" ? "bg-no-soft text-no" : "text-ink-muted hover:text-ink"
          }`}
        >
          Buy NO · {100 - market.yesPrice}¢
        </button>
      </div>

      <label className="mb-1.5 block text-xs text-ink-dim">Amount</label>
      <div className="mb-5 flex items-center border border-border bg-bg-alt px-4 py-3">
        <span className="mr-1 text-ink-muted">$</span>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          inputMode="decimal"
          className={`w-full bg-transparent ${data} text-lg text-ink outline-none`}
        />
      </div>

      <div className="mb-6 flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-ink-muted">
          <span>Estimated position</span>
          <span className={side === "YES" ? "text-yes" : "text-no"}>{side}</span>
        </div>
        <div className="flex justify-between text-ink-muted">
          <span>Potential payout</span>
          <span className={`${data} text-ink`}>${payout}</span>
        </div>
      </div>

      <button
        onClick={buy}
        disabled={!isConnected || !canTrade || numericAmount <= 0 || isPending || isConfirming}
        className={`w-full rounded-md py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
          side === "YES" ? "bg-yes text-[#04231b]" : "bg-no text-[#2b0a10]"
        }`}
      >
        {isPending ? "Confirm in wallet…" : isConfirming ? "Confirming…" : isSuccess ? "Position filled" : `Buy ${side}`}
      </button>

      {!isConnected && (
        <p className="mt-3 text-center text-xs text-ink-dim">
          Connect a wallet to take a position.
        </p>
      )}

      {!canTrade && (
        <p className="mt-3 text-center text-xs text-ink-dim">
          This market is not connected to an on-chain market yet.
        </p>
      )}

      {error && <p className="mt-3 text-center text-xs text-no">{error.message}</p>}

      <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-dim">
        Prices reflect the market&apos;s current belief, not a guaranteed
        outcome. Review the resolution rules before trading.
      </p>
    </div>
  );
}
