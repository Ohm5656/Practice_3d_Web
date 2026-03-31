"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCanvasSequence } from "@/hooks/useCanvasSequence";

export function ProductSequence({ progress }: { progress: number }) {
  const shouldReduceMotion = useReducedMotion();
  const { canvasRef, loadedCount, totalFrames } = useCanvasSequence({
    frameFolder: "product",
    frameCount: 240,
    scrollProgress: shouldReduceMotion ? 0 : progress,
    extension: "_out.jpg",
  });

  const showBeat1 = progress < 0.3;
  const showBeat2 = progress >= 0.25 && progress < 0.65;
  const showBeat3 = progress >= 0.6 && progress < 0.9;
  const showBeat4 = progress >= 0.85;
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };
  const loadingProgress = Math.min(100, Math.round((loadedCount / totalFrames) * 100));

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full object-cover" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(197,154,92,0.18),transparent_28%),linear-gradient(180deg,rgba(5,5,6,0.28),rgba(5,5,6,0.7)_70%,rgba(5,5,6,0.92))]" />

      {loadedCount < Math.min(14, totalFrames) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/64 backdrop-blur-md">
          <div className="glass-panel rounded-[28px] px-8 py-6 text-center">
            <p className="eyebrow mb-3">Calibrating sequence</p>
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

      <div className="pointer-events-none absolute inset-0 z-10 px-4 md:px-8">
        <div className="section-frame relative h-full">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -32 }}
            animate={{ opacity: showBeat1 ? 1 : 0, x: showBeat1 ? 0 : -18 }}
            transition={transition}
            className="glass-panel absolute left-0 top-[28%] max-w-sm rounded-[28px] px-6 py-6 text-left md:px-7"
          >
            <p className="eyebrow mb-3 text-[0.64rem]">Movement architecture</p>
            <h2 className="headline-display text-3xl text-white md:text-[2.55rem]">
              Mechanical clarity.
            </h2>
            <p className="copy-muted mt-3 text-sm">Quiet outside. Drama within.</p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 32 }}
            animate={{ opacity: showBeat2 ? 1 : 0, x: showBeat2 ? 0 : 18 }}
            transition={transition}
            className="glass-panel absolute right-0 top-[44%] max-w-sm rounded-[28px] px-6 py-6 text-right md:px-7"
          >
            <p className="eyebrow mb-3 text-[0.64rem]">Hand-finished detail</p>
            <h2 className="headline-display text-3xl text-white md:text-[2.45rem]">
              Visible craftsmanship.
            </h2>
            <p className="copy-muted mt-3 text-sm">Every layer earns the light.</p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: showBeat3 ? 1 : 0, y: showBeat3 ? 0 : 18 }}
            transition={transition}
            className="glass-panel absolute bottom-16 left-1/2 w-full max-w-xl -translate-x-1/2 rounded-[30px] px-6 py-6 text-center md:px-8"
          >
            <p className="eyebrow mb-3 text-[0.64rem]">Material study</p>
            <h2 className="headline-display text-3xl text-white md:text-[2.8rem]">
              Titanium, rhodium, sapphire.
            </h2>
            <p className="copy-muted mx-auto mt-3 max-w-lg text-sm">Chosen for presence.</p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: showBeat4 ? 1 : 0, scale: showBeat4 ? 1 : 0.98 }}
            transition={transition}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center"
          >
            <div className="mx-auto max-w-3xl px-6">
              <p className="eyebrow mb-5">Private allocation</p>
              <h2 className="headline-display text-5xl text-white md:text-7xl">
                Own the standard.
              </h2>
              <a href="#reserve" className="premium-button pointer-events-auto mt-8">
                Reserve Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
