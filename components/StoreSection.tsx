"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";

const products = [
  {
    id: "stealth",
    name: "AeroChron Stealth",
    description: "The ultimate iteration of mechanical darkness.",
    price: 3500,
    image: "/images/stealth.png",
  },
  {
    id: "classic",
    name: "AeroChron Classic",
    description: "Polished steel precision. A timeless choice.",
    price: 3200,
    image: "/images/classic.png",
  },
  {
    id: "rosegold",
    name: "AeroChron Rose Gold",
    description: "Warm elegance meets high-end horology.",
    price: 4500,
    image: "/images/rosegold.png",
  },
  {
    id: "cobalt",
    name: "AeroChron Cobalt",
    description: "Deep sapphire blue dial for the adventurous.",
    price: 3800,
    image: "/images/cobalt.png",
  },
  {
    id: "obsidian",
    name: "AeroChron Obsidian",
    description: "Forged in absolute perfection. Dark and mysterious.",
    price: 4100,
    image: "/images/stealth.png",
  },
  {
    id: "titanium",
    name: "AeroChron Titanium",
    description: "Ultra-lightweight strength. Crafted for the skies.",
    price: 4800,
    image: "/images/classic.png",
  },
  {
    id: "chronograph",
    name: "AeroChron Chronograph",
    description: "Precision timing with multiple subdials.",
    price: 5200,
    image: "/images/cobalt.png",
  },
  {
    id: "emerald",
    name: "AeroChron Emerald",
    description: "Striking green dial reflecting pure luxury.",
    price: 4300,
    image: "/images/rosegold.png",
  },
  {
    id: "lunar",
    name: "AeroChron Lunar",
    description: "Celestial complication with moon phase.",
    price: 5500,
    image: "/images/classic.png",
  },
  {
    id: "skeleton",
    name: "AeroChron Skeleton",
    description: "Exposed mechanics. A raw view of time.",
    price: 6000,
    image: "/images/stealth.png",
  },
  {
    id: "sapphire",
    name: "AeroChron Sapphire",
    description: "Intense blue aesthetics inspired by deep oceans.",
    price: 4600,
    image: "/images/cobalt.png",
  },
  {
    id: "diamond",
    name: "AeroChron Diamond",
    description: "Encrusted with premium VVS diamonds. Pure brilliance.",
    price: 8500,
    image: "/images/classic.png",
  },
];

type FlyingImage = {
  id: string;
  src: string;
  startX: number;
  startY: number;
};

interface StoreSectionProps {
  limit?: number;
  showMoreButton?: boolean;
}

export function StoreSection({ limit, showMoreButton = false }: StoreSectionProps) {
  const { addToCart } = useCart();
  const [flyingImages, setFlyingImages] = useState<FlyingImage[]>([]);
  const imageRefs = useRef<Record<string, HTMLImageElement | null>>({});

  const displayedProducts = limit ? products.slice(0, limit) : products;

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>, product: typeof products[0]) => {
    e.preventDefault();
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });

    const targetEl = imageRefs.current[product.id];
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const newFlying = {
        id: `${product.id}-${Date.now()}`,
        src: product.image,
        startX: rect.left + rect.width / 2 - 40,
        startY: rect.top + rect.height / 2 - 40,
      };
      setFlyingImages((prev) => [...prev, newFlying]);
      
      setTimeout(() => {
        setFlyingImages((prev) => prev.filter(item => item.id !== newFlying.id));
      }, 1000);
    }
  };

  return (
    <section id="shop" className="relative z-20 px-4 py-20 md:px-8 bg-black">
      <div className="section-frame text-white text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mx-auto">
          Which AeroChron is right for you?
        </h2>
      </div>

      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="bg-[#111] rounded-[32px] overflow-hidden flex flex-col items-center text-center p-8 group transition-colors hover:bg-[#1a1a1a]"
          >
            <div className="relative w-full aspect-[4/3] mb-6 mix-blend-screen">
              <Image
                ref={(el) => { imageRefs.current[product.id] = el; }}
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-semibold text-white tracking-tight">{product.name}</h3>
            <p className="mt-3 text-white/60 text-sm flex-1">{product.description}</p>
            <p className="mt-2 text-[#d4af37] font-semibold">${product.price.toLocaleString()}</p>
            <div className="mt-6 flex gap-3">
              <Link
                href={`/store/${product.id}`}
                className="bg-[#0071e3] text-white px-5 py-2 text-sm rounded-full font-medium transition-opacity hover:opacity-80"
              >
                Learn More
              </Link>
              <button
                onClick={(e) => handleBuy(e, product)}
                className="border border-[#0071e3] text-[#0071e3] px-5 py-2 text-sm rounded-full font-medium transition-colors hover:bg-[#0071e3] hover:text-white"
              >
                Buy
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {showMoreButton && (
        <div className="mt-16 flex justify-center">
          <Link
            href="/store"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-[#d4af37]/50 bg-[#d4af37]/5 px-8 py-3 text-[#d4af37] font-medium tracking-wide transition-all hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            More Options
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      {typeof window !== "undefined" &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[9999]">
            {flyingImages.map((img) => (
              <motion.img
                key={img.id}
                src={img.src}
                className="absolute w-20 h-20 object-contain z-[10000] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                initial={{
                  x: img.startX,
                  y: img.startY,
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x: window.innerWidth - 100,
                  y: 20,
                  scale: 0.1,
                  opacity: 0,
                  rotate: 720,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>,
          document.body
        )}
    </section>
  );
}
