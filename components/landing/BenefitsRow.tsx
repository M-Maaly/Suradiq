"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, TreePine, Sparkles } from "lucide-react";

const benefits = [
  {
    title: "White-Glove Delivery",
    description: "Fully assembled and placed in your home by our premium delivery team.",
    icon: Truck,
  },
  {
    title: "10-Year Warranty",
    description: "Built to last generations. We back our craftsmanship with a decade-long guarantee.",
    icon: ShieldCheck,
  },
  {
    title: "Sustainable Woods",
    description: "Responsibly sourced oak and walnut from certified sustainable forests.",
    icon: TreePine,
  },
  {
    title: "Bespoke Details",
    description: "Every piece is uniquely finished, with variations that tell a story of true craftsmanship.",
    icon: Sparkles,
  },
];

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
  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-900 relative mt-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants} className="text-center sm:text-left flex flex-col items-center sm:items-start group">
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
