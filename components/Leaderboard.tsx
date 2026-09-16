"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { leaderboard } from "@/lib/markets";
import { data } from "@/lib/ui";

const tabs = ["Top predictors", "Most accurate", "Highest P&L", "Rising"] as const;

function Avatar({ handle }: { handle: string }) {
  const initial = handle.slice(0, 1).toUpperCase();
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-strong font-display text-xs text-ink-muted">
      {initial}
    </span>
  );
}

export function Leaderboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Top predictors");

  const rows = useMemo(() => {
    const list = [...leaderboard];
    switch (tab) {
      case "Most accurate":
        list.sort((a, b) => b.accuracy - a.accuracy);
        break;
      case "Highest P&L":
        list.sort((a, b) => b.pnl - a.pnl);
        break;
      case "Rising":
        list.sort((a, b) => (a.trend === "up" ? -1 : 1) - (b.trend === "up" ? -1 : 1));
        break;
      default:
        list.sort((a, b) => b.score - a.score);
    }
    return list;
  }, [tab]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-6 border-b border-border text-sm">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b py-3 transition ${
              tab === t
                ? "border-ink text-ink"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="border border-border">
        {rows.map((r, i) => (
          <motion.div
            layout
            key={r.handle}
            className="flex items-center justify-between border-b border-border px-6 py-4 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <span
                className={`${data} w-5 text-sm ${
                  i < 3 ? "text-ink" : "text-ink-dim"
                }`}
              >
                {i + 1}
              </span>
              <Avatar handle={r.handle} />
              <span className="font-medium text-ink">@{r.handle}</span>
              {r.trend === "up" && <ArrowUp size={14} className="text-yes" />}
              {r.trend === "down" && <ArrowDown size={14} className="text-no" />}
              {r.trend === "same" && <Minus size={14} className="text-ink-dim" />}
            </div>
            <div className="flex items-center gap-8 text-sm">
              <div className="hidden text-right sm:block">
                <p className="text-xs text-ink-dim">Accuracy</p>
                <p className={data}>{r.accuracy.toFixed(1)}%</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-xs text-ink-dim">P&amp;L</p>
                <p className={`${data} ${r.pnl >= 0 ? "text-yes" : "text-no"}`}>
                  {r.pnl >= 0 ? "+" : ""}${r.pnl.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-dim">Forecast score</p>
                <p className={`${data} text-ink`}>{r.score}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
