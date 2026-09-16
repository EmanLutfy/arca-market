import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Portfolio } from "@/components/Portfolio";
import { container } from "@/lib/ui";

export const metadata = { title: "Portfolio — ARCA" };

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className={`${container} pb-10 pt-32`}>
        <h1 className="mb-2 font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">Portfolio</h1>
        <p className="mb-4 text-ink-muted">Your open positions and balance, on Arc.</p>
      </main>
      <Portfolio />
      <Footer />
    </>
  );
}
