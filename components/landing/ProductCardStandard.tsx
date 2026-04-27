"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { ProductRating } from "../app/ProductRating";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";

type Product = FILTER_PRODUCTS_BY_NAME_QUERYResult[number] & {
  reviews?: { rating: number }[];
};

interface ProductCardStandardProps {
  product: Product;
}

export function ProductCardStandard({ product }: ProductCardStandardProps) {
  const imageUrl = product.images?.[0]?.asset?.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col gap-3"
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name ?? "Product"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-400">
            No Image
          </div>
        )}
      </Link>

      <div className="flex flex-col gap-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-bold text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <ProductRating productId={product._id} reviews={product.reviews} />
        <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
}
