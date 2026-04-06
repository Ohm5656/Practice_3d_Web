"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Navbar() {
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
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-white px-4 py-1.5 text-[12px] font-medium text-black transition-opacity hover:opacity-80"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
