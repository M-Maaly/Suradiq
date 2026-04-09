"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship globally on a case-by-case basis. Because of the size and weight of our furniture, international freight is calculated manually. Please reach out to our concierge for a quote."
  },
  {
    question: "Can I customize the dimensions of a table?",
    answer: "Absolutely. We are a bespoke furniture manufacturer. While our catalog offers standard sizes that fit most rooms, we can adjust dimensions. Contact us directly to begin a bespoke commission."
  },
  {
    question: "How long does production take?",
    answer: "Our standard lead time is 4-8 weeks. Every piece is hand-finished and inspected rigorously to ensure it meets the Suradiq standard before it leaves our workshop."
  },
  {
    question: "How should I care for my solid oak furniture?",
    answer: "We recommend avoiding direct, intense sunlight and extreme humidity changes. Clean spills immediately with a damp cloth, and use a premium beeswax polish every six months to keep the wood nourished."
  }
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100 text-center mb-16">
          Frequently Asked Questions
        </h1>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800 bg-white dark:bg-zinc-950"
            >
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {faq.question}
              </h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
