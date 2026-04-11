"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type MotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useCanvasSequence } from "@/hooks/useCanvasSequence";

function getProductBeat(progress: number) {
  if (progress < 0.35) return 1;
  if (progress < 0.65) return 2;
  if (progress < 0.9) return 3;
  return 4;
}

export function ProductSequence({ progress }: { progress: MotionValue<number> }) {
  const shouldReduceMotion = useReducedMotion();
  const initialBeat = shouldReduceMotion ? 1 : getProductBeat(progress.get());
  const [activeBeat, setActiveBeat] = useState(initialBeat);
  const activeBeatRef = useRef(initialBeat);
  const { canvasRef, loadedCount, totalFrames } = useCanvasSequence({
    frameFolder: "product",
    frameCount: 240,
    scrollProgress: progress,
    extension: "_out.jpg",
    frozenProgress: shouldReduceMotion ? 0 : null,
    mobileFitMode: "contain",
    mobileScaleMultiplier: 1.28,
  });

  useEffect(() => {
    const nextBeat = shouldReduceMotion ? 1 : getProductBeat(progress.get());
    activeBeatRef.current = nextBeat;
    setActiveBeat(nextBeat);
  }, [progress, shouldReduceMotion]);

  useMotionValueEvent(progress, "change", (latest) => {
    if (shouldReduceMotion) return;

    const nextBeat = getProductBeat(latest);
    if (nextBeat === activeBeatRef.current) return;

    activeBeatRef.current = nextBeat;
    setActiveBeat(nextBeat);
  });

  const showBeat1 = activeBeat === 1;
  const showBeat2 = activeBeat === 2;
  const showBeat3 = activeBeat === 3;
  const showBeat4 = activeBeat === 4;
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

      <div className="pointer-events-none absolute inset-0 z-10 px-4 sm:px-6 md:px-8">
        <div className="relative h-full max-w-[1200px] mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -32 }}
            animate={{ opacity: showBeat1 ? 1 : 0, x: showBeat1 ? 0 : -18 }}
            transition={transition}
            className="absolute left-0 top-[11%] max-w-[15rem] text-left drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)] sm:max-w-[18rem] md:top-[30%] md:max-w-sm md:drop-shadow-none"
          >
            <h2 className="mb-3 text-[2.7rem] leading-[0.92] font-semibold tracking-tight text-white sm:text-[3.1rem] md:mb-4 md:text-5xl">
              Strong<br/>Yet Lightweight
            </h2>
            <p className="text-base leading-[1.35] text-white/72 md:text-lg">Forged from Aerospace-grade Titanium</p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 32 }}
            animate={{ opacity: showBeat2 ? 1 : 0, x: showBeat2 ? 0 : 18 }}
            transition={transition}
            className="absolute right-0 top-[11%] max-w-[15rem] text-right drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)] sm:max-w-[18rem] md:top-[40%] md:max-w-sm md:drop-shadow-none"
          >
            <h2 className="mb-3 text-[2.55rem] leading-[0.92] font-semibold tracking-tight text-white sm:text-[3rem] md:mb-4 md:text-5xl">
              Absolute<br/>Protection
            </h2>
            <p className="text-base leading-[1.35] text-white/72 md:text-lg">Anti-reflective Sapphire Crystal</p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -32 }}
            animate={{ opacity: showBeat3 ? 1 : 0, x: showBeat3 ? 0 : -18 }}
            transition={transition}
            className="absolute bottom-18 left-0 max-w-[15.5rem] text-left drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)] sm:max-w-[18rem] md:bottom-24 md:max-w-sm md:drop-shadow-none"
          >
            <h2 className="mb-3 text-[2.3rem] leading-[0.94] font-semibold tracking-tight text-white sm:text-[2.8rem] md:mb-4 md:text-5xl">
              Engineered for Endurance
            </h2>
            <p className="text-base leading-[1.35] text-white/72 md:text-lg">Shock and magnetic resistant.</p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: showBeat4 ? 1 : 0, scale: showBeat4 ? 1 : 0.98 }}
            transition={transition}
            className="absolute inset-x-0 bottom-14 text-center drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)] md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:drop-shadow-none"
          >
            <div className="mx-auto max-w-[18rem] sm:max-w-[21rem] md:max-w-3xl">
              <h2 className="mb-6 text-[3.4rem] leading-[0.92] font-semibold tracking-tighter text-white sm:text-[4.1rem] md:mb-8 md:text-8xl">
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
