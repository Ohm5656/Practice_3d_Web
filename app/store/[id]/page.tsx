"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react";
import { useRef, useState } from "react";
import { Footer } from "@/components/Footer";
import { FlyToCartOverlay } from "@/components/FlyToCartOverlay";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/app/context/CartContext";
import { buildCartFlight, type FlyingImage } from "@/lib/cartFlight";
import { productsById } from "@/lib/products";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const data = productsById[resolvedParams.id];
  const { addToCart } = useCart();
  const [flyingImages, setFlyingImages] = useState<FlyingImage[]>([]);
  const imageStageRef = useRef<HTMLDivElement | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Product not found.</p>
        <Link href="/" className="ml-4 text-[#0071e3] transition-opacity hover:opacity-80">Return Home</Link>
      </div>
    );
  }

  const handleAddToBag = () => {
    addToCart({ id: data.id, name: data.name, price: data.price, image: data.image });

    if (!imageStageRef.current) return;

    const rect = imageStageRef.current.getBoundingClientRect();
    const newFlying = buildCartFlight(data.image, rect, 102);
    setFlyingImages((prev) => [...prev, newFlying]);

    window.setTimeout(() => {
      setFlyingImages((prev) => prev.filter((item) => item.id !== newFlying.id));
    }, 2300);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white">
      <Navbar />

      <main className="px-5 pb-16 pt-24 md:px-8 md:pb-20 md:pt-28">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 md:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] md:gap-18">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              ref={imageStageRef}
              className="relative aspect-square w-full overflow-hidden rounded-[36px] border border-white/6 bg-[#0d0d0f]"
            >
              <Image
                src={data.image}
                alt={data.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-6 mix-blend-screen drop-shadow-2xl md:p-10"
                style={{ transform: `scale(${data.detailImageScale})` }}
              />
              {data.hideImageMark ? (
                <div className="absolute bottom-0 right-0 h-16 w-16 rounded-tl-[20px] bg-[#0d0d0f] md:h-20 md:w-20 md:rounded-tl-[24px]" />
              ) : null}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/store" className="eyebrow mb-5 inline-flex">
              Back To Collection
            </Link>
            <h1 className="mb-4 text-5xl font-semibold tracking-tighter md:text-7xl">
              {data.name}
            </h1>
            <p className="mb-7 text-xl text-white/52 md:text-2xl">{data.tagline}</p>
            <p className="mb-12 text-3xl font-medium md:text-4xl">
              ${data.price.toLocaleString()}
            </p>

            <div className="mb-14 space-y-4">
              <h3 className="mb-4 text-lg font-semibold">Highlights</h3>
              {data.specs.map((spec, i) => (
                <div key={i} className="border-t border-white/10 py-4 text-white/70">
                  {spec}
                </div>
              ))}
            </div>

            <button
              onClick={handleAddToBag}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0071e3] py-4 text-lg font-medium text-white shadow-lg shadow-blue-500/20 transition-opacity hover:opacity-80"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Add to Bag
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
      <FlyToCartOverlay flyingImages={flyingImages} />
    </div>
  );
}
