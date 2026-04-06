import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#0d0d0f] selection:bg-[#d4af37] selection:text-black pt-24">
      <Navbar />

      <section className="relative z-20 px-4 py-20 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6 text-white">
            The Essence of <span className="bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] bg-clip-text text-transparent">Time</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Crafting masterpieces that transcend generations. We believe a watch is more than just a tool to tell time; it's a legacy you wear on your wrist.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/hero-cover.png"
              alt="Craftsmanship"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-medium mb-6 text-white">Unrelenting Precision</h2>
            <p className="text-white/60 text-lg mb-6 leading-relaxed">
              Every curve, every gear, every choice of material is deliberate. From the grade 5 titanium case to the scratch-resistant sapphire crystal, our pieces are constructed to endure the harshest elements while maintaining an elegant profile.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              Our master watchmakers assemble each caliber by hand, ensuring that the heartbeat of your timepiece meets rigorous standards of accuracy.
            </p>
          </div>
        </div>

        <div className="text-center py-16 border-t border-white/10">
          <h3 className="text-2xl font-medium mb-8 text-white">Experience the difference</h3>
          <a href="/store" className="apple-btn-solid">
            Discover the Collection
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
