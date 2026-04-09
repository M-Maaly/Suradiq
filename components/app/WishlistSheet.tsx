"use client";

import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  useWishlistItems,
  useWishlistIsOpen,
  useWishlistActions,
} from "@/lib/store/wishlist-store-provider";
import { useCartActions } from "@/lib/store/cart-store-provider";
import { formatPrice } from "@/lib/utils";

export function WishlistSheet() {
  const items = useWishlistItems();
  const isOpen = useWishlistIsOpen();
  const { closeWishlist, removeItem } = useWishlistActions();
  const { addItem: addToCart, openCart } = useCartActions();

  const handleMoveToCart = (item: any) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    removeItem(item.productId);
    closeWishlist();
    openCart();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeWishlist()}>
      <SheetContent showCloseButton={false} className="flex w-full flex-col gap-0 border-l border-zinc-200/60 bg-[#FAF9F7] p-0 sm:max-w-md dark:border-zinc-800/60 dark:bg-zinc-950">
        <SheetHeader className="flex-row items-center justify-between border-b border-zinc-200 bg-white/80 px-6 py-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
          <SheetTitle className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
            <Heart className="h-4 w-4" />
            Wishlist
            {items.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                {items.length}
              </span>
            )}
          </SheetTitle>
          <button
            type="button"
            onClick={closeWishlist}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <Heart className="h-9 w-9 text-zinc-300 dark:text-zinc-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Wishlist is empty
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Save your favorite pieces here to keep an eye on them.
              </p>
            </div>
            <Button
              onClick={closeWishlist}
              className="mt-2 rounded-full bg-zinc-900 px-8 py-6 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Explore Collection
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="group relative flex items-center gap-4 rounded-2xl border border-zinc-200/50 bg-white p-3 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/50"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-zinc-300">
                        <ShoppingBag className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeWishlist}
                      className="text-sm font-bold text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs font-semibold text-zinc-500">
                      {formatPrice(item.price)}
                    </p>
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="mt-2 flex w-fit items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-900 underline underline-offset-4 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
                    >
                      Add to basket <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="absolute right-3 top-3 text-zinc-400 transition-colors hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
