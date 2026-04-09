"use client";

import { AlertTriangle, Loader2, ShoppingBag, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  useCartItems,
  useCartIsOpen,
  useCartActions,
  useTotalItems,
} from "@/lib/store/cart-store-provider";
import { useCartStock } from "@/lib/hooks/useCartStock";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function CartSheet() {
  const items = useCartItems();
  const isOpen = useCartIsOpen();
  const totalItems = useTotalItems();
  const { closeCart } = useCartActions();
  const { stockMap, isLoading, hasStockIssues } = useCartStock(items);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent showCloseButton={false} className="flex w-full flex-col gap-0 border-l border-zinc-200/60 bg-[#FAF9F7] p-0 sm:max-w-md dark:border-zinc-800/60 dark:bg-zinc-950">
        {/* Header */}
        <SheetHeader className="flex-row items-center justify-between border-b border-zinc-200 bg-white/80 px-6 py-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
          <SheetTitle className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
            <ShoppingBag className="h-4 w-4" />
            Your Basket
            {totalItems > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                {totalItems}
              </span>
            )}
            {isLoading && (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-400" />
            )}
          </SheetTitle>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <ShoppingBag className="h-9 w-9 text-zinc-300 dark:text-zinc-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Your basket is empty
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Discover our curated collection and add pieces you love.
              </p>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <>
            {/* Stock Issues Banner */}
            {hasStockIssues && !isLoading && (
              <div className="mx-4 mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Some items have stock issues. Review before checkout.</span>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                {items.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    stockInfo={stockMap.get(item.productId)}
                  />
                ))}
              </div>
            </div>

            {/* Summary */}
            <CartSummary hasStockIssues={hasStockIssues} />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
