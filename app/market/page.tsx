import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MarketExplorer } from "@/components/MarketExplorer";

export const metadata = {
  title: "Markets — ARCA",
  description: "Explore prediction markets on ARCA.",
};

export default function MarketPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <MarketExplorer />
      </main>
      <Footer />
    </>
  );
}
