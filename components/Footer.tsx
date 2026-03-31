"use client";

export function Footer() {
  return (
    <footer id="footer" className="relative px-4 pb-10 pt-24 md:px-8">
      <div className="section-frame">
        <div className="glass-panel rounded-[32px] px-6 py-10 md:px-10 md:py-12">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div className="max-w-md">
              <p className="eyebrow mb-4">AeroChron Atelier</p>
              <h2 className="headline-display text-5xl text-white md:text-6xl">
                Quiet luxury. Mechanical conviction.
              </h2>
            </div>

            <div>
              <p className="eyebrow mb-4">Explore</p>
              <div className="space-y-3 text-sm text-white/72">
                <a href="#overview" className="block transition-colors hover:text-white">Overview</a>
                <a href="#craftsmanship" className="block transition-colors hover:text-white">Craftsmanship</a>
                <a href="#materials" className="block transition-colors hover:text-white">Materials</a>
                <a href="#reserve" className="block transition-colors hover:text-white">Reserve</a>
              </div>
            </div>

            <div>
              <p className="eyebrow mb-4">Concierge</p>
              <div className="space-y-3 text-sm text-white/72">
                <a
                  href="mailto:concierge@aerochron.com?subject=Private%20Allocation%20Inquiry"
                  className="block transition-colors hover:text-white"
                >
                  concierge@aerochron.com
                </a>
                <a href="#reserve" className="block transition-colors hover:text-white">Private Allocation</a>
                <a href="#overview" className="block transition-colors hover:text-white">Back to Hero</a>
              </div>
            </div>
          </div>

          <div className="fine-divider my-8" />

          <div className="flex flex-col gap-4 text-[0.72rem] uppercase tracking-[0.3em] text-white/42 md:flex-row md:items-center md:justify-between">
            <p>&copy; {new Date().getFullYear()} AeroChron Horology</p>
            <p>Luxury microsite experience</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
