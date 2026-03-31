"use client";

import { useEffect, useRef, useState } from "react";

interface UseCanvasSequenceProps {
  frameFolder: string;
  frameCount: number;
  scrollProgress: number;
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
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [imagesVersion, setImagesVersion] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let cancel = false;
    const timeoutIds: number[] = [];
    const loadedImages: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    let loaded = 0;

    imagesRef.current = loadedImages;

    const loadFrame = (index: number) => {
      if (cancel) return;

      const img = new Image();
      const paddedIndex = index.toString().padStart(padLength, "0");
      img.decoding = "async";
      img.src = `/${frameFolder}/${prefix}${paddedIndex}${extension}`;

      img.onload = () => {
        if (cancel) return;
        loadedImages[index - 1] = img;
        loaded += 1;
        setLoadedCount(loaded);

        if (loaded <= 24 || loaded % 12 === 0 || loaded === frameCount) {
          imagesRef.current = [...loadedImages];
          setImagesVersion((version) => version + 1);
        }
      };
    };

    for (let index = 1; index <= frameCount; index += 1) {
      timeoutIds.push(window.setTimeout(() => loadFrame(index), index * 1.5));
    }

    return () => {
      cancel = true;
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [frameFolder, frameCount, padLength, prefix, extension]);

  useEffect(() => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.floor(rect.width * dpr);
      const nextHeight = Math.floor(rect.height * dpr);

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }
    };

    updateCanvasSize();

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(scrollProgress * frameCount)));
    let imageToDraw = imagesRef.current[frameIndex];

    if (!imageToDraw) {
      for (let offset = 1; offset < frameCount; offset += 1) {
        imageToDraw =
          imagesRef.current[frameIndex - offset] ?? imagesRef.current[frameIndex + offset] ?? null;

        if (imageToDraw) {
          break;
        }
      }
    }

    if (imageToDraw && imageToDraw.complete) {
      const render = () => {
        const scale = Math.max(canvas.width / imageToDraw.width, canvas.height / imageToDraw.height);
        const x = canvas.width / 2 - (imageToDraw.width / 2) * scale;
        const y = canvas.height / 2 - (imageToDraw.height / 2) * scale;

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

      window.requestAnimationFrame(render);
    }

    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [scrollProgress, imagesVersion, frameCount]);

  return { canvasRef, loadedCount, totalFrames: frameCount };
}
