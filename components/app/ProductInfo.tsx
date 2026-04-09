import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AddToCartButton } from "@/components/app/AddToCartButton";
import { AskAISimilarButton } from "@/components/app/AskAISimilarButton";
import { StockBadge } from "@/components/app/StockBadge";
import { formatPrice } from "@/lib/utils";
import type { PRODUCT_BY_SLUG_QUERYResult } from "@/sanity.types";
import { ProductWishlistButton } from "./ProductWishlistButton";

interface ProductInfoProps {
  product: NonNullable<PRODUCT_BY_SLUG_QUERYResult>;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const imageUrl = product.images?.[0]?.asset?.url;

  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200/60 bg-white p-8 dark:border-zinc-800/60 dark:bg-zinc-900">
      {/* Category */}
      {product.category && (
        <Link
          href={`/?category=${product.category.slug}`}
          className="inline-flex w-fit items-center gap-1 rounded-full bg-[#EDEAE4] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-600 transition-colors hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          {product.category.title} <ArrowUpRight className="h-3 w-3" />
        </Link>
      )}

      {/* Title */}
      <h1 className="mt-5 text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 md:text-5xl">
        {product.name}
      </h1>

      {/* Price */}
      <p className="mt-5 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {formatPrice(product.price)}
      </p>

      {/* Description */}
      {product.description && (
        <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>
      )}

      {/* Stock & Action buttons */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <StockBadge productId={product._id} stock={product.stock ?? 0} />
          <ProductWishlistButton product={product} />
        </div>
        <AddToCartButton
          productId={product._id}
          name={product.name ?? "Unknown Product"}
          price={product.price ?? 0}
          image={imageUrl ?? undefined}
          stock={product.stock ?? 0}
          className="rounded-full py-6 text-sm font-bold uppercase tracking-widest"
        />
        <AskAISimilarButton productName={product.name ?? "this product"} />
      </div>

      {/* Metadata */}
      <div className="mt-8 space-y-3 border-t border-zinc-200/60 pt-8 dark:border-zinc-800/60">
        <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400 mb-4">
          Product Details
        </h4>
        {product.material && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Material</span>
            <span className="font-semibold capitalize text-zinc-900 dark:text-zinc-100">
              {product.material}
            </span>
          </div>
        )}
        {product.color && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Color</span>
            <span className="font-semibold capitalize text-zinc-900 dark:text-zinc-100">
              {product.color}
            </span>
          </div>
        )}
        {product.dimensions && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Dimensions</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {product.dimensions}
            </span>
          </div>
        )}
        {product.assemblyRequired !== null && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Assembly</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {product.assemblyRequired ? "Required" : "Not required"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
