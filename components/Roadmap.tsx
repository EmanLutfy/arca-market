import { Reveal } from "./Reveal";
import { container, sectionPad, divider, eyebrow, data } from "@/lib/ui";

const phases = [
  {
    tag: "01",
    title: "Markets",
    items: "Prediction markets, trading, market discovery, portfolio",
    current: true,
  },
  {
    tag: "02",
    title: "Reputation",
    items: "Forecasting score, profiles, leaderboards, prediction history",
  },
  {
    tag: "03",
    title: "Creators",
    items: "Market creation, creator tools, market analytics",
  },
  {
    tag: "04",
    title: "Intelligence",
    items: "AI market analysis, information feeds, advanced analytics",
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className={`${sectionPad} ${divider}`}>
      <div className={container}>
        <Reveal className="mb-12">
          <span className={eyebrow}>Roadmap</span>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
            What&apos;s next.
          </h2>
        </Reveal>

        <div className="border-t border-border">
          {phases.map((p, i) => (
            <Reveal key={p.tag} delay={i * 0.05}>
              <div className="flex flex-col gap-1 border-b border-border py-5 sm:flex-row sm:items-baseline sm:gap-8">
                <div className="flex items-baseline gap-3 sm:w-40 sm:shrink-0">
                  <span className={`${data} text-sm text-ink-dim`}>{p.tag}</span>
                  <h3 className="font-display text-lg font-medium">{p.title}</h3>
                  {p.current && (
                    <span className="text-[10px] uppercase tracking-wide text-accent">Now</span>
                  )}
                </div>
                <p className="text-sm text-ink-muted">{p.items}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
