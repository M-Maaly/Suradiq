"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, Package, ShoppingBag, Sparkles, User, Home, ShoppingCart, Info, Mail, Moon, Sun } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
        
        {/* LEFT: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu (burger) */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-[#FAF9F7] p-0 dark:bg-zinc-950">
                <SheetHeader className="border-b border-zinc-200 p-6 dark:border-zinc-800">
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 p-6">
                  {/* Navigation Links */}
                  <Link href="/" className="flex items-center gap-3 rounded-2xl p-4 text-sm font-bold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-white dark:text-zinc-100 dark:hover:bg-zinc-900">
                    <Home className="h-4 w-4" /> Home
                  </Link>
                  <Link href="/shop" className="flex items-center gap-3 rounded-2xl p-4 text-sm font-bold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-white dark:text-zinc-100 dark:hover:bg-zinc-900">
                    <ShoppingCart className="h-4 w-4" /> Shop
                  </Link>
                  <Link href="/about" className="flex items-center gap-3 rounded-2xl p-4 text-sm font-bold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-white dark:text-zinc-100 dark:hover:bg-zinc-900">
                    <Info className="h-4 w-4" /> About Us
                  </Link>
                  <Link href="/contact" className="flex items-center gap-3 rounded-2xl p-4 text-sm font-bold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-white dark:text-zinc-100 dark:hover:bg-zinc-900">
                    <Mail className="h-4 w-4" /> Contact
                  </Link>
                  <SignedIn>
                    <Link href="/orders" className="flex items-center gap-3 rounded-2xl p-4 text-sm font-bold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-white dark:text-zinc-100 dark:hover:bg-zinc-900">
                      <Package className="h-4 w-4" /> Orders
                    </Link>
                  </SignedIn>
                  
                  <div className="my-3 h-px bg-zinc-200 dark:bg-zinc-800" />

                  {/* Quick Actions inside mobile menu */}
                  <button
                    type="button"
                    onClick={openWishlist}
                    className="flex items-center gap-3 rounded-2xl p-4 text-sm font-bold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-white dark:text-zinc-100 dark:hover:bg-zinc-900"
                  >
                    <Heart className="h-4 w-4" /> Wishlist
                    {wishlistItems.length > 0 && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                        {wishlistItems.length}
                      </span>
                    )}
                  </button>

                  <div className="my-3 h-px bg-zinc-200 dark:bg-zinc-800" />

                  {/* AI + Theme */}
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() => openChat()}
                      className="w-full justify-start rounded-full border border-zinc-200 bg-white px-6 py-6 text-sm font-bold uppercase tracking-widest text-zinc-900 shadow-none transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <Sparkles className="h-3.5 w-3.5 mr-2 text-amber-500" />
                      Ask AI Assistant
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Logo />
        </div>

        {/* CENTER: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100">
            Contact
          </Link>
          <SignedIn>
            <Link href="/orders" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100">
              Orders
            </Link>
          </SignedIn>
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {mounted && (
            <>
              {/* AI Button — desktop only */}
              {!isChatOpen && (
                <Button
                  onClick={openChat}
                  className="hidden rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-900 shadow-none transition-all hover:bg-zinc-50 hover:shadow-md lg:inline-flex dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                  Ask AI
                </Button>
              )}

              {/* Dark mode — visible on all sizes */}
              <DarkModeToggle />

              {/* Wishlist — desktop only */}
              <Button
                variant="ghost"
                size="icon"
                onClick={openWishlist}
                className="relative hidden h-9 w-9 rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 sm:flex dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <Heart className="h-[18px] w-[18px]" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {wishlistItems.length}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Button>

              {/* Cart — always visible */}
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

              {/* User — always visible */}
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
