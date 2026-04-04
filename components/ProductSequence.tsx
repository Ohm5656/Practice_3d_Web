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

  const showBeat1 = progress < 0.35;
  const showBeat2 = progress >= 0.3 && progress < 0.65;
  const showBeat3 = progress >= 0.6 && progress < 0.9;
  const showBeat4 = progress >= 0.85;
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };
  const loadingProgress = Math.min(100, Math.round((loadedCount / totalFrames) * 100));

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full object-cover" />

      {loadedCount < Math.min(14, totalFrames) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <motion.div
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="text-3xl text-white md:text-5xl font-semibold tracking-tight"
          >
            {loadingProgress}%
          </motion.div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-10 px-8">
        <div className="relative h-full max-w-[1200px] mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -32 }}
            animate={{ opacity: showBeat1 ? 1 : 0, x: showBeat1 ? 0 : -18 }}
            transition={transition}
            className="absolute left-0 top-[30%] max-w-sm text-left"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
              Strong<br/>Yet Lightweight
            </h2>
            <p className="text-white/70 text-lg">Forged from Aerospace-grade Titanium</p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 32 }}
            animate={{ opacity: showBeat2 ? 1 : 0, x: showBeat2 ? 0 : 18 }}
            transition={transition}
            className="absolute right-0 top-[40%] max-w-sm text-right"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
              Absolute<br/>Protection
            </h2>
            <p className="text-white/70 text-lg">Anti-reflective Sapphire Crystal</p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: showBeat3 ? 1 : 0, y: showBeat3 ? 0 : 18 }}
            transition={transition}
            className="absolute bottom-24 left-1/2 w-full max-w-xl -translate-x-1/2 text-center"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-4">
              Engineered for Endurance
            </h2>
            <p className="text-white/70 text-lg">Shock and magnetic resistant.</p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: showBeat4 ? 1 : 0, scale: showBeat4 ? 1 : 0.98 }}
            transition={transition}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center"
          >
            <div className="mx-auto max-w-3xl">
              <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter text-white mb-8">
                Own<br/>The Standard
              </h2>
              <a href="#reserve" className="premium-button pointer-events-auto">
                Reserve Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
