import { Reveal } from "./Reveal";
import { container, sectionPad, divider, eyebrow, data } from "@/lib/ui";
import { markets } from "@/lib/markets";

const featured = markets.slice(0, 3);

export function MarketThinks() {
  return (
    <section className={`${sectionPad} ${divider}`}>
      <div className={container}>
        <Reveal className="mb-12 max-w-xl">
          <span className={eyebrow}>Aggregated belief</span>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
            What does the market believe?
          </h2>
          <p className="mt-4 max-w-md text-base text-ink-muted">
            Every trade is one opinion. ARCA continuously aggregates them into
            a single, constantly updating probability.
          </p>
        </Reveal>

        <div className="flex flex-col">
          {featured.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.06}>
              <div
                className={`flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-8 ${
                  i !== featured.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <p className="w-full text-sm text-ink-muted sm:w-64 sm:shrink-0">
                  {m.question}
                </p>
                <div className="relative h-1.5 flex-1 overflow-hidden bg-bg-alt">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${m.yesPrice}%` }}
                  />
                </div>
                <span className={`${data} w-12 shrink-0 text-right text-lg`}>
                  {m.yesPrice}%
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
