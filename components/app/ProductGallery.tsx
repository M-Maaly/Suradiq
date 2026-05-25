"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PRODUCT_BY_SLUG_QUERYResult } from "@/sanity.types";

type ProductImages = NonNullable<
  NonNullable<PRODUCT_BY_SLUG_QUERYResult>["images"]
>;

interface ProductGalleryProps {
  images: ProductImages | null;
  productName: string | null;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const frames = images ?? [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (frames.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-[#EDEAE4] dark:bg-zinc-800">
        <span className="text-sm text-zinc-400">No images available</span>
      </div>
    );
  }

  const selectedImage = frames[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Gallery header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Product gallery
        </p>
      </div>

      {/* Main image */}
      <motion.div
        key={`gallery-${selectedIndex}`}
        initial={{ opacity: 0.6, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-square overflow-hidden rounded-2xl bg-[#EDEAE4] dark:bg-zinc-800"
      >
        {selectedImage?.asset?.url ? (
          <Image
            src={selectedImage.asset.url}
            alt={productName ?? "Product image"}
            fill
            className="object-contain transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-400">
            No image
          </div>
        )}
      </motion.div>

      {/* Thumbnail Grid */}
      {frames.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
          {frames.map((image, index) => (
            <button
              key={image._key}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl bg-[#EDEAE4] transition-all dark:bg-zinc-800",
                selectedIndex === index
                  ? "ring-2 ring-zinc-900 ring-offset-2 dark:ring-zinc-100 dark:ring-offset-zinc-950"
                  : "hover:opacity-75",
              )}
            >
              {image.asset?.url ? (
                <Image
                  src={image.asset.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                  N/A
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
