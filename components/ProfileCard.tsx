import { profile } from "@/lib/markets";
import { data } from "@/lib/ui";

export function ProfileCard() {
  const stats = [
    { label: "Predictions", value: profile.predictions },
    { label: "Correct", value: profile.correct },
    { label: "Accuracy", value: `${profile.accuracy}%` },
    { label: "Markets won", value: profile.marketsWon },
  ];

  return (
    <div className="border border-border p-7">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-ink-muted">@{profile.handle}</p>
          <p className="text-xs text-ink-dim">On-chain forecasting track record</p>
        </div>
        <span className="border border-border-strong px-3 py-1 text-xs font-medium text-ink-muted">
          ARCA
        </span>
      </div>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-wide text-ink-dim">Forecast score</p>
        <p className={`${data} text-4xl`}>{profile.forecastScore}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-xs text-ink-dim">{s.label}</p>
            <p className={`${data} mt-1 text-lg`}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
