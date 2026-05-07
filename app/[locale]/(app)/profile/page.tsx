import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const { userId } = await auth();

  // If not logged in, redirect to home or let Clerk handle it if middleware protects
  if (!userId) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-12 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-5xl dark:text-zinc-100">
            Your Account
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Manage your details and track your bespoke orders.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button asChild variant="outline" className="flex items-center gap-2 rounded-full px-6 text-xs font-bold uppercase tracking-widest">
            <Link href="/orders">
              <ShoppingBag className="h-4 w-4" />
              Order History
            </Link>
          </Button>
          {/* Wishlist triggers the side drawer */}
        </div>
      </div>

      <div className="flex justify-center w-full">
        <UserProfile 
          routing="hash"
          appearance={{
            elements: {
              rootBox: "w-full max-w-4xl mx-auto shadow-none",
              cardBox: "w-full shadow-none border border-zinc-200 dark:border-zinc-800 rounded-2xl dark:bg-zinc-950",
            }
          }}
        />
      </div>
    </div>
  );
}
