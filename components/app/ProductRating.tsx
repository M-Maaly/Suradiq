"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser, useClerk } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Review {
  rating: number;
  comment?: string;
  userName?: string;
  createdAt?: string;
}

interface ProductRatingProps {
  productId: string;
  reviews?: Review[];
  interactive?: boolean;
}

export function ProductRating({ productId, reviews = [], interactive = false }: ProductRatingProps) {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate average rating
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const ratings = safeReviews.map((r) => r.rating);
  const averageRating = ratings.length > 0 
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
    : 0;

  const handleRate = async (rating: number) => {
    if (!user) {
      toast.error("Please sign in to rate this product");
      openSignIn();
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify({
          productId,
          rating,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit rating");

      toast.success("Thank you for your rating!");
      router.refresh(); // Refresh to show new rating
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (isInteractive: boolean) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!isInteractive || isSubmitting}
            onMouseEnter={() => isInteractive && setHoveredRating(star)}
            onMouseLeave={() => isInteractive && setHoveredRating(0)}
            onClick={() => isInteractive && handleRate(star)}
            className={cn(
              "transition-all duration-200",
              isInteractive && "hover:scale-125 disabled:opacity-50",
              !isInteractive && "cursor-default"
            )}
          >
            <Star
              className={cn(
                "h-4 w-4",
                (hoveredRating || averageRating) >= star
                  ? "fill-zinc-900 text-zinc-900 dark:fill-zinc-100 dark:text-zinc-100"
                  : "text-zinc-300 dark:text-zinc-700"
              )}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {renderStars(interactive)}
        {isSubmitting && (
          <Loader2 className="h-3 w-3 animate-spin text-zinc-500" />
        )}
        {safeReviews.length > 0 && (
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            {averageRating.toFixed(1)} ({safeReviews.length})
          </span>
        )}
      </div>
    </div>
  );
}
