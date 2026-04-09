"use client";

import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Effective Date: January 2026
        </p>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Suradiq (the "Site"), you agree to abide by these Terms of Service. If you do not agree with any part of these terms, please refrain from using our e-commerce platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">2. Products and Pricing</h2>
            <p>
              We strive to ensure all product descriptions, materials, and pricing are exact. However, due to the bespoke nature of our premium furniture, minor variations in wood grain, leather texture, and dimensions may occur. All prices are listed in GBP and are subject to change without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">3. Custom Orders</h2>
            <p>
              Custom-made or personalized furniture orders cannot be canceled once production has begun. We will notify you when production starts to allow a brief window for final adjustments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">4. Limitation of Liability</h2>
            <p>
              Suradiq shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our products or the inability to access our services.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
