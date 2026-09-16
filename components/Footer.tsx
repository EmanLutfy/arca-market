import Link from "next/link";
import { container } from "@/lib/ui";
import { ArcaMark } from "./Navbar";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Markets", href: "/#markets" },
      { label: "Trending", href: "/#trending" },
      { label: "Leaderboard", href: "/leaderboard" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Create", href: "/create" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "https://docs.arc.io" },
      { label: "How it works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Community",
    links: [{ label: "X", href: "https://x.com" }],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className={container}>
        <div className="mb-14 grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <ArcaMark />
              ARCA
            </div>
            <p className="mt-3 max-w-[240px] text-sm text-ink-muted">
              Prediction markets, built on Arc.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h5 className="mb-4 text-xs uppercase tracking-wide text-ink-dim">
                {col.title}
              </h5>
              <div className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-sm text-ink-muted transition hover:text-ink"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-7 text-xs text-ink-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 ARCA</span>
          <div className="max-w-2xl">
            <p>
              ARCA markets involve financial risk. Prices reflect the
              market&apos;s current aggregated belief, not a guarantee of any
              outcome. Only trade what you can afford to lose, and review each
              market&apos;s resolution rules before taking a position.
            </p>
            <p className="mt-3">CA : Soon</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
