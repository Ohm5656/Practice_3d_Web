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
  frameStep?: number;
  mobileFrameStep?: number;
  maxCachedFrames?: number;
  mobileMaxCachedFrames?: number;
  preloadRadius?: number;
  mobilePreloadRadius?: number;
  maxConcurrentLoads?: number;
  mobileMaxConcurrentLoads?: number;
  initialPriorityFrames?: number;
  mobileInitialPriorityFrames?: number;
  fitMode?: "cover" | "contain";
  mobileFitMode?: "cover" | "contain";
  mobileBreakpoint?: number;
  scaleMultiplier?: number;
  mobileScaleMultiplier?: number;
  maxCanvasPixelRatio?: number;
  mobileMaxCanvasPixelRatio?: number;
}

interface SequenceProfile {
  frameStep: number;
  maxCachedFrames: number;
  preloadRadius: number;
  maxConcurrentLoads: number;
  initialPriorityFrames: number;
  maxCanvasPixelRatio: number;
}

interface NavigatorWithDeviceInfo extends Navigator {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
    addEventListener?: (type: "change", listener: () => void) => void;
    removeEventListener?: (type: "change", listener: () => void) => void;
  };
  deviceMemory?: number;
}

function sameProfile(a: SequenceProfile | null, b: SequenceProfile) {
  return (
    a !== null &&
    a.frameStep === b.frameStep &&
    a.maxCachedFrames === b.maxCachedFrames &&
    a.preloadRadius === b.preloadRadius &&
    a.maxConcurrentLoads === b.maxConcurrentLoads &&
    a.initialPriorityFrames === b.initialPriorityFrames &&
    a.maxCanvasPixelRatio === b.maxCanvasPixelRatio
  );
}

