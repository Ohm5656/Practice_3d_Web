"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCanvasSequence } from "@/hooks/useCanvasSequence";

export function HeroSequence({ progress }: { progress: number }) {
  const shouldReduceMotion = useReducedMotion();
  const { canvasRef, loadedCount, totalFrames } = useCanvasSequence({
    frameFolder: "Hero",
    frameCount: 240,
    scrollProgress: shouldReduceMotion ? 0 : progress,
    extension: "_out.jpg",
  });

  const showHeadline = progress < 0.25;
  const showDetail = progress >= 0.2 && progress < 0.6;
  const showExploded = progress >= 0.55;
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.95, ease: [0.22, 1, 0.36, 1] as const };
  const loadingProgress = Math.min(100, Math.round((loadedCount / totalFrames) * 100));

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full object-cover" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,rgba(5,5,6,0.14),rgba(5,5,6,0.52)_60%,rgba(5,5,6,0.9))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0,transparent_36%,rgba(5,5,6,0.52)_100%)]" />

      {loadedCount < Math.min(14, totalFrames) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/72 backdrop-blur-md">
          <div className="glass-panel rounded-[28px] px-8 py-6 text-center">
            <p className="eyebrow mb-3">Preparing the movement</p>
            <motion.div
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="headline-display text-3xl text-white md:text-4xl"
            >
              {loadingProgress}%
            </motion.div>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-30 z-10 px-4 text-center md:px-8">
        <div className="section-frame">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: showHeadline ? 1 : 0, y: showHeadline ? 0 : -18 }}
            transition={transition}
            className="mx-auto max-w-4xl"
          >
            <p className="eyebrow mb-5">Launch Edition / AeroChron 01</p>
            <h1 className="headline-display text-6xl text-white md:text-8xl xl:text-[8.5rem]">
              Time,
              <span className="ml-3 text-[var(--color-accent)]">Engineered.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-sm uppercase tracking-[0.36em] text-white/62 md:text-[0.76rem]">
              Sculpted depth. Mechanical calm.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-12 z-10 px-4 md:px-8">
        <div className="section-frame grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: showDetail ? 1 : 0, y: showDetail ? 0 : 16 }}
            transition={transition}
            className="glass-panel max-w-md rounded-[28px] px-6 py-6 text-left md:px-7"
          >
            <p className="eyebrow mb-3 text-[0.64rem]">Caliber 04</p>
            <h2 className="headline-display text-3xl text-white md:text-[2.7rem]">
              Precision, revealed.
            </h2>
            <p className="copy-muted mt-3 text-sm">Titanium. Sapphire. Balance.</p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 32 }}
            animate={{ opacity: showExploded ? 1 : 0, x: showExploded ? 0 : 20 }}
            transition={transition}
            className="ml-auto glass-panel max-w-sm rounded-[28px] px-6 py-6 text-right md:px-7"
          >
            <p className="eyebrow mb-3 text-[0.64rem]">Signature finish</p>
            <h3 className="headline-display text-3xl text-white md:text-[2.5rem]">
              Crafted to endure.
            </h3>
            <p className="copy-muted mt-3 text-sm">Every line has purpose.</p>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden px-8 lg:block">
        <div className="section-frame flex items-center justify-between text-[0.68rem] uppercase tracking-[0.34em] text-white/42">
          <span>Interactive horology study</span>
          <span>Scroll to disassemble</span>
        </div>
      </div>
    </>
  );
}
