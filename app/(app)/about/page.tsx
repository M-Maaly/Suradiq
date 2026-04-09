"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100">
              Our Story
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Suradiq was born from a desire to return to the roots of true craftsmanship. In an era of mass-produced, fast-furniture, we chose a different path—one that honors the material, respects the maker, and ultimately elevates the home.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              We focus on modern minimalism, believing that a piece of furniture should not overwhelm a space, but rather anchor it. Every table, sofa, and chair we produce is bespoke, carved by experienced hands using only the most premium, sustainably sourced woods, metals, and leathers.
            </p>
            
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
              <div>
                <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100">100%</h3>
                <p className="mt-2 text-sm font-medium text-zinc-500 uppercase tracking-widest">Bespoke</p>
              </div>
              <div>
                <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100">0</h3>
                <p className="mt-2 text-sm font-medium text-zinc-500 uppercase tracking-widest">Compromise</p>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900">
            {/* Visual placeholder. In a real app, inject a beautiful workshop image here from Sanity */}
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-zinc-400">
              <span className="text-sm font-medium uppercase tracking-widest">[Craftsmanship Image PlaceHolder]</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
