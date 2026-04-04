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

  const showHeadline = progress < 0.35;
  const showDetail = progress >= 0.3 && progress < 0.65;
  const showExploded = progress >= 0.6;
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.95, ease: [0.22, 1, 0.36, 1] as const };
  const loadingProgress = Math.min(100, Math.round((loadedCount / totalFrames) * 100));

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full object-cover" />

      {loadedCount < Math.min(14, totalFrames) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <motion.div
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="text-3xl text-white md:text-5xl font-semibold tracking-tight"
            >
              {loadingProgress}%
            </motion.div>
          </div>
        </div>
      )}

      {/* Floating Apple-Style Center Headline */}
      <div className="pointer-events-none absolute inset-x-0 top-32 z-10 px-4 text-center md:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: showHeadline ? 1 : 0, y: showHeadline ? 0 : -20 }}
          transition={transition}
          className="mx-auto max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl xl:text-[9rem] font-semibold tracking-tighter text-white">
            BEYOND<br />
            <span className="text-white/60">TIME</span>
          </h1>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-24 z-10 px-4 md:px-16 mx-auto max-w-[1200px]">
        <div className="grid gap-16 md:grid-cols-2 md:items-end w-full">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: showDetail ? 1 : 0, y: showDetail ? 0 : 16 }}
            transition={transition}
            className="text-left"
          >
            <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight">
              Masterpiece Architecture
            </h2>
            <p className="mt-4 text-white/70 max-w-xs text-lg">Caliber 04 pushing the limits of mechanical precision.</p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 32 }}
            animate={{ opacity: showExploded ? 1 : 0, x: showExploded ? 0 : 20 }}
            transition={transition}
            className="text-right ml-auto"
          >
            <h3 className="text-3xl md:text-4xl text-white font-semibold tracking-tight">
              Timeless Craft
            </h3>
            <p className="mt-4 text-white/70 max-w-xs ml-auto text-lg">Every curve machined with absolute purpose.</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
