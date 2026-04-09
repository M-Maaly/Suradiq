"use client";

import { motion } from "framer-motion";

export function MarqueeBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-black text-white py-5 overflow-hidden mb-20 dark:bg-zinc-100 dark:text-black transition-colors duration-400"
    >
      <div className="animate-marquee flex gap-8 whitespace-nowrap text-xl font-bold uppercase tracking-[0.25em] sm:text-2xl">
        <span>bespoke</span>
        <span className="text-zinc-500 dark:text-zinc-400">✦</span>
        <span>minimal</span>
        <span className="text-zinc-500 dark:text-zinc-400">✦</span>
        <span>premium</span>
        <span className="text-zinc-500 dark:text-zinc-400">✦</span>
        <span>bespoke</span>
        <span className="text-zinc-500 dark:text-zinc-400">✦</span>
        <span>minimal</span>
        <span className="text-zinc-500 dark:text-zinc-400">✦</span>
        <span>premium</span>
        <span className="text-zinc-500 dark:text-zinc-400">✦</span>
        <span>bespoke</span>
        <span className="text-zinc-500 dark:text-zinc-400">✦</span>
        <span>minimal</span>
        <span className="text-zinc-500 dark:text-zinc-400">✦</span>
        <span>premium</span>
        <span className="text-zinc-500 dark:text-zinc-400">✦</span>
        <span>bespoke</span>
        <span className="text-zinc-500 dark:text-zinc-400">✦</span>
        <span>minimal</span>
        <span className="text-zinc-500 dark:text-zinc-400">✦</span>
        <span>premium</span>
        <span className="text-zinc-500 dark:text-zinc-400">✦</span>
      </div>
    </motion.div>
  );
}
