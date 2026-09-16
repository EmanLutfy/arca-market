"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { activityFeed as seed } from "@/lib/markets";

type Entry = {
  id: number;
  user: string;
  side: "YES" | "NO";
  amount: number;
  sold?: boolean;
  secondsAgo: number;
};

const users = ["alex", "nova", "james", "maya", "orion", "vela", "hex", "kai"];

function randomEntry(id: number): Entry {
  return {
    id,
    user: users[Math.floor(Math.random() * users.length)],
    side: Math.random() > 0.5 ? "YES" : "NO",
    amount: Math.round((20 + Math.random() * 1200) / 10) * 10,
    sold: Math.random() > 0.85,
    secondsAgo: 0,
  };
}

export function MarketActivity() {
  const [entries, setEntries] = useState<Entry[]>(
    seed.map((s, i) => ({ id: i, ...s }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setEntries((prev) => {
        const next = [randomEntry(Date.now()), ...prev];
        return next.slice(0, 8);
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <AnimatePresence initial={false}>
        {entries.map((e, i) => (
          <motion.div
            key={e.id}
            layout
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm hover:bg-bg-alt"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-medium text-ink">@{e.user}</span>
              <span className="text-ink-muted">
                {e.sold ? "sold" : "bought"}{" "}
                <span className={e.side === "YES" ? "text-yes" : "text-no"}>{e.side}</span>
              </span>
              <span className="text-ink-muted">${e.amount}</span>
            </div>
            <span className="text-xs text-ink-dim">
              {i === 0 ? "just now" : `${e.secondsAgo || (i + 1) * 20}s ago`}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
