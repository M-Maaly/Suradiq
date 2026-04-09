"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/lib/hooks/use-ui-preferences";

export function RecentlyViewedTracker({ productId }: { productId: string }) {
  const { addRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    addRecentlyViewed(productId);
  }, [addRecentlyViewed, productId]);

  return null;
}
