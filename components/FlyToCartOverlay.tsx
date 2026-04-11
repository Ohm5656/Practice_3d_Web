"use client";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { type FlyingImage } from "@/lib/cartFlight";

export function FlyToCartOverlay({ flyingImages }: { flyingImages: FlyingImage[] }) {
  if (typeof window === "undefined" || flyingImages.length === 0) {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {flyingImages.map((img) => {
        const liftX = img.startX + (img.endX - img.startX) * 0.32;
        const liftY = img.startY - 170;

        return (
          <motion.img
            key={img.id}
            src={img.src}
            alt=""
            className="absolute z-[10000] object-contain drop-shadow-[0_0_18px_rgba(212,175,55,0.45)]"
            style={{ width: img.size, height: img.size }}
            initial={{
              x: img.startX,
              y: img.startY,
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: [img.startX, liftX, img.endX],
              y: [img.startY, liftY, img.endY],
              scale: [1, 1.05, 0.16],
              opacity: [1, 1, 0],
              rotate: [0, -10, 24],
            }}
            transition={{
              duration: 1.95,
              ease: [0.19, 0.84, 0.28, 0.99],
              times: [0, 0.58, 1],
            }}
          />
        );
      })}
    </div>,
    document.body
  );
}
