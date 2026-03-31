"use client";

import { useCanvasSequence } from "@/hooks/useCanvasSequence";
import { motion } from "framer-motion";

export function HeroSequence({ progress }: { progress: number }) {
  const { canvasRef, loadedCount, totalFrames } = useCanvasSequence({
    frameFolder: "Hero",
    frameCount: 240, // 8-second 30fps
    scrollProgress: progress,
    extension: "_out.jpg",
  });

  // Calculate storytelling opacity based on scroll progress
  // 0 - 20%: Headline
  const showHeadline = progress < 0.25;
  // 20 - 55%: Detail
  const showDetail = progress >= 0.2 && progress < 0.6;
  // 55 - 100%: Exploded
  const showExploded = progress >= 0.55;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover z-0"
      />

      {/* Loading overlay if frames are not somewhat ready */}
      {loadedCount < Math.min(60, totalFrames) && (
         <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-[#a1a1aa] tracking-widest text-sm uppercase">
               Engineered Loading...
            </motion.div>
         </div>
      )}

      {/* Text overlays - Z-10 so they float above the canvas */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none text-center px-4">
        
        {/* Beat 1: Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showHeadline ? 1 : 0, y: showHeadline ? 0 : -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-4">
            Time, <span className="font-semibold text-white/90">Engineered.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#a1a1aa] font-light max-w-xl mx-auto">
            A modern luxury watch experience shaped by engineering, balance, and refinement.
          </p>
        </motion.div>

        {/* Beat 2: Disassembly */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: showDetail ? 1 : 0, scale: showDetail ? 1 : 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute mt-64 md:mt-80"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-white mb-2">
            Precision in Every Detail.
          </h2>
          <p className="text-md text-[#a1a1aa] font-mono tracking-widest uppercase">
            CALIBER .04
          </p>
        </motion.div>

        {/* Beat 3: Exploded final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showExploded ? 1 : 0, y: showExploded ? 0 : -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-1/4 right-8 md:right-24 text-right max-w-xs"
        >
          <h3 className="text-2xl font-medium tracking-wider text-white mb-4 uppercase">
            Crafted to Endure
          </h3>
          <p className="text-sm text-[#a1a1aa] leading-relaxed">
            Every layer has purpose. From the sapphire crystal to the tungsten rotor, uncompromising standards dictate every millimeter of construction.
          </p>
        </motion.div>

      </div>
    </>
  );
}
