"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/landing/ProductCard";
import { useRecentlyViewed } from "@/lib/hooks/use-ui-preferences";
import { useWishlistItems } from "@/lib/store/wishlist-store-provider";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";
import { useTranslations, useLocale } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface PersonalizedHomeProps {
  products: FILTER_PRODUCTS_BY_NAME_QUERYResult;
}

export function PersonalizedHome({ products }: PersonalizedHomeProps) {
  const t = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";

  const { recentlyViewedIds } = useRecentlyViewed();
  const rawWishlistItems = useWishlistItems();
  
  const [recentApi, setRecentApi] = useState<CarouselApi>();
  const [recentProgress, setRecentProgress] = useState(0);
  const [wishlistApi, setWishlistApi] = useState<CarouselApi>();
  const [wishlistProgress, setWishlistProgress] = useState(0);

  useEffect(() => {
    if (!recentApi) return;
    const onScroll = () => setRecentProgress(Math.max(0, Math.min(1, recentApi.scrollProgress())) * 100);
    recentApi.on("scroll", onScroll);
    onScroll();
    return () => { recentApi.off("scroll", onScroll); };
  }, [recentApi]);

  useEffect(() => {
    if (!wishlistApi) return;
    const onScroll = () => setWishlistProgress(Math.max(0, Math.min(1, wishlistApi.scrollProgress())) * 100);
    wishlistApi.on("scroll", onScroll);
    onScroll();
    return () => { wishlistApi.off("scroll", onScroll); };
  }, [wishlistApi]);

  const wishlistItems = useMemo(() => Array.isArray(rawWishlistItems) ? rawWishlistItems : [], [rawWishlistItems]);
  const wishlistIds = useMemo(() => wishlistItems.map(item => item?.productId).filter(Boolean), [wishlistItems]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const recentlyViewedProducts = useMemo(
    () => {
      if (!Array.isArray(products) || !Array.isArray(recentlyViewedIds)) return [];
      return recentlyViewedIds
        .map((id) => products.find((product) => product?._id === id))
        .filter((product): product is NonNullable<typeof product> => Boolean(product))
        .slice(0, 8);
    },
    [products, recentlyViewedIds],
  );

  const wishlistProducts = useMemo(
    () => {
      if (!Array.isArray(products) || !Array.isArray(wishlistIds)) return [];
      return wishlistIds
        .map((id) => products.find((product) => product?._id === id))
        .filter((product): product is NonNullable<typeof product> => Boolean(product))
        .slice(0, 8);
    },
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
          href="/shop"
          className="flex items-center gap-2 text-sm font-semibold text-zinc-900 underline underline-offset-4 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
        >
          Browse all <ArrowRight className="h-4 w-4 rtl:rotate-180" />
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
          
          <div className="relative group">
            <Carousel setApi={setRecentApi} dir={dir} opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ms-4">
                {recentlyViewedProducts.map((product) => (
                  <CarouselItem key={`recent-${product._id}`} className="ps-4 basis-[70%] sm:basis-[45%] lg:basis-[25%]">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            {/* Progress Bar */}
            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 lg:hidden">
              <motion.div 
                className="h-full bg-zinc-900 dark:bg-zinc-100"
                style={{ width: `${recentProgress}%`, transformOrigin: isRtl ? "right" : "left" }}
                animate={{ width: `${recentProgress}%` }}
              />
            </div>
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
          
          <div className="relative group">
            <Carousel setApi={setWishlistApi} dir={dir} opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ms-4">
                {wishlistProducts.map((product) => (
                  <CarouselItem key={`wishlist-${product._id}`} className="ps-4 basis-[70%] sm:basis-[45%] lg:basis-[25%]">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Progress Bar */}
            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 lg:hidden">
              <motion.div 
                className="h-full bg-zinc-900 dark:bg-zinc-100"
                style={{ width: `${wishlistProgress}%`, transformOrigin: isRtl ? "right" : "left" }}
                animate={{ width: `${wishlistProgress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
