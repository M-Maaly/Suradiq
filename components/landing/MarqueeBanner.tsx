"use client";
 
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
 
export function MarqueeBanner() {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const words = ["bespoke", "minimal", "premium", "authentic", "timeless", "artisan"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      dir={dir}
      className="bg-black text-white py-6 overflow-hidden mb-20 dark:bg-[#eae8e3] dark:text-zinc-900 border-y border-zinc-800 dark:border-zinc-200"
    >
      <div className="flex w-fit whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-12 px-6 text-xl font-bold uppercase tracking-[0.25em] sm:text-3xl">
          {words.map((word, i) => (
            <div key={`set1-${i}`} className="flex items-center gap-12">
              <span>{word}</span>
              <span className="text-zinc-600 dark:text-zinc-400/60 text-sm">✦</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {words.map((word, i) => (
            <div key={`set2-${i}`} className="flex items-center gap-12">
              <span>{word}</span>
              <span className="text-zinc-600 dark:text-zinc-400/60 text-sm">✦</span>
            </div>
          ))}
          {/* Triplicate for extra safety on wide screens */}
          {words.map((word, i) => (
            <div key={`set3-${i}`} className="flex items-center gap-12">
              <span>{word}</span>
              <span className="text-zinc-600 dark:text-zinc-400/60 text-sm">✦</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
