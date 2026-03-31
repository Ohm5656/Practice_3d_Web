"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { HeroSequence } from "@/components/HeroSequence";
import { Navbar } from "@/components/Navbar";
import { ProductSequence } from "@/components/ProductSequence";
import { SequenceSection } from "@/components/SequenceSection";

const materialPillars = [
  {
    title: "Grade 5 Titanium",
    copy: "Light. Strong. Understated.",
  },
  {
    title: "Sapphire Crystal",
    copy: "Clarity with lasting protection.",
  },
  {
    title: "Caliber 04",
    copy: "Balanced, precise, composed.",
  },
];

const reserveNotes = [
  { label: "Release", value: "Private" },
  { label: "Viewing", value: "By appointment" },
  { label: "Finish", value: "Hand-inspected" },
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
    <main className="relative min-h-screen w-full bg-[var(--color-background)]">
      <div className="ambient-orb left-[-12rem] top-[12rem] h-[26rem] w-[26rem] bg-[rgba(197,154,92,0.18)]" />
      <div className="ambient-orb right-[-10rem] top-[34rem] h-[24rem] w-[24rem] bg-[rgba(137,147,170,0.18)]" />
      <div className="ambient-orb bottom-[12rem] left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 bg-[rgba(197,154,92,0.12)]" />

      <Navbar />

      <SequenceSection
        id="overview"
        height="500vh"
        label="AeroChron 01 / Launch Edition"
        hint="Scroll to reveal the movement"
      >
        {(progress) => <HeroSequence progress={progress} />}
      </SequenceSection>

      <section className="relative z-20 px-4 pb-20 pt-4 md:px-8">
        <motion.div {...revealProps} className="section-frame">
          <div className="glass-panel overflow-hidden rounded-[32px] px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="eyebrow mb-4">Design Direction</p>
                <h2 className="headline-display max-w-3xl text-5xl text-white md:text-7xl">
                  Built to be watched.
                </h2>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="eyebrow text-[0.58rem]">Case</p>
                    <p className="mt-2 text-sm text-white/78">Titanium</p>
                  </div>
                  <div>
                    <p className="eyebrow text-[0.58rem]">Crystal</p>
                    <p className="mt-2 text-sm text-white/78">Sapphire</p>
                  </div>
                  <div>
                    <p className="eyebrow text-[0.58rem]">Edition</p>
                    <p className="mt-2 text-sm text-white/78">Launch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <SequenceSection
        id="craftsmanship"
        height="500vh"
        label="Movement / Hand-finished architecture"
        hint="Continue into the material study"
        lazyMount
      >
        {(progress) => <ProductSequence progress={progress} />}
      </SequenceSection>

      <motion.section
        id="materials"
        {...revealProps}
        className="relative z-20 scroll-mt-32 px-4 py-20 md:px-8 md:py-28"
      >
        <div className="section-frame">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4">Material Study</p>
              <h2 className="headline-display max-w-3xl text-5xl text-white md:text-7xl">
                Less copy. More presence.
              </h2>
            </div>
            <p className="copy-muted max-w-md text-sm">Three details. One impression.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {materialPillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : index * 0.08 }}
                className="glass-panel rounded-[28px] p-6 md:p-7"
              >
                <p className="eyebrow mb-4 text-[0.62rem]">0{index + 1}</p>
                <h3 className="headline-display text-3xl text-white md:text-[2.35rem]">
                  {pillar.title}
                </h3>
                <p className="copy-muted mt-4 text-sm">{pillar.copy}</p>
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
          <div className="glass-panel overflow-hidden rounded-[34px] px-6 py-10 md:px-10 md:py-12">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="eyebrow mb-4">Private Reserve</p>
                <h2 className="headline-display max-w-3xl text-5xl text-white md:text-7xl">
                  See it. Want it. Reserve it.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {reserveNotes.map((note) => (
                  <div key={note.label} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                    <p className="eyebrow text-[0.58rem]">{note.label}</p>
                    <p className="mt-3 text-sm text-white/78">{note.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fine-divider my-8" />

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:concierge@aerochron.com?subject=Private%20Allocation%20Inquiry"
                className="premium-button"
              >
                Request Allocation
              </a>
              <a href="#craftsmanship" className="premium-button premium-button--ghost">
                Review the Movement
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
