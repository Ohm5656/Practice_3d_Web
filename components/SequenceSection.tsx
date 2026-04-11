"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, type MotionValue } from "framer-motion";

interface SequenceSectionProps {
  id: string;
  children: (progress: MotionValue<number>) => React.ReactNode;
  height?: string;
  label?: string;
  hint?: string;
  lazyMount?: boolean;
}

export function SequenceSection({
  id,
  children,
  height = "400vh",
  label,
  hint,
  lazyMount = false,
}: SequenceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActivated, setIsActivated] = useState(!lazyMount);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!lazyMount || !containerRef.current || isActivated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsActivated(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [lazyMount, isActivated]);

  return (
    <section
      id={id}
      ref={containerRef}
      style={{ height }}
      className="relative w-full scroll-mt-32"
    >
      <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] w-full items-center justify-center overflow-hidden md:top-0 md:h-screen">
        {label ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-4 pt-28 md:px-8">
            <div className="section-frame flex items-center justify-between gap-6">
              <p className="eyebrow text-[0.68rem]">{label}</p>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-white/14 to-transparent md:block" />
            </div>
          </div>
        ) : null}

        {isActivated ? children(smoothProgress) : <div className="absolute inset-0 bg-black" />}

        {hint ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 px-4 md:px-8">
            <div className="section-frame flex items-center justify-between gap-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/14" />
              <p className="eyebrow text-[0.62rem] text-white/60">{hint}</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
