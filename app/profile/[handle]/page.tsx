import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfileCard } from "@/components/ProfileCard";
import { container, data } from "@/lib/ui";
import { profile } from "@/lib/markets";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  return (
    <>
      <Navbar />
      <main className={`${container} pb-24 pt-32`}>
        <p className="mb-8 text-sm text-ink-dim">
          On-chain forecasting track record for @{handle}
        </p>

        <div className="mb-12 max-w-xl">
          <ProfileCard />
        </div>

        <h2 className="mb-5 font-display text-xl font-medium">Prediction history</h2>
        <div className="border border-border">
          {profile.history.map((h) => (
            <div
              key={h.market}
              className="flex items-center justify-between border-b border-border px-6 py-4 text-sm last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-medium ${
                    h.side === "YES" ? "bg-yes-soft text-yes" : "bg-no-soft text-no"
                  }`}
                >
                  {h.side}
                </span>
                <span className="text-ink">{h.market}</span>
                <span
                  className={`border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                    h.result === "open"
                      ? "border-border text-ink-dim"
                      : h.result === "won"
                        ? "border-yes/25 text-yes"
                        : "border-no/25 text-no"
                  }`}
                >
                  {h.result}
                </span>
              </div>
              <span className={`${data} ${h.pnl >= 0 ? "text-yes" : "text-no"}`}>
                {h.pnl >= 0 ? "+" : ""}${h.pnl.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-xl text-xs text-ink-dim">
          This history reflects on-chain activity only. It is a transparent
          track record, not a guaranteed measure of future skill.
        </p>
      </main>
      <Footer />
    </>
  );
}
