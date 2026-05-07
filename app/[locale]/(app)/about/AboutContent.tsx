"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import craftsmanshipImg from "@/public/craftsmanship.png";
import { useTranslations } from "next-intl";

export default function AboutContent() {
  const t = useTranslations("About");
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
              {t("title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("p1")}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("p2")}
            </p>
            
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
              <div>
                <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100">100%</h3>
                <p className="mt-2 text-sm font-medium text-zinc-500 uppercase tracking-widest">{t("bespoke")}</p>
              </div>
              <div>
                <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100">0</h3>
                <p className="mt-2 text-sm font-medium text-zinc-500 uppercase tracking-widest">{t("compromise")}</p>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900">
            <Image 
              src={craftsmanshipImg}
              alt="Our craftsmanship"
              fill
              className="object-cover"
              placeholder="blur"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
