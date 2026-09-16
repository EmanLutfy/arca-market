import Link from "next/link";
import { Reveal } from "./Reveal";
import { container, divider, btnPrimary, btnGhost } from "@/lib/ui";

export function FinalCta() {
  return (
    <section className={`py-36 sm:py-44 ${divider}`}>
      <div className={container}>
        <Reveal>
          <h2 className="text-balance font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
            The future is uncertain.
            <br />
            <span className="text-ink-muted">The market isn&apos;t.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-ink-muted">
            Discover what the market believes on ARCA.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/#markets" className={btnPrimary}>
              Explore markets
            </Link>
            <Link href="/create" className={btnGhost}>
              Create a market
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
