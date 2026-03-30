"use client";

import { useLenis } from "@studio-freight/react-lenis";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      // Optional: Set up lenis callbacks or any specific configurations
    }
  }, [lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children as any}
    </ReactLenis>
  );
}
