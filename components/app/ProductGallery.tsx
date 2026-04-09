"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
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
  const [is360View, setIs360View] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef<{
    startX: number;
    startIndex: number;
  } | null>(null);

  useEffect(() => {
    if (!is360View || isDragging || frames.length < 2) return;

    const intervalId = window.setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % frames.length);
    }, 180);

    return () => window.clearInterval(intervalId);
  }, [frames.length, is360View, isDragging]);

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
        <button
          type="button"
          onClick={() => setIs360View((prev) => !prev)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all",
            is360View
              ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
          )}
        >
          <RotateCcw className={cn("h-3.5 w-3.5", is360View ? "animate-spin" : "")} />
          {is360View ? "360° on" : "360°"}
        </button>
      </div>

      {/* Main image */}
      <motion.div
        key={`${selectedIndex}-${is360View ? "360" : "gallery"}`}
        initial={{ opacity: 0.6, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-square overflow-hidden rounded-2xl bg-[#EDEAE4] dark:bg-zinc-800"
        onPointerDown={(e) => {
          if (!is360View || frames.length < 2) return;
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
          dragStateRef.current = {
            startX: e.clientX,
            startIndex: selectedIndex,
          };
          setIsDragging(true);
        }}
        onPointerMove={(e) => {
          if (!is360View || !isDragging || !dragStateRef.current) return;
          const len = frames.length;
          const dx = e.clientX - dragStateRef.current.startX;
          const step = Math.round(dx / 28);
          const next = (dragStateRef.current.startIndex + step) % len;
          const normalized = next < 0 ? next + len : next;
          setSelectedIndex(normalized);
        }}
        onPointerUp={() => {
          setIsDragging(false);
          dragStateRef.current = null;
        }}
        onPointerCancel={() => {
          setIsDragging(false);
          dragStateRef.current = null;
        }}
      >
        {selectedImage?.asset?.url ? (
          <Image
            src={selectedImage.asset.url}
            alt={productName ?? "Product image"}
            fill
            className={cn("object-contain transition-transform duration-500", {
              "scale-105": is360View,
            })}
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
