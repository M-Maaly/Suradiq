"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import {
  useTotalPrice,
  useTotalItems,
  useCartActions,
} from "@/lib/store/cart-store-provider";

interface CartSummaryProps {
  hasStockIssues?: boolean;
}

export function CartSummary({ hasStockIssues = false }: CartSummaryProps) {
  const totalPrice = useTotalPrice();
  const totalItems = useTotalItems();
  const { closeCart } = useCartActions();

  if (totalItems === 0) return null;

  return (
    <div className="border-t border-zinc-200/70 bg-white/80 p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/80">
      {/* Subtotal */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{formatPrice(totalPrice)}</span>
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Shipping &amp; taxes calculated at checkout
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {hasStockIssues ? (
          <Button
            disabled
            className="w-full rounded-full py-6 text-sm font-bold uppercase tracking-widest"
          >
            Resolve stock issues to checkout
          </Button>
        ) : (
          <Button
            asChild
            className="w-full rounded-full bg-zinc-900 py-6 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-700 hover:scale-[1.02] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            <Link href="/checkout" onClick={() => closeCart()}>
              Checkout →
            </Link>
          </Button>
        )}

        <div className="text-center">
          <button
            type="button"
            onClick={closeCart}
            className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-200 underline underline-offset-4"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
