"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Reveal } from "./Reveal";
import { MarketCard } from "./MarketCard";
import { container, sectionPad, divider, eyebrow, data } from "@/lib/ui";
import { categories, markets, type Category } from "@/lib/markets";

const sorts = ["Trending", "Volume", "Ending soon", "Newest"] as const;
type Sort = (typeof sorts)[number];

type PolymarketMarket = {
  sourceMarketId: string;
  question: string;
  endDate: string;
  volume: number;
  outcomePrices: string[];
  url: string | null;
};

export function MarketExplorer() {
  const [category, setCategory] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("Trending");
  const [polymarketMarkets, setPolymarketMarkets] = useState<PolymarketMarket[]>([]);

  useEffect(() => {
    fetch("/api/polymarket/markets")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload: { markets?: PolymarketMarket[] }) =>
        setPolymarketMarkets(payload.markets?.slice(0, 3) ?? []),
      )
      .catch(() => setPolymarketMarkets([]));
  }, []);

  const filtered = useMemo(() => {
    let list = markets.filter((m) => category === "All" || m.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((m) => m.question.toLowerCase().includes(q));
    }
    const sorted = [...list];
    switch (sort) {
      case "Volume":
        sorted.sort((a, b) => b.volume - a.volume);
        break;
      case "Ending soon":
        sorted.sort((a, b) => a.endsInDays - b.endsInDays);
        break;
      case "Newest":
        sorted.sort((a, b) => a.createdDaysAgo - b.createdDaysAgo);
        break;
      default:
        sorted.sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h));
    }
    return sorted;
  }, [category, query, sort]);

  return (
    <section id="markets" className={`${sectionPad} ${divider}`}>
      <div className={container}>
        <Reveal className="mb-10 max-w-xl">
          <span className={eyebrow}>Live markets</span>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
            Explore the markets.
          </h2>
        </Reveal>

        <Reveal delay={0.05} className="mb-8 flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-1 border-b border-border pb-4">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 text-sm transition ${
                  category === c
                    ? "bg-ink text-bg"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-dim"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search markets…"
                className="w-full border border-border bg-transparent py-2 pl-9 pr-4 text-sm text-ink placeholder:text-ink-dim focus:border-border-strong focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-4 text-sm">
              {sorts.map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={`transition ${
                    sort === s ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {polymarketMarkets.length > 0 && (
          <Reveal delay={0.08} className="mb-12 border-y border-border">
            <div className="flex items-center justify-between border-b border-border py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-dim">External reference</p>
                <p className="mt-1 text-sm text-ink-muted">Live markets from Polymarket</p>
              </div>
              <span className="text-xs text-ink-dim">Source data only</span>
            </div>
            {polymarketMarkets.map((market) => {
              const yesPrice = Math.round(Number(market.outcomePrices[0] ?? 0) * 100);
              return (
                <div
                  key={market.sourceMarketId}
                  className="flex flex-col gap-3 border-b border-border py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="max-w-2xl text-sm text-ink-muted">{market.question}</p>
                  <div className="flex shrink-0 items-center gap-5 text-sm">
                    <span className={`${data} text-yes`}>{yesPrice}¢ YES</span>
                    {market.url && (
                      <a
                        href={market.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ink-muted transition hover:text-ink"
                      >
                        View source ↗
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </Reveal>
        )}

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-ink-muted">
            No markets match that search yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m, i) => (
              <Reveal key={m.slug} delay={Math.min(i, 5) * 0.05}>
                <MarketCard market={m} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