export function useCanvasSequence({
  frameFolder,
  frameCount,
  scrollProgress,
  padLength = 3,
  prefix = "ezgif-frame-",
  extension = ".jpg",
  frozenProgress = null,
  frameStep = 2,
  mobileFrameStep = 5,
  maxCachedFrames = 14,
  mobileMaxCachedFrames = 6,
  preloadRadius = 4,
  mobilePreloadRadius = 2,
  maxConcurrentLoads = 3,
  mobileMaxConcurrentLoads = 2,
  initialPriorityFrames = 3,
  mobileInitialPriorityFrames = 2,
  fitMode = "cover",
  mobileFitMode = fitMode,
  mobileBreakpoint = 768,
  scaleMultiplier = 1,
  mobileScaleMultiplier = scaleMultiplier,
  maxCanvasPixelRatio = 1.5,
  mobileMaxCanvasPixelRatio = 1,
}: UseCanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef(new Map<number, HTMLImageElement>());
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const desiredFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const scrollDirectionRef = useRef(1);
  const rafIdRef = useRef<number | null>(null);
  const requestFramesRef = useRef<(frameIndex: number) => void>(() => undefined);
  const [profile, setProfile] = useState<SequenceProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
    const browserNavigator = navigator as NavigatorWithDeviceInfo;
    const connection = browserNavigator.connection;

    const updateProfile = () => {
      const isMobile = media.matches;
      const hasSlowConnection =
        connection?.saveData ||
        connection?.effectiveType === "slow-2g" ||
        connection?.effectiveType === "2g" ||
        connection?.effectiveType === "3g";
      const hasLimitedDevice =
        (browserNavigator.deviceMemory !== undefined && browserNavigator.deviceMemory <= 4) ||
        (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4);
      const useMobileProfile = isMobile || hasSlowConnection || hasLimitedDevice;
      const nextProfile: SequenceProfile = useMobileProfile
        ? {
            frameStep: mobileFrameStep,
            maxCachedFrames: mobileMaxCachedFrames,
            preloadRadius: mobilePreloadRadius,
            maxConcurrentLoads: mobileMaxConcurrentLoads,
            initialPriorityFrames: mobileInitialPriorityFrames,
            maxCanvasPixelRatio: mobileMaxCanvasPixelRatio,
          }
        : {
            frameStep,
            maxCachedFrames,
            preloadRadius,
            maxConcurrentLoads,
            initialPriorityFrames,
            maxCanvasPixelRatio,
          };

      setProfile((current) => (sameProfile(current, nextProfile) ? current : nextProfile));
    };

    updateProfile();
    media.addEventListener("change", updateProfile);
    connection?.addEventListener?.("change", updateProfile);

    return () => {
      media.removeEventListener("change", updateProfile);
      connection?.removeEventListener?.("change", updateProfile);
    };
  }, [
    frameStep,
    initialPriorityFrames,
    maxCachedFrames,
    maxCanvasPixelRatio,
    maxConcurrentLoads,
    mobileBreakpoint,
    mobileFrameStep,
    mobileInitialPriorityFrames,
    mobileMaxCachedFrames,
    mobileMaxCanvasPixelRatio,
    mobileMaxConcurrentLoads,
    mobilePreloadRadius,
    preloadRadius,
  ]);

  const frameSlots = profile ? Math.ceil(frameCount / profile.frameStep) : 0;

  const clampFrameIndex = useCallback(
    (progress: number) =>
      Math.min(Math.max(frameSlots - 1, 0), Math.max(0, Math.floor(progress * frameSlots))),
    [frameSlots]
  );

  const findNearestLoadedFrame = useCallback(
    (frameIndex: number) => {
      const images = imagesRef.current;
      const exactImage = images.get(frameIndex);

      if (exactImage?.complete) {
        images.delete(frameIndex);
        images.set(frameIndex, exactImage);
        return { image: exactImage, index: frameIndex };
      }

      for (let offset = 1; offset < frameSlots; offset += 1) {
        const previousIndex = frameIndex - offset;
        const previousImage = previousIndex >= 0 ? images.get(previousIndex) : null;
        if (previousImage?.complete) {
          images.delete(previousIndex);
          images.set(previousIndex, previousImage);
          return { image: previousImage, index: previousIndex };
        }

        const nextIndex = frameIndex + offset;
        const nextImage = nextIndex < frameSlots ? images.get(nextIndex) : null;
        if (nextImage?.complete) {
          images.delete(nextIndex);
          images.set(nextIndex, nextImage);
          return { image: nextImage, index: nextIndex };
        }
      }

      return { image: null, index: -1 };
    },
    [frameSlots]
  );

  const drawCurrentFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx || frameSlots === 0) return;

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
    frameSlots,
    mobileBreakpoint,
    mobileFitMode,
    mobileScaleMultiplier,
    scaleMultiplier,
  ]);

  const scheduleDraw = useCallback(() => {
    if (rafIdRef.current !== null || document.visibilityState === "hidden") return;

    rafIdRef.current = window.requestAnimationFrame(() => {
      rafIdRef.current = null;
      drawCurrentFrame();
    });
  }, [drawCurrentFrame]);

  useEffect(() => {
    if (!profile || frameSlots === 0) return;

    let cancelled = false;
    let activeLoads = 0;
    const queuedFrames = new Set<number>();
    const loadingFrames = new Set<number>();
    const queue: number[] = [];
    const inFlightImages = new Set<HTMLImageElement>();

    const evictOldFrames = () => {
      while (imagesRef.current.size > profile.maxCachedFrames) {
        const oldestFrame = imagesRef.current.keys().next().value;
        if (oldestFrame === undefined) return;

        const image = imagesRef.current.get(oldestFrame);
        imagesRef.current.delete(oldestFrame);
        if (image) {
          image.onload = null;
          image.onerror = null;
          image.src = "";
        }
      }
    };

    const pumpQueue = () => {
      if (cancelled || document.visibilityState === "hidden") return;

      while (activeLoads < profile.maxConcurrentLoads && queue.length > 0) {
        const frameSlot = queue.shift();
        if (frameSlot === undefined) continue;

        queuedFrames.delete(frameSlot);
        if (imagesRef.current.has(frameSlot) || loadingFrames.has(frameSlot)) continue;

        activeLoads += 1;
        loadingFrames.add(frameSlot);

        const img = new Image();
        inFlightImages.add(img);
        img.decoding = "async";
        const sourceIndex = Math.min(
          frameCount,
          1 + Math.round((frameSlot * (frameCount - 1)) / Math.max(frameSlots - 1, 1))
        );
        const paddedIndex = sourceIndex.toString().padStart(padLength, "0");

        const finalize = () => {
          activeLoads -= 1;
          loadingFrames.delete(frameSlot);
          inFlightImages.delete(img);
          if (!cancelled) pumpQueue();
        };

        img.onload = () => {
          if (cancelled) {
            finalize();
            return;
          }

          imagesRef.current.set(frameSlot, img);
          evictOldFrames();
          setIsReady(true);
          scheduleDraw();
          finalize();
        };
        img.onerror = finalize;
        img.src = `/${frameFolder}/${prefix}${paddedIndex}${extension}`;
      }
    };

    const requestFrames = (targetFrame: number) => {
      const nextFrames = [targetFrame];
      const direction = scrollDirectionRef.current;

      for (let offset = 1; offset <= profile.preloadRadius; offset += 1) {
        nextFrames.push(targetFrame + direction * offset, targetFrame - direction * offset);
      }

      if (imagesRef.current.size === 0) {
        for (let index = 0; index < profile.initialPriorityFrames; index += 1) {
          nextFrames.push(index);
        }
      }

      for (const frameSlot of nextFrames) {
        if (
          frameSlot < 0 ||
          frameSlot >= frameSlots ||
          imagesRef.current.has(frameSlot) ||
          loadingFrames.has(frameSlot) ||
          queuedFrames.has(frameSlot)
        ) {
          continue;
        }

        queuedFrames.add(frameSlot);
        queue.push(frameSlot);
      }

      pumpQueue();
    };

    imagesRef.current = new Map();
    lastDrawnFrameRef.current = -1;
    requestFramesRef.current = requestFrames;
    requestFrames(desiredFrameRef.current);

    return () => {
      cancelled = true;
      requestFramesRef.current = () => undefined;
      inFlightImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
        image.src = "";
      });
      imagesRef.current.forEach((image) => {
        image.onload = null;
        image.onerror = null;
        image.src = "";
      });
      imagesRef.current.clear();
    };
  }, [
    extension,
    frameCount,
    frameFolder,
    frameSlots,
    padLength,
    prefix,
    profile,
    scheduleDraw,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    contextRef.current = ctx;

    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, profile?.maxCanvasPixelRatio ?? 1);
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
  }, [profile, scheduleDraw]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      lastDrawnFrameRef.current = -1;
      requestFramesRef.current(desiredFrameRef.current);
      scheduleDraw();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [scheduleDraw]);

  useEffect(() => {
    if (!profile) return;
    const progress = frozenProgress ?? scrollProgress.get();
    desiredFrameRef.current = clampFrameIndex(progress);
    lastDrawnFrameRef.current = -1;
    requestFramesRef.current(desiredFrameRef.current);
    scheduleDraw();
  }, [clampFrameIndex, frozenProgress, profile, scheduleDraw, scrollProgress]);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    if (frozenProgress !== null || !profile) return;

    const nextFrame = clampFrameIndex(latest);
    if (desiredFrameRef.current === nextFrame) return;

    scrollDirectionRef.current = nextFrame > desiredFrameRef.current ? 1 : -1;
    desiredFrameRef.current = nextFrame;
    requestFramesRef.current(nextFrame);
    scheduleDraw();
  });

  return { canvasRef, isReady };
}
