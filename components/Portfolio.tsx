import { Reveal } from "./Reveal";
import { container, sectionPad, divider, eyebrow, data } from "@/lib/ui";
import { portfolio } from "@/lib/markets";

export function Portfolio() {
  return (
    <section className={`${sectionPad} ${divider}`}>
      <div className={`${container} grid grid-cols-1 items-center gap-14 lg:grid-cols-2`}>
        <Reveal>
          <span className={eyebrow}>Arca portfolio</span>
          <h2 className="mt-5 text-balance font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
            All your positions, in one place.
          </h2>
          <p className="mt-4 max-w-md text-lg text-ink-muted">
            Track open positions, available balance, and unrealized
            profit and loss across every market you&apos;ve taken a side on.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border border-border p-7">
            <p className="text-xs uppercase tracking-wide text-ink-dim">Total value</p>
            <p className={`${data} mb-6 text-4xl`}>
              ${portfolio.totalValue.toLocaleString()}
            </p>

            <div className="mb-6 grid grid-cols-3 gap-4 border-y border-border py-5">
              <div>
                <p className="text-xs text-ink-dim">Open positions</p>
                <p className={`${data} mt-1 text-lg`}>
                  ${portfolio.openPositions.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-ink-dim">Available</p>
                <p className={`${data} mt-1 text-lg`}>
                  ${portfolio.available.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-ink-dim">Unrealized P&amp;L</p>
                <p className={`${data} mt-1 text-lg text-yes`}>
                  +${portfolio.unrealizedPnl.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {portfolio.positions.map((p) => (
                <div key={p.market} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-medium ${
                        p.side === "YES" ? "bg-yes-soft text-yes" : "bg-no-soft text-no"
                      }`}
                    >
                      {p.side}
                    </span>
                    <span className="text-ink-muted">{p.market}</span>
                  </div>
                  <span className={`${data} ${p.pnl >= 0 ? "text-yes" : "text-no"}`}>
                    {p.pnl >= 0 ? "+" : ""}
                    ${p.pnl.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
