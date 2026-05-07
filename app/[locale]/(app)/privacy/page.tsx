"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Last updated: January 2026
        </p>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">1. Information We Collect</h2>
            <p>
              At Suradiq, we collect personal information that you provide to us directly, such as when you create an account, place an order, or contact customer support. This includes your name, email address, shipping address, and payment information (processed securely through Stripe).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use your personal information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfill your bespoke furniture orders.</li>
              <li>Communicate with you regarding delivery times and material choices.</li>
              <li>Improve our website functionality and AI shopping experience.</li>
              <li>Send promotional emails (only if you have opted in).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">3. Data Sharing and Security</h2>
            <p>
              We do not sell your personal information. We share data only with trusted third parties essential to our operations, such as payment processors (Stripe) and shipping carriers. We employ industry-standard encryption and security measures to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">4. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data. You can manage your account information directly from your profile settings or by contacting our support team at legal@suradiq.com.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
