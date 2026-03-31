"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { href: "#overview", label: "Overview" },
    { href: "#craftsmanship", label: "Craft" },
    { href: "#materials", label: "Materials" },
    { href: "#reserve", label: "Reserve" },
  ];

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
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
    >
      <div className="section-frame">
        <div
          className={`glass-panel flex flex-col gap-4 rounded-[28px] px-4 py-4 transition-all duration-500 md:flex-row md:items-center md:justify-between md:px-6 ${
            scrolled ? "border-[var(--color-border-strong)] bg-black/62" : "bg-black/34"
          }`}
        >
          <a href="#overview" className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full border border-white/12 bg-white/5" />
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.36em] text-white/52">AeroChron</p>
              <p className="headline-display text-2xl text-white">01</p>
            </div>
          </a>

          <nav className="hidden items-center justify-center gap-2 rounded-full border border-white/8 bg-white/4 p-1 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/60 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-between gap-3 md:justify-end">
            <p className="hidden text-[0.68rem] uppercase tracking-[0.34em] text-white/38 lg:block">
              Interactive timepiece study
            </p>
            <a href="#reserve" className="premium-button text-[0.68rem]">
              Private Reserve
            </a>
          </div>
        </div>

        <nav className="mt-3 flex items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-black/28 px-2 py-2 backdrop-blur md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full px-3 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-white/60 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
