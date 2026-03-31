"use client";

import { useEffect, useRef, useState } from "react";

interface UseCanvasSequenceProps {
  frameFolder: string;
  frameCount: number;
  scrollProgress: number; // 0 to 1
  padLength?: number;
  prefix?: string;
  extension?: string;
}

export function useCanvasSequence({
  frameFolder,
  frameCount,
  scrollProgress,
  padLength = 3,
  prefix = "ezgif-frame-",
  extension = ".jpg",
}: UseCanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload Images progressively to not block the main thread
  useEffect(() => {
    let cancel = false;
    const loadedImages: HTMLImageElement[] = new Array(frameCount).fill(null);
    let loaded = 0;

    const loadFrame = (i: number) => {
      if (cancel) return;
      
      const img = new Image();
      const paddedIndex = i.toString().padStart(padLength, "0");
      img.src = `/${frameFolder}/${prefix}${paddedIndex}${extension}`;
      
      img.onload = () => {
        if (cancel) return;
        loadedImages[i - 1] = img;
        loaded++;
        setLoadedCount(loaded);

        if (loaded === frameCount) {
          setImages([...loadedImages]);
        } else if (loaded === Math.floor(frameCount / 4)) {
            // Give an early state so the first chunk renders immediately!
            setImages([...loadedImages]);
        }
      };
    };

    // Load sequentially so first frames show up instantly
    for (let i = 1; i <= frameCount; i++) {
        // use requestIdleCallback or setTimeout to yield main thread if needed
        setTimeout(() => loadFrame(i), i * 1.5);
    }

    return () => {
      cancel = true;
    };
  }, [frameFolder, frameCount, padLength, prefix, extension]);

  // Draw on Canvas
  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // alpha: false for performance boost
    if (!ctx) return;

    // Handle High-DPI screens (Retina)
    const dpr = window.devicePixelRatio || 1;
    // Use requestAnimationFrame to ensure we read layout correctly
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== Math.floor(rect.width * dpr)) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }
    };
    updateCanvasSize();

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Calculate current frame index based on scrollProgress
    const frameIndex = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(scrollProgress * frameCount))
    );

    const imageToDraw = images[frameIndex];

    if (imageToDraw && imageToDraw.complete) {
      const render = () => {
        // High performance cover logic
        const scale = Math.max(canvas.width / imageToDraw.width, canvas.height / imageToDraw.height);
        const x = (canvas.width / 2) - (imageToDraw.width / 2) * scale;
        const y = (canvas.height / 2) - (imageToDraw.height / 2) * scale;
        
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
          imageToDraw,
          x,
          y,
          imageToDraw.width * scale,
          imageToDraw.height * scale
        );
      };

      requestAnimationFrame(render);
    }
    
    // Listen to resize to keep it sharp
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [scrollProgress, images, frameCount]);

  return { canvasRef, loadedCount, totalFrames: frameCount };
}
