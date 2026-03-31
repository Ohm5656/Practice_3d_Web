import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import "lenis/dist/lenis.css";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AeroChron | Time, Engineered.",
  description: "A modern luxury watch experience shaped by engineering, balance, and refinement.",
  keywords: ["luxury watch", "3D product", "horology", "premium microsite"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[var(--color-background)] text-[var(--color-foreground)] selection:bg-[var(--color-accent)]/30 selection:text-white">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
