"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { container, sectionPad, divider, eyebrow } from "@/lib/ui";

const steps = [
  {
    n: "01",
    title: "Find a market",
    body: "Discover a question about a future outcome.",
  },
  {
    n: "02",
    title: "Take a position",
    body: "Choose YES or NO based on your conviction.",
  },
  {
    n: "03",
    title: "Watch the market",
    body: "Probability changes as participants trade.",
  },
  {
    n: "04",
    title: "Resolve",
    body: "When the outcome is known, the market settles according to its predefined rules.",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 3600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="how-it-works" className={`${sectionPad} ${divider}`}>
      <div className={container}>
        <Reveal className="mb-14 max-w-xl">
          <span className={eyebrow}>How it works</span>
          <h2 className="mt-5 font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
            From a question to a resolved market.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <button
              key={s.n}
              onClick={() => setActive(i)}
              className={`relative overflow-hidden border p-6 text-left transition ${
                active === i
                  ? "border-accent-line bg-accent-soft"
                  : "border-border bg-card hover:border-border-strong"
              }`}
            >
              <span
                className={`font-display text-sm ${
                  active === i ? "text-accent" : "text-ink-dim"
                }`}
              >
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold">{s.title}</h3>
              <AnimatePresence mode="wait">
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-sm text-ink-muted"
                  >
                    {s.body}
                  </motion.p>
                )}
              </AnimatePresence>
              {active === i && (
                <motion.span
                  layoutId="how-underline"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-accent"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
