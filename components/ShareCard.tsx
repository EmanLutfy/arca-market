"use client";

import { useState } from "react";
import { Check, Copy, ArrowRight } from "lucide-react";
import type { Market } from "@/lib/markets";
import { data } from "@/lib/ui";

export function ShareCard({ market }: { market: Market }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `arca.markets/markets/${market.slug}`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Clipboard API can be unavailable — fail silently, the URL is still visible.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-sm font-semibold">ARCA</span>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 text-xs text-ink-muted transition hover:text-ink"
        >
          {copied ? <Check size={13} className="text-yes" /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <p className="mb-4 text-balance font-display text-base font-medium leading-snug">
        {market.question}
      </p>
      <div className={`mb-4 flex gap-4 text-sm ${data}`}>
        <span className="text-yes">YES {market.yesPrice}%</span>
        <span className="text-no">NO {100 - market.yesPrice}%</span>
      </div>
      <div className="flex items-center justify-between text-xs text-ink-dim">
        <span className={data}>${(market.volume / 1_000_000).toFixed(1)}M volume</span>
        <span className="flex items-center gap-1 text-ink-muted">
          Explore <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}
