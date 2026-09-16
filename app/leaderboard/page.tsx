import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Leaderboard } from "@/components/Leaderboard";
import { container, eyebrow } from "@/lib/ui";

export const metadata = { title: "Leaderboard — ARCA" };

export default function LeaderboardPage() {
  return (
    <>
      <Navbar />
      <main className={`${container} pb-24 pt-32`}>
        <span className={eyebrow}>Arca leaderboard</span>
        <h1 className="mb-10 mt-5 font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
          Top forecasters on ARCA.
        </h1>
        <Leaderboard />
      </main>
      <Footer />
    </>
  );
}
