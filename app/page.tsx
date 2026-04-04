"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { HeroSequence } from "@/components/HeroSequence";
import { Navbar } from "@/components/Navbar";
import { ProductSequence } from "@/components/ProductSequence";
import { SequenceSection } from "@/components/SequenceSection";
import { StoreSection } from "@/components/StoreSection";

const materialPillars = [
  {
    title: "Grade 5 Titanium",
    copy: "Light. Strong. Built for any condition.",
  },
  {
    title: "Sapphire Crystal",
    copy: "Clarity combined with absolute protection.",
  },
  {
    title: "Caliber 04",
    copy: "A complex mechanism delivering unmatched precision.",
  },
];

const reserveNotes = [
  { label: "Release", value: "By invitation only" },
  { label: "Viewing", value: "By appointment" },
  { label: "Inspection", value: "Hand-inspected" },
];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const revealProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 34 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.24 },
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <main className="relative min-h-screen w-full bg-[#000000] selection:bg-white selection:text-black">

      <Navbar />

      <SequenceSection id="overview" height="500vh">
        {(progress) => <HeroSequence progress={progress} />}
      </SequenceSection>

      <section className="relative z-20 px-4 pb-20 pt-4 md:px-8">
        <motion.div {...revealProps} className="section-frame">
          <div className="py-24 md:py-32 text-center text-white">
            <h2 className="text-4xl md:text-7xl font-semibold tracking-tight mx-auto max-w-4xl">
              Timeless Design<br />
              <span className="text-white/60">Built to be remembered</span>
            </h2>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 justify-center mx-auto max-w-3xl">
              <div>
                <p className="text-white/60 text-sm tracking-wide">Case</p>
                <p className="mt-2 text-xl font-medium">Titanium Grade 5</p>
              </div>
              <div>
                <p className="text-white/60 text-sm tracking-wide">Crystal</p>
                <p className="mt-2 text-xl font-medium">Sapphire Crystal</p>
              </div>
              <div>
                <p className="text-white/60 text-sm tracking-wide">Collection</p>
                <p className="mt-2 text-xl font-medium">Launch Edition</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <SequenceSection id="craftsmanship" height="500vh" lazyMount>
        {(progress) => <ProductSequence progress={progress} />}
      </SequenceSection>

      <motion.section
        id="materials"
        {...revealProps}
        className="relative z-20 scroll-mt-32 px-4 py-20 md:px-8 md:py-28"
      >
        <div className="section-frame text-white text-center">
          <div className="mb-20">
            <h2 className="text-4xl md:text-7xl font-semibold tracking-tight mx-auto max-w-4xl">
              Premium Strength<br />
              <span className="text-white/60">Superior Material Innovation</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {materialPillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : index * 0.08 }}
                className="p-8 border border-white/10 rounded-[28px] text-center"
              >
                <h3 className="text-3xl font-semibold mb-4">
                  {pillar.title}
                </h3>
                <p className="text-white/60 text-lg mx-auto max-w-sm">{pillar.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="reserve"
        {...revealProps}
        className="relative z-20 scroll-mt-32 px-4 pb-16 pt-6 md:px-8 md:pb-20"
      >
        <div className="section-frame">
          <div className="py-24 md:py-32 text-center text-white">
            <h2 className="text-5xl md:text-8xl font-semibold tracking-tighter mx-auto max-w-5xl mb-16">
              Own the perfect<br className="hidden md:block"/>timepiece
            </h2>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-16">
              {reserveNotes.map((note) => (
                <div key={note.label} className="text-center px-4">
                  <p className="text-white/50 text-sm tracking-wide mb-2">{note.label}</p>
                  <p className="text-xl font-medium">{note.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <a
                href="#reserve"
                className="premium-button bg-white text-black font-medium"
              >
                Request Allocation
              </a>
              <a href="#craftsmanship" className="premium-button text-white bg-white/10 hover:bg-white/20 hover:opacity-100 transition-colors">
                Review the Movement
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      <StoreSection />

      <Footer />
    </main>
  );
}
