"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/landing/ProductCard";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";

interface BestSellersProps {
  products: FILTER_PRODUCTS_BY_NAME_QUERYResult;
}

export function BestSellers({ products }: BestSellersProps) {
  // Grab the first 4 products to act as 'Best Sellers'
  const bestSellers = products.slice(0, 4);

  if (bestSellers.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mb-12 flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-5xl dark:text-zinc-100">
            Best Sellers
          </h2>
          <p className="mt-2 font-medium text-zinc-500 dark:text-zinc-400">
            Our most loved pieces, trusted by hundreds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {bestSellers.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
             {/* Pass minimal data required by ProductCard */}
            <ProductCard 
              product={{
                _id: product._id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                stock: product.stock,
                images: product.images,
                category: product.category,
                material: product.material,
                color: product.color
              } as any} 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
