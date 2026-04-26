"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Architectural Digest", initials: "AD" },
  { name: "Elle Décor", initials: "ED" },
  { name: "Wallpaper", initials: "W*" },
  { name: "Dwell", initials: "DW" },
  { name: "Dezeen", initials: "DZ" },
  { name: "Monocle", initials: "MN" },
];

export function TrustedPartners() {
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
            Collaborations & Partnerships
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
            Trusted by the best
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            We partner with world-class brands and publications to bring you furniture 
            that meets the highest standards of design, quality, and sustainability.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col items-center justify-center gap-3 rounded-3xl border border-zinc-800/60 bg-zinc-900/50 px-6 py-10 backdrop-blur-sm transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-800/50"
            >
              {/* Logo placeholder as stylized initials */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800 text-xl font-black tracking-tight text-zinc-400 transition-colors duration-500 group-hover:bg-white group-hover:text-zinc-900">
                {partner.initials}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 transition-colors group-hover:text-zinc-300">
                {partner.name}
              </span>
            </motion.div>
          ))}
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
            { value: "150+", label: "Brand Partners" },
            { value: "24", label: "Countries Served" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "12K+", label: "Projects Delivered" },
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
