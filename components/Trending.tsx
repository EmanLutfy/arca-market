import { TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { Sparkline } from "./MarketCard";
import { container, sectionPad, divider, eyebrow, data } from "@/lib/ui";
import { markets } from "@/lib/markets";

const trending = [...markets].sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h)).slice(0, 4);

export function Trending() {
  return (
    <section id="trending" className={`${sectionPad} ${divider}`}>
      <div className={container}>
        <Reveal className="mb-12 max-w-xl">
          <span className={eyebrow}>Momentum</span>
          <h2 className="mt-5 font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
            What&apos;s moving.
          </h2>
        </Reveal>

        <div className="divide-y divide-border border border-border">
          {trending.map((m, i) => {
            const positive = m.change24h >= 0;
            return (
              <Reveal key={m.slug} delay={i * 0.05}>
                <Link
                  href={`/markets/${m.slug}`}
                  className="flex flex-col gap-4 p-6 transition hover:bg-card sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-base font-medium">{m.question}</p>
                    <p className="mt-1 text-xs text-ink-dim">
                      {m.category} · Vol ${(m.volume / 1000).toFixed(0)}K · Ends {m.endsInDays}d
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <Sparkline data={m.sparkline} positive={positive} />
                    <div className={`${data} w-14 text-right text-lg`}>
                      {m.yesPrice}%
                    </div>
                    <span
                      className={`flex w-16 items-center justify-end gap-1 ${data} text-sm ${
                        positive ? "text-yes" : "text-no"
                      }`}
                    >
                      {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {positive ? "+" : ""}
                      {m.change24h.toFixed(1)}%
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
