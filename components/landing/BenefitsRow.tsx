"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, TreePine, Sparkles } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function BenefitsRow() {
  const t = useTranslations("Benefits");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const benefits = [
    {
      title: t("whiteGlove.title"),
      description: t("whiteGlove.desc"),
      icon: Truck,
    },
    {
      title: t("warranty.title"),
      description: t("warranty.desc"),
      icon: ShieldCheck,
    },
    {
      title: t("sustainable.title"),
      description: t("sustainable.desc"),
      icon: TreePine,
    },
    {
      title: t("bespoke.title"),
      description: t("bespoke.desc"),
      icon: Sparkles,
    },
  ];

  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-900 relative mt-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden">
          <Carousel
            dir={dir}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ms-4">
              {benefits.map((benefit, index) => (
                <CarouselItem key={index} className="ps-4 basis-[80%] sm:basis-[45%]">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-start flex flex-col items-start group h-full bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-50 shadow-sm ring-1 ring-zinc-200 transition-all group-hover:scale-110 group-hover:shadow-md dark:bg-zinc-800 dark:ring-zinc-700">
                      <benefit.icon className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {benefit.description}
                    </p>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           className="hidden lg:grid lg:grid-cols-4 gap-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants} className="text-center sm:text-start flex flex-col items-center sm:items-start group">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all group-hover:scale-110 group-hover:shadow-md dark:bg-zinc-900 dark:ring-zinc-800">
                <benefit.icon className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
