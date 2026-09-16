import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarketExplorer } from "@/components/MarketExplorer";
import { HowItWorks } from "@/components/HowItWorks";
import { Trending } from "@/components/Trending";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative isolate">
      <video
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-[0.14] mix-blend-screen"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/arca-hero-bg-4k.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10">
      <Navbar />
      <main>
        <Hero />
        <MarketExplorer />
        <HowItWorks />
        <Trending />
        <FinalCta />
      </main>
      <Footer />
      </div>
    </div>
  );
}
