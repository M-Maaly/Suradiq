
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

interface CategoryTilesProps {
  categories: ALL_CATEGORIES_QUERYResult;
  activeCategory?: string;
}

export default function CategoryTiles({
  categories,
  activeCategory,
}: CategoryTilesProps) {
  return (
    <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mt-4">
      {/* Quick Filters - Top Row */}
      <div className="flex gap-2 overflow-x-auto pb-8 scrollbar-hide">
        <Link
          href="/"
          className={`inline-flex shrink-0 items-center rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
            !activeCategory
              ? "bg-zinc-900 text-white shadow-xl dark:bg-white dark:text-black"
              : "border border-zinc-200 bg-white/50 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-800"
          }`}
        >
          All Collections
        </Link>
      </div>

      {/* Side Slider for Categories */}
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {categories.slice(0, 10).map((category, index) => {
            const mainImage = category.image?.asset?.url || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800";
            
            return (
              <CarouselItem key={category._id} className="pl-4 basis-[85%] sm:basis-[45%] lg:basis-[30%] xl:basis-[22%]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-800 shadow-xl transition-all duration-500"
                >
                  <Link href={`/shop?category=${category.slug}`} className="block h-full w-full">
                    {/* Background Image */}
                    <Image
                      src={mainImage}
                      alt={category.title || "Category"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <motion.div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">Collection</p>
                        <h3 className="text-2xl font-black tracking-tight mb-4">
                          {category.title}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                           <span className="h-px w-8 bg-white/50 transition-all duration-500 group-hover:w-16 group-hover:bg-white"></span>
                           <span className="text-[9px] font-black uppercase tracking-widest opacity-60 transition-all duration-500 group-hover:opacity-100">
                            Explore
                           </span>
                        </div>
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}


