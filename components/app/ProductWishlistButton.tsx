"use client";

import { Heart } from "lucide-react";
import { useIsWishlisted, useWishlistActions } from "@/lib/store/wishlist-store-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductWishlistButtonProps {
  product: {
    _id: string;
    name?: string | null;
    price?: number | null;
    images?: any[] | null;
    slug?: any;
  };
}

export function ProductWishlistButton({ product }: ProductWishlistButtonProps) {
  const isWishlisted = useIsWishlisted(product._id);
  const { toggleItem, openWishlist } = useWishlistActions();

  const handleToggle = () => {
    const wasWishlisted = isWishlisted;
    toggleItem({
      productId: product._id,
      name: product.name ?? "Unknown Product",
      price: product.price ?? 0,
      image: product.images?.[0]?.asset?.url,
      slug: product.slug?.current,
    });
    
    if (!wasWishlisted) {
      openWishlist();
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className={cn(
        "h-11 w-11 rounded-full border-zinc-300 bg-white/90 text-zinc-700 backdrop-blur hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:bg-zinc-800",
        isWishlisted && "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100",
      )}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("h-5 w-5", isWishlisted ? "fill-current" : "")} />
    </Button>
  );
}

