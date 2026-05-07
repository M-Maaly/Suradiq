"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const partners = [
  { name: "Vogue Living", initials: "VL", logo: "/logos/vogue-living.svg" },
  { name: "Elle Décor", initials: "ED", logo: "/logos/elle-decor.svg" },
  { name: "Kinfolk", initials: "KF", logo: "/logos/kinfolk.svg" },
  { name: "Dwell", initials: "DW", logo: "/logos/dwell.svg" },
  { name: "Dezeen", initials: "DZ", logo: "/logos/dezeen.svg" },
  { name: "Monocle", initials: "MN", logo: "/logos/monocle.svg" },
];

export function TrustedPartners() {
  const t = useTranslations("TrustedPartners");
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 dark:bg-black">
      {/* Subtle grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
            {t("subtitle")}
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            {t("description")}
          </p>
        </motion.div>

        {/* Hyper-Minimalist Line Banner */}
        <div className="mt-16 sm:mt-24 w-full border-y border-zinc-800/60 py-12 sm:py-20">
          <div className="flex flex-wrap items-center justify-center gap-12 sm:justify-between sm:gap-6 md:gap-8 lg:gap-10">
            {partners.map((partner, index) => (
              <motion.div 
                key={partner.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                className="flex items-center justify-center grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              >
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={180}
                    height={60}
                    className="h-7 sm:h-9 md:h-11 w-auto object-contain invert saturate-0"
                  />
                ) : (
                  <span className="text-base sm:text-lg md:text-2xl font-black uppercase tracking-[0.2em] text-zinc-100">
                    {partner.name}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {[
            { value: "150+", label: t("brandPartners") },
            { value: "24", label: t("countriesServed") },
            { value: "98%", label: t("clientSatisfaction") },
            { value: "12K+", label: t("projectsDelivered") },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-2xl border border-zinc-800/40 bg-zinc-900/30 py-8 text-center"
            >
              <span className="text-3xl font-black tracking-tight text-white md:text-4xl">
                {stat.value}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

