"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type MotionValue, useMotionValueEvent } from "framer-motion";

interface UseCanvasSequenceProps {
  frameFolder: string;
  frameCount: number;
  scrollProgress: MotionValue<number>;
  padLength?: number;
  prefix?: string;
  extension?: string;
  frozenProgress?: number | null;
  maxConcurrentLoads?: number;
  initialPriorityFrames?: number;
  fitMode?: "cover" | "contain";
  mobileFitMode?: "cover" | "contain";
  mobileBreakpoint?: number;
  scaleMultiplier?: number;
  mobileScaleMultiplier?: number;
}

export function useCanvasSequence({
  frameFolder,
  frameCount,
  scrollProgress,
  padLength = 3,
  prefix = "ezgif-frame-",
  extension = ".jpg",
  frozenProgress = null,
  maxConcurrentLoads = 6,
  initialPriorityFrames = 24,
  fitMode = "cover",
  mobileFitMode = fitMode,
  mobileBreakpoint = 768,
  scaleMultiplier = 1,
  mobileScaleMultiplier = scaleMultiplier,
}: UseCanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const desiredFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const rafIdRef = useRef<number | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);

  const clampFrameIndex = useCallback(
    (progress: number) =>
      Math.min(frameCount - 1, Math.max(0, Math.floor(progress * frameCount))),
    [frameCount]
  );

  const findNearestLoadedFrame = useCallback(
    (frameIndex: number) => {
      const images = imagesRef.current;
      const exactImage = images[frameIndex];

      if (exactImage?.complete) {
        return { image: exactImage, index: frameIndex };
      }

      for (let offset = 1; offset < frameCount; offset += 1) {
        const previousIndex = frameIndex - offset;
        const previousImage = previousIndex >= 0 ? images[previousIndex] : null;
        if (previousImage?.complete) {
          return { image: previousImage, index: previousIndex };
        }

        const nextIndex = frameIndex + offset;
        const nextImage = nextIndex < frameCount ? images[nextIndex] : null;
        if (nextImage?.complete) {
          return { image: nextImage, index: nextIndex };
        }
      }

      return { image: null, index: -1 };
    },
    [frameCount]
  );

  const drawCurrentFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx || frameCount === 0) return;

    const { image, index } = findNearestLoadedFrame(desiredFrameRef.current);
    if (!image || lastDrawnFrameRef.current === index) return;

    lastDrawnFrameRef.current = index;

    const activeFitMode =
      window.innerWidth < mobileBreakpoint ? mobileFitMode : fitMode;
    const activeScaleMultiplier =
      window.innerWidth < mobileBreakpoint ? mobileScaleMultiplier : scaleMultiplier;
    const scale =
      (activeFitMode === "contain"
        ? Math.min(canvas.width / image.width, canvas.height / image.height)
        : Math.max(canvas.width / image.width, canvas.height / image.height)) * activeScaleMultiplier;
    const x = canvas.width / 2 - (image.width / 2) * scale;
    const y = canvas.height / 2 - (image.height / 2) * scale;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
  }, [
    findNearestLoadedFrame,
    fitMode,
    frameCount,
    mobileBreakpoint,
    mobileFitMode,
    mobileScaleMultiplier,
    scaleMultiplier,
  ]);

  const scheduleDraw = useCallback(() => {
    if (rafIdRef.current !== null) return;

    rafIdRef.current = window.requestAnimationFrame(() => {
      rafIdRef.current = null;
      drawCurrentFrame();
    });
  }, [drawCurrentFrame]);

  useEffect(() => {
    let cancel = false;
    const loadedImages: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    let loaded = 0;
    let activeLoads = 0;
    let queueIndex = 0;

    imagesRef.current = loadedImages;
    setLoadedCount(0);
    lastDrawnFrameRef.current = -1;

    const priorityFrameCount = Math.min(initialPriorityFrames, frameCount);
    const queue = [
      ...Array.from({ length: priorityFrameCount }, (_, index) => index + 1),
      ...Array.from({ length: Math.max(frameCount - priorityFrameCount, 0) }, (_, index) => priorityFrameCount + index + 1),
    ];

    const loadFrame = (index: number) => {
      const img = new Image();
      const paddedIndex = index.toString().padStart(padLength, "0");
      img.decoding = "async";
      img.src = `/${frameFolder}/${prefix}${paddedIndex}${extension}`;

      const finalize = () => {
        activeLoads -= 1;
        if (!cancel) {
          pumpQueue();
        }
      };

      img.onload = () => {
        if (cancel) {
          finalize();
          return;
        }

        loadedImages[index - 1] = img;
        loaded += 1;

        if (loaded <= 8 || loaded % 4 === 0 || loaded === frameCount) {
          setLoadedCount(loaded);
        }

        if (
          index - 1 === desiredFrameRef.current ||
          (lastDrawnFrameRef.current === -1 && index === 1)
        ) {
          scheduleDraw();
        }

        finalize();
      };

      img.onerror = finalize;
    };

    const pumpQueue = () => {
      if (cancel) return;

      while (activeLoads < maxConcurrentLoads && queueIndex < queue.length) {
        const index = queue[queueIndex];
        queueIndex += 1;
        activeLoads += 1;
        loadFrame(index);
      }
    };

    pumpQueue();

    return () => {
      cancel = true;
    };
  }, [
    extension,
    frameCount,
    frameFolder,
    initialPriorityFrames,
    maxConcurrentLoads,
    padLength,
    prefix,
    scheduleDraw,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    contextRef.current = ctx;

    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.floor(rect.width * dpr);
      const nextHeight = Math.floor(rect.height * dpr);

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        lastDrawnFrameRef.current = -1;
        scheduleDraw();
      }
    };

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize, { passive: true });

    return () => {
      contextRef.current = null;
      window.removeEventListener("resize", updateCanvasSize);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [scheduleDraw]);

  useEffect(() => {
    const progress = frozenProgress ?? scrollProgress.get();
    desiredFrameRef.current = clampFrameIndex(progress);
    lastDrawnFrameRef.current = -1;
    scheduleDraw();
  }, [clampFrameIndex, frozenProgress, scheduleDraw, scrollProgress]);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    if (frozenProgress !== null) return;

    const nextFrame = clampFrameIndex(latest);
    if (desiredFrameRef.current === nextFrame) return;

    desiredFrameRef.current = nextFrame;
    scheduleDraw();
  });

  return { canvasRef, loadedCount, totalFrames: frameCount };
}
