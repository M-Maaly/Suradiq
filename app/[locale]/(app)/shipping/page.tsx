"use client";

import { motion } from "framer-motion";

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100">
          Shipping Policy
        </h1>
        <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          How we deliver luxury to your door.
        </p>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">White-Glove Delivery</h2>
            <p>
              To ensure the pristine condition of your bespoke furniture, Suradiq utilizes a premium white-glove delivery service. Our dedicated transport teams will not only deliver the items to your home but will also unbox, assemble, and place the furniture precisely where you want it. All debris and packaging will be removed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Shipping Zones & Fees</h2>
            <p className="mb-4">We currently offer domestic shipping within the UK and select international routes.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Domestic (UK):</strong> Calculated at checkout based on volume and distance. Free shipping may apply on orders over £5000.</li>
              <li><strong>International:</strong> Available upon request. Please contact our support team to arrange international freight routing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Lead Times</h2>
            <p>
              Because many of our pieces are crafted to order, please allow <strong>4-8 weeks</strong> for production and testing. Once dispatched, domestic delivery typically takes 3-7 business days. You will receive tracking information once your order is handed over to our logistics partner.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
