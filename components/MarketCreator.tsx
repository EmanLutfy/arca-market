"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { arcaMarketAbi, arcaMarketAddress } from "@/lib/contracts";
import { Check } from "lucide-react";
import { categories } from "@/lib/markets";

const steps = ["Question", "Outcomes", "Resolution rules", "Closing date", "Review"] as const;

export function MarketCreator() {
  const { isConnected } = useAccount();
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState<string>(categories[1]);
  const [rules, setRules] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    query: { enabled: Boolean(hash) },
  });

  const publish = () => {
    if (!arcaMarketAddress || !closingDate) return;
    const closeTime = Math.floor(new Date(`${closingDate}T23:59:59Z`).getTime() / 1000);
    const resolutionTime = closeTime + 24 * 60 * 60;
    writeContract({
      address: arcaMarketAddress,
      abi: arcaMarketAbi,
      functionName: "createMarket",
      args: [question.trim(), BigInt(closeTime), BigInt(resolutionTime), "manual"],
    });
  };

  const canAdvance = () => {
    if (step === 0) return question.trim().length > 8;
    if (step === 2) return rules.trim().length > 12;
    if (step === 3) return closingDate.trim().length > 0;
    return true;
  };

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  if (isSuccess) {
    return (
      <div className="border border-yes/25 bg-yes-soft p-10 text-center">
        <Check className="mx-auto mb-4 text-yes" size={32} />
        <h3 className="font-display text-xl font-medium text-ink">Market published</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
          Your market has been submitted on Arc Testnet. The transaction is
          recorded on-chain.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center text-xs font-medium ${
                i < step
                  ? "bg-yes text-[#04231b]"
                  : i === step
                    ? "border border-accent-line bg-accent-soft text-accent"
                    : "border border-border text-ink-dim"
              }`}
            >
              {i < step ? <Check size={13} /> : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px flex-1 ${i < step ? "bg-yes" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[280px] border border-border bg-card p-7">
        <p className="mb-1 text-xs uppercase tracking-wide text-ink-dim">
          Step 0{step + 1}
        </p>
        <h3 className="mb-6 font-display text-xl font-medium">{steps[step]}</h3>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="flex flex-col gap-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Will BTC reach $150K before January 1, 2027?"
                  rows={3}
                  className="w-full rounded-md border border-border bg-bg-alt p-4 text-ink placeholder:text-ink-dim focus:border-border-strong focus:outline-none"
                />
                <div>
                  <p className="mb-2 text-xs text-ink-dim">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories
                      .filter((c) => c !== "All")
                      .map((c) => (
                        <button
                          key={c}
                          onClick={() => setCategory(c)}
                          className={`border px-3 py-1.5 text-sm transition ${
                            category === c
                              ? "border-ink bg-ink text-bg"
                              : "border-border text-ink-muted hover:border-border-strong"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="flex gap-4">
                <div className="flex-1 rounded-md border border-yes/25 bg-yes-soft p-5 text-center">
                  <p className="text-sm font-semibold text-yes">YES</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Pays out if the market resolves true.
                  </p>
                </div>
                <div className="flex-1 rounded-md border border-no/25 bg-no-soft p-5 text-center">
                  <p className="text-sm font-semibold text-no">NO</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Pays out if the market resolves false.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <textarea
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  placeholder="Describe exactly how and when this market resolves, and which source determines the outcome."
                  rows={6}
                  className="w-full rounded-md border border-border bg-bg-alt p-4 text-ink placeholder:text-ink-dim focus:border-border-strong focus:outline-none"
                />
                <p className="mt-3 text-xs text-ink-dim">
                  Every market must have clear, objective resolution criteria
                  — this is what participants will see before trading.
                </p>
              </div>
            )}

            {step === 3 && (
              <div>
                <label className="mb-2 block text-xs text-ink-dim">Closing date</label>
                <input
                  type="date"
                  value={closingDate}
                  onChange={(e) => setClosingDate(e.target.value)}
                  className="rounded-md border border-border bg-bg-alt px-4 py-3 text-ink focus:border-border-strong focus:outline-none"
                />
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-4 text-sm">
                <Row label="Question" value={question || "—"} />
                <Row label="Category" value={category} />
                <Row label="Outcomes" value="YES / NO" />
                <Row label="Resolution rules" value={rules || "—"} />
                <Row label="Closing date" value={closingDate || "—"} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={back}
          disabled={step === 0}
          className="text-sm font-medium text-ink-muted transition hover:text-ink disabled:opacity-30"
        >
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            onClick={next}
            disabled={!canAdvance()}
            className="inline-flex items-center justify-center rounded-md bg-ink px-6 py-2.5 text-sm font-medium text-bg transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={publish}
            disabled={!isConnected || !arcaMarketAddress || isPending || isConfirming}
            title={!isConnected ? "Connect a wallet to publish" : undefined}
            className="inline-flex items-center justify-center rounded-md bg-ink px-6 py-2.5 text-sm font-medium text-bg transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "Confirm in wallet…" : isConfirming ? "Publishing…" : "Publish market"}
          </button>
        )}
      </div>
      {step === steps.length - 1 && !isConnected && (
        <p className="mt-3 text-right text-xs text-ink-dim">
          Connect a wallet to publish this market.
        </p>
      )}
      {step === steps.length - 1 && !arcaMarketAddress && (
        <p className="mt-3 text-right text-xs text-ink-dim">
          Set NEXT_PUBLIC_ARCA_MARKET_ADDRESS after deploying the contract.
        </p>
      )}
      {error && <p className="mt-3 text-right text-xs text-no">{error.message}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-border pb-3">
      <span className="text-ink-dim">{label}</span>
      <span className="max-w-[70%] text-right text-ink">{value}</span>
    </div>
  );
}
