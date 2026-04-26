"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice } from "@/lib/utils";
import { AddToCartButton } from "../app/AddToCartButton";
import { useRecentlyViewed } from "@/lib/hooks/use-ui-preferences";
import { useIsWishlisted, useWishlistActions } from "@/lib/store/wishlist-store-provider";
import { QuickViewModal } from "./QuickViewModal";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";

type Product = FILTER_PRODUCTS_BY_NAME_QUERYResult[number];

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { toggleItem: toggleWishlist, openWishlist } = useWishlistActions();
  const isWished = useIsWishlisted(product._id);
  const { addRecentlyViewed } = useRecentlyViewed();

  const images = product.images ?? [];
  const mainImageUrl = images[0]?.asset?.url;
  const secondImageUrl = images[1]?.asset?.url;
  const displayedImageUrl = isHovered && secondImageUrl ? secondImageUrl : mainImageUrl;

  const stock = product.stock ?? 0;
  const isOutOfStock = stock <= 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="group relative flex flex-col h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <Link
          href={`/products/${product.slug}`}
          className="block overflow-hidden rounded-2xl relative aspect-3/4 bg-[#EDEAE4] dark:bg-zinc-800"
          onClick={() => addRecentlyViewed(product._id)}
        >
          {displayedImageUrl ? (
            <Image
              src={displayedImageUrl}
              alt={product.name ?? "Product image"}
              fill
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-400">
              <svg className="h-12 w-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Out of stock badge */}
          {isOutOfStock && (
            <Badge
              variant="destructive"
              className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
            >
              Sold Out
            </Badge>
          )}

          {/* Category badge */}
          {product.category && !isOutOfStock && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-700 backdrop-blur-sm dark:bg-zinc-900/90 dark:text-zinc-300">
              {product.category.title}
            </span>
          )}

          {/* Hover: Add to cart slides up */}
          <div className={cn(
            "absolute bottom-0 left-0 right-0 p-3 transition-all duration-300",
            "lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
            "translate-y-0 opacity-100 lg:group-hover:translate-y-0" // Always show on mobile/touch
          )}>
            <AddToCartButton
              productId={product._id}
              name={product.name ?? "Unknown Product"}
              price={product.price ?? 0}
              image={mainImageUrl ?? undefined}
              stock={stock}
              className="rounded-full bg-white/95 text-zinc-900 backdrop-blur-sm hover:bg-white shadow-lg border-0 font-semibold py-4"
            />
          </div>
        </Link>

        {/* Action icons top-right */}
        <div className="absolute right-3 top-3 z-20 flex flex-col gap-2">
          <button
            type="button"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200",
              isWished
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "bg-white/90 text-zinc-600 hover:bg-white hover:text-zinc-900 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800"
            )}
            onClick={() => {
              const wasWishlisted = isWished;
              const slugValue = typeof product.slug === "string" 
                ? product.slug 
                : (product.slug as any)?.current;
                
              toggleWishlist({
                productId: product._id,
                name: product.name ?? "Unknown Product",
                price: product.price ?? 0,
                image: product.images?.[0]?.asset?.url ?? undefined,
                slug: slugValue,
              });
              if (!wasWishlisted) openWishlist();
            }}
            aria-label="Toggle wishlist"
          >
            <Heart className={cn("h-3.5 w-3.5", isWished ? "fill-current" : "")} />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-600 backdrop-blur-sm hover:bg-white hover:text-zinc-900 transition-all duration-200 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800"
            onClick={() => setQuickViewOpen(true)}
            aria-label="Quick view product"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Card info below image */}
        <div className="mt-4 flex flex-col gap-1 px-1">
          <Link
            href={`/products/${product.slug}`}
            className="block"
            onClick={() => addRecentlyViewed(product._id)}
          >
            <h3 className="text-sm font-semibold leading-snug text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <p className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {formatPrice(product.price)}
            </p>
            {product.category && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {product.category.title}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
}
