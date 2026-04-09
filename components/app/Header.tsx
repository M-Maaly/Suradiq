"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Package, ShoppingBag, Sparkles, User } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useCartActions, useTotalItems } from "@/lib/store/cart-store-provider";
import { useChatActions, useIsChatOpen } from "@/lib/store/chat-store-provider";
import { useWishlistItems, useWishlistActions } from "@/lib/store/wishlist-store-provider";
import { DarkModeToggle } from "./DarkModeToggle";
import Logo from "./Logo";

export function Header() {
  const { openCart } = useCartActions();
  const { openChat } = useChatActions();
  const isChatOpen = useIsChatOpen();
  const totalItems = useTotalItems();
  const wishlistItems = useWishlistItems();
  const { openWishlist } = useWishlistActions();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/95 backdrop-blur-xl transition-all duration-300 dark:border-zinc-800/60 dark:bg-zinc-950/95">
      <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Center Nav Links (desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100">
            Shop
          </Link>
          <Link href="/orders" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100">
            Orders
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {mounted && (
            <>
              {/* AI Shopping Assistant */}
              {!isChatOpen && (
                <Button
                  onClick={openChat}
                  className="hidden rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-900 shadow-none transition-all hover:bg-zinc-50 hover:shadow-md sm:inline-flex dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                  Ask AI
                </Button>
              )}

              <DarkModeToggle />

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                onClick={openWishlist}
                className="relative h-9 w-9 rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <Heart className="h-[18px] w-[18px]" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {wishlistItems.length}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                onClick={openCart}
              >
                <ShoppingBag className="h-[18px] w-[18px]" />
                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
                <span className="sr-only">Open cart ({totalItems} items)</span>
              </Button>

              <SignedIn>
                <UserButton
                  afterSwitchSessionUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="My Profile"
                      labelIcon={<User className="h-4 w-4" />}
                      href="/profile"
                    />
                    <UserButton.Link
                      label="My Orders"
                      labelIcon={<Package className="h-4 w-4" />}
                      href="/orders"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  >
                    <User className="h-[18px] w-[18px]" />
                    <span className="sr-only">Sign in</span>
                  </Button>
                </SignInButton>
              </SignedOut>

              {/* Shop pill */}
              <Button
                asChild
                className="hidden sm:inline-flex rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-700 hover:scale-105 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                <Link href="/shop">
                  shop ↗
                </Link>
              </Button>
            </>
          )}

          {!mounted && (
            <Button variant="ghost" size="icon" aria-hidden className="h-9 w-9 rounded-full">
              <ShoppingBag className="h-[18px] w-[18px]" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
