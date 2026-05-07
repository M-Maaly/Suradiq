import { AppShell } from "@/components/app/AppShell";
import { CartSheet } from "@/components/app/CartSheet";
import { ChatSheet } from "@/components/app/ChatSheet";
import { WishlistSheet } from "@/components/app/WishlistSheet";
import { Footer } from "@/components/app/Footer";
import { Header } from "@/components/app/Header";
import { Toaster } from "@/components/ui/sonner";
import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { ChatStoreProvider } from "@/lib/store/chat-store-provider";
import { WishlistStoreProvider } from "@/lib/store/wishlist-store-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { SanityLive } from "@/sanity/lib/live";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartStoreProvider>
      <WishlistStoreProvider>
        <ChatStoreProvider>
          <AppShell>
            <Header />
            <main>{children}</main>
            <Footer />
          </AppShell>
          <CartSheet />
          <ChatSheet />
          <WishlistSheet />
          <Toaster position="bottom-center" />
          <SanityLive />
        </ChatStoreProvider>
      </WishlistStoreProvider>
    </CartStoreProvider>
  );
}
