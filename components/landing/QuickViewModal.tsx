"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AddToCartButton } from "@/components/app/AddToCartButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";
import { ProductWishlistButton } from "../app/ProductWishlistButton";

type Product = FILTER_PRODUCTS_BY_NAME_QUERYResult[number];

interface QuickViewModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewModal({
  product,
  open,
  onOpenChange,
}: QuickViewModalProps) {
  const [index, setIndex] = useState(0);
  const [is360View, setIs360View] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef<{
    startX: number;
    startIndex: number;
  } | null>(null);

  const frames = product.images ?? [];
  const currentImage = frames[index]?.asset?.url ?? frames[0]?.asset?.url;
  const mainImageUrl = frames[0]?.asset?.url;

  const next = () => setIndex((prev) => (prev + 1) % Math.max(frames.length, 1));
  const prev = () =>
    setIndex((old) =>
      (old - 1 + Math.max(frames.length, 1)) % Math.max(frames.length, 1),
    );

  useEffect(() => {
    if (!is360View || isDragging || frames.length < 2) return;

    const intervalId = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
    }, 180);

    return () => window.clearInterval(intervalId);
  }, [frames.length, is360View, isDragging]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto rounded-3xl border-zinc-200/60 bg-white p-0 scrollbar-hide dark:border-zinc-800/60 dark:bg-zinc-950">
        <div className="grid gap-0 md:grid-cols-2">
          {/* Image Side */}
          <div className="relative aspect-square bg-[#EDEAE4] dark:bg-zinc-900">
            {/* 360 toggle */}
            <div className="absolute left-4 top-4 z-10">
              <button
                type="button"
                onClick={() => setIs360View((prev) => !prev)}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all",
                  is360View
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-300 bg-white/90 text-zinc-700 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-200",
                ].join(" ")}
                aria-label={is360View ? "Disable 360 mode" : "Enable 360 mode"}
              >
                <RotateCcw className={["h-3.5 w-3.5", is360View ? "animate-spin" : ""].join(" ")} />
                {is360View ? "360°" : "360°"}
              </button>
            </div>

            {currentImage ? (
              <motion.div
                key={`${index}-${is360View ? "360" : "gallery"}`}
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0"
                onPointerDown={(e) => {
                  if (!is360View || frames.length < 2) return;
                  (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
                  dragStateRef.current = {
                    startX: e.clientX,
                    startIndex: index,
                  };
                  setIsDragging(true);
                }}
                onPointerMove={(e) => {
                  if (!is360View || !isDragging || !dragStateRef.current) return;
                  const len = frames.length;
                  const dx = e.clientX - dragStateRef.current.startX;
                  const step = Math.round(dx / 28);
                  const nextIndex = (dragStateRef.current.startIndex + step) % len;
                  const normalized = nextIndex < 0 ? nextIndex + len : nextIndex;
                  setIndex(normalized);
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
                <Image
                  src={currentImage}
                  alt={product.name ?? "Product image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ) : null}

            {frames.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-700"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Info Side */}
          <div className="flex flex-col justify-between p-8">
            <div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tight">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="mt-2 line-clamp-3 text-sm text-zinc-500 dark:text-zinc-400">
                  {product.category?.title
                    ? `Premium ${product.category.title.toLowerCase()} essentials.`
                    : "Designed for premium spaces with a modern minimalist style."}
                </DialogDescription>
              </DialogHeader>

              <p className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {formatPrice(product.price)}
              </p>

              {/* Thumbnails */}
              {frames.length > 1 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {frames.map((frame, i) => (
                      <button
                        key={frame._key ?? i}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`View image ${i + 1}`}
                        className={[
                          "relative aspect-square w-14 shrink-0 overflow-hidden rounded-xl border-2 transition",
                          i === index
                            ? "border-zinc-900 dark:border-zinc-100"
                            : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500",
                        ].join(" ")}
                      >
                        {frame.asset?.url ? (
                          <Image
                            src={frame.asset.url}
                            alt={`${product.name} thumbnail ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 space-y-4">
              <AddToCartButton
                productId={product._id}
                name={product.name ?? "Unknown Product"}
                price={product.price ?? 0}
                image={mainImageUrl ?? undefined}
                stock={product.stock ?? 0}
                className="w-full rounded-full py-6 text-sm font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
              />

              <div className="flex items-center gap-3">
                <Button variant="ghost" className="flex-1 rounded-full py-6 text-sm font-semibold border-zinc-200 dark:border-zinc-800" asChild>
                  <Link href={`/products/${product.slug}`}>full product page</Link>
                </Button>
                
                <ProductWishlistButton product={{
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  images: product.images as any,
                  slug: product.slug as any,
                }} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
