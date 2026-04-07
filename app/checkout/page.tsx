"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";

const steps = ["Cart", "Shipping", "Payment"];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { items, totalPrice, totalItems, removeFromCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <main className="relative min-h-screen w-full bg-[#0d0d0f] text-white selection:bg-[#d4af37] selection:text-black pt-24">
      <Navbar />

      <div className="mx-auto max-w-[1000px] px-6 py-12">
        {/* Progress Bar */}
        <div className="mb-12 relative w-full">
          <div className="flex justify-between mb-2">
            {steps.map((step, idx) => (
              <span
                key={step}
                className={`text-sm font-medium transition-colors ${
                  idx <= currentStep ? "text-[#d4af37]" : "text-white/40"
                }`}
              >
                {idx + 1}. {step}
              </span>
            ))}
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#d4af37]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-semibold mb-6">Review Your Cart</h2>
                  {items.length === 0 ? (
                    <div className="py-12 text-center text-white/60">
                      Your cart is empty. <br />
                      <Link href="/store" className="text-[#d4af37] hover:underline mt-4 inline-block">
                        Continue Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#111] rounded-2xl border border-white/5">
                          <div className="flex items-center gap-6">
                            <div className="relative w-24 h-24 bg-black rounded-xl overflow-hidden mix-blend-screen">
                              <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium">{item.name}</h3>
                              <p className="text-[#d4af37]">${item.price.toLocaleString()}</p>
                              <p className="text-sm text-white/50">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/40 hover:text-red-500 mt-4 sm:mt-0 transition-colors p-2"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-semibold mb-6">Shipping Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-white/60">First Name</label>
                      <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/60">Last Name</label>
                      <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors" placeholder="Doe" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm text-white/60">Address</label>
                      <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors" placeholder="123 Luxury Ave" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/60">City</label>
                      <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/60">Postal Code</label>
                      <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors" placeholder="10001" />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-semibold mb-6">Payment</h2>
                  
                  <div className="space-y-4 mb-8">
                    <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'credit' ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-white/10 bg-[#111] hover:border-white/30'}`}>
                      <input type="radio" name="payment" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} className="accent-[#d4af37] w-4 h-4" />
                      <span className="font-medium">Credit Card</span>
                    </label>
                    <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-white/10 bg-[#111] hover:border-white/30'}`}>
                      <input type="radio" name="payment" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="accent-[#d4af37] w-4 h-4" />
                      <span className="font-medium">PayPal</span>
                    </label>
                    <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'crypto' ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-white/10 bg-[#111] hover:border-white/30'}`}>
                      <input type="radio" name="payment" checked={paymentMethod === 'crypto'} onChange={() => setPaymentMethod('crypto')} className="accent-[#d4af37] w-4 h-4" />
                      <span className="font-medium">Cryptocurrency</span>
                    </label>
                  </div>

                  {paymentMethod === 'credit' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <label className="text-sm text-white/60">Card Number</label>
                        <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors" placeholder="**** **** **** ****" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-white/60">Expiry (MM/YY)</label>
                        <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-white/60">CVC</label>
                        <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors" placeholder="***" />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 flex gap-4 pt-6 border-t border-white/10">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
                >
                  Back
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  disabled={items.length === 0}
                  className="px-6 py-3 rounded-full bg-[#d4af37] text-black font-semibold hover:bg-[#c9a32c] transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={() => alert('Order Placed Successfully!')}
                  className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors ml-auto shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  Complete Purchase
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#111] p-6 rounded-2xl border border-white/5 sticky top-32">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Taxes</span>
                  <span>Calculated at next step</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-white/10 mb-8">
                <span className="font-medium text-lg">Total</span>
                <span className="text-2xl font-bold text-[#d4af37]">${totalPrice.toLocaleString()}</span>
              </div>
              
              <div className="text-xs text-white/40 text-center flex flex-col gap-2">
                <span>Secure SSL checkout</span>
                <span>Includes a 5-year AeroChron warranty.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
