"use client";

import { useState } from "react";
import { ProbabilityChart } from "./ProbabilityChart";
import { MarketActivity } from "./MarketActivity";
import { data as dataCls } from "@/lib/ui";
import type { Market } from "@/lib/markets";

const tabs = ["Overview", "Chart", "Activity", "Rules"] as const;

export function MarketDetailTabs({ market }: { market: Market }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");

  return (
    <div>
      <div className="mb-6 flex gap-6 border-b border-border text-sm">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b py-3 transition ${
              tab === t ? "border-ink text-ink" : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="border border-border bg-card p-6">
        {tab === "Overview" && (
          <div className="flex flex-col gap-5">
            <ProbabilityChart data={market.history} />
            <div className="grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-4">
              <Stat label="Volume" value={`$${(market.volume / 1_000_000).toFixed(2)}M`} />
              <Stat label="Liquidity" value={`$${(market.liquidity / 1000).toFixed(0)}K`} />
              <Stat label="Ends" value={market.endsLabel} />
              <Stat label="Category" value={market.category} />
            </div>
          </div>
        )}

        {tab === "Chart" && <ProbabilityChart data={market.history} />}

        {tab === "Activity" && <MarketActivity />}

        {tab === "Rules" && (
          <div>
            <p className="mb-3 text-sm font-semibold text-ink">Resolution rules</p>
            <p className="text-sm leading-relaxed text-ink-muted">{market.rules}</p>
            <p className="mt-4 text-xs text-ink-dim">
              Every market must have clear, objective resolution criteria,
              visible before you take a position.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-ink-dim">{label}</p>
      <p className={`${dataCls} mt-1 text-base`}>{value}</p>
    </div>
  );
}
