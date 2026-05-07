"use client";

import { motion } from "framer-motion";

export default function ReturnsPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100">
          Returns & Refunds
        </h1>
        <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Our commitment to your satisfaction.
        </p>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Standard Return Policy</h2>
            <p>
              At Suradiq, we want you to love your furniture. If you are not entirely satisfied with your standard, non-customized purchase, you may initiate a return within <strong>14 days of delivery</strong>. The item must be in its original condition, unused, and in the original packaging.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Bespoke & Custom Items</h2>
            <p>
              Because our bespoke items are crafted specifically to your material choices and dimensions, <strong>we cannot accept returns or exchanges on custom-made furniture</strong> unless the item arrives damaged or materially defective.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Return Shipping Fees</h2>
            <p>
              Due to the size and weight of premium furniture, the customer is responsible for return shipping costs unless the return is due to a defect or error on our part. Return shipping fees will be deducted from your final refund amount.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">How to Initiate a Return</h2>
            <p>
              To start a return, please contact our support team at <strong>returns@suradiq.com</strong> with your order number and photos of the item. We will arrange a pickup with our specialty freight carriers.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
