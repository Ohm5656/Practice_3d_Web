"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring } from "framer-motion";

interface SequenceSectionProps {
  id: string;
  children: (progress: number) => React.ReactNode;
  height?: string; // e.g. "h-[400vh]"
}

export function SequenceSection({ id, children, height = "h-[400vh]" }: SequenceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We use framer-motion useScroll to track progress through this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the progress value for the canvas using a spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      setProgress(latest);
    });
  }, [smoothProgress]);

  return (
    <section id={id} ref={containerRef} className={`relative w-full ${height} bg-black`}>
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {children(progress)}
      </div>
    </section>
  );
}
