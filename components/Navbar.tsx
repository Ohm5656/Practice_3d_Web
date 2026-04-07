"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export function Navbar() {
  const { totalItems } = useCart();
  const links = [
    { href: "/", label: "Home" },
    { href: "/store", label: "Collection" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-x-0 top-0 z-[999] flex h-[60px] items-center justify-center bg-[#000000cc] px-6 text-[14px] font-normal backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-[1020px] items-center justify-between px-2">
        <Link href="/" className="flex items-center text-[#f5f5f7]/80 transition-colors duration-300 hover:text-white">
          <span className="text-lg font-semibold tracking-wide text-white">AeroChron</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#f5f5f7]/80 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 relative">
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-br from-[#d4af37] to-[#aa8c2c] px-5 py-2 text-[13px] font-semibold text-[#111111] shadow-[0_4px_12px_rgba(212,175,55,0.2)] transition-transform hover:scale-105"
          >
            Contact Us
          </Link>
          
          <Link href="/checkout" className="group relative flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-white/10" id="cart-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#f5f5f7]">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 flex h-4 w-4 items-center justify-center rounded-full bg-[#d4af37] text-[10px] font-bold text-black border-[1.5px] border-black">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
