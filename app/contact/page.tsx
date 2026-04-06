import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#0d0d0f] selection:bg-[#d4af37] selection:text-black pt-24">
      <Navbar />

      <section className="relative z-20 px-4 py-20 md:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6 text-white">
            Get in <span className="text-[#d4af37]">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Whether you wish to reserve a specific timepiece, request a private viewing, or have any inquiries, our dedicated concierge team is at your absolute disposal.
          </p>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl">
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-white/60 text-sm font-medium ml-2">Name</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="Your full name"
                  className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-white/60 text-sm font-medium ml-2">Email</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="Email address"
                  className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="inquiry" className="text-white/60 text-sm font-medium ml-2">Inquiry Type</label>
              <select 
                id="inquiry"
                className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors appearance-none"
              >
                <option value="reserve">Reserve a Timepiece</option>
                <option value="viewing">Private Viewing</option>
                <option value="support">Client Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-white/60 text-sm font-medium ml-2">Message</label>
              <textarea 
                id="message"
                rows={4}
                placeholder="How can we assist you?"
                className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4af37]/50 transition-colors resize-none"
              />
            </div>

            <button 
              type="button" 
              className="mt-6 text-black apple-btn-solid self-center w-full md:w-auto px-12"
            >
              Send Message
            </button>
          </form>

          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
            <div>
              <p className="text-[#d4af37] text-sm font-medium tracking-widest uppercase mb-2">Call Us</p>
              <p className="text-white/80 text-lg">+1 (800) 123-4567</p>
            </div>
            <div>
              <p className="text-[#d4af37] text-sm font-medium tracking-widest uppercase mb-2">Email Us</p>
              <p className="text-white/80 text-lg">concierge@aerochron.com</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
