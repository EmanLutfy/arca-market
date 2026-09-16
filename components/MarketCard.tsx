"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { Market } from "@/lib/markets";
import { data } from "@/lib/ui";

export function Sparkline({
  data,
  positive,
  width = 96,
  height = 32,
}: {
  data: number[];
  positive: boolean;
  width?: number;
  height?: number;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * height;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={positive ? "#3fb87f" : "#e0616f"}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MarketCard({ market }: { market: Market }) {
  const positive = market.change24h >= 0;
  const volumeLabel =
    market.volume >= 1_000_000
      ? `$${(market.volume / 1_000_000).toFixed(1)}M`
      : `$${(market.volume / 1000).toFixed(0)}K`;

  return (
    <Link
      href={`/markets/${market.slug}`}
      className="flex flex-col gap-5 border border-border bg-card p-6 transition hover:border-border-strong"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-medium uppercase tracking-wide text-ink-dim">
          {market.category}
        </span>
        <span
          className={`flex items-center gap-1 ${data} text-xs ${
            positive ? "text-yes" : "text-no"
          }`}
        >
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {positive ? "+" : ""}
          {market.change24h.toFixed(1)}%
        </span>
      </div>

      <h3 className="text-balance font-display text-lg font-medium leading-snug text-ink">
        {market.question}
      </h3>

      <div className="flex items-end gap-6 border-t border-border pt-4">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-ink-dim">Yes</div>
          <div className={`${data} text-xl text-yes`}>{market.yesPrice}¢</div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wide text-ink-dim">No</div>
          <div className={`${data} text-xl text-no`}>{100 - market.yesPrice}¢</div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-ink-muted">
        <div className="flex flex-col gap-0.5">
          <span className="text-ink-dim">Volume</span>
          <span className={`${data} text-ink`}>{volumeLabel}</span>
        </div>
        <Sparkline data={market.sparkline} positive={positive} />
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-ink-dim">Ends in</span>
          <span className={`${data} text-ink`}>{market.endsInDays}d</span>
        </div>
      </div>
    </Link>
  );
}
