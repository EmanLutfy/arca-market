import { Sparkles, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { container, sectionPad, divider, eyebrow } from "@/lib/ui";
import { markets } from "@/lib/markets";

const m = markets[0];

export function IntelligencePanel() {
  return (
    <section className={`${sectionPad} ${divider}`}>
      <div className={`${container} grid grid-cols-1 items-center gap-14 lg:grid-cols-2`}>
        <Reveal>
          <span className={eyebrow}>Arca intelligence</span>
          <h2 className="mt-5 text-balance font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
            Understand the market before you trade.
          </h2>
          <p className="mt-4 max-w-md text-lg text-ink-muted">
            ARCA summarizes market movement, probability shifts, and trading
            activity so you can see the context behind a price. It&apos;s an
            information and analysis tool — it doesn&apos;t predict outcomes
            or tell you what to trade.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border border-border-strong bg-card p-7">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-accent">
              <Sparkles size={16} />
              Arca intelligence
            </div>
            <p className="mb-4 font-display text-base font-semibold">{m.question}</p>
            <div className="mb-5 flex items-center gap-2 text-sm">
              <span className="text-ink-muted">Probability increased</span>
              <span className="font-medium text-ink-dim">58%</span>
              <ArrowUpRight size={14} className="text-yes" />
              <span className="font-medium text-yes">67%</span>
            </div>
            <p className="mb-4 text-sm text-ink-muted">
              Recent activity suggests increased demand for YES positions.
            </p>
            <ul className="flex flex-col gap-2 text-sm text-ink-muted">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-ink-dim" /> Market volume increased
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-ink-dim" /> Probability crossed 65%
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-ink-dim" /> YES liquidity increased
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
