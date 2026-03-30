"use client";

import { Navbar } from "@/components/Navbar";
import { SequenceSection } from "@/components/SequenceSection";
import { HeroSequence } from "@/components/HeroSequence";
import { ProductSequence } from "@/components/ProductSequence";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-black min-h-screen">
      <Navbar />

      {/* Hero Experience (Section 1) */}
      <SequenceSection id="overview" height="h-[500vh]">
        {(progress) => <HeroSequence progress={progress} />}
      </SequenceSection>

      {/* spacer to let the user scroll normally for a bit to digest the sequence */}
      <section className="py-48 bg-black flex items-center justify-center text-center px-4 relative z-20">
          <div className="max-w-2xl mx-auto">
             <div className="h-24 w-[1px] bg-gradient-to-b from-white/20 to-transparent mx-auto mb-16" />
             <p className="text-[#a1a1aa] font-light text-xl md:text-2xl leading-relaxed">
                 The art of timekeeping is not merely in the counting of seconds, but in the reverence for how they slip away. Uncompromising precision is the only answer.
             </p>
             <div className="h-24 w-[1px] bg-gradient-to-t from-white/20 to-transparent mx-auto mt-16" />
          </div>
      </section>

      {/* Product / Craftsmanship Experience (Section 2) */}
      <SequenceSection id="craftsmanship" height="h-[500vh]">
        {(progress) => <ProductSequence progress={progress} />}
      </SequenceSection>
      
      {/* spacer before footer */}
      <div className="h-32 bg-black w-full" />

      <Footer />
    </main>
  );
}
