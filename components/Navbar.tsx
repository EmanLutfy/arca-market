"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ConnectButton } from "./ConnectButton";

const links = [
  { href: "/market", label: "Markets" },
  { href: "/#trending", label: "Trending" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/create", label: "Create" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-1/2 top-3 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-[28px] border shadow-[0_12px_36px_rgba(0,0,0,0.24)] transition-colors duration-200 sm:top-5 sm:w-[calc(100%-5rem)] sm:rounded-full ${
          scrolled ? "border-border-strong bg-bg/95 backdrop-blur-md" : "border-border bg-bg/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3.5 sm:gap-6 sm:px-8 sm:py-4">
          <Link href="/" className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight text-ink">
            <ArcaMark />
            ARCA
          </Link>

          <nav className="hidden items-center justify-center gap-8 text-sm md:flex">
            {links.map((l) => {
              const active = pathname === l.href.split("#")[0] && l.href.includes("#") === false;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`transition ${
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <a
              href="https://x.com/Arca_Market"
              target="_blank"
              rel="noreferrer"
              aria-label="Open X"
              className="text-ink-muted transition hover:text-ink"
            >
              <XLogo />
            </a>
          </nav>

          <div className="flex items-center justify-end gap-4">
            <span className="hidden items-center gap-1.5 text-xs text-ink-dim lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-yes" />
              Built on Arc
            </span>
            <div className="hidden sm:block">
              <ConnectButton />
            </div>
            <button
              className="p-1.5 text-ink md:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col gap-7 bg-bg px-6 pt-8 md:hidden">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2.5 font-display text-lg font-bold text-ink">
              <ArcaMark />
              ARCA
            </span>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-1.5 text-ink">
              <X size={22} />
            </button>
          </div>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-xl text-ink"
            >
              {l.label}
            </Link>
          ))}
          <ConnectButton className="mt-2 w-full" />
        </div>
      )}
    </>
  );
}

export function ArcaMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 18C4 10 8 4 16 4" stroke="#f5f5f4" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M4 18h5" stroke="#f5f5f4" strokeWidth="2.2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function XLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.258 2.25H8.084l4.713 6.231 5.447-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
