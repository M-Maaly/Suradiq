"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function FAQContent() {
  const t = useTranslations("FAQ");
  
  const faqs = [
    { question: t("q1.q"), answer: t("q1.a") },
    { question: t("q2.q"), answer: t("q2.a") },
    { question: t("q3.q"), answer: t("q3.a") },
    { question: t("q4.q"), answer: t("q4.a") },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100 text-center mb-16">
          {t("title")}
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
