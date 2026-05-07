"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/landing/ProductCard";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";
import { useTranslations, useLocale } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface BestSellersProps {
  products: FILTER_PRODUCTS_BY_NAME_QUERYResult;
}

export function BestSellers({ products }: BestSellersProps) {
  const t = useTranslations("BestSellers");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";
  
  // Grab the first 8 products to have a good carousel
  const bestSellers = (products || []).slice(0, 8);

  const [api, setApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onScroll = () => {
      const scrollProgress = Math.max(0, Math.min(1, api.scrollProgress()));
      setProgress(scrollProgress * 100);
    };

    api.on("scroll", onScroll);
    onScroll();

    return () => {
      api.off("scroll", onScroll);
    };
  }, [api]);

  if (bestSellers.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col items-start gap-4 text-start md:flex-row md:justify-between">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-5xl dark:text-zinc-100">
            {t("title")}
          </h2>
          <p className="mt-2 font-medium text-zinc-500 dark:text-zinc-400">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="relative group">
        <Carousel
          setApi={setApi}
          dir={dir}
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ms-4">
            {bestSellers.map((product, index) => (
              <CarouselItem 
                key={product._id} 
                className="ps-4 basis-[85%] sm:basis-[45%] lg:basis-[33%] xl:basis-[25%]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Progress Bar for Mobile */}
        <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 lg:hidden">
          <motion.div 
            className="h-full bg-zinc-900 dark:bg-zinc-100"
            style={{ 
              width: `${progress}%`,
              transformOrigin: isRtl ? "right" : "left"
            }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
          />
        </div>
      </div>
    </section>
  );
}

