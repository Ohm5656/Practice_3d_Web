"use client";

export function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/5 pt-24 pb-12 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        {/* Brand */}
        <div className="text-left">
          <h2 className="text-2xl font-light tracking-widest uppercase text-white mb-6">
            AeroChron
          </h2>
          <p className="max-w-xs text-sm text-[#a1a1aa] leading-relaxed">
            Pioneering the modern luxury timepiece through uncompromised engineering and precise aesthetic balance.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-16 md:gap-24 text-sm font-medium tracking-widest text-[#a1a1aa] uppercase">
          <div className="flex flex-col gap-4">
            <span className="text-white mb-2">Explore</span>
            <a href="#" className="hover:text-white transition-colors duration-300">Collection</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Innovation</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Materials</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Atelier</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white mb-2">Client Care</span>
            <a href="#" className="hover:text-white transition-colors duration-300">Contact Us</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Boutiques</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Service Center</a>
            <a href="#" className="hover:text-white transition-colors duration-300">FAQ</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 flex flex-col md:flex-row justify-between items-center text-xs tracking-wider text-[#a1a1aa] uppercase border-t border-white/5 pt-8">
        <p>&copy; {new Date().getFullYear()} AeroChron Horology. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Legal</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
