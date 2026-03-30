"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center ${
        scrolled ? "bg-black/40 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="w-full max-w-7xl px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex-1">
          <span className="text-xl font-medium tracking-widest uppercase text-white">
            AeroChron
          </span>
        </div>

        {/* Links - Hidden on mobile */}
        <nav className="flex-1 hidden md:flex items-center justify-center space-x-8 text-xs font-medium tracking-widest text-[#a1a1aa] uppercase">
          <a href="#overview" className="hover:text-white transition-colors duration-300">Overview</a>
          <a href="#craftsmanship" className="hover:text-white transition-colors duration-300">Craftsmanship</a>
          <a href="#movement" className="hover:text-white transition-colors duration-300">Movement</a>
          <a href="#materials" className="hover:text-white transition-colors duration-300">Materials</a>
        </nav>

        {/* CTA */}
        <div className="flex-1 flex justify-end">
          <button className="text-xs uppercase tracking-widest border border-white/20 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-500">
            Discover
          </button>
        </div>
      </div>
    </motion.header>
  );
}
