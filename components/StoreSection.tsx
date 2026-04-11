"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useState, useRef } from "react";
import { FlyToCartOverlay } from "@/components/FlyToCartOverlay";
import { buildCartFlight, type FlyingImage } from "@/lib/cartFlight";
import { products, type Product } from "@/lib/products";

interface StoreSectionProps {
  limit?: number;
  showMoreButton?: boolean;
}

export function StoreSection({ limit, showMoreButton = false }: StoreSectionProps) {
  const { addToCart } = useCart();
  const [flyingImages, setFlyingImages] = useState<FlyingImage[]>([]);
  const imageStageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const displayedProducts = limit ? products.slice(0, limit) : products;

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault();
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });

    const targetEl = imageStageRefs.current[product.id];
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const newFlying = buildCartFlight(product.image, rect, 92);
      setFlyingImages((prev) => [...prev, newFlying]);
      
      setTimeout(() => {
        setFlyingImages((prev) => prev.filter(item => item.id !== newFlying.id));
      }, 2300);
    }
  };

  return (
    <section id="shop" className="relative z-20 bg-[#0d0d0f] px-4 py-20 md:px-8">
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
            className="flex flex-col items-center overflow-hidden rounded-[32px] border border-white/8 bg-[#111214] p-8 text-center group transition-colors hover:bg-[#151619]"
          >
            <div className="mb-6 flex w-full aspect-square items-center justify-center p-2">
              <div
                ref={(el) => { imageStageRefs.current[product.id] = el; }}
                className="relative h-full w-full overflow-hidden rounded-[26px] bg-[#0d0d0f]"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain mix-blend-screen transition-transform duration-500"
                  style={{ transform: `scale(${product.cardImageScale})` }}
                />
                {product.hideImageMark && (
                  <div className="absolute bottom-0 right-0 h-11 w-11 rounded-tl-[14px] bg-[#0d0d0f]" />
                )}
              </div>
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
                Add to Bag
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

      <FlyToCartOverlay flyingImages={flyingImages} />
    </section>
  );
}
