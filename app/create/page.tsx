import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MarketCreator } from "@/components/MarketCreator";
import { container, eyebrow } from "@/lib/ui";

export const metadata = { title: "Create a market — ARCA" };

export default function CreatePage() {
  return (
    <>
      <Navbar />
      <main className={`${container} max-w-3xl pb-24 pt-32`}>
        <span className={eyebrow}>New market</span>
        <h1 className="mb-2 mt-5 font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
          Have a question about the future?
        </h1>
        <p className="mb-10 text-lg text-ink-muted">Turn it into a market.</p>
        <MarketCreator />
      </main>
      <Footer />
    </>
  );
}
