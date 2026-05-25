"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import type { FEATURED_PRODUCTS_QUERYResult } from "@/sanity.types";

type FeaturedProduct = FEATURED_PRODUCTS_QUERYResult[number];

interface FeaturedCarouselProps {
  products: FEATURED_PRODUCTS_QUERYResult;
}

export default function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="relative mx-auto mt-3 mb-3 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
          duration: 35,
        }}
        plugins={[
          Autoplay({
            delay: 6000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-6">
          {products.map((product) => (
            <CarouselItem key={product._id} className="pl-6">
              <FeaturedSlide product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot indicators */}
      {count > 1 && (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3 z-20">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                current === index
                  ? "w-8 bg-zinc-900 dark:bg-zinc-100"
                  : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-500",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface FeaturedSlideProps {
  product: FeaturedProduct;
}

function FeaturedSlide({ product }: FeaturedSlideProps) {
  const mainImage = product.images?.[0]?.asset?.url;

  return (
    <div className="relative flex h-[85vh] sm:h-[70vh] w-full flex-col overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#EAE8E3] dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800">
      
      {/* Background Typography - Hidden on mobile for clarity as requested */}
      <div className="absolute top-[10%] sm:top-[5%] left-0 w-full select-none text-center hidden sm:flex justify-center overflow-hidden z-0">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[14vw] font-black leading-none tracking-tighter text-zinc-900 dark:text-zinc-100 whitespace-nowrap opacity-90"
        >
          {product.name?.toLowerCase().split(" ",2) || "suradiq"}
        </motion.h1>
      </div>

      <div className="relative z-10 flex h-full flex-col lg:flex-row flex-1 items-center justify-between px-6 py-12 sm:px-8 lg:px-16 lg:py-20">
        
        {/* Mobile Layout Strategy:
            Large Screen: [Left Content] [Image] [Right Content]
            Mobile Screen: [Image] [Left Content] [Right Content]
        */}

        {/* 1. Content (Explore & Description) */}
        <div className="w-full lg:w-1/3 flex flex-col justify-end mt-auto lg:mt-40 order-2 lg:order-1 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col gap-4 sm:gap-6"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Premium Collection</span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100 lg:hidden">
                {product.name}
              </h2>
            </div>
            <p className="max-w-xs text-xs sm:text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-300">
              {product.description ? product.description.substring(0, 100) + "..." : "Bespoke furniture crafted from high-quality materials, reflecting modern minimalism."}
            </p>
            
            <Button
              asChild
              className="w-full sm:w-fit rounded-full bg-black px-8 py-6 text-xs sm:text-sm font-bold uppercase tracking-widest text-white shadow-xl hover:bg-zinc-800 hover:scale-105 transition-all duration-300 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              <Link href={`/products/${product.slug}`} className="flex items-center justify-center gap-2">
                explore <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white text-black dark:bg-black dark:text-white"><ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" /></span>
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* 2. Image (Centered or Top on Mobile) */}
        <div className="relative w-full lg:w-1/3 flex justify-center order-1 lg:order-2 mb-8 lg:mb-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative h-[280px] w-[280px] sm:h-[400px] sm:w-[400px] lg:h-[600px] lg:w-[600px] xl:h-[700px] xl:w-[700px]"
          >
            {mainImage && (
              <Image
                src={mainImage}
                alt={product.name ?? "Featured product"}
                fill
                className="object-contain drop-shadow-2xl filter brightness-105"
                sizes="(max-width: 768px) 280px, 600px"
                priority
              />
            )}
          </motion.div>
        </div>

        {/* 3. Price & Thumbnails */}
        <div className="w-full lg:w-1/3 flex flex-col justify-end items-start lg:items-end order-3 mt-8 lg:mt-0 z-10">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex w-full sm:w-auto flex-col items-start lg:items-end gap-4 sm:gap-6 rounded-[2rem] border border-zinc-900/5 bg-white/60 p-5 sm:p-6 backdrop-blur-md dark:border-zinc-100/10 dark:bg-black/40"
          >
            <div className="flex gap-2">
               {product.images?.slice(0, 3).map((img, i) => (
                 img.asset?.url && (
                    <div key={i} className="relative h-12 w-12 sm:h-16 sm:w-16 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <Image
                        src={img.asset.url}
                        alt="Thumbnail"
                        fill
                        className="object-cover"
                      />
                    </div>
                 )
               ))}
            </div>
            
            <div className="flex items-center lg:flex-col lg:items-end gap-4 lg:gap-2">
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 lg:text-3xl dark:text-zinc-100">
                {formatPrice(product.price)}
              </p>

              <Link href={`#collection`} className="group flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400">
                collection <span className="block h-px w-6 sm:w-8 bg-zinc-900 transition-all group-hover:w-12 dark:bg-zinc-100" />
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

