"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/landing/ProductCard";
import { useRecentlyViewed } from "@/lib/hooks/use-ui-preferences";
import { useWishlistItems } from "@/lib/store/wishlist-store-provider";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";

interface PersonalizedHomeProps {
  products: FILTER_PRODUCTS_BY_NAME_QUERYResult;
}

export function PersonalizedHome({ products }: PersonalizedHomeProps) {
  const { recentlyViewedIds } = useRecentlyViewed();
  const wishlistItems = useWishlistItems();
  const wishlistIds = useMemo(() => wishlistItems.map(item => item.productId), [wishlistItems]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const recentlyViewedProducts = useMemo(
    () =>
      recentlyViewedIds
        .map((id) => products.find((product) => product._id === id))
        .filter((product): product is NonNullable<typeof product> => Boolean(product))
        .slice(0, 4),
    [products, recentlyViewedIds],
  );

  const wishlistProducts = useMemo(
    () =>
      wishlistIds
        .map((id) => products.find((product) => product._id === id))
        .filter((product): product is NonNullable<typeof product> => Boolean(product))
        .slice(0, 4),
    [products, wishlistIds],
  );

  if (recentlyViewedProducts.length === 0 && wishlistProducts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-16 py-8">
      {/* Greeting header */}
      <div className="flex items-end justify-between border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Personalized for you
          </p>
          <h2 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 md:text-5xl">
            {greeting}
          </h2>
        </div>
        <Link
          href="/"
          className="hidden sm:flex items-center gap-2 text-sm font-semibold text-zinc-900 underline underline-offset-4 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
        >
          Browse all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {recentlyViewedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Recently Viewed
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {recentlyViewedProducts.map((product) => (
              <ProductCard key={`recent-${product._id}`} product={product} />
            ))}
          </div>
        </motion.div>
      )}

      {wishlistProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            ❤ Saved in Wishlist
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={`wishlist-${product._id}`} product={product} />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
