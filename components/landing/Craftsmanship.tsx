"use client";

import { motion } from "framer-motion";
import { Ruler, Leaf, Hand, Shield, Truck } from "lucide-react";
import Image from "next/image";
import craftsmanshipImg from "@/public/craftsmanship.png";
import { useTranslations } from "next-intl";

export function Craftsmanship() {
  const t = useTranslations("Craftsmanship");

  const craftSteps = [
    {
      icon: Hand,
      title: t("steps.handcrafted.title"),
      description: t("steps.handcrafted.desc"),
    },
    {
      icon: Leaf,
      title: t("steps.sustainable.title"),
      description: t("steps.sustainable.desc"),
    },
    {
      icon: Truck,
      title: t("steps.delivery.title"),
      description: t("steps.delivery.desc"),
    },
    {
      icon: Shield,
      title: t("steps.built.title"),
      description: t("steps.built.desc"),
    },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Split background */}
      <div className="absolute inset-0">
        <div className="h-1/2 bg-white dark:bg-zinc-950" />
        <div className="h-1/2 bg-[#EAE8E3] dark:bg-zinc-900" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400">
            {t("subtitle")}
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100">
            {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("description")}
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border border-zinc-200/60 bg-white shadow-2xl dark:border-zinc-800/60 dark:bg-zinc-900"
        >
          <div className="grid lg:grid-cols-2">
            {/* Left: Philosophy Text */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <div className="mb-12">
                <p className="max-w-xl text-2xl font-medium leading-tight text-zinc-700 sm:text-4xl dark:text-zinc-200">
                  &ldquo;{t("quote")}
                  <br />
                  <span className="font-black text-zinc-900 dark:text-white">
                    {t("quoteHighlight")}
                  </span>
                  &rdquo;
                </p>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  — {t("philosophy")}
                </p>
              </div>

              {/* Stats within the left panel */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                {[
                  { value: "100%", label: t("handmade") },
                  { value: "10yr", label: t("warranty") },
                  { value: "Zero", label: t("waste") },
                  { value: "48hr", label: t("check") },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Featured Image */}
            <div className="relative min-h-[400px] lg:min-h-full overflow-hidden">
              <Image
                src={craftsmanshipImg}
                alt={t("title")}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </div>

          {/* Bottom: Craft Steps Grid */}
          <div className="bg-[#FAF9F7] p-8 sm:p-12 lg:p-16 dark:bg-zinc-800/20">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {craftSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="group flex flex-col items-start gap-4 rounded-3xl border border-white/50 bg-white p-8 transition-all duration-500 hover:shadow-xl dark:border-zinc-800/50 dark:bg-zinc-900/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 transition-all duration-500 group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                    <step.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 text-left">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


