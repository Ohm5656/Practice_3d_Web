"use client";

import Image from "next/image";
import Link from "next/link";
import { use } from "react";

const productDatabase: Record<string, any> = {
  stealth: {
    name: "AeroChron Stealth",
    price: "$14,999",
    tagline: "The darkness, redefined.",
    image: "/images/stealth.png",
    specs: ["Ceramic Bezel", "Grade 5 Titanium", "Matte Finish"],
  },
  classic: {
    name: "AeroChron Classic",
    price: "$12,499",
    tagline: "Precision engineered.",
    image: "/images/classic.png",
    specs: ["Polished Steel", "Sapphire Crystal", "Silver Dial"],
  },
  rosegold: {
    name: "AeroChron Rose Gold",
    price: "$18,999",
    tagline: "Uncompromising elegance.",
    image: "/images/rosegold.png",
    specs: ["18k Rose Gold", "Leather Strap", "Exhibition Back"],
  },
  cobalt: {
    name: "AeroChron Cobalt",
    price: "$13,499",
    tagline: "Make waves.",
    image: "/images/cobalt.png",
    specs: ["Deep Blue Dial", "Brushed Steel", "300m Water Resist"],
  },
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const data = productDatabase[resolvedParams.id];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Product not found.</p>
        <Link href="/" className="ml-4 text-[#0071e3] transition-opacity hover:opacity-80">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#000] text-white">
      {/* Store Navbar */}
      <header className="sticky top-0 z-50 flex h-[52px] items-center justify-between bg-[#1d1d1f]/95 backdrop-blur-md px-4 md:px-8 border-b border-white/10">
        <Link href="/" className="text-xl font-semibold tracking-wide">AeroChron</Link>
        <p className="text-sm font-medium">{data.name}</p>
        <button className="bg-[#0071e3] text-white text-xs px-3 py-1 rounded-full opacity-0 pointer-events-none">Placeholder</button>
      </header>

      <main className="flex-1 max-w-[1200px] mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative w-full aspect-square bg-[#111] rounded-[40px] p-8 md:p-12 transition-transform duration-500 hover:scale-[1.02] mix-blend-screen">
          <Image src={data.image} alt={data.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-8 md:p-12 drop-shadow-2xl" />
        </div>

        <div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-4">{data.name}</h1>
          <p className="text-2xl text-white/50 mb-8">{data.tagline}</p>
          <p className="text-3xl font-medium mb-12">{data.price}</p>
          
          <div className="space-y-4 mb-16">
            <h3 className="text-lg font-semibold mb-4">Highlights</h3>
            {data.specs.map((spec: string, i: number) => (
              <div key={i} className="py-4 border-t border-white/10 text-white/70">
                {spec}
              </div>
            ))}
          </div>

          <button className="w-full bg-[#0071e3] text-white py-4 rounded-xl text-lg font-medium transition-opacity hover:opacity-80 flex justify-center items-center gap-2 shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to Bag
          </button>
        </div>
      </main>
    </div>
  );
}
