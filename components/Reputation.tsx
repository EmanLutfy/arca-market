import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ProfileCard } from "./ProfileCard";
import { container, sectionPad, divider, eyebrow } from "@/lib/ui";

export function Reputation() {
  return (
    <section className={`${sectionPad} ${divider}`}>
      <div className={`${container} grid grid-cols-1 items-center gap-14 lg:grid-cols-2`}>
        <Reveal>
          <span className={eyebrow}>Track record</span>
          <h2 className="mt-5 text-balance font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
            Your predictions become your track record.
          </h2>
          <p className="mt-4 max-w-md text-lg text-ink-muted">
            Every position you take is recorded on-chain. Over time, that
            builds a public, verifiable forecasting track record — not a
            guarantee of future accuracy, just a transparent history.
          </p>
          <Link
            href="/profile/quinn"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
          >
            View sample profile <ArrowRight size={15} />
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <ProfileCard />
        </Reveal>
      </div>
    </section>
  );
}
