import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StoreSection } from "@/components/StoreSection";

export default function StorePage() {
  return (
    <main className="relative min-h-screen w-full bg-[#0d0d0f] selection:bg-[#d4af37] selection:text-black">
      <Navbar />
      
      {/* Spacer to push content below fixed navbar */}
      <div className="pt-24 pb-8">
        <StoreSection />
      </div>

      <Footer />
    </main>
  );
}
