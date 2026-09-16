import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { eyebrow, btnPrimary, btnGhost, container, data } from "@/lib/ui";
import { markets } from "@/lib/markets";

const featured = markets[0];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border pb-40 pt-40 sm:pb-52 sm:pt-48">
      <div className={`${container} relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center`}>
        <div className="lg:pl-10">
          <Reveal>
            <span className={eyebrow}>Prediction markets on Arc</span>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="relative max-w-2xl">
              <h1 className="max-w-xl text-balance font-display text-[3rem] font-medium leading-[1] tracking-[-0.03em] sm:text-[4rem]">
                Markets for what comes next.
              </h1>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
              ARCA is a market where people trade on the probability of
              future outcomes. Follow the price, take a position, and build
              a verifiable on-chain record of your calls.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#markets" className={btnPrimary}>
                Explore markets
              </Link>
              <Link href="/create" className={btnGhost}>
                Create a market
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="transform-gpu overflow-hidden rounded-2xl border border-border-strong bg-bg/65 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl [transform:perspective(1200px)_rotateX(1deg)_rotateY(-1deg)] transition-transform duration-500 hover:[transform:perspective(1200px)_rotateX(0deg)_rotateY(0deg)_translateY(-4px)]">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className={eyebrow}>Trending</span>
              <Link
                href={`/markets/${featured.slug}`}
                className="mr-4 flex items-center gap-1 text-xs text-ink-muted transition hover:text-ink"
              >
                View market <ArrowRight size={12} />
              </Link>
            </div>

            <div className="px-5 py-5">
              <p className="text-balance font-display text-lg font-medium leading-snug">
                {featured.question}
              </p>

              <div className="mt-5 flex items-end gap-8">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-ink-dim">Yes</div>
                  <div className={`${data} text-3xl text-yes`}>{featured.yesPrice}¢</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-ink-dim">No</div>
                  <div className={`${data} text-3xl text-no`}>
                    {100 - featured.yesPrice}¢
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs">
              <div className="flex items-center gap-1.5 text-ink-muted">
                <span>Volume</span>
                <span className={`${data} text-ink`}>
                  ${(featured.volume / 1_000_000).toFixed(1)}M
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-ink-muted">
                <span>Ends</span>
                <span className={`${data} text-ink`}>{featured.endsInDays}d</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
