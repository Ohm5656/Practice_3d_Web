"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
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

      <section id="overview" className="relative flex min-h-[100svh] w-full items-start overflow-hidden md:h-screen md:items-center md:justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-cover.png"
            alt="Luxury Timepiece"
            fill
            className="object-cover object-[62%_center] md:object-center"
            priority
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/72 via-black/30 to-[#000000] md:from-black/60 md:via-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/62 via-black/18 to-transparent md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-transparent to-transparent md:hidden" />
        </div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative z-10 mx-auto flex w-full max-w-[1240px] px-5 pb-12 pt-[22svh] text-white sm:px-6 sm:pt-[20svh] md:block md:px-8 md:pb-0 md:pt-0 md:text-center"
        >
          <div className="max-w-[17rem] sm:max-w-[19.5rem] md:mx-auto md:max-w-4xl">
            <h1 className="mb-4 text-[2.8rem] leading-[0.94] font-semibold tracking-tighter drop-shadow-2xl sm:text-[3.15rem] md:mb-6 md:text-8xl">
              Precision Redefined
            </h1>
            <p className="max-w-[15rem] text-[1rem] leading-[1.36] text-white/76 drop-shadow-lg sm:max-w-[17rem] sm:text-[1.08rem] md:mx-auto md:mb-10 md:max-w-2xl md:text-2xl">
              The new standard of luxury timepieces.
            </p>

            <div className="mt-6 flex w-full max-w-[17rem] flex-col gap-3 sm:max-w-[18.5rem] sm:flex-row sm:flex-wrap md:mx-auto md:mt-2 md:max-w-none md:justify-center md:gap-4">
              <Link href="/store" className="apple-btn-solid w-full sm:flex-1 md:w-auto md:flex-none">
                Learn More
              </Link>
              <Link href="/about" className="apple-btn-outline w-full sm:flex-1 md:w-auto md:flex-none">
                About
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

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

      <StoreSection limit={6} showMoreButton={true} />

      <Footer />
    </main>
  );
}
