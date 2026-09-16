import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MarketDetailTabs } from "@/components/MarketDetailTabs";
import { TradingPanel } from "@/components/TradingPanel";
import { ShareCard } from "@/components/ShareCard";
import { container, data } from "@/lib/ui";
import { markets } from "@/lib/markets";

export function generateStaticParams() {
  return markets.map((m) => ({ slug: m.slug }));
}

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const market = markets.find((m) => m.slug === slug);
  if (!market) return notFound();

  return (
    <>
      <Navbar />
      <main className={`${container} pb-24 pt-32`}>
        <Link
          href="/#markets"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-ink-muted transition hover:text-ink"
        >
          <ArrowLeft size={15} /> All markets
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <span className="text-[11px] font-medium uppercase tracking-wide text-ink-dim">
            {market.category}
          </span>
          <span className="text-xs text-ink-dim">Ends {market.endsLabel}</span>
        </div>

        <h1 className="mb-6 max-w-2xl text-balance font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
          {market.question}
        </h1>

        <div className="mb-10 flex flex-wrap items-end gap-8 border border-border p-6">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-ink-dim">Probability</p>
            <p className={`${data} text-4xl`}>{market.yesPrice}%</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-ink-dim">Yes</p>
            <p className={`${data} text-2xl text-yes`}>{market.yesPrice}¢</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-ink-dim">No</p>
            <p className={`${data} text-2xl text-no`}>{100 - market.yesPrice}¢</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <MarketDetailTabs market={market} />
          <div className="flex flex-col gap-6">
            <TradingPanel market={market} />
            <ShareCard market={market} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
