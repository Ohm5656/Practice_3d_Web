"use client";

import { useCanvasSequence } from "@/hooks/useCanvasSequence";
import { motion } from "framer-motion";

export function ProductSequence({ progress }: { progress: number }) {
  const { canvasRef } = useCanvasSequence({
    frameFolder: "product",
    frameCount: 240, // 8-second 30fps
    scrollProgress: progress,
    extension: "_out.jpg",
  });

  // Storytelling beats per user prompt
  // 0-25%: Assembled, introduce heritage
  const showBeat1 = progress < 0.3;
  // 25-60%: Internal structure visible
  const showBeat2 = progress >= 0.25 && progress < 0.65;
  // 60-85%: Exploded technical composition
  const showBeat3 = progress >= 0.6 && progress < 0.9;
  // 85-100%: Hold final
  const showBeat4 = progress >= 0.85;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none px-6 md:px-24">
        
        {/* Beat 1: Intro / Heritage */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: showBeat1 ? 1 : 0, x: showBeat1 ? 0 : -30 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/3 left-6 md:left-24 max-w-sm"
        >
          <p className="text-xs tracking-[0.2em] text-[#d4af37] mb-4 uppercase font-semibold">
            The Philosophy
          </p>
          <h2 className="text-4xl font-light text-white mb-4">
            Built with Mechanical Precision
          </h2>
          <p className="text-[#a1a1aa] font-light leading-relaxed">
            A harmonious integration of classic watchmaking and forward-thinking structural design.
          </p>
        </motion.div>

        {/* Beat 2: Core structure */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: showBeat2 ? 1 : 0, x: showBeat2 ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/2 right-6 md:right-24 text-right max-w-sm"
        >
          <p className="text-xs tracking-[0.2em] text-[#d4af37] mb-4 uppercase font-semibold">
            Internal Mechanics
          </p>
          <h2 className="text-3xl font-light text-white mb-4">
            Craftsmanship You Can See
          </h2>
          <p className="text-[#a1a1aa] font-light leading-relaxed">
            Gears, movement, and rotor all balanced to rigorous tolerances. No detail hidden.
          </p>
        </motion.div>

        {/* Beat 3: Materials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showBeat3 ? 1 : 0, y: showBeat3 ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-32 left-8 md:left-1/3 text-center md:text-left max-w-md mx-auto"
        >
          <h2 className="text-3xl font-light text-white mb-4">
            From Case to Caliber
          </h2>
          <p className="text-[#a1a1aa] font-light leading-relaxed">
            Premium aerospace-grade titanium, rhodium plating, and scratch-resistant sapphire ensure timeless form.
          </p>
        </motion.div>

        {/* Beat 4: Final Hold CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: showBeat4 ? 1 : 0, scale: showBeat4 ? 1 : 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full"
        >
          <h2 className="text-5xl font-light text-white mb-8">
            Own the Standard.
          </h2>
          <button className="pointer-events-auto bg-white text-black text-sm font-medium tracking-widest uppercase px-8 py-3 rounded-full hover:bg-neutral-200 transition-colors">
            Reserve Now
          </button>
        </motion.div>
      </div>
    </>
  );
}
