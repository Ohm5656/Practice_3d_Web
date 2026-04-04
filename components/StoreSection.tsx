"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "stealth",
    name: "AeroChron Stealth",
    description: "The ultimate iteration of mechanical darkness.",
    image: "/images/stealth.png",
  },
  {
    id: "classic",
    name: "AeroChron Classic",
    description: "Polished steel precision. A timeless choice.",
    image: "/images/classic.png",
  },
  {
    id: "rosegold",
    name: "AeroChron Rose Gold",
    description: "Warm elegance meets high-end horology.",
    image: "/images/rosegold.png",
  },
  {
    id: "cobalt",
    name: "AeroChron Cobalt",
    description: "Deep sapphire blue dial for the adventurous.",
    image: "/images/cobalt.png",
  },
];

export function StoreSection() {
  return (
    <section id="shop" className="relative z-20 px-4 py-20 md:px-8 bg-black">
      <div className="section-frame text-white text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mx-auto">
          Which AeroChron is right for you?
        </h2>
      </div>

      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-[#111] rounded-[32px] overflow-hidden flex flex-col items-center text-center p-12 group transition-colors hover:bg-[#1a1a1a]"
          >
            <div className="relative w-full aspect-[4/3] mb-8 mix-blend-screen">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
            <h3 className="text-3xl font-semibold text-white tracking-tight">{product.name}</h3>
            <p className="mt-4 text-white/60 text-lg">{product.description}</p>
            <div className="mt-8 flex gap-4">
              <Link
                href={`/store/${product.id}`}
                className="bg-[#0071e3] text-white px-6 py-2 rounded-full font-medium transition-opacity hover:opacity-80"
              >
                Learn More
              </Link>
              <Link
                href={`/store/${product.id}`}
                className="border border-[#0071e3] text-[#0071e3] px-6 py-2 rounded-full font-medium transition-colors hover:bg-[#0071e3] hover:text-white"
              >
                Buy
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
