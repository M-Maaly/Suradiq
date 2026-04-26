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
        <CarouselContent className="-ml-0">
          {products.map((product) => (
            <CarouselItem key={product._id} className="pl-0">
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
    <div className="relative flex min-h-[70vh] w-full flex-col overflow-hidden rounded-[2.5rem] bg-[#EAE8E3] dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800">
      
      {/* Background Typography */}
      <div className="absolute top-[5%] left-0 w-full select-none text-center flex justify-center overflow-hidden z-0">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[14vw] font-black leading-none tracking-tighter text-zinc-900 dark:text-zinc-100 whitespace-nowrap opacity-90"
        >
          {product.name?.toLowerCase().split(" ",2) || "suradiq"}
        </motion.h1>
      </div>

      <div className="relative z-10 flex h-full flex-col lg:flex-row flex-1 items-center justify-between px-8 py-12 lg:px-16 lg:py-20">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/3 flex flex-col justify-end mt-40 lg:mt-40 order-2 lg:order-1 h-full z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <p className="max-w-xs text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-300">
              {product.description ? product.description.substring(0, 150) + "..." : "Our mission is to deliver bespoke furniture that is purely made from high-quality materials. Our products reflect modern minimalism with a touch of creativity."}
            </p>
            
            <Button
              asChild
              className="w-fit rounded-full bg-black px-8 py-6 text-sm font-bold uppercase tracking-widest text-white shadow-xl hover:bg-zinc-800 hover:scale-105 transition-all duration-300  dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              <Link href={`/products/${product.slug}`} className="flex items-center gap-2">
                explore <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black dark:bg-black dark:text-white"><ArrowUpRight className="h-4 w-4" /></span>
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Center Image */}
        <div className="w-full lg:w-1/3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] lg:-translate-y-1/2 flex justify-center z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[600px] lg:w-[600px] xl:h-[700px] xl:w-[700px]"
          >
            {mainImage && (
              <Image
                src={mainImage}
                alt={product.name ?? "Featured product"}
                fill
                className="object-contain drop-shadow-2xl filter brightness-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/3 flex flex-col justify-end items-end order-3 mt-8 lg:mt-0 h-full z-10">
           <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-end gap-6 rounded-3xl border border-zinc-900/10 bg-white/40 p-6 backdrop-blur-md dark:border-zinc-100/10 dark:bg-black/40"
          >
            <div className="flex gap-2">
               {product.images?.slice(0, 3).map((img, i) => (
                 img.asset?.url && (
                    <div key={i} className="relative h-16 w-16 overflow-hidden rounded-xl border-2 border-transparent hover:border-black transition-colors dark:hover:border-white">
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
            
            <p className="text-2xl font-bold tracking-tight text-zinc-900 lg:text-3xl dark:text-zinc-100">
              {formatPrice(product.price)}
            </p>

            <Link href={`#collection`} className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400">
              full collection <span className="block h-px w-8 bg-zinc-900 transition-all group-hover:w-12 dark:bg-zinc-100" />
            </Link>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

