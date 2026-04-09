"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface SeasonalSaleProps {
  product?: any;
}

export function SeasonalSale({ product }: SeasonalSaleProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 14, minutes: 30, seconds: 0 });

  // Simple visual countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-20 lg:px-20 dark:bg-zinc-900 border border-zinc-800"
      >
        {/* Abstract Background Elements */}
        <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-zinc-800/50 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-zinc-800/80 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center lg:flex-row lg:justify-between gap-12">
          {/* Text Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-300 backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Limited Time Offer
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white md:text-6xl lg:text-7xl">
              Winter Sale
              <span className="block text-zinc-500">Up to 40% Off</span>
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              Elevate your living space with our premium bespoke collection. Rare woods, exceptional craftsmanship, now available at our lowest prices of the season.
            </p>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 inline-block"
            >
              <Link
                href="/shop?sort=price_asc"
                className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-900 transition-all hover:bg-zinc-200"
              >
                Shop the Sale
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Featured Product & Timer */}
          <div className="flex flex-col items-center lg:items-end gap-6 shrink-0 z-20">
            
            {/* Product Image & Details */}
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
              {product?.image?.asset?.url && (
                <div className="relative h-48 w-48 sm:h-64 sm:w-64 mb-6 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 p-4">
                  <Image
                    src={product.image.asset.url}
                    alt={product.name || "Featured Sale Product"}
                    fill
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <span className="mb-2 text-sm font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                Flash Deal Of The Day
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white max-w-[300px]">
                {product?.name || "Executive Ergonomic Office Chair"}
              </h3>
              <div className="mt-2 flex items-center justify-center lg:justify-end gap-3">
                <span className="text-xl font-medium text-zinc-500 line-through decoration-red-500/50 decoration-2">
                  £{product ? (product.price * 1.6).toFixed(2) : "899.00"}
                </span>
                <span className="text-3xl font-bold text-white">
                  £{product ? product.price.toFixed(2) : "539.40"}
                </span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex gap-4 sm:gap-6 backdrop-blur-md bg-white/5 rounded-3xl p-6 lg:p-8 border border-white/10 shadow-2xl">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((unit, index) => (
                <div key={unit.label} className="flex flex-col items-center">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-700 shadow-inner">
                    <span className="text-2xl sm:text-4xl font-black text-white tabular-nums">
                      {unit.value.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="mt-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
