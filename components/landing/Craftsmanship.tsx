"use client";

import { motion } from "framer-motion";
import { Ruler, Leaf, Hand, Shield } from "lucide-react";

const craftSteps = [
  {
    icon: Hand,
    title: "Handcrafted with care",
    description:
      "Every piece is meticulously assembled by skilled artisans who bring decades of expertise to their craft.",
  },
  {
    icon: Leaf,
    title: "Sustainably sourced",
    description:
      "We partner with certified suppliers to use only FSC-approved wood, organic fabrics, and eco-friendly finishes.",
  },
  {
    icon: Ruler,
    title: "Precision engineered",
    description:
      "From joint to finish, every millimetre is measured with exacting standards to ensure a lifetime of use.",
  },
  {
    icon: Shield,
    title: "Built to last",
    description:
      "Our furniture undergoes rigorous stress testing, ensuring each piece withstands the demands of daily life — beautifully.",
  },
];

export function Craftsmanship() {
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
            The Art Behind Every Piece
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100">
            Our Craftsmanship
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            We believe furniture should be an investment — in your home, in your well-being,
            and in the planet. Every Suradiq piece is a fusion of traditional artistry and modern innovation.
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="rounded-[2.5rem] border border-zinc-200/60 bg-white p-8 shadow-2xl sm:p-12 lg:p-16 dark:border-zinc-800/60 dark:bg-zinc-900"
        >
          {/* Big quote */}
          <div className="mb-16 text-center">
            <p className="mx-auto max-w-3xl text-2xl font-medium leading-relaxed text-zinc-700 sm:text-3xl lg:text-4xl lg:leading-snug dark:text-zinc-200">
              &ldquo;We don&apos;t just make furniture.
              <br />
              <span className="font-black text-zinc-900 dark:text-white">
                We craft heirlooms.
              </span>
              &rdquo;
            </p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
              — Suradiq Design Philosophy
            </p>
          </div>

          {/* Craft Steps Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {craftSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="group flex flex-col items-center gap-4 rounded-3xl border border-zinc-100 bg-[#FAF9F7] p-8 text-center transition-all duration-500 hover:border-zinc-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 transition-all duration-500 group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-700 dark:text-zinc-300 dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                  <step.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Stats Bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-8 rounded-2xl bg-zinc-50 px-8 py-6 sm:flex-row dark:bg-zinc-800/50">
            {[
              { value: "100%", label: "Handmade" },
              { value: "10yr", label: "Warranty" },
              { value: "Zero", label: "Waste Goal" },
              { value: "48hr", label: "Quality Check" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 text-center sm:text-left">
                <span className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
