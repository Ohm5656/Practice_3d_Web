"use client";

import { motion } from "framer-motion";

export function Navbar() {
  const links = [
    { href: "#overview", label: "Overview" },
    { href: "#craftsmanship", label: "Architecture" },
    { href: "#materials", label: "Materials" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-x-0 top-0 z-[999] flex h-[60px] items-center justify-center bg-[#000000cc] px-6 text-[14px] font-normal backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-[1020px] items-center justify-between px-2">
        <a href="#overview" className="flex items-center text-[#f5f5f7]/80 transition-colors duration-300 hover:text-white">
          <span className="text-lg font-semibold tracking-wide text-white">AeroChron</span>
        </a>
        <nav className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#f5f5f7]/80 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="#reserve"
            className="rounded-full bg-white px-4 py-1.5 text-[12px] font-medium text-black transition-opacity hover:opacity-80"
          >
            Reserve
          </a>
        </div>
      </div>
    </motion.header>
  );
}
